# Convenciones de Commits - TDD Workflow

## Formato de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/) con extensiones específicas para TDD.

### Estructura Base
```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[nota de pie opcional]
```

## Tipos de Commit

### Commits TDD (PRINCIPALES)
```bash
# 🔴 RED Phase - Tests que fallan
test(feature): add failing tests for user creation

# 🟢 GREEN Phase - Implementación que pasa tests
feat(feature): implement user creation to pass tests

# 🔵 REFACTOR Phase - Mejora sin cambiar comportamiento
refactor(feature): extract validation logic to utility
```

### Otros Tipos
```bash
# Nueva funcionalidad
feat(users): add user deletion

# Corrección de bug
fix(auth): correct token expiration validation

# Cambios en documentación
docs(readme): update installation steps

# Cambios de estilo/formato (no afectan código)
style(button): improve button hover states

# Cambios en build o dependencias
chore(deps): update react to 19.1.0

# Mejoras de performance
perf(list): implement virtual scrolling

# Cambios en tests
test(hooks): add tests for useDebounce

# Cambios en CI/CD
ci(github): add automated deployment
```

## Alcances Comunes

```bash
# Por módulo
(auth)
(users)
(dashboard)
(admin)

# Por tipo de componente
(components)
(hooks)
(services)
(utils)

# Por componente específico
(button)
(input)
(modal)
(toast)

# General
(app)
(config)
(types)
```

## Ejemplos por Fase TDD

### FASE 1: RED - Tests Failing

#### User Story: FJ-1 Sistema de Notificaciones

```bash
# Commit 1: Tests básicos del componente Toast
git commit -m "test(toast): add failing tests for Toast component

- Should render with message
- Should auto-close after delay
- Should render correct variant colors
- Should be dismissible with close button"

# Commit 2: Tests del ToastProvider
git commit -m "test(toast): add failing tests for ToastProvider

- Should show toast when showToast is called
- Should handle multiple toasts (stacking)
- Should remove toast after auto-dismiss delay
- Should remove toast on manual dismiss"
```

### FASE 2: GREEN - Implementation

```bash
# Commit 3: Implementar Toast component básico
git commit -m "feat(toast): implement Toast component to pass tests

- Add Toast component with variants
- Implement auto-dismiss with setTimeout
- Add close button functionality
- Add fade in/out animations"

# Commit 4: Implementar ToastProvider
git commit -m "feat(toast): implement ToastProvider to pass tests

- Create toast context with Zustand
- Implement showToast function
- Handle toast stacking (max 5)
- Implement auto-dismiss timer"
```

### FASE 3: REFACTOR - Improvement

```bash
# Commit 5: Mejorar código y tipos
git commit -m "refactor(toast): improve types and extract constants

- Extract TOAST_DURATION constant
- Add proper TypeScript types
- Extract useToast hook from context
- Improve animation timing"

# Commit 6: Optimizar renderizado
git commit -m "refactor(toast): optimize rendering with React.memo

- Memoize Toast component
- Optimize context provider value
- Add display name for debugging"
```

### FASE 4: Integration

```bash
# Commit 7: Integrar con HttpService
git commit -m "feat(toast): integrate with HttpService for error handling

- Show toast on HTTP errors automatically
- Show toast on success responses
- Add configuration to disable auto-toast per request"
```

## Convenciones de Mensaje

### Descripción (primera línea)
- Usar imperativo ("add" no "added" o "adds")
- No capitalizar la primera letra
- Sin punto al final
- Máximo 72 caracteres

```bash
# ✅ Correcto
feat(auth): add login functionality

# ❌ Incorrecto
Feat(Auth): Added login functionality.
```

### Cuerpo (opcional)
- Separar de la descripción con una línea en blanco
- Explicar QUÉ y POR QUÉ (no CÓMO)
- Usar viñetas para múltiples cambios

```bash
git commit -m "feat(users): add user search with filters

- Implement search bar with debounce
- Add filters by role and status
- Update URL with query params
- Show empty state when no results"
```

### Breaking Changes
```bash
feat(api)!: change user endpoint response structure

BREAKING CHANGE: User endpoint now returns paginated data instead of array.
Migration: Update UserService.getAll() to handle pagination.
```

## Workflow Completo de Ejemplo

### Historia: FJ-3 Lista de Usuarios

```bash
# Crear branch
git checkout -b feature/FJ-3-user-list

# === RED PHASE ===
# 1. Tests de componente
git add src/modules/users/components/UserList.test.tsx
git commit -m "test(users): add failing tests for UserList component

- Should render loading state initially
- Should render user table when loaded
- Should render empty state when no users
- Should render error state on failure"

# 2. Tests de interacción
git add src/modules/users/components/UserList.test.tsx
git commit -m "test(users): add failing interaction tests for UserList

- Should call loadUsers on mount
- Should retry loading on error button click
- Should navigate to user detail on row click"

# === GREEN PHASE ===
# 3. Implementación básica
git add src/modules/users/components/UserList.tsx
git commit -m "feat(users): implement UserList to pass tests

- Add UserList component with table
- Implement loading/error/empty states
- Add UserService integration
- Handle user list fetch"

# 4. Agregar estilos
git add src/modules/users/components/UserList.tsx
git commit -m "feat(users): add styling to UserList

- Style table with hover states
- Add responsive layout (cards on mobile)
- Add skeleton loaders
- Style empty state"

# === REFACTOR PHASE ===
# 5. Extraer componentes
git add src/modules/users/components/UserTable.tsx
git add src/modules/users/components/UserTableRow.tsx
git add src/modules/users/components/UserList.tsx
git commit -m "refactor(users): extract UserTable and UserTableRow

- Extract table logic to UserTable component
- Extract row logic to UserTableRow component
- Improve component composition"

# 6. Mejorar hooks
git add src/modules/users/hooks/useUsers.ts
git add src/modules/users/components/UserList.tsx
git commit -m "refactor(users): extract data fetching to useUsers hook

- Create useUsers custom hook
- Move loading/error/data state to hook
- Simplify UserList component"

# === FINAL ===
# 7. Actualizar documentación
git add src/modules/users/README.md
git commit -m "docs(users): add UserList component documentation

- Add usage examples
- Document props and types
- Add screenshots"

# Push branch
git push origin feature/FJ-3-user-list
```

## Mensajes de Merge/Squash

Cuando crees el PR, el mensaje de squash debe resumir la feature:

```bash
feat(users): implement user list with table view (#3)

Implements FJ-3: Lista de Usuarios con Tabla

Features:
- User table with loading/error/empty states
- Responsive layout (cards on mobile)
- Integration with UserService
- Custom useUsers hook for data fetching

Tests: ✅ All tests passing (23 tests, 94% coverage)
```

## Commits de Fix Post-Review

```bash
# Después de code review
fix(users): address PR review comments

- Fix TypeScript type errors in UserTable
- Add missing ARIA labels for accessibility
- Improve loading skeleton animation
- Handle edge case when user has no email
```

## Reglas de Oro

1. **Un commit = Una unidad lógica de cambio**
   - No mezcles refactor con features
   - No mezcles diferentes features

2. **Tests siempre primero (TDD)**
   - RED → GREEN → REFACTOR
   - Tests deben fallar antes de implementar

3. **Commits frecuentes**
   - Commitea después de cada fase (red, green, refactor)
   - Es mejor muchos commits pequeños que pocos grandes

4. **Mensajes descriptivos**
   - El código muestra CÓMO, el commit muestra POR QUÉ
   - Alguien que lea el historial debe entender el cambio

5. **Atomic commits**
   - Cada commit debe dejar el código en estado funcional
   - Los tests deben pasar después de cada commit (excepto RED phase)

## Comandos Útiles

```bash
# Ver últimos commits
git log --oneline --graph --decorate -10

# Ver cambios en un commit
git show <commit-hash>

# Modificar último commit (mensaje)
git commit --amend -m "new message"

# Modificar último commit (agregar archivos)
git add forgotten-file
git commit --amend --no-edit

# Ver historial de un archivo
git log --follow -- path/to/file

# Buscar en mensajes de commit
git log --grep="toast"

# Ver estadísticas de commits
git shortlog -sn --since="1 month ago"
```

## Pre-commit Checklist

Antes de cada commit, verifica:

- [ ] Tests pasan (si es GREEN/REFACTOR phase)
- [ ] No hay linting errors
- [ ] No hay TypeScript errors
- [ ] Archivos staged son los correctos
- [ ] Mensaje de commit sigue convenciones
- [ ] Commit está en la branch correcta

Los pre-commit hooks de Husky verificarán automáticamente algunos de estos puntos.
