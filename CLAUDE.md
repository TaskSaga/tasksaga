# Agent Instructions

This file contains repository-specific instructions for AI agents.

## Core Mandates

- Follow the guidelines in `GEMINI.md`.
- Prioritize type safety in all TypeScript files (Frontend and Backend).
- Ensure all new features are accompanied by unit or integration tests.
- Maintain strict folder boundaries between `src/` (mobile) and `api/` (backend).

## Working Patterns

- **React Native (Frontend)**: Follow the existing component structure in `src/components`. Use functional components with hooks.
- **NestJS (Backend)**: Adhere to the existing modular structure (`auth`, `habit`, `prisma`). Use dependency injection as per NestJS patterns.
- **Testing**:
  - Frontend: Use standard Jest setups found in `package.json`.
  - Backend: Run `npm test` or `npm run test:e2e` inside the `api/` directory.

## Communication

- Use `update_topic` for any multi-step task to ensure continuity.
- Be concise. Avoid conversational fillers.
