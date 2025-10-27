# Requirements - Historias de Usuario

## Estado de Historias

- 📝 **TODO**: No iniciada
- 🚧 **IN PROGRESS**: En desarrollo
- ✅ **DONE**: Completada
- 🔄 **BLOCKED**: Bloqueada

---

## FASE 1: Funcionalidad Core

### FJ-1: Sistema de Notificaciones (Toast) 📝
**Como** usuario del sistema
**Quiero** recibir notificaciones visuales de éxito, error, advertencia e información
**Para** saber el resultado de mis acciones sin interrumpir mi flujo de trabajo

**Criterios de Aceptación**:
- [ ] El sistema muestra toasts en la esquina superior derecha
- [ ] Existen 4 variantes: success (verde), error (rojo), warning (amarillo), info (azul)
- [ ] Los toasts se auto-cierran después de 5 segundos (configurable)
- [ ] Los toasts se pueden cerrar manualmente con un botón X
- [ ] Se pueden mostrar múltiples toasts simultáneamente (stacking)
- [ ] Los toasts tienen animación de entrada y salida suave
- [ ] Los errores de API muestran automáticamente un toast de error

**Estimación**: 3-4 días
**Prioridad**: ALTA
**Dependencias**: Ninguna

---

### FJ-2: Sistema de Modals y Confirmaciones 📝
**Como** usuario del sistema
**Quiero** poder confirmar acciones destructivas mediante modals
**Para** evitar eliminar o modificar datos por error

**Criterios de Aceptación**:
- [ ] Componente Modal base reutilizable
- [ ] Modal tiene overlay oscuro semi-transparente
- [ ] Modal se cierra con ESC, botón X, o click en overlay
- [ ] Componente ConfirmDialog con variantes (danger, warning, info)
- [ ] ConfirmDialog muestra título, mensaje, y botones personalizables
- [ ] Modal tiene animación de fade in/out
- [ ] Modal bloquea scroll del body cuando está abierto
- [ ] Modal es accesible (focus trap, ARIA labels)

**Estimación**: 2-3 días
**Prioridad**: ALTA
**Dependencias**: Ninguna

---

### FJ-3: Lista de Usuarios con Tabla 📝
**Como** administrador
**Quiero** ver una lista de todos los usuarios en formato tabla
**Para** tener una visión general de los usuarios del sistema

**Criterios de Aceptación**:
- [ ] Tabla muestra: Avatar, Nombre, Email, Rol, Estado, Fecha de registro
- [ ] Tabla es responsive (card layout en mobile)
- [ ] Tabla muestra skeleton loader mientras carga
- [ ] Si no hay usuarios, muestra empty state con mensaje e ilustración
- [ ] Cada fila tiene acciones: Ver, Editar, Eliminar
- [ ] Tabla tiene hover state en las filas
- [ ] Integración con UserService para obtener datos

**Estimación**: 3-4 días
**Prioridad**: ALTA
**Dependencias**: FJ-1 (toasts para errores)

---

### FJ-4: Crear Usuario 📝
**Como** administrador
**Quiero** crear nuevos usuarios desde un formulario
**Para** dar acceso al sistema a nuevas personas

**Criterios de Aceptación**:
- [ ] Formulario con campos: Nombre, Apellido, Email, Teléfono, Rol, Contraseña
- [ ] Validación en tiempo real con Zod
- [ ] Mensajes de error claros bajo cada campo
- [ ] Botón de submit deshabilitado mientras está guardando
- [ ] Loading state en el botón mientras guarda
- [ ] Toast de éxito al crear usuario
- [ ] Toast de error si falla la creación
- [ ] Redirección a lista de usuarios después de crear
- [ ] Avatar por defecto o preview de imagen (opcional)

**Estimación**: 3-4 días
**Prioridad**: ALTA
**Dependencias**: FJ-1, FJ-2

---

### FJ-5: Editar Usuario 📝
**Como** administrador
**Quiero** editar la información de usuarios existentes
**Para** mantener los datos actualizados

**Criterios de Aceptación**:
- [ ] Formulario pre-llenado con datos actuales del usuario
- [ ] Mismos campos y validaciones que crear usuario
- [ ] No permite editar email (campo deshabilitado)
- [ ] Opción para cambiar contraseña (opcional)
- [ ] Loading state mientras carga datos del usuario
- [ ] Toast de éxito al actualizar
- [ ] Toast de error si falla la actualización
- [ ] Botón cancelar que regresa a la lista sin guardar

**Estimación**: 2-3 días
**Prioridad**: ALTA
**Dependencias**: FJ-1, FJ-3, FJ-4

---

### FJ-6: Eliminar Usuario con Confirmación 📝
**Como** administrador
**Quiero** eliminar usuarios con confirmación previa
**Para** evitar eliminaciones accidentales

**Criterios de Aceptación**:
- [ ] Botón eliminar en la tabla de usuarios
- [ ] Al hacer click, muestra modal de confirmación danger
- [ ] Modal muestra nombre del usuario a eliminar
- [ ] Modal tiene botones: "Cancelar" y "Eliminar" (rojo)
- [ ] Loading state en botón eliminar mientras procesa
- [ ] Toast de éxito al eliminar
- [ ] Toast de error si falla
- [ ] Usuario desaparece de la tabla después de eliminar
- [ ] No se puede eliminar el usuario actual (propio)

**Estimación**: 2 días
**Prioridad**: ALTA
**Dependencias**: FJ-1, FJ-2, FJ-3

---

### FJ-7: Estados de Loading y Error Globales 📝
**Como** usuario del sistema
**Quiero** ver claramente cuando la aplicación está cargando o tiene errores
**Para** entender el estado de la aplicación en todo momento

**Criterios de Aceptación**:
- [ ] LoadingOverlay component para loading global
- [ ] Skeleton loaders en lista de usuarios
- [ ] Skeleton loaders en formularios
- [ ] Componente ErrorState reutilizable
- [ ] ErrorBoundary mejorado con UI amigable
- [ ] Página 404 personalizada
- [ ] Página 500 personalizada
- [ ] Loading state automático en todas las llamadas HTTP

**Estimación**: 2-3 días
**Prioridad**: MEDIA
**Dependencias**: FJ-1

---

## FASE 2: Dashboard y Administración

### FJ-8: Dashboard con Estadísticas 📝
**Como** administrador
**Quiero** ver estadísticas generales en un dashboard
**Para** tener una visión rápida del estado del sistema

**Criterios de Aceptación**:
- [ ] Cards con métricas: Total usuarios, Usuarios activos, Nuevos este mes
- [ ] Gráfico de usuarios por mes (últimos 6 meses)
- [ ] Gráfico de usuarios por rol (pie chart)
- [ ] Lista de últimos usuarios registrados (5 más recientes)
- [ ] Todo es responsive
- [ ] Loading states en cada sección
- [ ] Actualización de datos cada 5 minutos (opcional)

**Estimación**: 4-5 días
**Prioridad**: MEDIA
**Dependencias**: FJ-1

---

### FJ-9: Sistema de Roles y Permisos 📝
**Como** administrador
**Quiero** asignar roles a usuarios (Admin, User)
**Para** controlar el acceso a diferentes funcionalidades

**Criterios de Aceptación**:
- [ ] Select de roles en formulario de usuario
- [ ] Guard de rutas basado en roles
- [ ] Componente ProtectedComponent para ocultar UI por rol
- [ ] Hook usePermissions para validar permisos
- [ ] Admin puede ver y hacer todo
- [ ] User solo puede ver su propio perfil
- [ ] Toast de error si intenta acceder sin permisos

**Estimación**: 3-4 días
**Prioridad**: MEDIA
**Dependencias**: FJ-3, FJ-4, FJ-5

---

### FJ-10: Búsqueda y Filtros de Usuarios 📝
**Como** administrador
**Quiero** buscar y filtrar usuarios por diferentes criterios
**Para** encontrar usuarios específicos rápidamente

**Criterios de Aceptación**:
- [ ] SearchBar component con debounce
- [ ] Búsqueda por nombre, email
- [ ] Filtros por: Rol, Estado (activo/inactivo)
- [ ] Filtro por rango de fechas de registro
- [ ] Botón "Limpiar filtros"
- [ ] Filtros persisten en query params
- [ ] Filtros se aplican en conjunto (AND)
- [ ] Empty state cuando no hay resultados

**Estimación**: 3-4 días
**Prioridad**: MEDIA
**Dependencias**: FJ-3

---

### FJ-11: Paginación de Usuarios 📝
**Como** administrador
**Quiero** navegar entre páginas de usuarios
**Para** manejar listas grandes de manera eficiente

**Criterios de Aceptación**:
- [ ] Componente Pagination reutilizable
- [ ] Muestra: Primera, Anterior, Páginas, Siguiente, Última
- [ ] Selector de tamaño de página (10, 25, 50, 100)
- [ ] Server-side pagination
- [ ] URL incluye page y pageSize
- [ ] Loading state al cambiar de página
- [ ] Muestra total de resultados: "Mostrando 1-10 de 234"

**Estimación**: 2-3 días
**Prioridad**: MEDIA
**Dependencias**: FJ-3

---

### FJ-12: Breadcrumbs de Navegación 📝
**Como** usuario
**Quiero** ver breadcrumbs que indiquen mi ubicación
**Para** navegar fácilmente por la aplicación

**Criterios de Aceptación**:
- [ ] Componente Breadcrumbs que lee la ruta actual
- [ ] Links clickeables a rutas anteriores
- [ ] Último item (actual) no es clickeable
- [ ] Separadores visuales entre items (chevron o slash)
- [ ] Responsive (ocultar items intermedios en mobile)
- [ ] Integrado en MainLayout

**Estimación**: 1-2 días
**Prioridad**: BAJA
**Dependencias**: Ninguna

---

## FASE 3: Calidad y Testing

### FJ-13: Tests Unitarios de Componentes UI 📝
**Como** desarrollador
**Quiero** tener tests de todos los componentes UI
**Para** asegurar que funcionan correctamente

**Criterios de Aceptación**:
- [ ] Tests de Button (todas las variantes)
- [ ] Tests de Input (validación, error states)
- [ ] Tests de Card
- [ ] Tests de Modal
- [ ] Tests de Toast
- [ ] Tests de Pagination
- [ ] Coverage > 80% en componentes UI

**Estimación**: 3-4 días
**Prioridad**: ALTA
**Dependencias**: Componentes completados

---

### FJ-14: Tests de Hooks Personalizados 📝
**Como** desarrollador
**Quiero** tests de todos los hooks personalizados
**Para** asegurar su correcto funcionamiento

**Criterios de Aceptación**:
- [ ] Tests de useDebounce
- [ ] Tests de useBoolean
- [ ] Tests de useLocalStorage
- [ ] Tests de useAsync
- [ ] Tests de useClickOutside
- [ ] Coverage > 90% en hooks

**Estimación**: 2-3 días
**Prioridad**: ALTA
**Dependencias**: Ninguna

---

### FJ-15: Tests de Integración - Flujo CRUD 📝
**Como** desarrollador
**Quiero** tests de integración del flujo completo de usuarios
**Para** asegurar que todas las partes funcionan juntas

**Criterios de Aceptación**:
- [ ] Test: Crear usuario end-to-end
- [ ] Test: Editar usuario end-to-end
- [ ] Test: Eliminar usuario con confirmación
- [ ] Test: Búsqueda y filtros
- [ ] Test: Paginación
- [ ] MSW configurado para mock de API

**Estimación**: 3-4 días
**Prioridad**: ALTA
**Dependencias**: CRUD completo

---

### FJ-16: E2E Tests con Playwright 📝
**Como** QA
**Quiero** tests E2E de flujos críticos
**Para** validar que la app funciona correctamente en un navegador real

**Criterios de Aceptación**:
- [ ] Playwright configurado
- [ ] Test: Login exitoso
- [ ] Test: Login fallido
- [ ] Test: Crear usuario
- [ ] Test: Editar usuario
- [ ] Test: Eliminar usuario
- [ ] Test: Búsqueda de usuarios
- [ ] Tests corren en CI

**Estimación**: 3-4 días
**Prioridad**: MEDIA
**Dependencias**: FJ-15

---

## FASE 4: Optimización y Deploy

### FJ-17: Performance Optimization 📝
**Como** usuario
**Quiero** que la aplicación cargue rápido
**Para** tener una mejor experiencia

**Criterios de Aceptación**:
- [ ] Code splitting por rutas
- [ ] Lazy loading de componentes pesados
- [ ] Memoización donde aplique (React.memo, useMemo, useCallback)
- [ ] Bundle size < 500KB gzipped
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s

**Estimación**: 2-3 días
**Prioridad**: MEDIA
**Dependencias**: Features principales completadas

---

### FJ-18: CI/CD Pipeline 📝
**Como** desarrollador
**Quiero** un pipeline de CI/CD automatizado
**Para** deployar rápido y con confianza

**Criterios de Aceptación**:
- [ ] GitHub Actions workflow configurado
- [ ] Lint check en PRs
- [ ] Tests automáticos en PRs
- [ ] Build check en PRs
- [ ] Deploy automático a staging en merge a main
- [ ] Deploy a producción manual (con aprobación)
- [ ] Preview deployments por PR en Vercel

**Estimación**: 2-3 días
**Prioridad**: ALTA
**Dependencias**: Tests completados

---

### FJ-19: Error Tracking con Sentry 📝
**Como** desarrollador
**Quiero** tracking de errores en producción
**Para** detectar y resolver problemas rápidamente

**Criterios de Aceptación**:
- [ ] Sentry configurado
- [ ] Errores de frontend capturados
- [ ] Source maps subidos a Sentry
- [ ] User context en errores
- [ ] Alerts configurados
- [ ] Breadcrumbs de navegación

**Estimación**: 1-2 días
**Prioridad**: MEDIA
**Dependencias**: Deploy configurado

---

### FJ-20: Documentación Final 📝
**Como** nuevo desarrollador
**Quiero** documentación completa del proyecto
**Para** hacer onboarding fácilmente

**Criterios de Aceptación**:
- [ ] README.md actualizado
- [ ] CLAUDE.md actualizado
- [ ] API documentation (endpoints, responses)
- [ ] Component documentation (JSDoc)
- [ ] Deployment guide
- [ ] Troubleshooting guide
- [ ] Architecture diagrams actualizados

**Estimación**: 2 días
**Prioridad**: MEDIA
**Dependencias**: Proyecto completado

---

## Backlog (Futuras Features)

### FJ-21: Dark Mode 📝
**Como** usuario
**Quiero** poder cambiar entre modo claro y oscuro
**Para** usar la app según mi preferencia

**Estimación**: 2-3 días
**Prioridad**: BAJA

---

### FJ-22: Exportar Usuarios (CSV/Excel) 📝
**Como** administrador
**Quiero** exportar la lista de usuarios
**Para** análisis externo

**Estimación**: 2 días
**Prioridad**: BAJA

---

### FJ-23: Bulk Actions (Eliminar múltiples) 📝
**Como** administrador
**Quiero** seleccionar múltiples usuarios y realizar acciones
**Para** ser más eficiente

**Estimación**: 3-4 días
**Prioridad**: BAJA

---

### FJ-24: Logs de Auditoría 📝
**Como** administrador
**Quiero** ver un log de todas las acciones realizadas
**Para** tener trazabilidad

**Estimación**: 4-5 días
**Prioridad**: BAJA

---

## Resumen de Estimaciones

**Fase 1**: 17-23 días (3.5-4.5 semanas)
**Fase 2**: 13-18 días (2.5-3.5 semanas)
**Fase 3**: 11-15 días (2-3 semanas)
**Fase 4**: 7-10 días (1.5-2 semanas)

**TOTAL**: 48-66 días (9.5-13 semanas | 2.5-3 meses)

---

## Leyenda de Prioridades

- 🔴 **ALTA**: Crítica para MVP
- 🟡 **MEDIA**: Importante pero no bloqueante
- 🟢 **BAJA**: Nice-to-have, puede postponerse

---

**Última actualización**: 2025-01-26
