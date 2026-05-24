import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  RefreshControl,
  Keyboard,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { removeToken } from "../auth/storage";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import MentorChat from "../components/MentorChat";
import HabitBoard from "../components/HabitBoard";
import HabitForm from "../components/HabitForm";
import QuestBoard from "../components/QuestBoard";
import ShopBoard from "../components/ShopBoard";
import BossBoard from "../components/BossBoard";
import AchievementsModal from "../components/AchievementsModal";
import { DBUserAchievement } from "../components/types/AchievementsModal.types";
import { MentorState } from "../components/types/MentorProfile.types";
import AdaptiveLayout from "../components/AdaptiveLayout";
import LevelIndicator from "../components/LevelIndicator";
import Card from "../components/Card";
import { theme } from "../theme";
import * as habitApi from "../api/habit";
import * as authApi from "../api/auth";
import * as questApi from "../api/quest";
import * as aiApi from "../api/ai";
import * as shopApi from "../api/shop";
import * as bossApi from "../api/boss";

interface HomeScreenProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  navigation: {
    navigate: (screen: string) => void;
  };
}

type TabType = "chat" | "board" | "shop" | "profile";

export default function HomeScreen({
  setToken,
  navigation: _navigation,
}: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  // Tab State
  const [activeTab, setActiveTab] = useState<TabType>("board");

  // Sidebar & Modals
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAchievementsVisible, setIsAchievementsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingHabit, setEditingHabit] = useState<
    habitApi.Habit | undefined
  >();

  // Chat State
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<aiApi.ChatMessage[]>([
    {
      role: "model",
      parts:
        "Greetings, Traveler. How can Merlin assist you on your quest today?",
    },
  ]);
  const [isMentorLoading, setIsMentorLoading] = useState(false);
  const [transientState, setTransientState] = useState<MentorState | null>(
    null,
  );

  // Data State
  const [habits, setHabits] = useState<habitApi.Habit[]>([]);
  const [quests, setQuests] = useState<questApi.Quest[]>([]);
  const [bosses, setBosses] = useState<bossApi.Boss[]>([]);
  const [shopItems, setShopItems] = useState<shopApi.Item[]>([]);
  const [inventory, setInventory] = useState<shopApi.UserItem[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<
    DBUserAchievement[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuestsLoading, setIsQuestsLoading] = useState(true);
  const [isBossesLoading, setIsBossesLoading] = useState(true);
  const [isShopLoading, setIsShopLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // User Stats
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [gold, setGold] = useState(0);
  const [questsCompletedCount, setQuestsCompletedCount] = useState(0);
  const [streak, _setStreak] = useState(0);
  const [attributes, setAttributes] = useState({
    strength: 10,
    intelligence: 10,
    dexterity: 10,
    spirit: 10,
  });

  useEffect(() => {
    onRefresh();
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (activeTab === "chat" && chatMessages.length > 1) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [chatMessages, activeTab]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await bossApi.checkBossAttacks();
    } catch (err) {
      console.error("Failed to check boss attacks:", err);
    }
    await Promise.all([
      fetchHabits(),
      fetchQuests(),
      fetchProfile(),
      fetchShopData(),
      fetchBosses(),
    ]);
    setIsRefreshing(false);
  };

  const getMerlinState = (): MentorState => {
    if (isMentorLoading) return "thinking";
    if (transientState) return transientState;
    if (streak >= 7) return "celebrating";
    if (
      streak === 0 &&
      habits.length > 0 &&
      habits.some((h) => !h.isCompletedToday)
    )
      return "disappointed";
    return "idle";
  };

  const triggerTransientState = (
    state: MentorState,
    duration: number = 3000,
  ) => {
    setTransientState(state);
    setTimeout(() => setTransientState(null), duration);
  };

  const fetchProfile = async () => {
    try {
      const user = await authApi.getProfile();
      if (user.currentXp !== undefined) setXp(user.currentXp);
      if (user.level !== undefined) setLevel(user.level);
      if (user.gold !== undefined) setGold(user.gold);
      if (user.achievements !== undefined)
        setUnlockedAchievements(user.achievements);

      setAttributes({
        strength: user.strength ?? 10,
        intelligence: user.intelligence ?? 10,
        dexterity: user.dexterity ?? 10,
        spirit: user.spirit ?? 10,
      });

      // Mock streak for testing
      _setStreak(8);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  const fetchHabits = async () => {
    try {
      const data = await habitApi.getHabits();
      setHabits(data);
    } catch (err) {
      console.error("Failed to fetch habits:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuests = async () => {
    try {
      const data = await questApi.getQuests();
      setQuests(data);
      setQuestsCompletedCount(
        data.filter((q) => q.status === "COMPLETED").length,
      );
    } catch (err) {
      console.error("Failed to fetch quests:", err);
    } finally {
      setIsQuestsLoading(false);
    }
  };

  const fetchBosses = async () => {
    try {
      setIsBossesLoading(true);
      const data = await bossApi.getBosses();
      setBosses(data);
    } catch (err) {
      console.error("Failed to fetch bosses:", err);
    } finally {
      setIsBossesLoading(false);
    }
  };

  const fetchShopData = async () => {
    try {
      setIsShopLoading(true);
      const [items, userInventory] = await Promise.all([
        shopApi.getShopItems(),
        shopApi.getInventory(),
      ]);
      setShopItems(items);
      setInventory(userInventory);
    } catch (err) {
      console.error("Failed to fetch shop data:", err);
    } finally {
      setIsShopLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage("");
    Keyboard.dismiss();

    const newUserMsg: aiApi.ChatMessage = { role: "user", parts: userMessage };
    setChatMessages((prev) => [...prev, newUserMsg]);

    try {
      setIsMentorLoading(true);
      const history = chatMessages.slice(-9);
      const data = await aiApi.mentorChat(userMessage, history);
      setChatMessages((prev) => [
        ...prev,
        { role: "model", parts: data.response },
      ]);
    } catch (err) {
      console.error("Mentor chat error:", err);
    } finally {
      setIsMentorLoading(false);
    }
  };

  const handleCheckIn = async (habitId: number, _reward: number) => {
    try {
      await habitApi.checkInHabit(habitId);
      setHabits((prev) =>
        prev.map((h) =>
          h.id === habitId ? { ...h, isCompletedToday: true } : h,
        ),
      );
      triggerTransientState("encouraging");
      await fetchProfile();
      await fetchBosses();
    } catch (err) {
      console.error("Failed to check in:", err);
    }
  };

  const handleCompleteQuest = async (id: number) => {
    try {
      await questApi.updateQuest(id, { status: "COMPLETED" });
      triggerTransientState("celebrating");
      await fetchQuests();
      await fetchProfile();
    } catch (err) {
      console.error("Failed to complete quest:", err);
    }
  };

  const handlePurchase = async (itemId: number) => {
    try {
      await shopApi.purchaseItem(itemId);
      await Promise.all([fetchProfile(), fetchShopData()]);
      triggerTransientState("celebrating");
    } catch (err) {
      console.error("Failed to purchase item:", err);
    }
  };

  const handleEquip = async (userItemId: number) => {
    try {
      await shopApi.equipItem(userItemId);
      await fetchShopData();
    } catch (err) {
      console.error("Failed to equip item:", err);
    }
  };

  const handleFormSubmit = async (data: {
    title: string;
    description?: string;
    xpReward?: number;
  }) => {
    setIsSubmitting(true);
    try {
      if (editingHabit) {
        await habitApi.updateHabit(editingHabit.id, data);
      } else {
        await habitApi.createHabit(data);
      }
      fetchHabits();
      setIsFormVisible(false);
    } catch (err) {
      console.error("Failed to save habit:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "chat":
        return (
          <View style={styles.tabContainer}>
            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollContent}
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <MentorChat
                messages={chatMessages}
                isLoading={isMentorLoading}
                state={getMerlinState()}
              />
            </ScrollView>

            <View style={[styles.inputArea, { paddingBottom: 16 }]}>
              <TextInput
                style={styles.input}
                placeholder="Talk to Merlin..."
                placeholderTextColor={theme.colors.textSecondary}
                value={message}
                onChangeText={setMessage}
                onSubmitEditing={handleSendMessage}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !message.trim() && styles.sendButtonDisabled,
                ]}
                disabled={!message.trim()}
                onPress={handleSendMessage}
              >
                <AntDesign
                  name="arrow-up"
                  size={20}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      case "board":
        return (
          <ScrollView
            style={styles.scrollContent}
            contentContainerStyle={styles.scrollContainer}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor={theme.colors.primary}
              />
            }
          >
            <BossBoard bosses={bosses} isLoading={isBossesLoading} />
            <HabitBoard
              habits={habits}
              isLoading={isLoading}
              onAddHabit={() => {
                setEditingHabit(undefined);
                setIsFormVisible(true);
              }}
              onCheckIn={handleCheckIn}
              onEditHabit={(h) => {
                setEditingHabit(h);
                setIsFormVisible(true);
              }}
              onArchiveHabit={(id) =>
                habitApi.deleteHabit(id).then(fetchHabits)
              }
            />
            <QuestBoard
              quests={quests}
              isLoading={isQuestsLoading}
              onAddQuest={() =>
                questApi
                  .createQuest({ title: "New Adventure", xpReward: 100 })
                  .then(fetchQuests)
              }
              onCompleteQuest={handleCompleteQuest}
              onDeleteQuest={(id) => questApi.deleteQuest(id).then(fetchQuests)}
            />
          </ScrollView>
        );
      case "shop":
        return (
          <ScrollView
            style={styles.scrollContent}
            contentContainerStyle={styles.scrollContainer}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor={theme.colors.primary}
              />
            }
          >
            <ShopBoard
              items={shopItems}
              inventory={inventory}
              userGold={gold}
              onPurchase={handlePurchase}
              onEquip={handleEquip}
              isLoading={isShopLoading}
            />
          </ScrollView>
        );
      case "profile":
        const attributeList: Array<{
          label: string;
          value: number;
          icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
          color: string;
        }> = [
          {
            label: "Strength",
            value: attributes.strength,
            icon: "arm-flex",
            color: theme.colors.error,
          },
          {
            label: "Intelligence",
            value: attributes.intelligence,
            icon: "brain",
            color: theme.colors.primary,
          },
          {
            label: "Dexterity",
            value: attributes.dexterity,
            icon: "run-fast",
            color: theme.colors.secondary,
          },
          {
            label: "Spirit",
            value: attributes.spirit,
            icon: "auto-fix",
            color: theme.colors.success,
          },
        ];
        return (
          <ScrollView
            style={styles.scrollContent}
            contentContainerStyle={styles.profileContainer}
          >
            <View style={styles.characterHeader}>
              <View style={styles.avatarLarge}>
                <Text style={styles.avatarEmojiLarge}>🤠</Text>
              </View>
              <Text style={styles.usernameLarge}>Traveler</Text>
              <Text style={styles.rankLarge}>Novice Adventurer</Text>
            </View>
            <View style={styles.levelSection}>
              <LevelIndicator level={level} xp={xp} maxXp={1000} />
            </View>
            <Text style={styles.sectionTitle}>Attributes</Text>
            <View style={styles.attributesGrid}>
              {attributeList.map((attr, i) => (
                <Card key={i} style={styles.attributeCard}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: attr.color + "22" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={attr.icon}
                      size={24}
                      color={attr.color}
                    />
                  </View>
                  <Text style={styles.attributeLabel}>{attr.label}</Text>
                  <Text style={[styles.attributeValue, { color: attr.color }]}>
                    {attr.value}
                  </Text>
                </Card>
              ))}
            </View>
            <TouchableOpacity
              style={styles.logoutTabButton}
              onPress={async () => {
                await removeToken();
                setToken(null);
              }}
            >
              <AntDesign name="logout" size={18} color={theme.colors.error} />
              <Text style={styles.logoutTabText}>Log Out</Text>
            </TouchableOpacity>
          </ScrollView>
        );
    }
  };

  return (
    <AdaptiveLayout
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      onLogout={async () => {
        await removeToken();
        setToken(null);
      }}
      onViewProfile={() => {
        setIsSidebarOpen(false);
        setActiveTab("profile");
      }}
      username="Traveler"
      rank="Novice Adventurer"
      level={level}
      xp={xp}
      maxXp={1000}
      streak={streak}
      questsCompleted={questsCompletedCount}
    >
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {activeTab === "chat"
                ? "Merlin"
                : activeTab === "board"
                  ? "Quests"
                  : activeTab === "shop"
                    ? "Shop"
                    : "Character"}
            </Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.trophyButton}
                onPress={() => setIsAchievementsVisible(true)}
              >
                <Ionicons name="trophy" size={18} color={theme.colors.accent} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.avatarTrigger}
                onPress={() => setIsSidebarOpen(true)}
              >
                <Text style={styles.avatarEmoji}>🤠</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.mainArea}>{renderTabContent()}</View>

          <View
            style={[
              styles.tabBar,
              { paddingBottom: Math.max(insets.bottom, 8) },
            ]}
          >
            {(
              [
                { id: "chat", icon: "chat", label: "Merlin" },
                { id: "board", icon: "sword-cross", label: "Board" },
                { id: "shop", icon: "store", label: "Shop" },
                { id: "profile", icon: "account", label: "Profile" },
              ] as const
            ).map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={styles.tabItem}
                onPress={() => setActiveTab(tab.id as TabType)}
              >
                <MaterialCommunityIcons
                  name={tab.icon}
                  size={26}
                  color={
                    activeTab === tab.id
                      ? theme.colors.primary
                      : theme.colors.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.tabLabel,
                    activeTab === tab.id && styles.activeTabLabel,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </KeyboardAvoidingView>

        <HabitForm
          isVisible={isFormVisible}
          onClose={() => setIsFormVisible(false)}
          onSubmit={handleFormSubmit}
          initialData={editingHabit}
          bosses={bosses}
          isSubmitting={isSubmitting}
        />
        <AchievementsModal
          isVisible={isAchievementsVisible}
          onClose={() => setIsAchievementsVisible(false)}
          unlockedAchievements={unlockedAchievements}
        />
      </SafeAreaView>
    </AdaptiveLayout>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  container: { flex: 1 },
  mainArea: { flex: 1 },
  tabContainer: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h4,
    color: theme.colors.primary,
    letterSpacing: 1,
  },
  headerButtons: { flexDirection: "row", alignItems: "center" },
  trophyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.sm,
  },
  avatarTrigger: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEmoji: { fontSize: 18 },
  scrollContent: { flex: 1 },
  scrollContainer: { paddingBottom: theme.spacing.lg },
  inputArea: {
    flexDirection: "row",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.spacing.lg,
    color: theme.colors.text,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: { backgroundColor: theme.colors.border, opacity: 0.5 },
  tabBar: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.sm,
  },
  tabItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 2 },
  tabLabel: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: 10,
    color: theme.colors.textSecondary,
  },
  activeTabLabel: { color: theme.colors.primary },
  profileContainer: { paddingBottom: theme.spacing.xl },
  characterHeader: { alignItems: "center", marginVertical: theme.spacing.lg },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.surface,
    borderWidth: 3,
    borderColor: theme.colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  avatarEmojiLarge: { fontSize: 40 },
  usernameLarge: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h2,
    color: theme.colors.text,
  },
  rankLarge: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.accent,
    letterSpacing: 1,
  },
  levelSection: { marginBottom: theme.spacing.xl },
  sectionTitle: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h4,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  attributesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: theme.spacing.sm,
    justifyContent: "space-between",
  },
  attributeCard: {
    width: "47%",
    marginBottom: theme.spacing.md,
    alignItems: "center",
    padding: theme.spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  attributeLabel: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  attributeValue: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h3,
    marginTop: 2,
  },
  logoutTabButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.error,
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.error + "11",
  },
  logoutTabText: {
    fontFamily: theme.typography.fonts.bold,
    color: theme.colors.error,
  },
});
