<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"/> <img src="https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white"/>
<img src="https://img.shields.io/badge/Handlebars%20js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black"/>
<img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white"/>

# E-commerce Backend API

Backend para una aplicación de e-commerce construido con Node.js, Express y MongoDB, siguiendo una arquitectura profesional por capas.

## Características Principales

- **Arquitectura:** Controller - Service - Repository (DAO).
- **Autenticación:** JWT con cookies `httpOnly`.
- **Autorización:** Basada en roles (`admin`, `user`).
- **Carrito:** Persistente y único por usuario.
- **Compra:** Generación de `Tickets` con manejo de stock.
- **Productos:** Borrado lógico (`soft delete`) para mantener integridad histórica.
- **Seguridad:** Recuperación de contraseña con tokens de 1 hora de expiración.
- **Automatización:** Seeding inicial de base de datos con usuarios y productos.

## Tecnologías

- **Backend:** Node.js, Express.js
- **Base de Datos:** MongoDB, Mongoose, `mongoose-paginate-v2`
- **Autenticación:** Passport.js (JWT), `bcrypt`
- **Vistas:** Express Handlebars
- **Otros:** Socket.io, Nodemailer, Multer, Dotenv, UUID

## Puesta en Marcha

1.  **Clonar y entrar al directorio:**

    ```bash
    git clone <URL-DEL-REPOSITORIO>
    cd II_backend
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar `.env`:**
    Crea un archivo `.env` en la raíz (`II_backend`) y complétalo.
    _Nota: No se enviarán emails a cuentas `@example.com`._

    ```dotenv
    MONGO_URL=mongodb+srv://<user>:<pass>@cluster...
    PORT=3132
    JWT_SECRET=your_super_secret_jwt_key
    COOKIE_SECRET=your_super_secret_cookie_key
    SMTP_USER=tu_email@gmail.com
    SMTP_PASS=tu_contraseña_de_aplicacion_de_gmail
    ```

4.  **Iniciar servidor:**
    ```bash
    npm run dev
    ```

## Usuarios de Prueba (Seed)

Al iniciar por primera vez, se crearán los siguientes usuarios para facilitar las pruebas:

| Rol       | Email               | Contraseña         |
| :-------- | :------------------ | :----------------- |
| **Admin** | `admin@example.com` | `adminPassword123` |
| **User**  | `user@example.com`  | `userPassword123`  |

## Documentación y Colección Postman

La documentación completa de la API, con ejemplos de uso, se encuentra en la carpeta `/documentation`. Abre `index.html` en tu navegador.

La colección de Postman para probar los endpoints está en `/documentation/postman`.
