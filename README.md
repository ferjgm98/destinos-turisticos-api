# API de Destinos Turísticos

Este proyecto es una API desarrollada con NestJS para la gestión de destinos turisticos, incluyendo funcionalidad de likes en tiempo real mediante WebSockets.

## Caracteristicas

- CRUD de destinos turísticos
- Sistema de likes con WebSockets para actualizaciones en tiempo real
- Paginación
- Base de datos PostgreSQL con Prisma ORM
- Documentación con Swagger
- Tests unitarios
- Docker para desarrollo y producción

## Tecnologías

- **Backend**: NestJS, TypeScript
- **Base de datos**: PostgreSQL
- **ORM**: Prisma
- **WebSockets**: Socket.IO
- **Documentación**: Swagger
- **Testing**: Jest
- **Contenedores**: Docker & Docker Compose

## Configuración del Entorno

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
PORT=3000

DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=touristic_destinations
```

### Levantar el Entorno de Desarrollo

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd destinos-turisticos-api
   ```

2. **Levantar con Docker (Recomendado)**

   ```bash
   npm run docker:dev:up
   ```

3. **Ejecutar migraciones**

   ```bash
   npm run docker:migrate:dev
   ```

4. **Ver logs**

   ```bash
   npm run docker:dev:logs
   ```

5. **Servidor local corre por default en puerto 3000**

   ```bash
     http://localhost:3000
   ```

### Instalación Local (Alternativa)

Si prefieres ejecutar sin Docker:

> Es necesario agregar la variable de entorno DATABASE_URL ya que al usar docker esta se formatea automaticamente, a si mismo las variables de DB_USER, DB_PASSWORD y DB_NAME no es necesaria

```bash
DATABASE_URL=postgresql://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>
```

```bash
# Instalar dependencias
npm install

# Ejecutar migraciones
npx prisma migrate dev

# Iniciar en modo desarrollo
npm run start:dev
```

## Comandos Útiles

### Scripts NPM

```bash
# Desarrollo sin docker
npm run start:dev          # Iniciar con hot reload
npm run start              # Iniciar modo normal
npm run start:prod         # Iniciar modo producción

# Testing
npm run test               # Tests unitarios
npm run test:watch         # Tests en modo watch
npm run test:cov
npm run test:e2e

# Base de datos
npm run migrate:dev        # Ejecutar migraciones (desarrollo)
npm run migrate:deploy     # Ejecutar migraciones (producción)

# Docker
npm run docker:dev:up      # Levantar entorno desarrollo
npm run docker:dev:down    # Detener entorno desarrollo
npm run docker:dev:logs    # Ver logs desarrollo
npm run docker:migrate:dev # Migraciones en Docker
npm run docker:prod:up     # Levantar entorno producción
npm run docker:prod:down   # Detener entorno producción
```

## Documentación API

Una vez levantado el servidor, puedes acceder a la documentación de Swagger en:

- **Desarrollo**: http://localhost:3000/api
- **Producción**: http://localhost:3000/api
