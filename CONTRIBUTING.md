# Guía de Contribución - Fervor Juvenil

## Configuración del Entorno de Desarrollo

### Requisitos Previos
- Node.js 18+
- npm 9+
- Git

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd fervor-juvenil

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Estándares de Código

### Formateo y Linting

El proyecto utiliza **Prettier** para formateo de código y **ESLint** para linting.

#### Scripts Disponibles

```bash
# Formatear código automáticamente
npm run format

# Verificar formato sin modificar archivos
npm run format:check

# Ejecutar linter
npm run lint

# Corregir problemas de linting automáticamente
npm run lint:fix

# Formatear y lint en un solo comando
npm run format:all
```

#### Reglas de Formateo (Prettier)

- **Sin punto y coma** al final de líneas
- **Comillas simples** para strings
- **Espaciado**: 2 espacios
- **Ancho máximo de línea**: 100 caracteres
- **Sin comas finales** en objetos/arrays
- **Line ending**: LF (Unix)

#### Reglas de Linting (ESLint)

- Imports ordenados automáticamente por grupos
- Sin `console.log` (solo `console.warn` y `console.error`)
- Variables no utilizadas advertidas (excepto las que empiezan con `_`)
- Línea en blanco antes de cada `return`
- Espaciado consistente en objetos y arrays

### Auto-formateo en VSCode

El proyecto incluye configuración de VSCode (`.vscode/settings.json`) que:
- **Formatea automáticamente al guardar**
- **Ejecuta ESLint fix** al guardar
- Usa Prettier como formateador por defecto

Extensiones recomendadas:
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)

### Pre-commit Hooks

El proyecto usa **Husky** y **lint-staged** para ejecutar verificaciones antes de cada commit:

1. ESLint arregla problemas automáticamente
2. Prettier formatea los archivos
3. Solo se commitean archivos que pasen las validaciones

Si el pre-commit hook falla, revisa los errores y corrígelos antes de commitear.

## Estructura de Imports

Los imports deben seguir este orden (manejado automáticamente):

```typescript
// 1. React imports
import { useState } from 'react'
import { createRoot } from 'react-dom/client'

// 2. Librerías externas
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'

// 3. Imports con @ aliases
import { Button } from '@common/components/Button'
import { useDebounce } from '@common/hooks'

// 4. Imports relativos
import { UserService } from './services/user.service'
import type { User } from './types'

// 5. Estilos
import './styles.css'
```

## Convenciones de Nombres

### Archivos
- **Componentes**: `PascalCase.tsx` (ej: `Button.tsx`, `UserCard.tsx`)
- **Hooks**: `camelCase.ts` con prefijo `use` (ej: `useDebounce.ts`)
- **Servicios**: `camelCase.service.ts` (ej: `user.service.ts`)
- **Utilidades**: `camelCase.ts` (ej: `formatDate.ts`)
- **Tests**: `*.test.tsx` o `*.test.ts`

### Código
- **Variables y funciones**: `camelCase`
- **Componentes y clases**: `PascalCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Interfaces de tipos**: `PascalCase` con prefijo `I` opcional

## Testing

### Ejecutar Tests

```bash
# Watch mode (recomendado para desarrollo)
npm test

# Run once
npm run test:run

# Con UI
npm run test:ui

# Con coverage
npm run test:coverage
```

### Escribir Tests

Sigue el enfoque **TDD (Test-Driven Development)**:

1. Escribe el test primero (debe fallar)
2. Implementa el código mínimo para pasar el test
3. Refactoriza si es necesario
4. Repite

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@tests/utils/test-utils'
import { Button } from './Button'

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })
})
```

## Flujo de Trabajo con Git

### Branches

- `master`: Rama principal (protegida)
- `FJ-<número>-descripción`: Ramas de feature

Ejemplo: `FJ-42-add-user-authentication`

### Commits

Usa **Conventional Commits**:

```bash
feat(auth): add login functionality
fix(button): correct disabled state styling
test(hooks): add tests for useDebounce
refactor(api): improve error handling
docs(readme): update installation steps
```

Tipos de commits:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `test`: Añadir o modificar tests
- `refactor`: Refactorización (sin cambio de funcionalidad)
- `docs`: Documentación
- `style`: Cambios de estilo (formato, sin lógica)
- `chore`: Tareas de mantenimiento

### Pull Requests

1. Crea una rama desde `master`
2. Desarrolla tu feature/fix
3. Asegúrate de que todos los tests pasen
4. Asegúrate de que el linter no tenga errores
5. Crea un PR con descripción clara
6. Espera review del equipo

## Schemas y Validación

Usa **Zod** para toda validación de datos:

```typescript
import { z } from 'zod'
import { emailSchema, passwordSchema } from '@common/schemas/common.schema'

const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(2).max(50)
})

type User = z.infer<typeof userSchema>
```

## Servicios API

Extiende `BaseService` para operaciones CRUD:

```typescript
import { BaseService } from '@common/services/base.service'

class UserService extends BaseService<User> {
  constructor() {
    super('/users')
  }

  async getActiveUsers() {
    return this.customRequest<User[]>('get', '/users/active')
  }
}

export const userService = new UserService()
```

## Componentes UI

### Crear Componentes Reutilizables

```typescript
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@common/utils/cn'

export interface MyComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function MyComponent({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: MyComponentProps) {
  return (
    <button
      className={cn(
        'base-classes',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
}
```

## Path Aliases

Usa los aliases configurados para imports limpios:

- `@/` → `./src/`
- `@common/` → `./src/@common/`
- `@modules/` → `./src/modules/`
- `@config/` → `./src/config/`
- `@tests/` → `./src/tests/`

## Problemas Comunes

### El pre-commit hook falla

```bash
# Revisa qué está fallando
npm run lint

# Intenta arreglar automáticamente
npm run format:all

# Si persiste, revisa los errores específicos
```

### Tests no pasan

```bash
# Ejecuta tests en modo watch para ver errores
npm test

# Verifica que los imports sean correctos
# Asegúrate de usar @tests/utils/test-utils para render
```

### TypeScript errors

```bash
# Verifica tipos
npx tsc --noEmit

# Asegúrate de que los tipos estén bien definidos
# Evita usar 'any' a menos que sea absolutamente necesario
```

## Recursos

- [Documentación de React](https://react.dev)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [Zod](https://zod.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Prettier](https://prettier.io)
- [ESLint](https://eslint.org)

## Contacto

Para preguntas o sugerencias, contacta al equipo de desarrollo.
