# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fervor Juvenil is a React + TypeScript + Vite application using TailwindCSS for styling, React Router for navigation, Zustand for state management, and Zod for validation. The project follows a modular architecture with a focus on reusability and type safety.

## Essential Commands

### Development
```bash
npm run dev          # Start dev server (default port 3000)
npm run start        # Alternative: dev server on port 3000
npm run build        # TypeScript check + production build
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run format:all   # Format with Prettier + ESLint fix (RECOMMENDED)
npm run format       # Format with Prettier only
npm run lint         # Check for linting errors
npm run lint:fix     # Auto-fix linting errors
```

**IMPORTANT**: Always run `npm run format:all` (not just `format` or `lint:fix` individually). This ensures correct order: Prettier first, then ESLint. See `.claude/FORMATTING_GUIDE.md` for details.

### Testing
```bash
npm test             # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Open Vitest UI
npm run test:coverage # Run with coverage report
```

## Architecture Overview

### Module-Based Structure

The codebase uses a **module-based architecture** where each feature domain is self-contained:

```
src/
├── @common/          # Shared utilities, components, hooks, services
├── modules/          # Feature modules (auth, users, etc.)
│   └── [module]/
│       ├── components/   # Module-specific components
│       ├── hooks/        # Module-specific hooks
│       ├── services/     # API services for this module
│       ├── schemas/      # Zod validation schemas
│       ├── types/        # TypeScript types
│       ├── routes/       # Route constants
│       └── views/        # Page components
├── layouts/          # Layout wrappers
├── routes/           # Route configuration
└── state/            # Global Zustand stores
```

**Key principle**: Each module should be relatively independent. Cross-module dependencies should go through `@common` or be explicitly imported.

### Path Aliases

The project uses these aliases (configured in `vite.config.ts` and `tsconfig`):

- `@/` → `./src/`
- `@common/` → `./src/@common/`
- `@modules/` → `./src/modules/`
- `@config/` → `./src/config/`
- `@tests/` → `./src/tests/`

Always use path aliases for cleaner imports.

### Import Order (Auto-enforced)

ESLint automatically sorts imports in this order:
1. React and React DOM
2. External libraries (node_modules)
3. Internal imports with `@` aliases
4. Relative imports (`./` or `../`)
5. CSS imports

Example:
```typescript
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@common/components/Button'

import { UserService } from './services/user.service'
import type { User } from './types'
```

## Critical Patterns

### HTTP Service & API Communication

**All API calls must go through the centralized `HttpService`**:

```typescript
import { httpService } from '@common/services/http.service'

// Direct usage
const response = await httpService.get<User>('/users/1')
const user = response.data.data

// Or extend BaseService for CRUD operations
import { BaseService } from '@common/services/base.service'

class UserService extends BaseService<User> {
  constructor() {
    super('/users')  // Base endpoint
  }

  // Inherits: getAll, getById, create, update, patch, delete

  // Add custom methods
  async getActiveUsers() {
    return this.customRequest<User[]>('get', '/users/active')
  }
}
```

The `HttpService` includes:
- Automatic Bearer token injection from localStorage
- Global error handling (401 → logout, 403/500 → logging)
- Type-safe responses with `ApiResponse<T>` wrapper

### State Management with Zustand

Global state lives in `src/state/` and uses Zustand with persistence:

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserState = create<IUserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user })
    }),
    { name: 'user' }  // localStorage key
  )
)
```

**Authentication pattern**: The app uses `useUserState` to persist user info and checks it in `PrivateRoute` to protect routes.

### Form Validation with Zod + React Hook Form

All forms use Zod schemas for validation:

```typescript
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Reuse common schemas from @common/schemas/common.schema.ts
import { emailSchema, passwordSchema } from '@common/schemas/common.schema'

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

type LoginInputs = z.infer<typeof loginSchema>

// In component
const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
  resolver: zodResolver(loginSchema)
})
```

### Routing Pattern

Routes are protected via `PrivateRoute` wrapper that:
1. Checks if user exists in `useUserState`
2. Redirects to login if not authenticated
3. Wraps authenticated pages in `MainLayout`

```typescript
// Route constants live in each module
export const AUTH_ROUTES = {
  LOGIN: '/login'
}

// App.tsx uses these constants
<Route path={AUTH_ROUTES.LOGIN} element={<LoginForm />} />
```

## UI Component Guidelines

### Using the Design System

The project has a consistent design system with pre-built components in `@common/components/`:

**Button**: 5 variants (primary, secondary, outline, ghost, danger) × 3 sizes (sm, md, lg)
```typescript
<Button variant="primary" size="md" isLoading={loading} leftIcon={<Icon />}>
  Submit
</Button>
```

**Input**: Supports labels, errors, icons, and integrates with react-hook-form
```typescript
<Input
  label="Email"
  register={register('email')}
  error={errors.email?.message}
  leftIcon={<MailIcon />}
/>
```

**Card**: 3 variants (default, outlined, elevated)
```typescript
<Card variant="elevated">Content</Card>
```

### Styling with Tailwind

Use the `cn()` utility for conditional classes:

```typescript
import { cn } from '@common/utils/cn'

<div className={cn(
  'base-classes',
  condition && 'conditional-classes',
  className  // Allow external overrides
)} />
```

## Testing Patterns

### Test File Location
- Unit tests: `src/tests/unit/[category]/[name].test.tsx`
- Use `@tests/utils/test-utils` for rendering (includes providers like BrowserRouter)

### Example Test
```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@tests/utils/test-utils'

describe('Button Component', () => {
  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn()
    const { user } = render(<Button onClick={handleClick}>Click</Button>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

## TypeScript Conventions

### Type Imports
Use `import type` for type-only imports (required by `verbatimModuleSyntax`):

```typescript
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import type { AxiosResponse } from 'axios'
import { useState } from 'react'  // Value import
```

### Avoid `any`
Never use `any`. Use `unknown` for truly unknown types, then narrow with type guards.

### Interface Naming
Interfaces can optionally use `I` prefix (e.g., `IUser`, `IUserState`) but it's not enforced. Be consistent within a module.

### NO Barrel Exports
**IMPORTANT**: Do NOT create barrel export files (index.ts/index.tsx that re-export from other files). This is considered a bad practice.

Instead of:
```typescript
// ❌ Bad: src/@common/components/Toast/index.ts
export { Toast } from './Toast'
export { ToastContainer } from './ToastContainer'
```

Use direct imports:
```typescript
// ✅ Good: Import directly from source files
import { Toast } from '@common/components/Toast/Toast'
import { ToastContainer } from '@common/components/Toast/ToastContainer'
```

**Why?**: Barrel exports hurt tree-shaking, create circular dependency risks, make debugging harder, and increase bundle size.

### Always Use Route Constants
**IMPORTANT**: Never hardcode route strings in components or hooks. Always define them as constants.

Instead of:
```typescript
// ❌ Bad: Hardcoded route string
navigate('/profile')
```

Use route constants:
```typescript
// ✅ Good: Use constants defined in routes/index.ts
import { USERS_ROUTES } from '@modules/users/routes'
navigate(USERS_ROUTES.PROFILE)
```

**Why?**:
- Single source of truth for all routes
- Easy refactoring (change in one place)
- Autocomplete and type safety
- Prevents typos
- Better discoverability of available routes

## Common Hooks in @common/hooks

- **useDebounce**: Debounce values (e.g., search inputs)
- **useBoolean**: Toggle boolean state with `open`, `close`, `toggle` methods
- **useLocalStorage**: Sync state with localStorage
- **useAsync**: Handle async operations with loading/error/success states
- **useClickOutside**: Detect clicks outside an element (useful for modals/dropdowns)
- **useMediaQueryScreen**: Responsive breakpoint detection

Example:
```typescript
import { useDebounce } from '@common/hooks'

const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 500)

useEffect(() => {
  // API call with debouncedSearch
}, [debouncedSearch])
```

## File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Hooks**: `camelCase.ts` with `use` prefix (e.g., `useDebounce.ts`)
- **Services**: `camelCase.service.ts` (e.g., `user.service.ts`)
- **Schemas**: `camelCase.schema.ts` (e.g., `auth.schema.ts`)
- **Tests**: `[name].test.tsx` or `[name].test.ts`

## Git Workflow

- Branch naming: `FJ-<number>-description` (e.g., `FJ-42-add-user-auth`)
- Commit format: Conventional Commits (`feat:`, `fix:`, `test:`, `refactor:`, `docs:`, `style:`, `chore:`)
- Pre-commit hooks run ESLint + Prettier automatically via Husky

## Known Issues & Gotchas

### Formatting Conflicts
**Problem**: Prettier and ESLint used to conflict on import ordering, causing infinite error loops.

**Solution**: Prettier now handles only formatting (spaces, quotes), ESLint handles import ordering. Always run `npm run format:all` which does both in the correct order. See `.claude/FORMATTING_GUIDE.md`.

### TypeScript Strict Mode
`verbatimModuleSyntax` is enabled, requiring `import type` for types. This prevents runtime imports of type-only dependencies.

### MainLayout Structure
The `MainLayout` uses `flex h-screen overflow-hidden` with a fixed header. The main content area has `flex-1 overflow-auto` to enable scrolling while keeping the header fixed.

## Environment & Configuration

- **Node Version**: 18+
- **Package Manager**: npm
- **Dev Port**: 3000 (via `npm start` or `npm run dev`)
- **Build Tool**: Vite with SWC for React Fast Refresh
- **Test Runner**: Vitest with Happy DOM
- **Styling**: TailwindCSS v4 (via Vite plugin)

## Key Dependencies

- **axios**: HTTP client (wrapped in HttpService)
- **react-hook-form**: Form handling
- **react-router-dom**: Routing
- **zustand**: State management
- **zod**: Schema validation
- **lucide-react**: Icon library
- **clsx + tailwind-merge**: Conditional class utility (via `cn()`)

---

## Development Workflow

This project follows a **Test-Driven Development (TDD)** methodology with specialized agents for different roles.

### Quick Start for New Features

To implement a user story:
```
Implementa FJ-[número]: [nombre-breve]
PR: feature/FJ-[número]-descripcion-breve
```

### TDD Cycle

Every feature follows this cycle:
1. **🔴 RED**: Write failing tests first
2. **🟢 GREEN**: Implement code to pass tests
3. **🔵 REFACTOR**: Improve code quality

See [WORKFLOW.md](./.claude/WORKFLOW.md) for complete development workflow.

### Specialized Agents

The project uses specialized agents for different tasks:
- **frontend-senior** (Sonnet): Complex architecture, performance, tech leadership
- **frontend-mid** (Haiku): Standard features, CRUD, forms
- **qa-tester** (Haiku): Test strategy, E2E tests, coverage analysis
- **ui-implementer** (Haiku): Pixel-perfect UI from designs
- **react-expert** (Sonnet): Advanced React patterns, performance optimization

### User Stories

All user stories are tracked in [requirements.md](./requirements.md) with detailed acceptance criteria.

### Commit Conventions

Follow Conventional Commits with TDD-specific types:
```bash
test(feature): add failing tests for [feature]    # RED phase
feat(feature): implement [feature] to pass tests  # GREEN phase
refactor(feature): improve [specific aspect]      # REFACTOR phase
```

See [COMMIT_CONVENTIONS.md](./.claude/COMMIT_CONVENTIONS.md) for complete guidelines.
