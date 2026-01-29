# AGENTS.md

Guidelines and commands for agentic coding agents working in this Done Done repository.

## Development Commands

### Core Commands

- `bun run dev` - Start development server (http://localhost:3000)
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Run ESLint with automatic fixes
- `bun run format` - Format with Prettier (includes Tailwind sorting)
- `bun run format:check` - Check if files are formatted correctly
- `bun run type-check` - Run TypeScript type checking

### Testing Commands (Vitest)

- `bun run test` - Run all tests
- `bun run test -- __tests__/page.test.tsx` - Run single test file
- `bun run test -- --watch` - Run tests in watch mode
- `bun run test -- --coverage` - Run tests with coverage

### Database Commands (Drizzle ORM)

- `bun run db:generate` - Generate migrations from schema changes
- `bun run db:migrate` - Run pending migrations
- `bun run db:push` - Push schema changes directly to database (development only)
- `bun run db:studio` - Open Drizzle Studio for database management

## Code Style Guidelines

### File Structure

```
app/                    # Next.js App Router (pages, API routes, layouts)
├── api/                # API routes (auth, todo)
├── page.tsx            # Home page
├── layout.tsx          # Root layout with fonts and providers
└── main.css            # Global CSS with Tailwind v4
components/             # React components
├── atoms/              # Basic UI components (Modal)
├── TaskList.tsx        # Task list component
├── TaskRow.tsx         # Individual task row
├── AddTask.tsx         # Add task form
├── EditModal.tsx       # Edit task modal
├── DeleteModal.tsx     # Delete confirmation modal
├── ExpandModal.tsx     # Task detail modal
├── AuthForm.tsx        # Authentication form
├── Tasks.tsx           # Tasks container
└── ThemeToggle.tsx     # Theme toggle button
hooks/                  # Custom React hooks
├── useTheme.tsx
├── useModal.tsx
├── useClickOutside.tsx
└── useDynamicHeight.tsx
context/                # React context providers
├── AuthContext.tsx
utils/                  # Utility functions
├── classNames.ts       # CSS class merging
├── animation.ts        # Animation constants
├── datetime.ts         # Date/time utilities
├── auth.ts             # Auth helpers
├── metadata.ts         # SEO metadata
└── schema.tsx          # JSON-LD schema tags
db/                     # Database schema and connection
├── schema.ts           # Drizzle schema definitions
└── index.ts            # Database connection
__tests__/              # Test files
├── page.test.tsx
└── tasks.test.tsx
```

### Import Patterns

```typescript
import * as React from "react"
import { motion } from "motion/react"
import classNames from "@/utils/classNames"
import { db } from "@/db"
```

- Use `import * as React from "react"` (namespace imports)
- Use absolute imports with `@/` prefix for internal files
- Group imports: React → external libraries → internal modules
- Use type-only imports (`import type { Viewport } from "next"`)

### Component Patterns

```typescript
interface Props {
  title: string
  children: React.ReactNode
  closeModal: () => void
}

const Modal: React.FC<Props> = ({ title, children, closeModal }) => {
  return (
    // Component JSX
  )
}

export default Modal
```

- Use functional components with `React.FC<Props>`
- Export interface as `Props`, component as default export
- Use `classNames` utility for conditional styling
- Add `"use client"` directive for client components

### Naming Conventions

- **Components**: PascalCase (`Modal`, `TaskList`)
- **Hooks**: camelCase with `use` prefix (`useTheme`)
- **Variables**: camelCase (`closeModal`)
- **Constants**: UPPER_SNAKE_CASE (`BASE_TRANSITION`)
- **Types**: PascalCase (`Props`)
- **Files**: PascalCase for components, camelCase for utilities
- **Database**: snake_case for table/column names

### TypeScript Guidelines

- Strict mode enabled (`strict: true`, `strictNullChecks: true`)
- Use `interface` for object shapes and component props
- Use path mapping with `@/*` for absolute imports

### Database Patterns

```typescript
export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  isCompleted: boolean("is_completed").default(false),
})
```

- Schema-first with Drizzle ORM and Neon PostgreSQL
- Use foreign keys with proper references

### API Route Error Handling

```typescript
const errorHandler = (error: any, defaultMessage: string) => {
  if (error instanceof jwt.JsonWebTokenError) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 })
  }
  return NextResponse.json({ error: defaultMessage }, { status: 500 })
}
```

- Use try-catch blocks in API routes
- Return `NextResponse.json()` with proper status codes
- Use `console.log(error)` for debugging
- Handle JWT errors with 401 status

### Styling Guidelines

- Tailwind CSS v4 with `@theme` directives in `app/main.css`
- Use `dark:` prefix for dark mode variants
- Use custom Tailwind classes (e.g., `shadow-heavy`, `backdrop-blur-xs`)
- Include `antialiased` for text quality

## Quality Assurance

Always run before completing work:

- `bun run lint` - No ESLint errors
- `bun run type-check` - TypeScript passes
- `bun run format` - Code formatting consistent
- `bun run build` - Production build succeeds

## Project Features

- Next.js 16+ with App Router, React 19
- Drizzle ORM with PostgreSQL (Neon)
- JWT authentication
- Tailwind CSS v4 with custom animations
- Framer Motion for animations
- Vitest for testing
- Bun package manager
- Husky pre-commit hooks
