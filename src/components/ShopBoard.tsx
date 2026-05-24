import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { theme } from "../theme";
import Card from "./Card";
import Button from "./Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ShopBoardProps } from "./types/ShopBoard.types";

export default function ShopBoard({
  items,
  inventory,
  userGold,
  onPurchase,
  onEquip,
  isLoading,
}: ShopBoardProps) {
  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={styles.loader}
      />
    );
  }

  const isOwned = (itemId: number) =>
    inventory.some((ui) => ui.itemId === itemId);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Marketplace</Text>
        <View style={styles.goldContainer}>
          <MaterialCommunityIcons
            name="piggy-bank"
            size={20}
            color={theme.colors.accent}
          />
          <Text style={styles.goldText}>{userGold} Gold</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {items.map((item) => (
          <Card key={item.id} style={styles.itemCard}>
            <View style={styles.itemIcon}>
              <MaterialCommunityIcons
                name={
                  item.type === "WEAPON"
                    ? "sword"
                    : item.type === "HEAD"
                      ? "hat-fedora"
                      : "tshirt-crew"
                }
                size={40}
                color={theme.colors.primary}
              />
            </View>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price} Gold</Text>

            {isOwned(item.id) ? (
              <Text style={styles.ownedText}>Owned</Text>
            ) : (
              <Button
                title="Buy"
                onPress={() => onPurchase(item.id)}
                disabled={userGold < item.price}
                style={styles.buyButton}
              />
            )}
          </Card>
        ))}
      </ScrollView>

      <Text style={styles.subtitle}>Your Inventory</Text>
      <View style={styles.inventoryGrid}>
        {inventory.map((ui) => (
          <TouchableOpacity
            key={ui.id}
            style={[styles.inventoryItem, ui.isEquipped && styles.equippedItem]}
            onPress={() => onEquip(ui.id)}
          >
            <MaterialCommunityIcons
              name={
                ui.item.type === "WEAPON"
                  ? "sword"
                  : ui.item.type === "HEAD"
                    ? "hat-fedora"
                    : "tshirt-crew"
              }
              size={24}
              color={ui.isEquipped ? theme.colors.white : theme.colors.primary}
            />
            {ui.isEquipped && (
              <View style={styles.checkCircle}>
                <MaterialCommunityIcons
                  name="check"
                  size={10}
                  color={theme.colors.success}
                />
              </View>
            )}
          </TouchableOpacity>
        ))}
        {inventory.length === 0 && (
          <Text style={styles.emptyText}>Empty inventory</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: theme.spacing.md },
  loader: { marginVertical: theme.spacing.xl },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  title: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h4,
    color: theme.colors.text,
  },
  goldContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  goldText: {
    fontFamily: theme.typography.fonts.bold,
    color: theme.colors.accent,
    marginLeft: 6,
  },
  scroll: { marginBottom: theme.spacing.lg },
  itemCard: {
    width: 150,
    marginRight: theme.spacing.md,
    alignItems: "center",
    padding: theme.spacing.md,
  },
  itemIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  itemName: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: 14,
    color: theme.colors.text,
    textAlign: "center",
  },
  itemPrice: {
    fontFamily: theme.typography.fonts.regular,
    fontSize: 12,
    color: theme.colors.accent,
    marginBottom: theme.spacing.sm,
  },
  ownedText: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: 12,
    color: theme.colors.success,
  },
  buyButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    minHeight: 36,
  },
  subtitle: {
    fontFamily: theme.typography.fonts.bold,
    fontSize: theme.typography.sizes.h5,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  inventoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  inventoryItem: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  equippedItem: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkCircle: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textSecondary,
    fontStyle: "italic",
  },
});
