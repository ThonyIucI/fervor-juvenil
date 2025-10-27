# Guía de Formateo

## Problema Resuelto

Había un conflicto entre Prettier y ESLint porque:
1. **eslint-plugin-prettier** ejecutaba Prettier dentro de ESLint
2. **@trivago/prettier-plugin-sort-imports** intentaba ordenar imports en Prettier
3. **eslint-plugin-simple-import-sort** ordenaba imports en ESLint

Esto causaba conflictos donde al guardar un archivo:
- Prettier ordenaba las importaciones de una forma
- ESLint las ordenaba de otra forma diferente
- El resultado era un ciclo infinito de errores

## Solución Implementada

### 1. Eliminamos el conflicto:
- ✅ Removimos `eslint-plugin-prettier` de ESLint
- ✅ Removimos `@trivago/prettier-plugin-sort-imports` de Prettier
- ✅ Solo usamos `eslint-plugin-simple-import-sort` para ordenar imports

### 2. Separamos responsabilidades:
- **Prettier**: Solo se encarga del formato (espacios, comillas, etc.)
- **ESLint**: Se encarga del ordenamiento de imports y reglas de código

### 3. Orden de ejecución en VSCode:
Cuando guardas un archivo en VSCode:
1. Primero ejecuta **Prettier** (formatea el código)
2. Luego ejecuta **ESLint --fix** (ordena imports y corrige reglas)

## Cómo Usar

### Al guardar en VSCode
Los archivos se formatean automáticamente gracias a `.vscode/settings.json`

### Desde la terminal

```bash
# Formatear todo el proyecto
npm run format:all

# Solo formatear con Prettier
npm run format

# Solo fix de ESLint
npm run lint:fix

# Ver errores sin corregir
npm run lint
```

### Orden correcto si lo haces manual
```bash
npm run format && npm run lint:fix
```

## Reglas de Importación

El orden de las importaciones es:
1. React y React DOM
2. Librerías externas (node_modules)
3. Imports internos (@common, @modules, etc.)
4. Imports relativos (../, ./)
5. CSS imports

Ejemplo:
```typescript
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@common/components/Button'

import { MyComponent } from './MyComponent'

import './styles.css'
```
