<h1 align="center">
  Done Done
</h1>

<p align="center">A sleek and simple todo list app</p>

---

## Backend and Database Setup

For backend and database setup please refer to [BACKEND.md](https://github.com/nirnejak/done-done/blob/master/BACKEND.md)

---

## Tech Stack

1. **React and Next.js** - Frontend
2. **Next.js API Route** - for Backend APIs
3. **TailwindCSS** - Styling
4. **Motion (prev Framer Motion)** - For animation and interactions
5. **use-sound** - for adding sound effects
6. **Vitest** - Testing
7. **PostgreSQL** - Deployed on NeonDB, Migrated from MySQL
8. **Drizzle ORM**

---

## Environment Setup

Please create an `.env` file from `.env.example`, add NeonDB database connection URL and JWT secret.

## Available Scripts

**Install Dependencies**

> This project uses the new text based lockfile from Bun 1.2, using an older version of bun won't work.

```bash
bun install
```

**Setup Pre-commit**

```bash
bun run prepare
```

**Start Development Server**

```bash
bun run dev
```

**Run tests**

> be careful to not run `bun test` instead, which runs bun's own test suite

```bash
bun run test
```

**Lint all the files**

```bash
bun run lint
```

**Format all files with Prettier**

```bash
bun run format
```

**Check TypeScript issues**

```bash
bun run type-check
```

**Build for Production**

```bash
bun run build
```

**Start Production Server**

```bash
bun start
```

---
