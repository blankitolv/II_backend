# Primera Entrega - Ecommerce Backend con Autenticación y Autorización

Este proyecto es la primera entrega del curso de backend, implementando un sistema de CRUD de usuarios junto con autenticación y autorización utilizando Passport y JWT en un proyecto de ecommerce.

## Descripción

El proyecto incluye:

- Modelo de Usuario con campos requeridos
- Encriptación de contraseñas con bcrypt
- Estrategias de Passport para JWT
- Sistema de login y registro
- Endpoint `/api/sessions/current` para validar usuarios logueados
- Vistas con Handlebars para login, registro y perfil de usuario

## Tecnologías Utilizadas

- **Node.js** con ES Modules
- **Express.js** para el servidor web
- **MongoDB** con Mongoose para la base de datos
- **Passport.js** con estrategia JWT para autenticación
- **bcrypt** para encriptación de contraseñas
- **jsonwebtoken** para manejo de tokens JWT
- **express-handlebars** para renderizado de vistas
- **Bootstrap** para estilos en las vistas

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd primera_entrega
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```
      PORT=3132
      MONGO_URL=mongodb://localhost:27017
      DB_NAME=backend_dos
      JWT_SECRET=unsecretosupersecreto
   ```

4. Asegúrate de tener MongoDB corriendo en tu sistema.

## Ejecución

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

El servidor se iniciará en el puerto por defecto (generalmente 8080 o el configurado en el código 3000).

## Estructura del Proyecto

```
primera_entrega/
├── index.js                    # Punto de entrada de la aplicación
├── package.json                # Dependencias y scripts
├── README.md                   # Este archivo
├── public/                     # Archivos estáticos
│   ├── assets/
│   │   ├── img/
│   │   └── styles/
│   │       └── styles.css
└── src/
    ├── config/
    │   ├── db.config.js        # Configuración de MongoDB
    │   └── passport.config.js  # Configuración de Passport
    ├── controller/
    │   └── users.controller.js # Controladores de usuarios
    ├── middleware/
    │   └── passport.middleware.js # Middlewares de Passport
    ├── models/
    │   └── users.models.js     # Modelo de Usuario
    ├── routes/
    │   ├── session.router.js   # Rutas de sesiones (login, current)
    │   ├── users.router.js     # Rutas de usuarios (CRUD)
    │   └── views.router.js     # Rutas de vistas
    ├── utils/
    │   ├── jwt.utils.js        # Utilidades para JWT
    │   └── utils.utils.js      # Utilidades generales
    └── views/
        ├── current.handlebars  # Vista del perfil de usuario
        ├── login.handlebars    # Vista de login
        ├── register.handlebars # Vista de registro
        └── layouts/
            └── main.handlebars # Layout principal
```

## Modelo de Usuario

El modelo `User` incluye los siguientes campos:

- `first_name`: String (requerido)
- `last_name`: String (requerido)
- `email`: String (requerido, único)
- `age`: String (opcional)
- `password`: String (requerido, encriptado con bcrypt)
- `cart`: String (ID de referencia a Carts)
- `role`: String (por defecto: 'user')

## API Endpoints

### Sesiones

- `POST /api/sessions/login`: Inicia sesión y genera JWT
- `GET /api/sessions/current`: Valida el JWT y devuelve datos del usuario
- `GET /api/sessions/logout`: Cierra sesión

### Usuarios

- `POST /users/register`: Registra un nuevo usuario

### Vistas

- `GET /login`: Página de login
- `GET /register`: Página de registro
- `GET /current`: Página del perfil de usuario logueado

## Autenticación y Autorización

- **Registro**: Los usuarios se registran con nombre, apellido, email, contraseña y edad opcional. La contraseña se encripta con bcrypt.
- **Login**: Los usuarios inician sesión con email y contraseña. Si son válidos, se genera un JWT que se almacena en una cookie firmada.
- **Validación**: El endpoint `/api/sessions/current` valida el JWT y devuelve los datos del usuario.
- **Protección**: Las rutas protegidas usan el middleware `passportCall('jwt')` para verificar el token.

## Notas

- El CRUD de usuarios está parcialmente implementado (solo registro). Para completar el CRUD, se necesitan endpoints para leer, actualizar y eliminar usuarios.
- El campo `age` en el modelo está definido como String, pero según las consignas debería ser Number.
- El campo `cart` es String, pero debería ser ObjectId con referencia al modelo Carts.
- Las vistas usan Handlebars y Bootstrap para una interfaz básica.
