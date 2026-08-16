# DemoEcommerce
Full-Stack Application · Monorepo · QA Automation

![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?logo=php)
![Node](https://img.shields.io/badge/Node-20-339933?logo=node.js)
![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?logo=laravel)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)
![Postgres](https://img.shields.io/badge/Postgres-16-336791?logo=postgresql)
![Selenium](https://img.shields.io/badge/Selenium-E2E%20Tests-43B02A?logo=selenium)
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-Enabled-0db7ed?logo=docker)

---

## 📌 Descripción general

DemoEcommerce es un monorepo que integra:

- Backend REST API en Laravel
- Frontend SPA en React + TypeScript
- Autenticación con Laravel Sanctum
- Base de datos PostgreSQL
- QA Automation con Selenium + Cucumber + Serenity
- Entorno ejecutable vía Docker Compose
- Configuración separada para desarrollo y producción

El objetivo es simular un flujo de compra completo y medible con pruebas automatizadas de extremo a extremo, además de servir como proyecto de práctica para desarrollo Full Stack, diseño de APIs, QA Automation y CI/CD.

---

## 🧱 Estructura del Monorepo

```text
DemoEcommerce/
│── backend/                  # API Laravel + configuración PHP
│── frontend/                 # SPA React + TypeScript
│── qa-automation/            # Selenium + Cucumber + Serenity BDD
│── docker/
│   └── nginx/                # Configuración Nginx
│── docs/                     # Capturas y evidencias
│── docker-compose.dev.yml
│── docker-compose.prod.yml
│── .gitignore
```

El frontend centraliza el acceso HTTP y la configuración común.

```text
frontend/src/
│── api/
│   ├── auth.ts
│   ├── categories.ts
│   ├── products.ts
│   └── orders.ts
│
│── models/
│   └── Product.ts
│
│── shared/
│   ├── api/
│   │   └── apiClient.ts
│   └── config/
│       └── env.ts
│
│── pages/
│── components/
│── hooks/
│── utils/
```

---

## 🚀 Ejecución del proyecto

### Requisitos previos

- Docker Desktop
- Docker Compose
- Git
- WSL2 recomendado si estás en Windows

### Iniciar todo el stack en desarrollo

Desde la raíz del repositorio:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Esto levanta automáticamente:

- Backend Laravel
- Frontend React mediante Vite
- Base de datos PostgreSQL
- Nginx para la API

URLs principales:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8080
API:      http://localhost:8080/api/v1
```

En desarrollo, React utiliza el servidor de desarrollo de Vite, permitiendo recompilación y actualización automática durante los cambios de código.

---

## 🏗️ Build tipo producción

El proyecto también dispone de una configuración Docker orientada a un entorno de producción.

```bash
docker compose -f docker-compose.prod.yml up --build
```

En este entorno, el frontend deja de ejecutarse mediante el servidor de desarrollo de Vite.

React se compila mediante:

```bash
npm run build
```

Vite genera los archivos estáticos dentro de:

```text
dist/
```

Estos archivos son posteriormente servidos mediante Nginx.

Flujo en desarrollo:

```text
React source
    ↓
Vite dev server
    ↓
Browser
```

Flujo tipo producción:

```text
React source
    ↓
Vite build
    ↓
dist/
    ↓
Nginx
    ↓
Browser
```

Las variables `VITE_*` utilizadas por el frontend se resuelven durante el proceso de build.

---

## 🔗 Endpoints disponibles actualmente (Backend API)

La API está versionada bajo:

```text
/api/v1
```

### Endpoints públicos

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/v1/categories` | GET | Listado de categorías |
| `/api/v1/categories/{id}/products` | GET | Productos de una categoría específica |
| `/api/v1/products` | GET | Lista de productos |
| `/api/v1/products/{id}` | GET | Producto por ID |
| `/api/v1/products/slug/{slug}` | GET | Producto por slug |
| `/api/v1/auth/login` | POST | Autenticación de usuario |

### Endpoints autenticados

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/v1/orders` | POST | Crea una orden de compra |

> El endpoint de órdenes requiere autenticación mediante Laravel Sanctum y Bearer Token.

---

## 🔐 Autenticación

El backend utiliza Laravel Sanctum para autenticar usuarios mediante tokens.

Flujo simplificado:

```text
Usuario
  ↓
POST /api/v1/auth/login
  ↓
Laravel valida credenciales
  ↓
Sanctum genera token
  ↓
Frontend almacena token
  ↓
apiClient agrega Authorization
  ↓
Endpoint protegido
```

Las peticiones autenticadas utilizan:

```http
Authorization: Bearer <token>
```

El backend es responsable de validar que el token exista y sea válido antes de permitir el acceso a endpoints protegidos.

---

## 🖥️ Frontend

### Estado actual

✔ Catálogo funcional  
✔ Productos por categoría  
✔ Carrito persistido en `localStorage`  
✔ Login funcional  
✔ Autenticación con Bearer Token  
✔ Checkout autenticado  
✔ Creación de órdenes  
✔ Cliente REST centralizado  
✔ Configuración de entorno centralizada  
✔ TypeScript en modo estricto  
⏳ Detalle de producto pendiente  
⏳ Registro de usuarios pendiente  

---

## 🌐 Configuración del frontend

La configuración relacionada con URLs y variables de entorno se centraliza en:

```text
frontend/src/shared/config/env.ts
```

Variables principales:

```env
VITE_API_URL=http://localhost:8080/api/v1
VITE_SERVER_BASE_URL=http://localhost:8080
```

`VITE_API_URL` se utiliza como URL base para las peticiones REST.

Ejemplo:

```text
http://localhost:8080/api/v1/products
```

`VITE_SERVER_BASE_URL` se utiliza para recursos servidos directamente por el backend, por ejemplo imágenes.

Ejemplo:

```text
http://localhost:8080/storage/products/example.jpg
```

---

## 🔌 Cliente REST centralizado

Las peticiones HTTP se encuentran centralizadas mediante:

```text
frontend/src/shared/api/apiClient.ts
```

El cliente compartido se encarga de:

- Base URL de la API
- Headers comunes
- `Content-Type`
- Bearer Token
- Ejecución de `fetch`
- Conversión de respuestas JSON
- Manejo común de errores HTTP

Los módulos específicos del dominio consumen este cliente.

Ejemplo:

```text
CategoryProductsPage
        ↓
products.ts
        ↓
apiClient.ts
        ↓
Laravel API
```

Esto evita realizar llamadas `fetch()` directamente desde las páginas y componentes.

Los módulos REST actuales incluyen:

```text
frontend/src/api/
│── auth.ts
│── categories.ts
│── products.ts
│── orders.ts
```

Cada módulo conoce sus propios endpoints, mientras que `apiClient.ts` se encarga de la infraestructura HTTP común.

---

## 🧩 Modelos y transformación de datos

Los tipos reutilizados en distintas partes del frontend se centralizan para evitar interfaces duplicadas.

Por ejemplo:

```text
frontend/src/models/Product.ts
```

La API puede devolver determinados valores utilizando tipos diferentes a los utilizados internamente por React.

Por ejemplo, el backend puede devolver:

```json
{
  "price": "19.99"
}
```

mientras que el frontend trabaja internamente con:

```ts
price: number;
```

La capa API realiza la transformación antes de entregar los datos a la página.

```text
Laravel API
price: "19.99"
      ↓
products.ts
Number(price)
      ↓
Product
price: 19.99
      ↓
React Page
```

De esta forma, las páginas reciben los datos ya preparados para su uso.

---

## 🟦 TypeScript

El frontend utiliza TypeScript con validación estricta.

La configuración incluye:

```json
"strict": true
```

Además de reglas como:

```text
noUnusedLocals
noUnusedParameters
noFallthroughCasesInSwitch
```

Para realizar la validación de tipos:

```bash
npm run typecheck
```

Este script ejecuta:

```bash
tsc --noEmit
```

`--noEmit` indica a TypeScript que debe analizar y validar el código sin generar archivos JavaScript.

Esto permite ejecutar la validación de tipos independientemente del build de Vite.

Para compilar el frontend:

```bash
npm run build
```

Por lo tanto, existen dos validaciones independientes:

```text
npm run typecheck
        ↓
TypeScript validation

npm run build
        ↓
Vite production build
```

---

## 🤖 QA Automation

Tecnologías utilizadas:

✔ Selenium WebDriver  
✔ Cucumber  
✔ Serenity BDD  
✔ Java  

El módulo se encuentra en:

```text
qa-automation/
```

### Caso automatizado principal

1. Abrir home
2. Listar productos
3. Agregar uno o varios productos al carrito
4. Ver carrito
5. Realizar checkout
6. Validar confirmación de compra

Próximas implementaciones:

- API testing
- Ampliación de cobertura E2E
- Performance testing
- Integración CI/CD

---

## 🧪 Estrategia de calidad

El proyecto busca incorporar progresivamente distintas capas de validación.

```text
Código
  ↓
Type checking
  ↓
Tests unitarios
  ↓
API tests
  ↓
Functional tests
  ↓
E2E tests
  ↓
Performance tests
  ↓
CI/CD
```

El objetivo es integrar estas validaciones posteriormente dentro de GitHub Actions.

---

## 📍 Roadmap técnico

### Backend

- [x] API REST
- [x] Versionado `/api/v1`
- [x] Login
- [x] Laravel Sanctum
- [x] Endpoint protegido de órdenes
- [ ] Registro de usuarios
- [ ] Unit tests
- [ ] Mejorar cobertura de validaciones

### Frontend

- [x] React + TypeScript
- [x] Catálogo
- [x] Productos por categoría
- [x] Carrito
- [x] Login
- [x] Checkout autenticado
- [x] Cliente REST centralizado
- [x] Configuración de entorno centralizada
- [x] Modelos TypeScript compartidos
- [x] TypeScript strict
- [x] Script `typecheck`
- [ ] Vista detalle de producto
- [ ] Mejorar manejo global de errores
- [ ] Validación runtime de respuestas API

### QA

- [x] Selenium
- [x] Cucumber
- [x] Serenity BDD
- [ ] API testing
- [ ] Ampliar cobertura E2E
- [ ] Performance testing

### DevOps

- [x] Docker Compose para desarrollo
- [x] Docker Compose tipo producción
- [x] Build de frontend con Vite + Nginx
- [ ] CI/CD con GitHub Actions
- [ ] Quality gates
- [ ] Deploy productivo

---

## 📸 Galería de capturas (en actualización)

### Pantalla principal

<img src="docs/screens/home.png" width="700">

### Carrito de compras

<img src="docs/screens/cart.png" width="700">

### Reporte de pruebas automatizadas

<img src="docs/screens/serenity-report.png" width="700">

---

## 🧑‍💻 Autor

Proyecto creado con fines formativos y de portafolio para fortalecer capacidades en:

- Full-Stack Development
- Backend Development
- Frontend Development
- Diseño de APIs REST
- React
- TypeScript
- Laravel
- PostgreSQL
- Docker
- QA Automation
- CI/CD
- Arquitectura monorepo