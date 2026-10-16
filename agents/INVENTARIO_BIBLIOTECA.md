# Inventario de la biblioteca de cursos

Fecha del inventario: 2026-10-14

## Método y límites

- Criterio acordado para la biblioteca: los archivos `.ipynb` se ofrecerán como descargas individuales. La persona responsable confirma que los datos didácticos son ficticios y no contienen datos personales; los CSV, JSON y bases de datos usados como práctica se ofrecerán como recursos descargables.
- Se recorrieron las carpetas principales del repositorio con inspección de estructura de archivos y recursos principales.
- Para el inventario inicial, se identificaron sitios existentes por la presencia de `index.html` y archivos locales asociados (`css`, `js`, `assets`, notebooks enlazados), sin ejecutarlos ni construir la biblioteca web.
- Se excluyeron `.git` y cachés del inventario de contenido.
- No se abrieron bases de datos ni archivos con nombres sugerentes de secretos/credenciales. Los datos de práctica se incluyen según la confirmación de la persona responsable. La persona responsable confirma que el archivo `.rar` de CunTech API es un repositorio de ejemplo compuesto por código HTML y otros recursos web.
- No se modificaron ni movieron archivos de cursos. Este informe documenta el inventario; la primera versión funcional de la biblioteca está en la raíz del repositorio (`index.html`, `styles.css`, `app.js`).

## Resumen ejecutivo

El repositorio contiene principalmente material didáctico organizado en 15 carpetas de cursos: 63 cuadernos Jupyter descargables y tres sitios web existentes. Se incluyen también datasets ficticios de dos cursos. Los casos más maduros para una biblioteca web son:

- `bases datos avanzadas/`: tiene un sitio navegable completo con varios módulos HTML, CSS, JS, notebooks y datasets.
- `Est_Descriptiva/`: cuenta con una landing HTML interactiva con estilos, JS y contenido pedagógico.
- `Inteligencia de Negocios/`: tiene una presentación estática con estilo local y recursos de datos.

La mayoría de los cursos restantes son colecciones de notebooks sin aplicación web, por lo que para la biblioteca deberían exponerse como descargas de cuadernos/materiales más que como sitios directos. Los datos de práctica se consideran ficticios según la confirmación recibida. Se mantienen excluidos de esta primera versión únicamente los textos con nombres sensibles (`WEB_BASICO/`).

## Tabla por curso

| Carpeta | Resumen de contenido y cantidades principales | Estado web | Acceso sugerido (ruta relativa) | Observaciones / riesgos |
|---|---|---|---|---|
| `Algebra Lineal` | 4 archivos `.ipynb` (`Aplicacion_Empresas.ipynb`, `Ejercicios_det.ipynb`, `Soluciones_Determinantes.ipynb`, `Teoria _algebra_lineal_determimantes.ipynb`) | `sin web` | `Algebra Lineal/` | Material solo notebook. No hay HTML ni JS. Requiere acceso directo a cuadernos. |
| `AnalíticaDatos` | 1 cuaderno principal `.ipynb` y 3 archivos en `.ipynb_checkpoints` (excluidos de la biblioteca) | `sin web` | `AnalíticaDatos/Python_1_colab.ipynb` (descarga) | Sin interfaz web. Los checkpoints son archivos auxiliares y no se ofrecerán como descargas. |
| `bases datos avanzadas` | 30 archivos: 10 HTML (`modulo00...modulo08`, `index.html`), 1 CSS, 1 JS, 9 cuadernos en `cuadernos/`, 6 CSV, 2 `.py`, 1 `.db` | `sitio existente` | `bases datos avanzadas/index.html` | Sitio navegable con landing y módulos enlazados; incluye dependencias de CDN. Los 6 CSV y `empresa_cun.db` se ofrecen como datos de práctica ficticios. |
| `Calculo_Int_Finan` | 5 archivos `.ipynb` | `sin web` | `Calculo_Int_Finan/` | Sin interfaz de usuario. Requiere acceso a cuadernos, no a sitio. |
| `Cun_Tech_API_bs` | 10 archivos: 8 `.ipynb`, 1 JS (`app1/holamundo.js`), 1 `.rar` (`repo_final/web_hotel_srvlss.rar`) | `parcial` | Descargas de cuadernos y `Cun_Tech_API_bs/repo_final/web_hotel_srvlss.rar` | El RAR es un repositorio de ejemplo con código HTML y otros recursos web, según confirmación del responsable; se ofrece como descarga, no como sitio que se abra directamente. |
| `CunTech_2025` | 10 archivos `.ipynb` de HTML y programación básica | `sin web` | `CunTech_2025/` | Material de cuadernos, sin app web. Hay nombres con mezcla de mayúsculas y contenido académico; no se detectó sitio. |
| `DiseñoSoftware` | 2 archivos `.ipynb` | `sin web` | `DiseñoSoftware/` | Solo notebooks. No hay artefactos web. |
| `Est_Descriptiva` | 6 archivos: `index.html`, `styles.css`, `app.js`, 3 notebooks; además `lab_guia/` con un notebook | `sitio existente` | `Est_Descriptiva/index.html` | Landing temática con recursos locales y librerías externas (Chart.js, KaTeX, Prism). Es un sitio navegable de contenido teórico + práctica Python. |
| `Est_Inferencial` | 1 archivo `.ipynb` | `sin web` | `Est_Inferencial/` | Solo cuaderno; no hay sitio. |
| `Fisica Mecánica` | 5 archivos `.ipynb`; incluye una copia marcada con `- copia` | `sin web` | `Fisica Mecánica/` | Observado un nombre sospechoso de duplicado aparente: `FISMEC_3_ACELERADO - copia.ipynb`. No se asume duplicado sin revisión humana; queda como posible archivo de apoyo. |
| `FisicaOndasElect` | 3 archivos `.ipynb` | `sin web` | `FisicaOndasElect/` | Material didáctico en cuadernos. Ninguna web detectada. |
| `fundamentos programación` | 9 archivos `.ipynb` | `sin web` | `fundamentos programación/` | Colección de cuadernos introductorios; no hay recursos web. Inconsistencia de nombre con espacios y minúsculas, requiere normalización en UX. |
| `Inteligencia de Negocios` | `index.html`, `styles.css`, `script.js`, 1 cuaderno, 2 CSV, 1 JSON y base `bi_warehouse.db` | `sitio existente` | `Inteligencia de Negocios/index.html` | Presentación estática con dependencias externas de Google Fonts y Font Awesome. Los datos de `data_lake/` y la base se ofrecen como recursos de práctica ficticios. |
| `PrograObjetos2` | 2 archivos `.ipynb` | `sin web` | `PrograObjetos2/` | Solo notebooks. |
| `WEB_BASICO` | 3 archivos `.txt` con nombres claros de claves/servicios (`BASICO_SERVER_NODE.txt`, `CLAVE MONGO MANGOSTINO.txt`, `CREACION DEL MODELO.txt`) | `por revisar` | `WEB_BASICO/` | No se abrieron por riesgo de datos privados, secretos o claves. Se requiere revisión humana antes de incluir cualquier enlace o contenido. |

## Detección de sitios o aplicaciones existentes

### Sitios navegables / aplicaciones de contenido

- `bases datos avanzadas/index.html`: es el caso más claro de portal didáctico. Tiene múltiples pantallas HTML (`modulo00...modulo08`) enlazadas localmente con rutas relativas; carga estilos y scripts locales y CDN; es una aplicación web estática didáctica.
- `Est_Descriptiva/index.html`: es un sitio de guía didáctica con secciones, cálculo interactivo y JS local; se presenta como una aplicación de contenido accesible por navegador.
- `Inteligencia de Negocios/index.html`: es una presentación narrativa con navegación por slides, cargando estilos locales y bibliotecas externas; se clasifica como una página web/presentación construida en HTML/CSS/JS.

### Material sin web

- `Algebra Lineal`, `AnalíticaDatos`, `Calculo_Int_Finan`, `CunTech_2025`, `DiseñoSoftware`, `Est_Inferencial`, `Fisica Mecánica`, `FisicaOndasElect`, `fundamentos programación`, `PrograObjetos2`.
- Todos son principalmente notebooks o colecciones de materiales sin ningún `index.html`, `script.js` o estructura navegable. Los cuadernos se enlazarán individualmente con descarga, no mediante un enlace a la carpeta.

### Material mixto / por revisión

- `Cun_Tech_API_bs`: contiene notebooks, un ejemplo JS y un repositorio web de ejemplo comprimido. El comprimido se ofrece para descarga; no se presenta como un sitio ejecutable directamente.
- `WEB_BASICO`: no es una app, pero sí un conjunto de archivos de texto con nombres que sugieren credenciales o secretos; se marca como caso de riesgo para revisión.

## Rutas relativas relevantes para la biblioteca

Estas rutas son las más evidentes para enlazar desde una biblioteca web sin asumir dependencias externas no verificadas:

- `bases datos avanzadas/index.html`
- `Est_Descriptiva/index.html`
- `Inteligencia de Negocios/index.html`
- `bases datos avanzadas/` (si se desea acceso por carpeta)
- `Est_Descriptiva/`
- `Inteligencia de Negocios/`
- `Algebra Lineal/`
- `AnalíticaDatos/`
- `Calculo_Int_Finan/`
- `CunTech_2025/`
- `DiseñoSoftware/`
- `Est_Inferencial/`
- `Fisica Mecánica/`
- `FisicaOndasElect/`
- `fundamentos programación/`
- `PrograObjetos2/`
- `Cun_Tech_API_bs/repo_final/web_hotel_srvlss.rar` (descarga del repositorio de ejemplo)

Las rutas de carpetas y de notebooks anteriores son referencias del inventario, no enlaces web ya comprobados. Un servidor estático normalmente no muestra el contenido de una carpeta sin un `index.html`; la decisión acordada es ofrecer cada cuaderno mediante un enlace de descarga individual.

## Duplicados aparentes, normalización y riesgos

- Existen nombres de carpetas con inconsistencia de formato: espacios, mayúsculas/minúsculas, acentos y variaciones de estilo (`bases datos avanzadas`, `CunTech_2025`, `Cun_Tech_API_bs`, `fundamentos programación`, `Inteligencia de Negocios`, `Algebra Lineal`, `Est_Descriptiva`).
- Hay un posible archivo de copia marcado explícitamente: `Fisica Mecánica/FISMEC_3_ACELERADO - copia.ipynb`.
- `WEB_BASICO/` contiene archivos con contenido sensible potencial, por lo que no se deben publicar ni abrir sin validación.
- La carpeta `Inteligencia de Negocios/data_lake/` y los archivos `*.db` se ofrecen como material didáctico descargable, según la confirmación de que los datos son ficticios.
- `Cun_Tech_API_bs/repo_final/web_hotel_srvlss.rar` es un repositorio de ejemplo con código HTML y otros recursos web; se ofrece para descarga, no como sitio web navegable hasta que se descomprima.

## Pendientes para validar con la persona responsable

- Revisar `WEB_BASICO/` antes de decidir si sus archivos de texto se deben publicar; por ahora se excluyen porque sus nombres sugieren credenciales.
- Revisar el posible archivo duplicado `Fisica Mecánica/FISMEC_3_ACELERADO - copia.ipynb` para determinar si es un respaldo local o material real.

## Recomendaciones para la fase de diseño de la biblioteca

### Enlaces directos a sitios existentes

- `bases datos avanzadas/index.html`
- `Est_Descriptiva/index.html`
- `Inteligencia de Negocios/index.html`

Estas rutas son candidatas claras para accesos directos desde una biblioteca web. Sus recursos de datos ficticios se podrán descargar desde sus tarjetas de curso; las páginas existentes aún dependen de librerías externas de CDN.

### Cursos que solo necesitarían acceso a notebooks/materiales

- `Algebra Lineal/`
- `AnalíticaDatos/`
- `Calculo_Int_Finan/`
- `CunTech_2025/`
- `DiseñoSoftware/`
- `Est_Inferencial/`
- `Fisica Mecánica/`
- `FisicaOndasElect/`
- `fundamentos programación/`
- `PrograObjetos2/`

Estos cursos no tienen una app navegable detectada; para la biblioteca conviene exponer cuadernos o índices individuales mediante el mecanismo de publicación que se elija, con metadatos de curso y material complementario. No asumir que un enlace a carpeta funcionará como página web.

### Recomendación de clasificación inicial para la biblioteca

- `sitio existente`: `bases datos avanzadas`, `Est_Descriptiva`, `Inteligencia de Negocios`.
- `sin web`: la mayoría de cursos de notebook.
- `parcial`: `Cun_Tech_API_bs` (notebooks y repositorio de ejemplo descargable; no hay sitio descomprimido verificado).
- `por revisar`: `WEB_BASICO`.
- `por revisar`: los archivos de `WEB_BASICO/`, antes de publicar.

### Recomendación UX / normalización

- Normalizar nombres de carpetas y enlaces para evitar espacios, acentos y mezclas de mayúsculas/minúsculas.
- Crear aliases amigables para cursos como `bases-datos-avanzadas`, `estadistica-descriptiva`, `inteligencia-de-negocios` si la biblioteca usa URLs limpias.
- Mantener separados los archivos de potenciales credenciales y no enlazarlos hasta su validación explícita.
- Los datos de práctica fueron confirmados como ficticios y sin datos personales; se ofrecen como recursos descargables junto con los cuadernos.

## Cierre

El repositorio tiene una base sólida para una biblioteca de cursos: las webs existentes se enlazan directamente, los notebooks y recursos de ejemplo se descargan individualmente y los datasets confirmados ficticios se ofrecen como material de práctica. Se mantienen pendientes únicamente los casos marcados como `por revisar`.