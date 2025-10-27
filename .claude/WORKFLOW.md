# Flujo de Trabajo Completo - TDD con Agentes

## Cómo Trabajaremos

Este documento describe el flujo de trabajo exacto que seguiremos para implementar cada historia de usuario usando Test-Driven Development (TDD) con agentes especializados.

---

## Comando de Inicio

Para iniciar el desarrollo de una historia de usuario, usarás este formato:

```
Implementa FJ-[número]: [nombre-breve]
PR: feature/FJ-[número]-descripcion-breve

[Opcional: Si hay diseño]
Adjunto screenshot/mockup del diseño a replicar.
```

**Ejemplo**:
```
Implementa FJ-1: Sistema de Notificaciones
PR: feature/FJ-1-toast-system

Adjunto screenshot del diseño de los toasts.
```

---

## Flujo Completo Paso a Paso

### FASE 0: Preparación (Claude gestiona)

#### 1. Crear Branch
```bash
git checkout -b feature/FJ-[número]-descripcion-breve
```

#### 2. Leer Historia de Usuario
- Abrir `requirements.md`
- Leer la historia FJ-[número] completa
- Entender criterios de aceptación
- Identificar dependencias

#### 3. Análisis de Diseño (si aplica)
Si proporcionas screenshot/mockup:
- **Agente**: `ui-implementer`
- Analizar diseño visualmente
- Identificar componentes necesarios
- Extraer design tokens (colores, espaciado, tipografía)
- Identificar componentes reutilizables vs nuevos

#### 4. Planificar Implementación
- **Agente**: `frontend-senior`
- Definir arquitectura de componentes
- Identificar tests necesarios
- Listar archivos a crear/modificar
- Definir orden de implementación

---

### FASE 1: 🔴 RED - Tests Failing

#### 5. Escribir Tests (Primero los tests!)
- **Agentes**:
  - `frontend-senior` (arquitectura de tests)
  - `frontend-mid` (implementación de tests básicos)

**Proceso**:
1. Crear archivos de test
2. Escribir test cases basados en criterios de aceptación
3. Escribir tests para casos borde
4. Verificar que tests FALLEN (deben fallar porque no hay código)

**Estructura de Tests**:
```typescript
describe('ComponentName', () => {
  describe('Rendering', () => {
    // Tests de renderizado
  })

  describe('Interactions', () => {
    // Tests de interacciones de usuario
  })

  describe('Edge Cases', () => {
    // Tests de casos borde
  })
})
```

**Commit**:
```bash
git add <test-files>
git commit -m "test(feature): add failing tests for [feature-name]

- Test case 1
- Test case 2
- Test case 3"
```

#### 6. Verificar Tests Fallen
```bash
npm test
# Debe mostrar tests FAILING (en rojo)
```

---

### FASE 2: 🟢 GREEN - Make Tests Pass

#### 7. Implementar Código Mínimo
- **Agentes**:
  - `frontend-senior` (features complejas, arquitectura)
  - `frontend-mid` (features estándar)
  - `ui-implementer` (si hay diseño a replicar)
  - `react-expert` (si hay problemas complejos de React)

**Proceso**:
1. Implementar código MÍNIMO para pasar tests
2. No preocuparse por perfección todavía
3. Enfocarse en hacer que tests pasen

**Si hay diseño**:
- **Agente**: `ui-implementer`
- Replicar diseño pixel-perfect
- Usar componentes existentes de `@common/components`
- Crear nuevos componentes si es necesario
- Asegurar responsive design

**Commit(s)**:
```bash
git add <implementation-files>
git commit -m "feat(feature): implement [feature-name] to pass tests

- Implementation detail 1
- Implementation detail 2
- Integration with existing services"
```

#### 8. Verificar Tests Pasen
```bash
npm test
# Todos los tests deben PASAR (en verde) ✅
```

---

### FASE 3: 🔵 REFACTOR - Improve Code

#### 9. Refactorizar y Mejorar
- **Agente**: `frontend-senior`

**Mejoras comunes**:
- Extraer componentes reutilizables
- Mejorar nombres de variables/funciones
- Extraer lógica a custom hooks
- Optimizar performance (memo, useMemo, useCallback)
- Mejorar tipos de TypeScript
- Agregar comentarios en código complejo

**Commit(s)**:
```bash
git add <refactored-files>
git commit -m "refactor(feature): [specific improvement]

- What was improved
- Why it's better"

# Ejemplos:
# "refactor(toast): extract useToast hook from context"
# "refactor(users): optimize re-renders with React.memo"
# "refactor(form): improve validation error messages"
```

#### 10. Verificar Tests Siguen Pasando
```bash
npm test
# Todos los tests deben seguir PASANDO ✅
```

---

### FASE 4: Quality Gates

#### 11. Linting y Type Checking
```bash
npm run format:all  # Prettier + ESLint
npm run build       # TypeScript check
```

#### 12. Verificar Coverage
```bash
npm run test:coverage
```

**Agente**: `qa-tester`
- Verificar coverage >80%
- Identificar gaps de cobertura
- Sugerir tests adicionales si es necesario

Si coverage es bajo:
```bash
# Agregar más tests
git add <additional-tests>
git commit -m "test(feature): increase test coverage to 85%

- Add missing edge case tests
- Add error path tests"
```

#### 13. Manual Testing (QA)
**Agente**: `qa-tester`

Verificar manualmente:
- [ ] Feature funciona como se espera
- [ ] Loading states se muestran correctamente
- [ ] Error states se muestran correctamente
- [ ] Empty states se muestran correctamente
- [ ] Responsive en mobile
- [ ] Keyboard navigation funciona
- [ ] Accesible (screen reader friendly)

Si hay bugs:
```bash
git add <bug-fixes>
git commit -m "fix(feature): correct [specific issue]

- What was fixed
- How it was fixed"
```

#### 14. E2E Tests (si aplica)
**Agente**: `qa-tester`

Para features críticas, agregar E2E test:
```bash
git add tests/e2e/*.spec.ts
git commit -m "test(feature): add E2E tests for [feature]

- Test critical user flow
- Test integration with other features"
```

---

### FASE 5: Finalización

#### 15. Actualizar Documentación
```bash
# Si es componente nuevo, agregar a README
git add src/modules/[module]/README.md
git commit -m "docs([module]): document [component] usage"
```

#### 16. Marcar Historia como Completada
Actualizar `requirements.md`:
```diff
- ### FJ-1: Sistema de Notificaciones 📝
+ ### FJ-1: Sistema de Notificaciones ✅
```

```bash
git add requirements.md
git commit -m "docs(requirements): mark FJ-1 as completed"
```

#### 17. Push Branch
```bash
git push origin feature/FJ-[número]-descripcion
```

#### 18. Notificar al Usuario
Claude responde:
```
✅ Feature completada: FJ-[número]

Branch: feature/FJ-[número]-descripcion
Commits: [número] commits
Tests: ✅ [número] tests passing (XX% coverage)
Linting: ✅ No errors
Build: ✅ Success

Listo para crear PR. Por favor crea el Pull Request en GitHub con este título:
feat(module): implement [feature-name]

Y en la descripción incluye:
- Implements FJ-[número]: [feature-name]
- Screenshot/demo (si aplica)
- Test coverage report
```

---

## Agentes y Sus Roles

### 🔵 frontend-senior (Sonnet)
**Cuándo usar**:
- Arquitectura de features complejas
- Decisiones técnicas importantes
- Code reviews
- Performance optimization
- Fase RED y REFACTOR principalmente

**No usar para**:
- Features simples y estándar
- UI implementation básica

---

### 🟢 frontend-mid (Haiku)
**Cuándo usar**:
- Implementación de features estándar
- CRUD básico
- Formularios con validación
- Listas y tablas simples
- Fase GREEN principalmente

**No usar para**:
- Arquitectura compleja
- Optimizaciones avanzadas

---

### 🟡 qa-tester (Haiku)
**Cuándo usar**:
- Test planning
- E2E tests
- Coverage analysis
- Bug detection
- Manual testing checklist

**Usar en**:
- Fase RED (planning tests)
- Fase 4 (Quality Gates)

---

### 🟣 ui-implementer (Haiku)
**Cuándo usar**:
- Tienes screenshot/mockup/diseño
- Necesitas pixel-perfect implementation
- Responsive layout complejo
- Matching de colores y estilos

**Usar cuando**:
- Usuario proporciona diseño visual
- Fase GREEN (implementation)

---

### 🔷 react-expert (Sonnet)
**Cuándo usar**:
- Patrones avanzados de React
- Performance bottlenecks
- State management complejo
- Arquitectura de componentes complejos

**No usar para**:
- Componentes simples
- Problemas que frontend-senior puede resolver

---

## Gestión de Múltiples Agentes

Claude (tú) gestionas todos los agentes como un **Tech Lead**:

1. Lees la historia de usuario
2. Decides qué agentes necesitas
3. Orquestas el trabajo entre ellos
4. Aseguras calidad en cada fase
5. Resuelves conflictos o problemas
6. Reportas progreso al usuario

---

## Ejemplo Completo: FJ-1 Toast System

```
Usuario: "Implementa FJ-1: Sistema de Notificaciones
         PR: feature/FJ-1-toast-system
         Adjunto screenshot del diseño."

Claude (Tech Lead):
  1. ✅ Crear branch feature/FJ-1-toast-system
  2. 📖 Leer historia FJ-1 en requirements.md
  3. 🎨 [ui-implementer] Analizar screenshot de toasts
  4. 🏗️ [frontend-senior] Planificar arquitectura
     → Toast component
     → ToastProvider con Zustand
     → Hook useToast
     → Integration con HttpService

  === RED PHASE ===
  5. 🔴 [frontend-senior] Escribir tests para Toast component
     → git commit "test(toast): add failing tests for Toast"
  6. 🔴 [frontend-mid] Escribir tests para ToastProvider
     → git commit "test(toast): add failing tests for ToastProvider"
  7. ✅ Verificar tests fallen

  === GREEN PHASE ===
  8. 🟢 [ui-implementer] Implementar Toast component con diseño
     → git commit "feat(toast): implement Toast component"
  9. 🟢 [frontend-senior] Implementar ToastProvider
     → git commit "feat(toast): implement ToastProvider"
  10. 🟢 [frontend-mid] Integrar con HttpService
      → git commit "feat(toast): integrate with HttpService"
  11. ✅ Verificar tests pasen

  === REFACTOR PHASE ===
  12. 🔵 [frontend-senior] Extraer useToast hook
      → git commit "refactor(toast): extract useToast hook"
  13. 🔵 [frontend-senior] Optimizar con React.memo
      → git commit "refactor(toast): optimize rendering"
  14. ✅ Verificar tests siguen pasando

  === QUALITY GATES ===
  15. ✅ [qa-tester] Verificar coverage (91% ✅)
  16. ✅ Linting (0 errors)
  17. ✅ Build (success)
  18. 🧪 [qa-tester] Manual testing checklist
  19. 📝 Actualizar requirements.md
  20. 🚀 Push branch

Claude responde al usuario:
"✅ FJ-1 completado
Branch: feature/FJ-1-toast-system
8 commits, 23 tests passing, 91% coverage
Listo para PR!"
```

---

## Comandos Rápidos de Referencia

```bash
# Iniciar feature
git checkout -b feature/FJ-[N]-descripcion

# Durante desarrollo
npm test                    # Correr tests
npm run test:coverage       # Ver coverage
npm run lint                # Ver linting errors
npm run format:all          # Format + lint fix
npm run build               # TypeScript check

# Antes de push
npm run format:all && npm test && npm run build

# Push
git push origin feature/FJ-[N]-descripcion
```

---

## Troubleshooting

### Tests no pasan
1. Lee el error cuidadosamente
2. Verifica que implementación coincide con test
3. Consulta con `frontend-senior` si es complejo

### Linting errors
```bash
npm run format:all  # Auto-fix la mayoría
```

### TypeScript errors
1. Lee el error
2. Verifica tipos correctos
3. Usa `import type` para types
4. Consulta con `frontend-senior` si es complejo

### Coverage bajo
1. `qa-tester` identifica gaps
2. Agregar tests para código no cubierto
3. Enfocarse en lógica crítica primero

---

## Reglas de Oro

1. **SIEMPRE TDD**: RED → GREEN → REFACTOR
2. **Tests primero**: Nunca escribas código antes de tests
3. **Commits frecuentes**: Después de cada fase
4. **Un agente a la vez**: No mezcles responsabilidades
5. **Quality gates**: No saltarse verificaciones
6. **Comunicación clara**: Reportar progreso y problemas
7. **Ask when stuck**: No perder más de 15 min en un problema

---

**¡Ahora estás listo para desarrollar con TDD profesional! 🚀**
