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

## Criterios de Evaluación

Este proyecto cumple con los criterios básicos de la entrega:
- ✅ Modelo de Usuario con campos requeridos
- ✅ Encriptación de contraseña con bcrypt
- ✅ Estrategias de Passport configuradas
- ✅ Sistema de login con JWT
- ✅ Endpoint `/api/sessions/current` funcional

## PROYECTO FINAL

Entrega Final
Consigna:
Mejorar la arquitectura del servidor desarrollado durante el curso, enfocándose en la implementación de patrones de diseño, manejo de roles y autorización, así como en la mejora de la lógica de negocio del ecommerce.

Aspectos a Incluir:

Patrón Repository:
Implementar el patrón Repository para trabajar con el DAO (Data Access Object) dentro de la lógica de negocio.

Modificación de la Ruta /current:
Evitar enviar información sensible del usuario. Enviar un DTO (Data Transfer Object) que contenga solo la información necesaria y no sensible.


Sistema de Recuperación de Contraseña:
Implementar un sistema de recuperación de contraseña que envíe un correo con un botón para restablecer la contraseña.

El enlace del correo debe expirar después de una hora de ser enviado.

Evitar que el usuario pueda restablecer la contraseña a la misma que tenía anteriormente.


Middleware de Autorización:
Crear un middleware que trabaje junto con la estrategia “current” para limitar el acceso a ciertos endpoints:
Solo el administrador puede crear, actualizar y eliminar productos.

Solo el usuario puede agregar productos a su carrito.


Arquitectura Profesional:
Aplicar una arquitectura más profesional en el servidor, utilizando patrones de diseño, manejo de variables de entorno y técnicas avanzadas como mailing.


Mejora en la Lógica de Compra:
Profundizar en los roles de los usuarios y las autorizaciones aplicables a cada rol en el contexto de las compras dentro del ecommerce.


Formato de Entrega:

Link al repositorio de GitHub con el proyecto completo, excluyendo la carpeta node_modules.

Incluir el archivo .env necesario para la configuración de las variables de entorno.

Esta entrega final busca consolidar todos los conocimientos adquiridos durante el curso, enfocándose en la mejora de la arquitectura, seguridad y profesionalización del servidor, preparándote para desarrollar aplicaciones backend robustas y bien estructuradas.

Criterios:
Implementación de DAO y DTO en Capa de Persistencia:

Los DAOs y DTOs están adecuadamente estructurados y separados, siguiendo buenas prácticas de diseño y arquitectura. La transferencia de datos entre capas es eficiente y se minimiza el uso de consultas redundantes a la base de datos.

Patrón Repository y Lógica de Negocio:

El patrón Repository se aplica de manera ejemplar, separando claramente la lógica de acceso a datos de la lógica de negocio. Las operaciones de negocio se realizan de manera eficiente y coherente utilizando los Repository.

Middleware de Autorización y Seguridad de Endpoints:

El middleware de autorización se integra perfectamente con la estrategia "current", permitiendo delimitar el acceso a los endpoints según los roles de usuario de manera segura y eficiente.

Modelo de Ticket y Lógica de Compra:

El modelo Ticket se crea correctamente con todos los campos necesarios y se implementa una lógica de compra robusta que verifica el stock de los productos, genera tickets y maneja compras completas e incompletas de manera eficiente. Criterios de evaluación
