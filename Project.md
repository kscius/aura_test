📋 Descripción General
Desarrollar una API REST para gestión de usuarios con autenticación y un frontend simple que consuma esta API. El proyecto debe demostrar dominio de las tecnologías listadas y nuestra filosofía de comunicación asíncrona escrita.
Tiempo Límite
5 días desde la recepción de estas instrucciones.
Requisitos Técnicos
Backend
Node.js + Express (o Nest.js)
PostgreSQL como base de datos
TypeORM para el manejo de la base de datos
TypeScript (opcional pero recomendado)
Estructura modular de proyecto
Validaciones apropiadas
Migraciones de base de datos (opcional pero deseable)
Buenas prácticas de diseño de software
Frontend
React o Vue.js (a tu elección)
Consumo de la API REST
Interfaz limpia y funcional
Manejo de estados de carga y errores
📝 Funcionalidades Requeridas
API Endpoints (al menos)
POST /api/auth/register - Registro de usuario
POST /api/auth/login - Login de usuario
GET /api/users/profile - Obtener perfil (requiere autenticación)
PUT /api/users/profile - Actualizar perfil (requiere autenticación)
GET /api/users - Listar usuarios (requiere autenticación)
Frontend
Página de registro con validación de formulario
Página de login con manejo de errores
Dashboard que muestre:
Perfil del usuario logueado
Lista de usuarios registrados
Opción para editar perfil
Modelo de Usuario (mínimo)
{
  id: string/number,
  email: string,
  firstName: string,
  lastName: string,
  createdAt: Date,
  updatedAt: Date
}
🎯 Criterios de Evaluación
Técnicos (60%)
Arquitectura del código: Estructura modular y separación de responsabilidades
Calidad del código: Legibilidad, mantenibilidad y buenas prácticas
Seguridad: Implementación correcta de autenticación
Base de datos: Diseño de schema y uso apropiado de TypeORM
API Design: Endpoints RESTful bien diseñados
Validaciones: Manejo de errores y validación de datos
Comunicación Asíncrona Escrita (40%)
README.md completo: Instrucciones claras de instalación y uso
Documentación de API: Endpoints, parámetros y respuestas
Commits descriptivos: Mensajes claros que explican los cambios
Comentarios en código: Donde sea necesario para claridad
Decisiones técnicas: Documenta las decisiones importantes tomadas
📚 Documentación Esperada
1. README.md (OBLIGATORIO)
Debe incluir:
# Nombre del Proyecto

## Descripción
Breve descripción de lo que hace la aplicación

## Tecnologías Utilizadas
Lista de tecnologías y versiones

## Instalación y Configuración
### Prerrequisitos
### Pasos de instalación
### Variables de entorno
### Configuración de base de datos

## Uso
### Cómo ejecutar el proyecto
### Credenciales de prueba (si aplica)

## API Documentation
### Endpoints disponibles
### Ejemplos de requests/responses

## Decisiones Técnicas
### Arquitectura elegida
### Librerías adicionales y por qué

## Mejoras Futuras
### Qué agregarías con más tiempo
2. Comentarios en Código
Explica decisiones técnicas complejas
Documenta funciones no obvias
Incluye TODOs para mejoras futuras
3. Commits Descriptivos
Formato sugerido:
feat: add user authentication middleware
fix: handle validation errors in user registration
docs: update API documentation for auth endpoints
refactor: extract database connection to separate module
🚀 Entrega
Repositorio GitHub
Repositorio público con el código fuente
Deploy en vivo (recomendado):
Backend: Railway, Heroku, o similar
Frontend: Vercel, Netlify, o similar
Base de datos: PostgreSQL en la nube
Enviar por email:
Link al repositorio
Link al deploy (si existe)
Cualquier nota adicional
Estructura de Carpetas Sugerida
proyecto/
├── backend/
│   ├── src/
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md (principal)
 Tips para Destacar
Comunicación escrita clara: Trata el README como si fuera para un compañero que nunca ha visto el proyecto
Decisiones documentadas: Explica por qué elegiste ciertas librerías o patrones
Código limpio: Prefiere claridad sobre brevedad
Manejo de errores: Implementa validaciones y manejo de errores robusto
Testing: Aunque no es obligatorio, algunos tests unitarios sumarán puntos
¿Dudas?
Si tienes preguntas sobre los requerimientos, documenta tus suposiciones en el README. Valoramos la capacidad de tomar decisiones informadas cuando la información es ambigua.
¡Éxito!
Recuerda: buscamos ver tu proceso de pensamiento tanto como el resultado final. La documentación y comunicación escrita son tan importantes como el código que escribas.