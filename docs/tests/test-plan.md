# Test Plan - DemoEcommerce
Version: 1.1  
Author: Carlos  
Status: Draft  
Last Update: 2026-04-22  

---

# Contexto del Proyecto

DemoEcommerce es un proyecto personal en desarrollo activo, construido como portfolio técnico orientado a roles QA Semi-Senior / SDET.

El sistema simula un e-commerce real y combina responsabilidades de desarrollo y aseguramiento de calidad.

A diferencia de un entorno tradicional donde QA y desarrollo son equipos separados, este proyecto adopta un enfoque de ownership completo:

- Desarrollo de funcionalidades
- Diseño de estrategia QA
- Detección de defectos
- Documentación de bugs
- Corrección y validación
- Automatización futura
- Base de performance testing

---

# Objetivo del Test Plan

Definir la estrategia de aseguramiento de calidad para DemoEcommerce, estableciendo:

- Alcance de pruebas
- Objetivos de calidad
- Estrategia de testing
- Ambientes
- Riesgos
- Criterios de entrada y salida
- Herramientas
- Enfoque de validación continua

Este documento busca demostrar un proceso QA aplicado sobre un sistema real en evolución.

---

# Scope

## Funcionalidades incluidas

### Autenticación
- Register
- Login
- Logout
- Endpoint me
- Persistencia de token

### Catálogo
- Listado de productos
- Filtrado por categorías
- Navegación entre productos

### Carrito
- Agregar productos
- Actualizar cantidades
- Persistencia en localStorage
- Eliminación de productos
- Cálculo de subtotales

### Checkout
- Validación de datos
- Creación de órdenes
- Asociación de productos a orden

### API REST
- Endpoints funcionales
- Validación de contratos
- Validación de autorización

---

# Funcionalidades fuera de alcance

- Seguridad ofensiva avanzada
- Compatibilidad cross-browser completa
- Mobile testing profundo
- Accesibilidad formal
- Alta concurrencia avanzada
- Integraciones de terceros reales

---

# Objetivos QA

- Validar flujos críticos del sistema
- Detectar defectos funcionales
- Confirmar consistencia UI/API
- Garantizar estabilidad de autenticación
- Validar reglas básicas de negocio
- Construir base para automatización
- Incorporar validación no funcional inicial

---

# Estrategia de Testing

## Enfoque general

La estrategia se basa en un flujo iterativo:

1. Desarrollo de funcionalidad
2. Definición de validaciones
3. Ejecución de pruebas
4. Registro de defectos
5. Corrección
6. Re-testing
7. Regresión
8. Automatización futura
9. Performance baseline

---

## Prioridad funcional

### Alta prioridad
- Login
- Register
- Token auth
- Productos
- Carrito
- Checkout

### Prioridad media
- Logout
- Endpoint me
- Manejo de errores
- Navegación secundaria

### Prioridad baja
- Ajustes visuales
- Elementos cosméticos
- Detalles de layout

---

# Tipos de Pruebas

## Functional Testing
Validación manual del comportamiento del sistema.

## API Testing
Validación de endpoints REST.

## Integration Testing
Frontend + Backend.

## Exploratory Testing
Detección de escenarios no previstos.

## Smoke Testing
Verificación mínima de estabilidad.

## Regression Testing
Validación posterior a fixes.

## Performance Baseline
Validación básica de carga usando k6.

---

# Estrategia de Performance (k6)

El proyecto incluirá una capa inicial de validación no funcional usando k6.

Objetivo:

- Validar estabilidad básica
- Medir tiempos de respuesta
- Simular concurrencia simple
- Crear línea base de performance

## Endpoints objetivo

### Primera fase
- GET /api/v1/products
- POST /api/v1/login

### Segunda fase
- POST /api/v1/orders

---

# Ambientes

## Desarrollo local

- Frontend React
- Backend Laravel
- PostgreSQL
- Docker Compose
- API REST /api/v1

---

# Datos de prueba

Se utilizarán datos controlados:

- Usuario válido
- Usuario inválido
- Productos seeded
- Categorías
- Órdenes válidas
- Payloads incorrectos

---

# Criterios de Entrada

Las pruebas inician cuando:

- Ambiente disponible
- API funcional
- DB conectada
- Datos cargados
- Build estable
- Alcance definido

---

# Criterios de Salida

Las pruebas terminan cuando:

- Casos ejecutados
- Bugs críticos documentados
- Bugs bloqueantes corregidos
- Smoke tests aprobados
- Regresión ejecutada

---

# Gestión de Defectos

Cada bug debe incluir:

- Título
- Módulo
- Severidad
- Prioridad
- Steps
- Resultado actual
- Resultado esperado
- Evidencia
- Estado

---

# Severidad

## Crítico
- No permite comprar
- No permite login
- Caída del sistema

## Alto
- Flujo crítico inconsistente
- Checkout defectuoso

## Medio
- Validación incorrecta

## Bajo
- Problema visual

---

# Riesgos

## Técnicos
- Cambios frecuentes
- Dependencia local
- Contratos API cambiantes

## Funcionales
- Token inválido
- Checkout inconsistente
- localStorage corrupto

## Mitigación
- Regresión continua
- Casos negativos
- Testing incremental

---

# Herramientas

## QA Manual
- Navegador
- DevTools

## API
- Karate Framework
- Postman

## UI
- Selenium
- Serenity BDD

## Performance
- k6

## Infraestructura
- Docker
- PostgreSQL
- Laravel Logs

---

# Entregables QA

- Test Plan
- Casos funcionales
- Casos API
- Registro de bugs
- Estrategia de automatización
- Scripts k6
- Evidencias

---

# Conclusión

DemoEcommerce utiliza un enfoque QA iterativo sobre un sistema en evolución.

El objetivo no es solo validar funcionalidades, sino demostrar pensamiento QA aplicado a un entorno real, con ownership técnico completo y orientación SDET.
