# Cómo Trabajar Conmigo - Guía de Usuario

## 🚀 Inicio Rápido

Para desarrollar una nueva feature, simplemente usa este comando:

```
Implementa FJ-[número]: [nombre-breve]
PR: feature/FJ-[número]-descripcion-breve

[Opcional: Adjuntar screenshot/mockup del diseño]
```

**Ejemplo**:
```
Implementa FJ-1: Sistema de Notificaciones
PR: feature/FJ-1-toast-system

Adjunto screenshot del diseño de los toasts.
```

¡Y yo me encargo del resto! 🎯

---

## 📋 Lo Que Yo Haré Automáticamente

Cuando me des una historia de usuario, yo:

### 1. **Preparación** ⚙️
- ✅ Crear la branch con el nombre correcto
- ✅ Leer la historia de usuario en `requirements.md`
- ✅ Analizar criterios de aceptación
- ✅ Si hay diseño, analizarlo pixel por pixel
- ✅ Planificar la arquitectura técnica

### 2. **Desarrollo TDD** 🔴🟢🔵
- ✅ **RED**: Escribir todos los tests PRIMERO (deben fallar)
- ✅ **GREEN**: Implementar el código para pasar los tests
- ✅ **REFACTOR**: Mejorar la calidad del código
- ✅ Hacer commits en cada fase con mensajes descriptivos

### 3. **Quality Assurance** ✨
- ✅ Verificar que todos los tests pasen
- ✅ Asegurar >80% de test coverage
- ✅ Ejecutar linting y arreglar errores
- ✅ Verificar que TypeScript compile sin errores
- ✅ Testing manual siguiendo checklist

### 4. **Finalización** 🏁
- ✅ Actualizar documentación si es necesario
- ✅ Marcar la historia como completada en requirements.md
- ✅ Push de la branch
- ✅ Darte un resumen completo con métricas

---

## 🎯 Casos de Uso Comunes

### Caso 1: Feature con Diseño

```
Implementa FJ-3: Lista de Usuarios
PR: feature/FJ-3-user-list

Adjunto screenshot de la tabla de usuarios en modo desktop y mobile.
```

**Yo haré**:
1. Analizar el screenshot para extraer colores, espaciado, fuentes
2. Identificar componentes reutilizables vs nuevos
3. Escribir tests para la funcionalidad
4. Implementar UI pixel-perfect según el diseño
5. Asegurar responsive design (mobile + desktop)
6. Verificar accesibilidad

---

### Caso 2: Feature sin Diseño

```
Implementa FJ-2: Sistema de Modals
PR: feature/FJ-2-modal-system
```

**Yo haré**:
1. Usar el design system existente del proyecto
2. Crear componentes siguiendo los patrones establecidos
3. Asegurar consistencia visual con el resto de la app
4. Implementar con TDD completo

---

### Caso 3: Bug Fix

```
Fix: El botón de eliminar no muestra confirmación
Issue: FJ-6
```

**Yo haré**:
1. Reproducir el bug
2. Escribir test que demuestre el bug
3. Arreglar el código
4. Verificar que el test pase
5. Agregar tests adicionales para prevenir regresión

---

### Caso 4: Optimización

```
Optimiza: La lista de usuarios es lenta con 1000+ items
```

**Yo haré**:
1. Analizar el problema de performance
2. Implementar virtualización o paginación
3. Medir mejora con métricas
4. Asegurar que tests pasen
5. Documentar la optimización

---

## 🎨 Sobre los Diseños (UI/UX)

### Si Tienes Diseño
Comparte:
- Screenshots de Figma/Sketch
- Mockups
- Fotos de papel (si es sketch rápido)
- Referencias de otras apps

**Yo extraeré automáticamente**:
- Colores (hex codes)
- Espaciado (padding, margins, gaps)
- Tipografía (tamaños, pesos, line heights)
- Bordes y sombras
- Estados (hover, active, disabled)
- Comportamiento responsive

### Si No Tienes Diseño
No problem! Yo:
- Usaré el design system existente
- Mantendré consistencia con componentes actuales
- Aplicaré mejores prácticas de UI/UX
- Haré componentes responsive automáticamente

---

## 📊 Lo Que Recibirás al Final

Cuando termine una feature, te daré un reporte como este:

```
✅ Feature completada: FJ-1 Sistema de Notificaciones

📦 Branch: feature/FJ-1-toast-system
📝 Commits: 8 commits siguiendo convenciones
✅ Tests: 23 tests passing (91% coverage)
🎨 Components: Toast, ToastProvider, useToast hook
📏 Linting: 0 errors
🔨 Build: Success
📱 Responsive: ✅ Mobile + Desktop

Archivos creados/modificados:
- src/@common/components/Toast/Toast.tsx
- src/@common/components/Toast/Toast.test.tsx
- src/@common/components/Toast/ToastProvider.tsx
- src/@common/hooks/useToast.ts
- src/@common/services/http.service.ts (integración)

Listo para crear PR con título:
feat(toast): implement toast notification system

Descripción sugerida:
Implements FJ-1: Sistema de Notificaciones (Toast)

Features:
- Toast component with 4 variants (success, error, warning, info)
- ToastProvider with Zustand for state management
- Auto-dismiss after 5 seconds
- Manual dismiss with X button
- Stacking support (max 5 toasts)
- Integration with HttpService for automatic error toasts
- Animations (fade in/out)

Tests: ✅ 23 tests, 91% coverage
```

**Tu única tarea**: Crear el PR en GitHub! 🎉

---

## 🤝 Cómo Colaborar Durante el Desarrollo

### Me Puedes Interrumpir Para:

**Cambiar dirección**:
```
"Espera, en lugar de botones con iconos, usa solo texto"
```

**Agregar requisitos**:
```
"También necesito que muestre un contador de toasts activos"
```

**Cuestionar decisiones**:
```
"¿Por qué usaste Zustand en lugar de Context?"
```

**Pedir ajustes visuales**:
```
"Los toasts deberían estar en la esquina inferior derecha, no superior"
```

**Revisar progreso**:
```
"¿Cómo vas con FJ-1?"
```

### Yo Te Preguntaré Si:

- Hay ambigüedad en los requisitos
- Necesito decidir entre opciones técnicas igualmente válidas
- El diseño no está claro
- Hay conflicto con features existentes
- Encuentro un problema que afecta otras partes

**Siempre serás consultado antes de decisiones grandes!**

---

## 🔧 Comandos Especiales

### Ver Progreso
```
¿Cómo va el proyecto?
```
Te daré un reporte de:
- Features completadas vs pendientes
- Test coverage general
- Deuda técnica identificada
- Próximos pasos recomendados

### Cambiar Historia
```
Pausa FJ-1, implementa FJ-5 primero
PR: feature/FJ-5-edit-user
```

### Code Review
```
Revisa el código de [componente/función]
```
Te daré:
- Puntos fuertes
- Áreas de mejora
- Sugerencias de optimización
- Problemas de seguridad/accesibilidad

### Ayuda con Error
```
Tengo este error: [error message]
```
Te ayudaré a:
- Entender el error
- Identificar la causa
- Proponer solución
- Implementar el fix

---

## 📁 Estructura del Proyecto (Para Tu Referencia)

```
/
├── requirements.md              ← HISTORIAS DE USUARIO (TÚ LEES AQUÍ)
├── PROJECT_PLAN.md             ← Plan completo del proyecto
├── CLAUDE.md                   ← Docs para instancias de Claude
│
├── .claude/
│   ├── agents/                 ← Agentes especializados
│   │   ├── frontend-senior.md      (Sonnet - Arquitectura)
│   │   ├── frontend-mid.md         (Haiku - Features)
│   │   ├── qa-tester.md            (Haiku - Testing)
│   │   ├── ui-implementer.md       (Haiku - UI/UX)
│   │   └── react-expert.md         (Sonnet - Experto React)
│   │
│   ├── WORKFLOW.md             ← Flujo de trabajo detallado
│   ├── COMMIT_CONVENTIONS.md   ← Convenciones de commits
│   ├── FORMATTING_GUIDE.md     ← Guía de formateo
│   └── HOW_TO_WORK_WITH_ME.md  ← ESTE ARCHIVO
│
└── src/                        ← Código fuente
```

---

## 🎓 Para Aprender Más

- **WORKFLOW.md**: Flujo completo paso a paso (detallado técnico)
- **COMMIT_CONVENTIONS.md**: Cómo escribir buenos commits
- **PROJECT_PLAN.md**: Plan completo con timelines y recursos
- **requirements.md**: Todas las historias de usuario

---

## ⚠️ Reglas Importantes

### DO ✅
- Siempre especificar número FJ y nombre de PR
- Adjuntar diseños cuando los tengas
- Ser específico sobre lo que quieres
- Interrumpir si algo no te gusta
- Pedir explicaciones si algo no es claro

### DON'T ❌
- No pidas "implementa todo requirements.md" (muy grande)
- No des instrucciones vagas como "mejora el código"
- No esperes a que termine para dar feedback (interrúmpeme!)
- No asumas que sé qué diseño quieres sin verlo
- No omitas el número FJ y nombre de PR

---

## 🚦 Estados de Historias en requirements.md

- 📝 **TODO**: No iniciada
- 🚧 **IN PROGRESS**: En desarrollo
- ✅ **DONE**: Completada
- 🔄 **BLOCKED**: Bloqueada

Yo actualizo estos estados automáticamente.

---

## 💡 Tips Pro

### Desarrollo Incremental
En lugar de:
```
Implementa todo el CRUD de usuarios
```

Mejor:
```
Implementa FJ-3: Lista de Usuarios (solo lectura)
```
Luego:
```
Implementa FJ-4: Crear Usuario
```

**Beneficios**:
- PRs más pequeños y fáciles de revisar
- Feedback más rápido
- Menos riesgo de conflictos
- Deploy incremental

### Iteración en Diseño
```
Implementa FJ-1 básico primero

[Revisas el resultado]

"Ajusta los colores del toast success a verde más brillante"
"Aumenta el padding de los toasts"
```

### Priorización
```
Necesito urgente FJ-8 para demo de mañana
```
Yo ajustaré prioridades y lo haré primero.

---

## 🤖 Sobre los Agentes

Yo gestiono 5 agentes especializados:

1. **frontend-senior** (Sonnet) - El arquitecto
2. **frontend-mid** (Haiku) - El implementador
3. **qa-tester** (Haiku) - El guardian de calidad
4. **ui-implementer** (Haiku) - El diseñador visual
5. **react-expert** (Sonnet) - El experto en React

**Tú no necesitas conocerlos**, yo los orquesto automáticamente.

Pero si quieres ser específico:
```
"Usa el react-expert para esto, parece complejo"
```

---

## 📞 ¿Preguntas?

Pregúntame cualquier cosa:
- "¿Cómo funciona el sistema de toasts?"
- "¿Por qué tomaste esta decisión arquitectónica?"
- "¿Cuál es la mejor forma de hacer X?"
- "¿Qué patrón debería usar aquí?"

**Estoy aquí para ayudarte a construir software de calidad! 💪**

---

## 🎯 Empecemos!

Todo listo! Para comenzar, solo dime:

```
Implementa FJ-[número]: [nombre]
PR: feature/FJ-[número]-descripcion

[Diseño si tienes]
```

**¡Y arranquemos a desarrollar! 🚀**
