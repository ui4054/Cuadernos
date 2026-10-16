# Arquitectura compartida para webs explicativas de cursos

## Propósito

Crear una página de orientación teórica y navegación para cada curso, inspirada en la profundidad didáctica del portal de Bases de Datos Avanzadas, pero con explicaciones originales basadas en los materiales del curso y una identidad cromática propia. La biblioteca de la raíz sigue siendo el índice de cursos; cada página explicativa vive en la carpeta de su curso.

## Flujo de agentes

```text
Arquitecto de la biblioteca
          |
          v
Orquestador selecciona un curso
          |
          v
Constructor de webs de curso ----> Revisor de webs de curso
          ^                               |
          |--------- cambios requeridos --|
                  loop hasta PASS
          |
          v
Integración en la biblioteca
```

- **Arquitecto:** mantiene este contrato, el esqueleto compartido y la guía de paletas.
- **Constructor:** trabaja en un curso por tarea, revisa los notebooks y crea su página.
- **Revisor:** audita de forma independiente; es de solo lectura y debe responder `PASS` o `CHANGES REQUIRED`.
- **Orquestador:** mueve el curso por el ciclo construir → revisar → corregir → revisar y solo integra una página cuando pasa.
- El piloto de Álgebra Lineal fue aprobado por la persona responsable y obtuvo `PASS` en la revisión independiente; el patrón está aprobado para el despliegue.
- El backlog y avance por curso están registrados en `agents/ESTADO_WEBS_CURSO.md`.

## Organización y límites

- La página explicativa se llama `index.html` dentro de la carpeta del curso si no existe ya una página propia. Si existe un sitio, añadir una guía separada (por ejemplo, `guia.html`) en vez de sobrescribirlo.
- El stylesheet compartido está en `course-theme.css`, en la raíz. Cada página usa `../course-theme.css` y establece su paleta mediante `data-course` en `<html>`.
- Recursos visuales o scripts específicos de un curso deben vivir en su propia carpeta.
- Dependencias estáticas compartidas con licencia, como KaTeX, deben alojarse localmente en `vendor/` con su licencia correspondiente; las páginas no deben depender de CDNs para contenido esencial.
- Los `.ipynb` son descargas individuales desde la página; no se incrustan ni se transforman.
- Mantener los sitios existentes (incluido `bases datos avanzadas/`) funcionando sin cambios involuntarios. La inspiración es su estructura didáctica, no copiar el contenido ni el aspecto exacto.
- Para cada curso existente con `index.html`, evaluar si ya satisface los criterios como guía explicativa; preservar el sitio y adaptar en el lugar solo si es seguro, o añadir `guia.html` si hay un vacío pedagógico real. Enlazar claramente desde la biblioteca a los recursos aprobados.
- No enlazar materiales con nombres sugerentes de credenciales en `WEB_BASICO/` hasta revisión humana.

## Estructura mínima de la página

1. **Cabecera:** nombre, identificador visual, regreso a la biblioteca y navegación por anclas.
2. **Portada:** área/contenido del curso, promesa formativa prudente y llamada a comenzar.
3. **Descripción y objetivos:** para qué sirve el contenido y qué podrá hacer el estudiante, sustentado por fuentes.
4. **Ruta o módulos:** secuencia fiel a los cuadernos; exponer primero los fundamentos.
5. **Bloques teóricos:** conceptos, definiciones, fórmulas/diagramas si los materiales los sustentan.
6. **Ejemplos guiados:** ejemplos originales derivados del material, con todos los pasos, cálculos intermedios, interpretación y comprobación visibles en HTML.
7. **Cuadernos y recursos:** nombre legible, propósito respaldado por el material y descarga individual.
8. **Cierre y navegación:** enlaces útiles a otros recursos del curso y retorno al índice general.

Cuando un notebook no contenga información suficiente para una sección, omitirla o señalarla como pendiente; no rellenar con teoría supuesta.

## Sistema visual

- Compartir tipografía de sistema, escalas de espaciado, jerarquía visual, componentes y estados de foco.
- Diferenciar cada curso mediante un color acento/paleta propia, no únicamente mediante el nombre.
- Colores por defecto propuestos; pueden ajustarse si producen contraste insuficiente:

| Curso | Acento claro | Acento profundo | Motivo |
|---|---|---|---|
| Álgebra Lineal (piloto) | `#8B7CF6` | `#39306F` | Vectores y estructura |
| Cálculo Integral y Financiero | `#E49B45` | `#714316` | Cambio y acumulación |
| CunTech 2025 | `#35B6A4` | `#145D56` | Aprendizaje web |
| CunTech APIs y Cloud | `#4F9CF5` | `#193D70` | Nube e infraestructura |
| Diseño de Software | `#C878A9` | `#66324F` | Composición de sistemas |
| Estadística Descriptiva | `#28A889` | `#145849` | Exploración de datos |
| Estadística Inferencial | `#5B8EDB` | `#263F70` | Incertidumbre y evidencia |
| Física Mecánica | `#E66E54` | `#713426` | Movimiento y fuerzas |
| Física Ondas y Electricidad | `#C8793F` | `#67401F` | Ondas y energía |
| Fundamentos de Programación | `#62A64D` | `#315C2B` | Construcción paso a paso |
| Inteligencia de Negocios | `#2AAE93` | `#155E4D` | Decisiones con datos |
| Programación Orientada a Objetos II | `#D28C3E` | `#70491F` | Modelado y abstracción |

Los cursos con una web ya madura pueden conservar su identidad cuando se integren. Evitar inventar una segunda interfaz para ellos si bastan mejoras de navegación o contenido.

## Fidelidad de contenido

- Antes de redactar, identificar títulos, definiciones, ejemplos, notación, secuencia y limitaciones en los `.ipynb` y materiales disponibles.
- No atribuir autoría, resultados, prerrequisitos ni cobertura que no conste en los materiales.
- Mantener notación matemática correcta y explicar símbolos; incluir fórmula solo si está sustentada.
- En cursos con ecuaciones, renderizar matemáticas con KaTeX (incluye expresiones en línea y bloques). Mostrar el desarrollo de las soluciones en la página HTML por pasos; no remitir al notebook como sustituto de la explicación. Verificar que dependencias carguen y que las ecuaciones no causen desbordamiento móvil.
- Distinguir hechos del material de recomendaciones pedagógicas añadidas.
- No copiar bloques extensos literalmente: explicar con redacción propia y citar/referenciar el notebook fuente local correspondiente.

## Accesibilidad y calidad

- HTML semántico, `lang="es"`, títulos jerárquicos, enlaces descriptivos y controles operables con teclado.
- Contraste legible, indicador de foco visible, diseño responsive y respeto a `prefers-reduced-motion`.
- Rutas relativas válidas con espacios/acentos codificados en los enlaces.
- No depender de CDN para que se muestre el contenido esencial; las librerías de renderizado necesarias deben empaquetarse localmente o contar con una alternativa funcional.
- La navegación global permite volver a la biblioteca; cada descarga debe identificar el archivo.

## Criterios de aceptación por curso

- Página completa y responsive con la paleta del curso aplicada.
- Estructura mínima implementada o secciones justificadamente omitidas por falta de fuentes.
- Explicaciones alineadas con los notebooks y ejemplos identificados.
- Ecuaciones renderizadas con KaTeX y al menos un desarrollo matemático pertinente mostrado paso a paso en el HTML cuando las fuentes incluyan ejercicios calculables.
- Todas las descargas y enlaces locales verificados.
- Revisión del agente revisor con `PASS`; los hallazgos bloqueantes deben cerrarse antes de integrar.
- La biblioteca principal incluye una acción diferenciada para abrir la guía, sin ocultar el sitio original o las descargas.
- Los recursos matemáticos renderizan sin conexión desde el bundle local con su licencia y fuentes presentes.
