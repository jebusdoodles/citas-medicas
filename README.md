## Introduction (English)

This is a personal mobile application for managing medical appointments. The entire project, including documentation, code comments, and user interface, is written in Spanish. The following README is also in Spanish.

---

## Introducción

Aplicación móvil personal desarrollada con las siguientes tecnologías:

- React Native + Expo Go (JavaScript, no TypeScript)
- Firebase con su respectiva REST API
- Expo Router

**Objetivo:** Un paciente necesita llevar un control básico de sus citas médicas, sin necesidad de alta escalabilidad y con menos de cincuenta peticiones diarias. Para esto se crea una aplicación en la que las citas aparecen ordenadas en formato de lista de cards. El paciente puede consultar, crear, editar y borrar citas.

## Alcance

- Crear, visualizar, editar y borrar citas médicas.
- Cada cita tiene una hora (hh:mm), una fecha (dd/mm/aa), nombre del doctor, título y completada (booleano).
- La pantalla principal muestra una lista de citas, organizada por fechas de la más cercana a la más lejana.

## Organización de Datos

Estructura de datos en Firebase de la cita médica:

- **ID:** única key para cada cita
- **Nombre Médico:** `name_doctor` (tipo string)
- **Título:** `title` (tipo string)
- **Fecha:** `dd/mm/aa` (tipo string)
- **Hora:** `hh:mm` (tipo string)
- **Completado:** tipo boolean
- **CreatedAt:** timestamp

## Modelado de Datos

```
CITAS
- ID: string
- name_doctor: string
- title: string
- fecha: string
- hora: string
- completada: boolean
- createdAt: timestamp
```

## Interfaz de Usuario

- **Pantalla de inicio:** Muestra una lista de cards ordenadas de citas (sin completar) de la más próxima a la más lejana. Las cards tienen información como título (Title), subtítulo Día - Hora, y en la parte izquierda superior el nombre del doctor truncado a 10 caracteres (fig 1).
- **Pantalla Historial:** Lista de cards de citas (completadas) ordenadas en secciones por mes - año (fig 1.2).
- **Crear citas:** Al presionar el botón de crear cita se desliza un formulario desde la parte inferior de la pantalla (modal) con un formulario que tiene nombre de doctor, departamento, hora y fecha (posiblemente en un calendario). Todas las citas se crean con completada en false (fig 1.1).
- **Editar citas:** Misma forma que crear; al hacer clic en cualquier card se abre un modal que contiene un formulario desde la parte inferior, cargado con la información de la cita y campos de texto para editar, con un botón que dice "Guardar Cambios".
- **Borrar citas:** Se presiona un icono (bote de basura en rojo) y aparece una alerta para que el usuario acepte o cancele.
- **Ver información de cita:** Al presionar una cita se abre el mismo modal de editar cita con la información de la cita médica y los botones de guardar o cancelar en la parte inferior. En su extremo superior derecho aparece un icono de un bote de basura en color rojo para borrar la cita.

## Historias de Usuario

- **HU1:** Como usuario quiero crear una nueva cita.
  **Criterio:** Dado que estoy en Home, cuando toco `button_add_cita`, entonces se abre el modal desde la parte inferior con los campos vacíos y el botón Guardar deshabilitado hasta que `title`, `name_doctor`, `fecha` y `hora` tengan valor.

- **HU2:** Como usuario quiero editar la información de una cita ya creada anteriormente y aún sin completar: nombre doctor, título, fecha, hora y completado.
  **Criterio:** Dado que estoy en el Home y visualizo la lista de Cards con las citas futuras, doy clic a una card, lo que acciona el modal que se desliza desde la parte inferior con la información precargada de la cita a la que di clic, con dos botones: el primario Guardar y el secundario Cancelar.

- **HU3:** Como usuario quiero tener en mi pantalla principal, en primera vista, de forma descendente mis próximas citas (no completadas) con divisores de mes - año.
  **Criterio:** Al abrir la aplicación, la lista se carga en la parte del cuerpo de la aplicación, ordenada por fecha y hora desde la más próxima hasta la más lejana.

- **HU4:** Como usuario quiero eliminar citas y que me aparezca una alerta para preguntarme si estoy seguro.
  **Criterio:** Dado que estoy en la pantalla principal, doy clic en una card de cita para que se despliegue el modal de edición. Además del formulario con la información precargada, en la parte superior derecha aparece un icono trash de 10px por 10px en color rojo. Al darle clic se abre una alerta con la pregunta: "¿Está seguro de eliminar esta cita?" con dos botones: el secundario "Sí" y el principal "Cancelar". Al dar clic en "Sí", la cita se elimina y se cierra la alerta y el modal; la lista de cards se recarga ahora sin la cita eliminada.

## Flujo de Usuario

### Acción Nueva Cita

1. Abre la app.
2. El usuario toca el botón `add_button_date`.
3. Se abre el formulario en un modal que se desliza desde la parte inferior de la app.
4. Se ingresa información: título, nombre doctor, fecha y hora.
5. El usuario toca el botón Guardar; la información se verifica y se almacena en BD.
6. Fin.

### Acción Eliminar Cita

1. Abrir la app.
2. El usuario da clic en una card de cita.
3. Se desliza desde la parte inferior el modal de editar cita; el usuario da clic al icono trash-can.
4. Aparece la pregunta: "¿Está seguro de eliminar esta cita?"
   - **Sí:** La cita se elimina y se recarga la interfaz de inicio.
   - **Cancelar:** La alerta desaparece y el modal de edición sigue abierto.
5. Fin.

### Acción Editar Cita

1. Abrir App.
2. El usuario da clic en una card de cita.
3. Se abre el modal en modo edición con el formulario precargado con la información de la cita.
4. El usuario cambia información y da clic en guardar.
5. Aparece la pregunta: "¿Está seguro de cambiar la cita?"
   - **Sí:** La información se cambia, el modal se cierra y la card se actualiza.
   - **Cancelar:** El modal se cierra y la información no cambia.
6. Fin.

## Consideraciones Técnicas

- Tecnologías compatibles con React Native 54.
- Almacenamiento en Firebase usando su REST API con tope de peticiones.
- Aplicación personal de un solo usuario.
- Sin login, fingerprint o algún tipo de seguridad.
- Notificaciones locales no contempladas en versión 1.0.
- Configuración: sin pantalla de configuración de tamaño de texto, zona horaria o vista noche/día. Aplicación sencilla.
- Offline first: si se puede aplicar, usar una forma de almacenamiento interno con Async Storage y persistencia en caché.

## Navegación

```
BottomTabNavigator
  HomeStack (vista default al abrir la app)
    |-- HomeScreen
  HistoryStack
    |-- HistoryScreen
Modal (se abre al dar clic en un card o en el botón button_add_cita): AddEditModal
```

El DetailScreen como tal es solo el Modal (AddEditModal) con la información precargada en los text fields editables, como si se fuera a editar la información de la cita.

## Sistema de Diseño

### Colores

- **Color primario:** #71C1C4
- **Color secundario:** #E7F3F3
- **Color texto:** #787676
- **Color de fondo:** #F4F8F9

### Componentes UI

- **Botones (fig 2.0):** Se muestran tres botones con sus cuatro esquinas redondeadas a 16px de radio. El primero es el botón principal #71C1C4 de color de fondo, con texto color #ffffff y peso de texto bold. El segundo es el botón secundario con texto en blanco y peso bold, con color de fondo #E7F3F3. El tercero es el botón outline sin color de fondo, con outline de 1.5px y #71C1C4, texto del botón bold y #71C1C4.
- **Cards (fig 2.1):** Las tarjetas tienen fondo #ffffff, corner radius 16px, texto color #000000, título bold, subtítulo regular. Las tarjetas tienen una sombra drop shadow X 0, Y 4, Blur 4, Color #000000 con transparencia 4.
- **Input fields (fig 2.2):** Text field con corner radius 16px, color de texto de placeholder #787676. Text field con texto ingresado por el usuario: color de texto #000000 y texto en Bold. Input con error: sin color de fondo y outline de 1px color #FF383C.
- **Tabbar (fig 2.3):** El menú para cambiar entre screens es una pastilla con corner radius 60px, fondo #cccccc. El link de la página activa tiene un fondo #71C1C4 y el color de texto #ffffff bold. El color de texto del screen inactivo es sin fondo, texto #767676 y peso Regular.

## Pruebas y Cierre

Asegurar que el alcance inicial está cubierto.

## Artefacto de Salida

- Crear cita → Ver en Home → Marcar como completada → Ver en Historial → Editar → Eliminar.
- Pasos para empaquetar en APK.