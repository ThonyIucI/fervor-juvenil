# Arquitectura del Proyecto - Fervor Juvenil

## Estructura de Carpetas

```
src/
├── @common/                      # Código compartido y reutilizable
│   ├── components/               # Componentes UI reutilizables
│   │   ├── Button/              # Componente Button con variantes
│   │   ├── Input/               # Componente Input con validación
│   │   ├── Loader/              # Componente Loader con tamaños
│   │   └── ...
│   ├── hooks/                    # Custom hooks reutilizables
│   │   ├── useBoolean.ts        # Hook para manejar booleanos
│   │   ├── useDebounce.ts       # Hook para debouncing
│   │   ├── useLocalStorage.ts   # Hook para localStorage
│   │   ├── useAsync.ts          # Hook para async operations
│   │   └── ...
│   ├── services/                 # Servicios compartidos
│   │   ├── http.service.ts      # Servicio HTTP con interceptors
│   │   └── base.service.ts      # Servicio base con CRUD
│   ├── schemas/                  # Schemas de validación Zod
│   │   └── common.schema.ts     # Schemas comunes reutilizables
│   ├── types/                    # TypeScript types
│   │   ├── api/                 # Tipos relacionados con API
│   │   └── ...
│   ├── constants/               # Constantes globales
│   │   └── index.ts             # HTTP status, storage keys, etc.
│   └── utils/                   # Utilidades
│       ├── cn/                  # className utility (tailwind-merge)
│       └── store/               # Estado global (Zustand)
├── modules/                     # Módulos de funcionalidad
│   ├── auth/                    # Módulo de autenticación
│   │   ├── components/         # Componentes específicos del módulo
│   │   ├── hooks/              # Hooks específicos del módulo
│   │   ├── schemas/            # Schemas de validación del módulo
│   │   ├── services/           # Servicios API del módulo
│   │   ├── types/              # Tipos del módulo
│   │   ├── routes/             # Rutas del módulo
│   │   └── views/              # Páginas del módulo
│   └── users/                   # Módulo de usuarios
│       └── ...
├── config/                      # Configuración
│   └── api/                     # Configuración de API (legacy)
├── layouts/                     # Layouts de la aplicación
│   └── MainLayout/
├── routes/                      # Configuración de rutas
│   └── PrivateRoutes.tsx
├── tests/                       # Tests
│   ├── unit/                   # Tests unitarios
│   │   ├── components/         # Tests de componentes
│   │   └── hooks/              # Tests de hooks
│   ├── integration/            # Tests de integración
│   ├── e2e/                    # Tests end-to-end
│   ├── mocks/                  # Mocks para tests
│   ├── fixtures/               # Datos de prueba
│   ├── utils/                  # Utilidades para tests
│   │   └── test-utils.tsx      # Custom render con providers
│   └── setup.ts                # Configuración global de tests
└── App.tsx                      # Componente raíz

```

## Convenciones de Código

### Nombres de Archivos
- Componentes: `PascalCase.tsx` (ej: `Button.tsx`, `UserProfile.tsx`)
- Hooks: `camelCase.ts` con prefijo `use` (ej: `useDebounce.ts`)
- Servicios: `camelCase.service.ts` (ej: `http.service.ts`)
- Schemas: `camelCase.schema.ts` (ej: `auth.schema.ts`)
- Tests: `*.test.tsx` o `*.test.ts`

### Estructura de Componentes
```typescript
// Import order (enforced by ESLint)
// 1. React imports
import { useState } from 'react'

// 2. External libraries
import { useForm } from 'react-hook-form'

// 3. Internal imports with @ aliases
import { Button } from '@common/components/Button'
import { useDebounce } from '@common/hooks'

// 4. Relative imports
import { UserService } from './services/user.service'

// 5. Types
import type { User } from './types'
```

### Path Aliases
```typescript
@/            -> ./src/
@common/      -> ./src/@common/
@modules/     -> ./src/modules/
@config/      -> ./src/config/
@tests/       -> ./src/tests/
```

## Servicios y API

### HttpService
Servicio centralizado para peticiones HTTP con:
- Interceptors para autenticación
- Manejo de errores global
- Timeout configurado
- Type-safe responses

```typescript
import { httpService } from '@common/services/http.service'

// GET request
const response = await httpService.get<User>('/users/1')
const user = response.data.data

// POST request
const response = await httpService.post<User>('/users', userData)
```

### BaseService
Clase base para servicios específicos con operaciones CRUD:

```typescript
import { BaseService } from '@common/services/base.service'

class UserService extends BaseService<User> {
  constructor() {
    super('/users')
  }

  // Custom methods
  async getActiveUsers() {
    return this.customRequest<User[]>('get', '/users/active')
  }
}

export const userService = new UserService()
```

## Validación con Zod

### Schemas Reutilizables
```typescript
import { z } from 'zod'
import { emailSchema, passwordSchema } from '@common/schemas/common.schema'

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

type LoginInput = z.infer<typeof loginSchema>
```

### Uso con React Hook Form
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from './schemas/auth.schema'

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema)
})
```

## Testing

### Configuración
- **Framework**: Vitest
- **Testing Library**: React Testing Library
- **Environment**: Happy DOM
- **Coverage**: v8

### Comandos
```bash
npm run test           # Watch mode
npm run test:run       # Run once
npm run test:ui        # UI mode
npm run test:coverage  # With coverage report
```

### Estructura de Tests
```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@tests/utils/test-utils'
import { Button } from '@common/components/Button'

describe('Button Component', () => {
  it('should render button with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click</Button>)
    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalled()
  })
})
```

## Componentes UI

### Button
Componente Button con múltiples variantes y tamaños:
```typescript
<Button variant="primary" size="md" isLoading={loading}>
  Submit
</Button>
```

Variantes: `primary`, `secondary`, `outline`, `ghost`, `danger`
Tamaños: `sm`, `md`, `lg`

### Input
Componente Input con label, error handling e iconos:
```typescript
<Input
  label="Email"
  register={register('email')}
  error={errors.email?.message}
  type="email"
  leftIcon={<MailIcon />}
/>
```

### Loader
Componente Loader con diferentes tamaños y variantes:
```typescript
<Loader size="md" variant="primary" text="Loading..." />
```

## Hooks Personalizados

### useDebounce
Debounce de valores con delay configurable:
```typescript
const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 500)

useEffect(() => {
  // API call with debouncedSearch
}, [debouncedSearch])
```

### useLocalStorage
Manejo de localStorage con React state:
```typescript
const [user, setUser, removeUser] = useLocalStorage('user', null)
```

### useAsync
Manejo de operaciones asíncronas con estados:
```typescript
const [state, execute] = useAsync(fetchUser, false)

useEffect(() => {
  execute(userId)
}, [userId])

if (state.isLoading) return <Loader />
if (state.isError) return <Error message={state.error.message} />
return <div>{state.data}</div>
```

### useClickOutside
Detectar clicks fuera de un componente:
```typescript
const ref = useClickOutside(() => setIsOpen(false))
return <div ref={ref}>...</div>
```

## Constantes

Constantes globales organizadas por categoría:
- `HTTP_STATUS`: Códigos HTTP
- `STORAGE_KEYS`: Claves de localStorage
- `DEBOUNCE_TIME`: Tiempos de debounce
- `ANIMATION_DURATION`: Duraciones de animaciones
- `VALIDATION_MESSAGES`: Mensajes de validación
- `FILE_UPLOAD`: Configuración de uploads
- `BREAKPOINTS`: Breakpoints de Tailwind

## Mejores Prácticas

1. **Componentes**: Mantener componentes pequeños y enfocados en una sola responsabilidad
2. **Hooks**: Extraer lógica reutilizable en custom hooks
3. **Tests**: Escribir tests para componentes y hooks críticos
4. **Types**: Usar TypeScript para todo, evitar `any`
5. **Validación**: Usar Zod para validación de formularios y datos de API
6. **Servicios**: Un servicio por entidad, extender BaseService
7. **Constantes**: Usar constantes para valores mágicos
8. **Imports**: Usar path aliases para imports limpios

## Flujo de Desarrollo TDD

1. Escribir test que falla
2. Implementar código mínimo para pasar el test
3. Refactorizar si es necesario
4. Repetir

## Deploy en Vercel

El proyecto está configurado para deployment en Vercel con:
- SPA routing configurado en `vercel.json`
- Build optimizado con Vite
- Sourcemaps deshabilitados en producción
