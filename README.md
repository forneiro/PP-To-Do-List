## Descripción
Aplicación web interactiva diseñada para la gestión de tareas de forma local. El proyecto permite crear, visualizar y eliminar tareas persistiendo la información directamente en el navegador. Además cuenta con tres columnas que definen el estado actual de la tarea: pendiente, en proceso y finalizada.

## Tecnologías Utilizadas
  - **HTML5:** Estructura semántica para la accesibilidad.
  - **CSS:** Diseño responsive mediante Media Queries y maquetación con Flexbox.
  - **JavaScript (ES6+):**
  -   - LocalStorage: Para la persistencia de datos del lado del cliente sin base de datos externa.
      - Manipulación del DOM: Renderizado dinámico de tareas y manejo de eventos.

## Desafíos Técnicos y Aprendizajes
Uno de los mayores retos fue agregar los eventos para poder cambiar las tareas de columna.
Para lograrlo, planifiqué la arquitectura del código separando el código en diferentes funciones.

## Funcionalidades Clave
  - **CRUD Local:** Los usuarios pueden agregar, editar y eliminar tareas, los datos se mantienen incluso al refrescar la página gracias a localStorage.
  - **Diseño Responsive:** La interfaz se adapta automáticamente a dispositivos móviles y escritorio (breakpoint de 968px).

## Cómo ejecutar el proyecto
  1. Clona el repositorio
  2. Abre el archivo index.html en tu navegador.

