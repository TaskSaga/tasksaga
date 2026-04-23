# TaskSaga 🎮✨

**A habit tracker that turns your goals into an RPG adventure!**

TaskSaga gamifies your daily habits and goals, letting you level up, earn rewards, and conquer your personal quests like a true hero.

---

## 🛠️ Tech Stack

### Mobile App (Frontend)

- **Framework:** [Expo](https://expo.dev/) (React Native)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Navigation:** [React Navigation v7](https://reactnavigation.org/)
- **Styling:** React Native Stylesheets (with `expo-linear-gradient` for aesthetics)
- **Icons:** `@expo/vector-icons` (Ionicons, MaterialIcons)

### API (Backend)

- **Framework:** [NestJS](https://nestjs.com/) (Node.js)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Cache:** [Redis](https://redis.io/)
- **Authentication:** [Passport.js](https://www.passportjs.org/) (JWT, Google, Apple OAuth)
- **Validation:** `class-validator`, `class-transformer`

### Infrastructure

- **Containerization:** Docker (for PostgreSQL & Redis)
- **Environment Management:** `dotenv`

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- Docker & Docker Compose
- Expo Go app (on your mobile device) or an emulator

### 1. Clone the repository

```bash
git clone https://github.com/TaskSaga/tasksaga.git
cd tasksaga
```

### 2. Setup the Backend (API)

1. Navigate to the `api` directory:
   ```bash
   cd api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the infrastructure (Database & Redis):
   ```bash
   npm run db:dev:up
   ```
4. Setup environment variables:
   - Create a `.env` file based on `.env.example` (if available, otherwise check `src/main.ts` and `prisma.config.ts` for expected vars).
5. Run migrations:
   ```bash
   npx prisma migrate dev
   ```
6. Start the API in development mode:
   ```bash
   npm run start:dev
   ```

### 3. Setup the Mobile App

1. Navigate back to the root directory:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npm start
   ```

---

## 📂 Project Structure

```text
├── api/                # NestJS Backend
│   ├── prisma/         # Database schema and migrations
│   ├── src/            # API source code (Auth, User modules)
│   └── test/           # E2E tests
├── src/                # Mobile App (React Native)
│   ├── api/            # API client and service calls
│   ├── auth/           # Auth state and storage logic
│   ├── components/     # Reusable UI components (QuestCard, LevelIndicator)
│   ├── navigation/     # App routing logic
│   └── screens/        # Main application screens
├── assets/             # Images, fonts, and GIFs
└── App.tsx             # Main Entry Point
```

---

## ✨ Features

- **🛡️ Hero Profile:** Gain XP and level up as you complete tasks.
- **📜 Quest Management:** Track habits and daily tasks as RPG quests.
- **🔑 Secure Auth:** Multi-provider authentication (Email/Password, Google, Apple).
- **🎭 Mentor Guidance:** Get tips and feedback from your virtual mentor.
- **🎨 Visual Progress:** Beautiful indicators for levels, HP, and XP.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the **0BSD** License. See `package.json` for more information.

---

_Level up your habits. Play your life. ⚔️_
