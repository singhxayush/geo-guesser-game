# AGENTS.md

## Project Overview

This repository contains a multiplayer Geo Guessing platform.

The stack is intentionally constrained and standardized.

Agents must follow architecture conventions strictly.

---

# Core Stack

Frontend:

- Next.js App Router
- TypeScript
- Tailwind
- shadcn/ui
- TanStack Query
- Zustand

Backend:

- Hono
- Drizzle ORM
- Neon PostgreSQL
- Redis
- Socket.IO

Auth:

- Better Auth
- Google OAuth

---

# UI Rules

- Use ONLY shadcn/ui components
- Do NOT create custom UI primitives unless absolutely necessary
- Prefer composition over abstraction
- Keep UI minimal and clean
- Do not introduce additional component libraries
- Do not add animation libraries unless explicitly requested

---

# Architecture Rules

- Feature-first folder organization
- Shared types live in packages/shared
- Database logic lives in packages/db
- API contracts must be typed
- Websocket contracts must be typed
- Use zod validation everywhere
- No business logic inside UI components
- Keep server and client boundaries explicit

---

# Frontend Rules

- Use App Router patterns correctly
- Prefer Server Components
- Use Client Components only when required
- Use TanStack Query for async client state
- Use Zustand only for ephemeral UI/game state
- Keep components small and composable

---

# Backend Rules

- Hono routes must remain modular
- Use service-layer architecture
- Validate all input using zod
- Keep websocket event handlers isolated
- Redis should manage:
  - room state
  - matchmaking
  - presence
  - timers
  - transient multiplayer state

Persistent data belongs in PostgreSQL.

---

# Multiplayer Rules

Realtime synchronization must support:

- lobby presence
- ready states
- synchronized timers
- synchronized rounds
- score updates
- reconnect handling
- room ownership
- room destruction
- player disconnect recovery

All websocket events must be centralized and typed.

---

# Database Rules

Drizzle ORM only.

Tables:

- users
- sessions
- quiz_questions
- map_locations
- matches
- match_players
- rooms
- room_players
- leaderboard_entries

Use proper indexing and relations.

---

# Code Quality Rules

- Avoid premature abstractions
- Avoid deeply nested components
- Avoid giant files
- Prefer explicit code over magic
- Maintain strict typing
- No any types
- No dead code
- No duplicated business logic

---

# Styling Rules

- Tailwind only
- Use shadcn design tokens
- Dark mode compatible
- Minimal modern UI
- Dashboard-first UX

---

# Performance Rules

- Minimize client bundle size
- Use streaming where useful
- Use server rendering by default
- Lazy load heavy map/game features
- Optimize websocket payloads

---

# Security Rules

- Validate all inputs
- Protect websocket events
- Never trust client state
- Secure auth flows
- Use rate limiting where appropriate

---

# Preferred Patterns

GOOD:

- explicit services
- typed contracts
- isolated game engines
- reusable hooks
- clean folder boundaries

BAD:

- giant global stores
- random utility dumping
- overabstracted hooks
- mixing UI and business logic
- custom component systems

---

# Primary Goal

Maintain a scalable production-grade multiplayer game architecture while keeping implementation simple, maintainable, and strongly typed.
