---
name: Continuar biblioteca de cursos
description: "Continúa la construcción, revisión e integración de las webs explicativas de cursos usando el flujo de agentes y el estado persistido."
agent: "Orquestador de la biblioteca"
argument-hint: "Curso o lote específico; vacío para continuar el siguiente pendiente"
---

Continúa el proyecto descrito en [la arquitectura compartida](../../agents/ARQUITECTURA_WEBS_CURSO.md), usando el estado vivo en [el registro de cursos](../../agents/ESTADO_WEBS_CURSO.md).

El piloto de Álgebra Lineal está aprobado y obtuvo `PASS`. No lo reconstruyas.

Para cada curso pendiente:

1. Inspecciona su registro y materiales fuente.
2. Pide al agente Constructor que trabaje en un curso por vez.
3. Pide al agente Revisor que haga una comprobación independiente y de solo lectura.
4. Si hay cambios requeridos, envía los hallazgos concretos al Constructor y repite hasta `PASS` o bloqueo documentado.
5. Tras `PASS`, integra la acción de sitio/guía y las descargas en la tarjeta correspondiente de la biblioteca principal; no sobrescribas webs existentes.
6. Comprueba enlaces, descargas, KaTeX local cuando aplique, navegación, vista móvil y errores de consola; actualiza el registro con evidencia.
7. Continúa al siguiente curso hasta terminar el alcance autorizado o encontrar un bloqueo humano.

No abras ni publiques materiales marcados como potencialmente sensibles. No inventes contenido ausente de las fuentes. Si no puedes seguir trabajando o delegar en el runtime actual, actualiza el registro con el siguiente curso exacto y los pasos pendientes; no afirmes que el loop sigue ejecutándose.
