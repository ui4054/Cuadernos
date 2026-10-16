# Instrucciones para agregar nuevos cuadernos a carpetas de curso

> **Nombre:** Agregador de cuadernos a la biblioteca de cursos  
> **Descripción:** Procedimiento para incorporar archivos `.ipynb` nuevos a carpetas de cursos existentes en la biblioteca web y mantener sincronizados el inventario, el estado de construcción y la página principal de la biblioteca.  
> **Herramientas:** read, write, edit, glob, grep  
> **Usuario invocable:** true  
> **Ubicación:** `agents/AGREGAR_CUADERNOS.md`

---

## Propósito

Establecer un contrato de solo lectura y escritura controlada para cuando el usuario agregue nuevos cuadernos Jupyter (`.ipynb`) a cualquier carpeta de curso del repositorio. El objetivo es que la biblioteca principal (`index.html`, `app.js`), el inventario (`agents/INVENTARIO_BIBLIOTECA.md`) y el estado de construcción (`agents/ESTADO_WEBS_CURSO.md`) reflejen siempre los materiales disponibles sin romper enlaces ni crear entradas huérfanas.

---

## Límites

- No modificar ni mover cuadernos existentes. Solo registrar los nuevos.
- No abrir ni copiar valores de archivos que puedan contener secretos, credenciales, claves o datos privados (`WEB_BASICO/` y cualquier archivo con nombres sugerentes de secretos). Registrar únicamente su ruta/nombre y marcar el riesgo para revisión.
- No inspeccionar el contenido de bases de datos, archivos comprimidos ni otros formatos binarios; registrar su presencia y tipo.
- Conservar cambios preexistentes de otras personas; no limpiar ni sobrescribir archivos.
- No construir ni modificar el sitio de biblioteca más allá de lo estrictamente necesario para registrar el nuevo cuaderno en `app.js`.
- Escribir únicamente en: `app.js`, `agents/INVENTARIO_BIBLIOTECA.md` y `agents/ESTADO_WEBS_CURSO.md`.

---

## Procedimiento

### 1. Detectar el nuevo cuaderno

1.1. Identificar la carpeta de curso destino (ej. `AnalíticaDatos/`, `Calculo_Int_Finan/`, etc.).
1.2. Confirmar que el archivo nuevo tiene extensión `.ipynb`.
1.3. Anotar la ruta relativa exacta desde la raíz del repositorio (ej. `AnalíticaDatos/Python_2_avanzado.ipynb`).
1.4. Verificar que no exista ya una entrada idéntica en `app.js` para evitar duplicados.

### 2. Actualizar el inventario de biblioteca

2.1. Abrir `agents/INVENTARIO_BIBLIOTECA.md`.
2.2. Localizar la fila del curso correspondiente en la tabla "Tabla por curso".
2.3. Incrementar la cantidad de cuadernos `.ipynb` en el resumen de contenido.
2.4. Si el curso cambió de estado web (ej. de `sin web` a `sin web` pero con más materiales), dejar el estado igual salvo que se agregue un `index.html` propio.
2.5. Agregar una observación si detecta nombres que requieran normalización (espacios, acentos, mayúsculas/minúsculas mezcladas).

### 3. Actualizar el estado de construcción de webs

3.1. Abrir `agents/ESTADO_WEBS_CURSO.md`.
3.2. Localizar la fila del curso en el backlog.
3.3. Si el curso ya tiene estado `PASS` o `sitio existente`, no cambiar el estado; solo anotar en la columna "Notas" del registro de ejecuciones que se agregó un cuaderno nuevo con fecha y ruta relativa.
3.4. Si el curso está `pendiente`, no cambiar el estado por el solo hecho de agregar un cuaderno; dejar la siguiente acción vigente hasta que se construya la página explicativa.

### 4. Actualizar la biblioteca principal (`app.js`)

4.1. Abrir `app.js` en la raíz del repositorio.
4.2. Localizar el objeto del curso en el array `courses` por su propiedad `name`.
4.3. Agregar la ruta relativa del nuevo notebook al array `notebooks` de ese curso, respetando el orden existente o agregando al final.
4.4. Si el curso no tiene guía (`guide`) y ahora sí tiene más de un cuaderno, no agregar `guide` automáticamente; solo se agrega cuando existe una página explicativa `index.html` en la carpeta del curso.
4.5. No modificar la propiedad `website` salvo que el curso cuente con un sitio navegable propio y se desee cambiar el acceso.

### 5. Registrar en el log de ejecuciones

5.1. Abrir `agents/ESTADO_WEBS_CURSO.md`.
5.2. En la sección "Registro de ejecuciones", agregar una fila con:
   - Fecha actual.
   - Curso(s) afectados.
   - Acción: "Agregado cuaderno".
   - Notas: ruta relativa del archivo nuevo y cualquier observación (ej. nombre con espacios, posible duplicado aparente).

---

## Formato de entrada en `app.js`

Ejemplo de cómo debe verse la entrada actualizada en el array `courses`:

```javascript
{
    name: 'Nombre del Curso',
    description: 'Descripción existente.',
    icon: 'ícono existente',
    guide: 'CarpetaCurso/index.html', // solo si existe
    notebooks: [
        'CarpetaCurso/notebook_existente.ipynb',
        'CarpetaCurso/nuevo_cuaderno.ipynb' // <- nueva entrada
    ]
},
```

Reglas:
- Usar rutas relativas al repositorio (no absolutas de la máquina).
- Codificar espacios y acentos en las rutas si es necesario para URLs, pero dejar los nombres de archivo originales en los strings de JavaScript.
- No reordenar cuadernos existentes salvo que sea necesario para mantener una secuencia lógica documentada en el notebook.

---

## Checklist de aceptación por nuevo cuaderno

Un cuaderno queda registrado correctamente solo cuando se cumplen todos los puntos:

- [ ] Ruta relativa verificada y existente en el sistema de archivos.
- [ ] Entrada agregada al array `notebooks` del curso correspondiente en `app.js`.
- [ ] Cantidad de cuadernos actualizada en `agents/INVENTARIO_BIBLIOTECA.md`.
- [ ] Fila de registro de ejecuciones agregada en `agents/ESTADO_WEBS_CURSO.md`.
- [ ] No se modificó ningún archivo de curso existente.
- [ ] No se enlazaron materiales con nombres sugerentes de credenciales en `WEB_BASICO/`.

---

## Recomendaciones UX / normalización

- Si el nuevo cuaderno tiene espacios, acentos o mezcla de mayúsculas/minúsculas, anotarlo como observación para posible normalización futura de URLs limpias.
- Si se agregan varios cuadernos a un curso que aún no tiene página explicativa (`index.html`), considerar mover ese curso a `pendiente` en el backlog para construir su guía explicativa.
- Si el curso ya tiene `index.html` (sitio existente), no crear una guía duplicada solo por agregar cuadernos; solo registrar las descargas en `app.js`.

---

## Pendientes para validar con la persona responsable

- Confirmar que los datos en los nuevos cuadernos son ficticios y no contienen datos personales antes de ofrecerlos como descarga.
- Revisar posibles nombres duplicados o de respaldo (ej. `archivo - copia.ipynb`) antes de asumir que son material nuevo válido.
- Revisar `WEB_BASICO/` antes de decidir si sus archivos se deben publicar; por ahora se excluyen porque sus nombres sugieren credenciales.

---

## Cierre

Este documento no construye páginas explicativas ni modifica sitios existentes. Su único propósito es mantener sincronizados el inventario, el estado de construcción y la biblioteca principal cuando se agregan nuevos cuadernos a las carpetas de curso.