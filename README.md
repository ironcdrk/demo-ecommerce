# DemoEcommerce
Full-Stack Application · Monorepo · QA Automation

![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?logo=php)
![Node](https://img.shields.io/badge/Node-20-339933?logo=node.js)
![Laravel](https://img.shields.io/badge/Laravel-API-FF2D20?logo=laravel)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![Postgres](https://img.shields.io/badge/Postgres-Database-336791?logo=postgresql)
![Selenium](https://img.shields.io/badge/Selenium-E2E%20Tests-43B02A?logo=selenium)
![Docker](https://img.shields.io/badge/Docker-Compose-Enabled-0db7ed?logo=docker)

---

## 📌 Descripción general

DemoEcommerce es un monorepo que integra:

- Backend API en Laravel
- Frontend SPA en React
- QA Automation con Selenium + Cucumber + Serenity
- Entorno ejecutable vía Docker

El objetivo es simular un flujo de compra básico medible con pruebas automatizadas de extremo a extremo.

---

## 🧱 Estructura del Monorepo

```
DemoEcommerce/
│── backend/              # API Laravel
│── frontend/             # SPA React
│── qa-automation/        # Selenium + Cucumber + Serenity BDD
│── docker/               # Infraestructura
│── docker-compose.dev.yml
│── docker-compose.prod.yml
│── .gitignore
```

---

## 🚀 Ejecución del proyecto

### Requisitos previos
- Docker Desktop
- WSL2 (si estás en Windows)
- Git

### Iniciar todo el stack

```bash
docker compose -f docker-compose.dev.yml up --build
```

Esto levanta automáticamente:

- Backend Laravel
- Frontend React
- Base de datos Postgres

---

## 🔗 Endpoints disponibles actualmente (Backend API)

| Endpoint | Método | Descripción |
|---|---|---|
| `/categories` | GET | Listado de categorías |
| `/categories/{id}/products` | GET | Productos de categoría específica |
| `/products` | GET | Lista de productos |
| `/products/{id}` | GET | Producto por ID |
| `/products/slug/{slug}` | GET | Producto por slug |
| `/orders` | POST | Crea orden (checkout) |

> No existe autenticación por el momento.

---

## 🖥️ Frontend

### Estado actual
✔ Catálogo funcional  
✔ Carrito funcionando  
✔ Checkout simulado  
⏳ Detalle de producto pendiente  
⏳ Manejo de usuarios pendiente  

---

## 🤖 QA Automation

Tecnologías utilizadas:

✔ Selenium WebDriver  
✔ Cucumber  
✔ Serenity BDD  

### Caso automatizado principal

1. Abrir home
2. Listar productos
3. Agregar uno o varios productos al carrito
4. Ver carrito
5. Realizar checkout simulado

Próximas implementaciones:

- Karate para pruebas API
- Reportes extendidos
- Integración CI/CD

---

## 📍 Roadmap técnico

### Backend
- [ ] Implementar login real
- [ ] Registro de usuarios
- [ ] JWT Authentication
- [ ] Unit tests

### Frontend
- [ ] Vista detalle de producto
- [ ] Persistir carrito localStorage
- [ ] Checkout con token real

### QA
- [ ] Reportes Serenity personalizados
- [ ] API testing con Karate
- [ ] Pipeline automatizado

### DevOps
- [ ] CI/CD GitHub Actions
- [ ] Deploy productivo

---

## 📸 Galería de capturas (pendiente)

Ejemplo de futuras imágenes:

```
docs/screens/catalog.png
docs/screens/cart.png
docs/screens/checkout.png
docs/screens/api-products.png
docs/screens/automation.png
```

---

## 🧑‍💻 Autor

Proyecto creado con fines formativos para fortalecer capacidades en:

- Full-Stack Development
- Diseño de APIs
- QA Automation
- Arquitectura monorepo
