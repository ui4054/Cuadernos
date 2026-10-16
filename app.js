const courses = [
  {
    name: 'Álgebra Lineal',
    description: 'Determinantes, teoría y aplicaciones de álgebra lineal.',
    icon: '∑',
    guide: 'Algebra Lineal/index.html',
    notebooks: [
      'Algebra Lineal/Aplicacion_Empresas.ipynb',
      'Algebra Lineal/Ejercicios_det.ipynb',
      'Algebra Lineal/Soluciones_Determinantes.ipynb',
      'Algebra Lineal/Teoria _algebra_lineal_determimantes.ipynb'
    ]
  },
  {
    name: 'Analítica de Datos',
    description: 'Introducción a Python para explorar y analizar datos.',
    icon: '⌁',
    guide: 'AnalíticaDatos/index.html',
    notebooks: ['AnalíticaDatos/Python_1_colab.ipynb']
  },
  {
    name: 'Bases de Datos Avanzadas',
    description: 'SQL, modelo relacional, transacciones y analítica.',
    icon: '▦',
    website: 'bases datos avanzadas/index.html',
    notebooks: [
      'bases datos avanzadas/cuadernos/DBADV_0_ALGEBREL.ipynb',
      'bases datos avanzadas/cuadernos/DBADV_1_DDL_DML_BASICO.ipynb',
      'bases datos avanzadas/cuadernos/DBADV_2_FILTRADO_LIKE.ipynb',
      'bases datos avanzadas/cuadernos/DBADV_3_JOINS_CONJUNTOS.ipynb',
      'bases datos avanzadas/cuadernos/DBADV_4_NORMALIZACION.ipynb',
      'bases datos avanzadas/cuadernos/DBADV_5_DML_TRANSACC.ipynb',
      'bases datos avanzadas/cuadernos/DBADV_6_AGREGACION_SUB.ipynb',
      'bases datos avanzadas/cuadernos/DBADV_7_WINDOW_CTES.ipynb',
      'bases datos avanzadas/cuadernos/DBADV_8_OPTIM_JSON.ipynb'
    ],
    resources: [
      'bases datos avanzadas/dataset/clientes.csv',
      'bases datos avanzadas/dataset/departamentos.csv',
      'bases datos avanzadas/dataset/detalle_pedidos.csv',
      'bases datos avanzadas/dataset/empleados.csv',
      'bases datos avanzadas/dataset/pedidos.csv',
      'bases datos avanzadas/dataset/productos.csv',
      'bases datos avanzadas/dataset/empresa_cun.db'
    ]
  },
  {
    name: 'Cálculo Integral y Financiero',
    description: 'Derivadas, integrales y técnicas de integración.',
    icon: '∫',
    guide: 'Calculo_Int_Finan/index.html',
    notebooks: [
      'Calculo_Int_Finan/CALINT_1_DERIVADAS.ipynb',
      'Calculo_Int_Finan/CALINT_2_Integraldefinida_B.ipynb',
      'Calculo_Int_Finan/CALINT_3_Integral_indefinida_B.ipynb',
      'Calculo_Int_Finan/CALINT_4_FRACCIONES_PARCIALES.ipynb',
      'Calculo_Int_Finan/CALINT_5_SUSTITUCIONTRIG.ipynb'
    ]
  },
  {
    name: 'CunTech 2025',
    description: 'Fundamentos de HTML y programación básica.',
    icon: '</>',
    guide: 'CunTech_2025/index.html',
    notebooks: [
      'CunTech_2025/HMTL_1_BASICO.ipynb',
      'CunTech_2025/HTML_2_BASICO.ipynb',
      'CunTech_2025/HTML_3_BASICO.ipynb',
      'CunTech_2025/HTML_4_Basico.ipynb',
      'CunTech_2025/HTML_5_Basico.ipynb',
      'CunTech_2025/HTML_6_Basico.ipynb',
      'CunTech_2025/PROGRAMACION_1_BASICO.ipynb',
      'CunTech_2025/PROGRAMACION_2_BASICO.ipynb',
      'CunTech_2025/PROGRAMACION_3_BASICO.ipynb',
      'CunTech_2025/PROGRAMACION_4_BASICO.ipynb'
    ]
  },
  {
    name: 'CunTech · APIs y Cloud',
    description: 'Arquitectura cloud, APIs y servicios.',
    icon: '☁',
    guide: 'Cun_Tech_API_bs/index.html',
    notebooks: [
      'Cun_Tech_API_bs/Cloud_Arq_1.ipynb',
      'Cun_Tech_API_bs/Cloud_Arq_2.ipynb',
      'Cun_Tech_API_bs/Cloud_Arq_3.ipynb',
      'Cun_Tech_API_bs/Cloud_Arq_4.ipynb',
      'Cun_Tech_API_bs/Cloud_Arq_5.ipynb',
      'Cun_Tech_API_bs/Cloud_Arq_6.ipynb',
      'Cun_Tech_API_bs/Cloud_Arq_7.ipynb',
      'Cun_Tech_API_bs/Cloud_Arq_8.ipynb'
    ],
    resources: ['Cun_Tech_API_bs/repo_final/web_hotel_srvlss.rar'],
    note: 'Incluye un repositorio de ejemplo con código HTML y otros recursos web.'
  },
  {
    name: 'Diseño de Software',
    description: 'Diseño por capas y patrones de diseño.',
    icon: '◇',
    guide: 'DiseñoSoftware/index.html',
    notebooks: ['DiseñoSoftware/DISEÑO_CAPAS.ipynb', 'DiseñoSoftware/PatronesDiseño.ipynb']
  },
  {
    name: 'Estadística Descriptiva',
    description: 'Estadística, análisis exploratorio y práctica con Python.',
    icon: '▥',
    website: 'Est_Descriptiva/index.html',
    notebooks: [
      'Est_Descriptiva/Estudio_basico_completo.ipynb',
      'Est_Descriptiva/Taller_Est_desc.ipynb',
      'Est_Descriptiva/lab_guia/Resumen_Estadistica_Descriptiva_Semana_1.ipynb'
    ]
  },
  {
    name: 'Estadística Inferencial',
    description: 'Pruebas de confianza e inferencia estadística.',
    icon: '⌁',
    guide: 'Est_Inferencial/index.html',
    notebooks: ['Est_Inferencial/Pruebas_Confianza.ipynb']
  },
  {
    name: 'Física Mecánica',
    description: 'Vectores, movimiento acelerado y leyes de Newton.',
    icon: '↗',
    guide: 'Fisica Mecánica/index.html',
    notebooks: [
      'Fisica Mecánica/FISMEC_1_UNIDADES_VECTOR-DESKTOP-486B4DJ.ipynb',
      'Fisica Mecánica/FISMEC_1_UNIDADES_VECTOR.ipynb',
      'Fisica Mecánica/FISMEC_3_ACELERADO - copia.ipynb',
      'Fisica Mecánica/FISMEC_4_PARABOLICO.ipynb',
      'Fisica Mecánica/FISMEC_5_1_LeyesNewton_A.ipynb'
    ]
  },
  {
    name: 'Física: Ondas y Electricidad',
    description: 'Movimiento armónico, cuerdas y ondas estacionarias.',
    icon: '∿',
    guide: 'FisicaOndasElect/index.html',
    notebooks: [
      'FisicaOndasElect/1_MAS.ipynb',
      'FisicaOndasElect/2_ONDULATORIA_CUERDAS.ipynb',
      'FisicaOndasElect/3_ONDAS_ESTACIONARIAS_b.ipynb'
    ]
  },
  {
    name: 'Fundamentos de Programación',
    description: 'Conceptos básicos, ciclos, arreglos y estructuras de datos.',
    icon: '{ }',
    guide: 'fundamentos programación/index.html',
    notebooks: [
      'fundamentos programación/FUNDPROG_1_CONCEPBASICOS.ipynb',
      'fundamentos programación/FUNDPROG_2_PRIMITVS.ipynb',
      'fundamentos programación/FUNDPROG_3_DECISION.ipynb',
      'fundamentos programación/FUNDPROG_4_CICLOS_REPETICIONES.ipynb',
      'fundamentos programación/FUNDPROG_5_ARREGLOSUNID.ipynb',
      'fundamentos programación/FUNDPROG_6_ARREGLOBIDIM.ipynb',
      'fundamentos programación/FUNDPROG_7A_LISTAS.ipynb',
      'fundamentos programación/FUNDPROG_7_DICCIONARIOS.ipynb',
      'fundamentos programación/FUNDPROG_8_METODOS.ipynb'
    ]
  },
  {
    name: 'Inteligencia de Negocios',
    description: 'Presentación interactiva sobre Business Intelligence.',
    icon: '▤',
    website: 'Inteligencia de Negocios/index.html',
    notebooks: ['Inteligencia de Negocios/BI_Modulo1_Introduccion.ipynb'],
    resources: [
      'Inteligencia de Negocios/data_lake/raw_projects.csv',
      'Inteligencia de Negocios/data_lake/raw_resources.csv',
      'Inteligencia de Negocios/data_lake/raw_time_logs.json',
      'Inteligencia de Negocios/bi_warehouse.db'
    ]
  },
  {
    name: 'Programación Orientada a Objetos II',
    description: 'Herencia e interfaces en programación orientada a objetos.',
    icon: '◈',
    guide: 'PrograObjetos2/index.html',
    notebooks: ['PrograObjetos2/PROOBJ2-1-Herencia.ipynb', 'PrograObjetos2/PROOBJ2_2_INTERFACES.ipynb']
  },
  {
    name: 'Web Básico',
    description: 'Material del curso pendiente de revisión antes de publicarse.',
    icon: '⌘',
    notebooks: [],
    note: 'Los archivos de esta carpeta no se enlazan todavía porque sus nombres sugieren que podrían contener credenciales.'
  }
];

const grid = document.getElementById('course-grid');
const searchInput = document.getElementById('course-search');
const emptyState = document.getElementById('empty-state');
const resultsLabel = document.getElementById('results-label');
const filterButtons = Array.from(document.querySelectorAll('.filter-button'));
let selectedFilter = 'all';

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function fileName(path) {
  return path.split('/').pop();
}

function notebookLink(path) {
  const safePath = escapeHtml(encodeURI(path));
  const safeName = escapeHtml(fileName(path));
  return `<li><a class="notebook-download" href="${safePath}" download><span aria-hidden="true">↓</span><span>${safeName}</span></a></li>`;
}

function resourceLink(path) {
  const safePath = escapeHtml(encodeURI(path));
  const safeName = escapeHtml(fileName(path));
  const type = escapeHtml(fileName(path).split('.').pop().toUpperCase());
  return `<li><a class="notebook-download" href="${safePath}" download><span class="resource-type">${type}</span><span>${safeName}</span></a></li>`;
}

function courseCard(course) {
  const count = course.notebooks.length;
  const resourceCount = course.resources ? course.resources.length : 0;
  const resourceLabel = resourceCount === 1 ? '1 recurso adicional' : `${resourceCount} recursos adicionales`;
  const tag = course.website
    ? '<span class="course-tag has-site">SITIO WEB</span>'
    : '<span class="course-tag">MATERIAL DE CURSO</span>';
  const notebookLabel = count === 1
    ? '1 cuaderno descargable'
    : `${count} cuadernos ${count ? 'descargables' : 'disponibles'}`;
  const siteLink = course.website
    ? `<a class="action-link primary" href="${escapeHtml(encodeURI(course.website))}">Abrir sitio <span aria-hidden="true">↗</span></a>`
    : '';
  const guideLink = course.guide
    ? `<a class="action-link guide-link" href="${escapeHtml(encodeURI(course.guide))}">Guía teórica <span aria-hidden="true">↗</span></a>`
    : '';
  const downloadLinks = count
    ? course.notebooks.slice(0, 3).map(notebookLink).join('')
    : '';
  const notebookSection = count > 3
    ? `<details><summary>Ver los ${count} cuadernos</summary><ul class="notebook-list">${course.notebooks.map(notebookLink).join('')}</ul></details>`
    : count > 0
      ? `<ul class="notebook-list">${course.notebooks.map(notebookLink).join('')}</ul>`
      : '';
  const note = course.note ? `<p class="sensitive-note">${escapeHtml(course.note)}</p>` : '';

  return `<article class="course-card">
    <div class="card-top"><span class="course-icon" aria-hidden="true">${escapeHtml(course.icon)}</span>${tag}</div>
    <h3>${escapeHtml(course.name)}</h3>
    <p class="course-description">${escapeHtml(course.description)}</p>
    <div class="card-meta"><span>${notebookLabel}</span>${course.website ? '<span class="meta-dot"></span><span>Sitio existente</span>' : ''}${resourceCount ? `<span class="meta-dot"></span><span>${resourceLabel}</span>` : ''}</div>
    <div class="course-actions">${siteLink}${guideLink}${count > 3 ? `<a class="action-link" href="#notebooks-${escapeHtml(String(courses.indexOf(course)))}">Ver cuadernos ↓</a>` : ''}</div>
    ${count > 3 ? notebookSection.replace('<details>', `<details id="notebooks-${escapeHtml(String(courses.indexOf(course)))}">`) : downloadLinks ? notebookSection : ''}
    ${resourceCount ? `<details class="resource-details"><summary>Descargar recursos adicionales (${resourceCount})</summary><ul class="notebook-list">${course.resources.map(resourceLink).join('')}</ul></details>` : ''}
    ${note}
  </article>`;
}

function renderCourses() {
  const query = searchInput.value.trim().toLocaleLowerCase('es');
  const filtered = courses.filter((course) => {
    const matchesFilter = selectedFilter === 'all'
      || (selectedFilter === 'site' && Boolean(course.website))
      || (selectedFilter === 'notebooks' && course.notebooks.length > 0);
    const searchText = `${course.name} ${course.description} ${course.notebooks.map(fileName).join(' ')}`.toLocaleLowerCase('es');
    return matchesFilter && searchText.includes(query);
  });

  grid.innerHTML = filtered.map(courseCard).join('');
  emptyState.hidden = filtered.length > 0;
  resultsLabel.textContent = `${filtered.length} ${filtered.length === 1 ? 'curso' : 'cursos'} encontrados`;
}

document.getElementById('course-count').textContent = courses.length;
document.getElementById('notebook-count').textContent = courses.reduce((total, course) => total + course.notebooks.length, 0);
searchInput.addEventListener('input', renderCourses);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle('is-active', isSelected);
      filterButton.setAttribute('aria-pressed', String(isSelected));
    });
    renderCourses();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderCourses();
