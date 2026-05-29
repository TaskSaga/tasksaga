# Project Context & Conventions

## Architecture

- **Monorepo Structure**: The project is a monorepo containing a React Native app (`/`) and a NestJS API (`/api`).
- **Shared Code**: Common types and utilities are managed in `/packages/common`.

## Tech Stack

- **Frontend**: React Native, TypeScript, Expo.
- **Backend**: NestJS, PostgreSQL (Prisma), TypeScript.

## Development Workflows

- **Validation**: Every change must be verified with tests. Run relevant test suites (`npm test` in the root or `/api`) before submitting changes.
- **Standards**: Adhere to ESLint configurations in the root and `/api`.
- **Commit Messages**: Follow conventional commits (e.g., `feat: ...`, `fix: ...`, `chore: ...`).

## Agent Guidance

- **Task Management**: Always use `update_topic` to signal phase changes in complex tasks.
- **Validation**: Never assume code works. Run tests after any modification.
- **Frontend Testing**: Run frontend unit tests using `npm test`. New components should have accompanying `*.spec.tsx` tests in the same directory.
- **File Hierarchy**: Maintain separation between mobile frontend and backend services.
