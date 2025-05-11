# TrustBalance API Core

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  API backend para la plataforma TrustBalance, construida con NestJS y TypeScript.
</p>

## Descripción

TrustBalance API Core es una API RESTful que proporciona servicios para la gestión de usuarios, clientes, empresas y suscripciones. La aplicación está construida siguiendo los principios de arquitectura limpia (Clean Architecture) y Domain-Driven Design (DDD).

## Características principales

- Autenticación y autorización con JWT
- Gestión de usuarios y roles
- Gestión de clientes
- Gestión de empresas y suscripciones
- Documentación API con Swagger
- Logging avanzado
- Soporte para múltiples entornos (desarrollo, producción)

## Arquitectura

El proyecto sigue una arquitectura de capas basada en los principios de Clean Architecture:

- **Dominio**: Contiene las entidades de negocio y reglas de dominio
- **Aplicación**: Contiene los casos de uso y lógica de aplicación
- **Infraestructura**: Contiene implementaciones concretas (base de datos, servicios externos, etc.)
- **Adaptadores**: Contiene controladores y middleware HTTP

## Tecnologías

- **Framework**: NestJS 11
- **Lenguaje**: TypeScript
- **Base de datos**: PostgreSQL
- **ORM**: TypeORM
- **Autenticación**: JWT, Passport
- **Validación**: class-validator, class-transformer
- **Documentación API**: Swagger
- **Logging**: Winston
- **Email**: SendGrid
- **Testing**: Jest
- **Linting**: ESLint, Prettier
- **Git Hooks**: Husky, Commitlint
- **Containerización**: Docker

## Requisitos previos

- Node.js (v18 o superior)
- npm (v9 o superior)
- PostgreSQL

## Configuración del proyecto

1. Clonar el repositorio:

```bash
$ git clone <url-del-repositorio>
$ cd trustbalance-api-core
```

2. Instalar dependencias:

```bash
$ npm install
```

3. Configurar variables de entorno:

Crea un archivo `.env` en la raíz del proyecto basado en el ejemplo proporcionado:

```
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=trustbalance

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1h

# SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key

# Servidor
PORT=3000
LOG_LEVEL=info
```

También puedes crear archivos `.env.development` y `.env.production` para configuraciones específicas de entorno.

## Ejecución del proyecto

```bash
# Modo desarrollo
$ npm run start:dev

# Modo debug
$ npm run start:debug

# Modo producción
$ npm run start:prod
```

## Documentación API

Una vez que la aplicación esté en ejecución, puedes acceder a la documentación Swagger en:

```
http://localhost:3000/api/v1/docs
```

## Pruebas

```bash
# Pruebas unitarias
$ npm run test

# Pruebas e2e
$ npm run test:e2e

# Cobertura de pruebas
$ npm run test:cov
```

## Despliegue con Docker

El proyecto incluye un Dockerfile para facilitar el despliegue:

```bash
# Construir la imagen
$ docker build -t trustbalance-api-core .

# Ejecutar el contenedor
$ docker run -p 3000:3000 --env-file .env.production trustbalance-api-core
```

## Estructura de directorios

```
src/
├── adapters/           # Adaptadores para servicios externos
├── application/        # Casos de uso
├── auth/               # Módulo de autenticación
├── client/             # Módulo de clientes
├── common/             # Código compartido
├── domain/             # Entidades y reglas de dominio
├── infrastructure/     # Implementaciones concretas
│   ├── auth/           # Implementación de autenticación
│   ├── config/         # Configuraciones
│   ├── external-services/ # Servicios externos
│   ├── http/           # Middleware HTTP
│   ├── logger/         # Implementación de logging
│   ├── mappers/        # Mappers entre dominio y persistencia
│   └── persistence/    # Repositorios y entidades
├── utils/              # Utilidades
├── app.controller.ts   # Controlador principal
├── app.module.ts       # Módulo principal
├── app.service.ts      # Servicio principal
└── main.ts             # Punto de entrada
```

## Contribución

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo [LICENCIA].
