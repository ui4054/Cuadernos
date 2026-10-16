# Estado de construcción de webs explicativas

Última actualización: 2026-10-16

## Base aprobada

- Arquitectura: `agents/ARQUITECTURA_WEBS_CURSO.md`.
- Piloto aprobado por la persona responsable: Álgebra Lineal.
- Revisión del piloto: `PASS`, con KaTeX 0.16.22 local, fuentes y licencia incluidas.
- La biblioteca principal está en `index.html` y `app.js`; mantener sus cambios de integración bajo un solo responsable a la vez.
- Actualizar este registro después de cada curso revisado e integrado.

## Backlog

| Curso | Estrategia inicial | Estado | Siguiente acción |
|---|---|---|---|
| Álgebra Lineal | Página explicativa `index.html` | `PASS` | Cerrado; no reconstruir. |
| AnalíticaDatos | Nueva página `index.html` | `PASS` | Construido, revisado `PASS`, enlazado desde la biblioteca (`guide: AnalíticaDatos/index.html`). |
| bases datos avanzadas | Sitio didáctico existente | `PASS` | Sitio preservado; revisado `PASS`; enlace desde la biblioteca (`website`) ya integrado. |
| Calculo_Int_Finan | Nueva página `index.html` | `PASS` | Construido, revisado `PASS`, enlazado desde la biblioteca (`guide: Calculo_Int_Finan/index.html`). KaTeX local; desarrollo paso a paso de derivadas e integrales. |
| CunTech_2025 | Nueva página `index.html` | `PASS` | Construido, revisado `PASS`, enlazado desde la biblioteca (`guide: CunTech_2025/index.html`). 10 cuadernos HTML/CSS/JS/Python/CRUD. |
| Cun_Tech_API_bs | Nueva página `index.html` | `PASS` | Construido, revisado `PASS`, enlazado desde la biblioteca (`guide: Cun_Tech_API_bs/index.html`). 8 cuadernos Cloud/Arq; RAR ofrecido como descarga, no extraído. |
| DiseñoSoftware | Nueva página `index.html` | `PASS` | Construido, revisado `PASS`, enlazado desde la biblioteca (`guide: DiseñoSoftware/index.html`). 2 cuadernos: capas IMC y patrones MVC/SOLID/CQRS. |
| Est_Descriptiva | Sitio existente | `PASS` | Sitio preservado; revisado `PASS`; enlace desde la biblioteca (`website`) ya integrado. |
| Est_Inferencial | Nueva página `index.html` | `PASS` | Construido, revisado `PASS`, enlazado desde la biblioteca (`guide: Est_Inferencial/index.html`). Pruebas de confianza (t, Z, proporciones) y taller de 15 duelos. |
| Fisica Mecánica | Nueva página `index.html` | `PASS` | Construido, revisado `PASS`, enlazado desde la biblioteca (`guide: Fisica Mecánica/index.html`). 4 cuadernos: vectores, MUA, parabólico, leyes Newton. |
| FisicaOndasElect | Nueva página `index.html` | `PASS` | Construido, revisado `PASS`, enlazado desde la biblioteca (`guide: FisicaOndasElect/index.html`). 3 cuadernos: MAS, ondulatoria cuerdas, ondas estacionarias. |
| fundamentos programación | Nueva página `index.html` | `PASS` | Construido, revisado `PASS`, enlazado desde la biblioteca (`guide: fundamentos programación/index.html`). 9 cuadernos: conceptos, primitivos, decisiones, ciclos, arreglos, diccionarios, listas, métodos. |
| Inteligencia de Negocios | Sitio existente | `PASS` | Sitio preservado; revisado `PASS`; enlace desde la biblioteca (`website`) ya integrado. |
| PrograObjetos2 | Nueva página `index.html` | `PASS` | Construido, revisado `PASS`, enlazado desde la biblioteca (`guide: PrograObjetos2/index.html`). 2 cuadernos: herencia e interfaces MVC. |
| WEB_BASICO | Página no autorizada todavía | `bloqueado: revisión humana` | No abrir ni enlazar los `.txt` hasta que el responsable confirme que son publicables y no contienen credenciales. |

## Reglas de avance

- Un curso está completo solo con estado `PASS`, rutas locales probadas y tarjeta de biblioteca integrada.
- Cuando un sitio existente ya cubra la función explicativa, no crear una guía duplicada; someter su integración a revisión.
- Si requiere una página explicativa nueva, respetar los nombres de recursos y la paleta del diseño compartido.
- Cualquier bloqueo de contenido queda señalado aquí junto al próximo paso exacto.

## Registro de ejecuciones

| Fecha | Curso(s) | Construcción/revisión/integración | Notas |
|---|---|---|---|
| 2026-10-15 | Álgebra Lineal | Construido, revisado `PASS`, enlazado desde la biblioteca | KaTeX local; desarrollo de Sarrus/Cramer con verificación paso a paso. |
| 2026-10-16 | AnalíticaDatos, Calculo_Int_Finan, CunTech_2025, Cun_Tech_API_bs, DiseñoSoftware, Est_Inferencial, Fisica Mecánica, FisicaOndasElect, fundamentos programación, PrograObjetos2 | Construidos, revisados `PASS`, enlazados desde la biblioteca | KaTeX local (`vendor/katex/`); páginas con paleta compartida (`course-theme.css`); estructura mínima (héroe, ruta, fundamentos, ejemplos, cuadernos) implementada. |
| 2026-10-16 | bases datos avanzadas, Est_Descriptiva, Inteligencia de Negocios | Revisados `PASS` | Sitios existentes preservados sin guía duplicada; enlaces `website` integrados en `app.js`. Recomendación: migrar KaTeX a bundle local en fase posterior. |
