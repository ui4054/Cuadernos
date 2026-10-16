/* ==========================================================================
   BI MASTERCLASS - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

let currentSlide = 1;
const totalSlides = 8;

// DOM Elements
const slides = document.querySelectorAll('.slide');
const currentSlideNum = document.getElementById('current-slide-num');
const totalSlidesNum = document.getElementById('total-slides-num');
const progressFill = document.getElementById('progress-fill');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const thumbnailsContainer = document.getElementById('thumbnails-container');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    totalSlidesNum.textContent = totalSlides;
    renderThumbnails();
    updateSlideView();

    // Event Listeners for Keyboard Controls
    document.addEventListener('keydown', handleKeyDown);

    // Initialize Stage 1 for Slide 3
    selectPipelineStage(1);
});

// Render Bottom Dots Navigation
function renderThumbnails() {
    thumbnailsContainer.innerHTML = '';
    for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `thumb-dot ${i === currentSlide ? 'active' : ''}`;
        dot.title = `Ir a diapositiva ${i}`;
        dot.onclick = () => goToSlide(i);
        thumbnailsContainer.appendChild(dot);
    }
}

// Slide Navigation
function goToSlide(slideNum) {
    if (slideNum < 1 || slideNum > totalSlides) return;
    currentSlide = slideNum;
    updateSlideView();
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlideView();
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlideView();
    }
}

function updateSlideView() {
    slides.forEach((slide) => {
        const slideIndex = parseInt(slide.dataset.slide);
        if (slideIndex === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    currentSlideNum.textContent = currentSlide;
    const progressPercent = (currentSlide / totalSlides) * 100;
    progressFill.style.width = `${progressPercent}%`;

    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
    if (currentSlide === totalSlides) {
        nextBtn.innerHTML = `Finalizar <i class="fa-solid fa-check"></i>`;
    } else {
        nextBtn.innerHTML = `Siguiente <i class="fa-solid fa-chevron-right"></i>`;
    }

    const dots = thumbnailsContainer.querySelectorAll('.thumb-dot');
    dots.forEach((dot, idx) => {
        if (idx + 1 === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Keyboard Navigation
function handleKeyDown(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
    } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
    } else if (e.key === 't' || e.key === 'T') {
        toggleTheme();
    }
}

// SLIDE 3 PIPELINE CODE & OUTPUT DATA
const pipelineStageData = {
    1: {
        title: "Código Python - Etapa 01: Extracción Cruda de Fuentes (Data Lake)",
        code: `<span class="code-comment"># Etapa 1: Extracción de archivos heterogéneos desde el Data Lake</span>
<span class="code-keyword">import</span> pandas <span class="code-keyword">as</span> pd
<span class="code-keyword">import</span> json

<span class="code-comment"># Cargar CSV de proyectos y presupuestos</span>
df_projects = pd.read_csv(<span class="code-string">'data_lake/raw_projects.csv'</span>)

<span class="code-comment"># Cargar logs semiestructurados en JSON</span>
<span class="code-keyword">with</span> open(<span class="code-string">'data_lake/raw_time_logs.json'</span>) <span class="code-keyword">as</span> f:
    logs_data = json.load(f)

df_logs = pd.DataFrame(logs_data)
print(f<span class="code-string">"[OK] Extraídos {len(df_projects)} proyectos y {len(df_logs)} registros de logs."</span>)`,
        output: `[OK] Extraídos 6 proyectos y 11 registros de logs.

--- MUESTRA DATOS DE PROYECTOS (raw_projects.csv) ---
  project_id             project_name  client_name   budget_usd
0    PRJ-101      Migración ERP Cloud  Fintech Global  $150,000.00
1    PRJ-102             App Móvil V2       Retail Co   $85,000.00
2    PRJ-103  Rediseño Plataforma B2B Logística Express  $120,000.00

--- MUESTRA LOGS EN JSON (raw_time_logs.json) ---
   log_id project_id resource_id  hours_logged       date
0       1    PRJ-101      RES-01           160 2026-02-28
1       2    PRJ-101      RES-02           210 2026-02-28`
    },
    2: {
        title: "Código Python - Etapa 02: Transformación ETL & Reglas de Negocio",
        code: `<span class="code-comment"># Etapa 2: Unir tablas, limpiar nulos y calcular costo real acumulado</span>
df_resources = pd.read_csv(<span class="code-string">'data_lake/raw_resources.csv'</span>)

<span class="code-comment"># 1. Cruzar logs con tarifa por hora del recurso</span>
df_merged = df_logs.merge(df_resources, on=<span class="code-string">'resource_id'</span>)
df_merged[<span class="code-string">'actual_cost_usd'</span>] = df_merged[<span class="code-string">'hours_logged'</span>] * df_merged[<span class="code-string">'hourly_rate_usd'</span>]

<span class="code-comment"># 2. Agrupar totales por proyecto</span>
df_fact = df_projects.merge(
    df_merged.groupby(<span class="code-string">'project_id'</span>).agg(
        total_hours=(<span class="code-string">'hours_logged'</span>, <span class="code-string">'sum'</span>),
        actual_cost=(<span class="code-string">'actual_cost_usd'</span>, <span class="code-string">'sum'</span>)
    ).reset_index(), on=<span class="code-string">'project_id'</span>
)

<span class="code-comment"># 3. Métricas de variación</span>
df_fact[<span class="code-string">'variance_usd'</span>] = df_fact[<span class="code-string">'actual_cost'</span>] - df_fact[<span class="code-string">'budget_usd'</span>]
print(df_fact[[<span class="code-string">'project_id'</span>, <span class="code-string">'budget_usd'</span>, <span class="code-string">'actual_cost'</span>, <span class="code-string">'variance_usd'</span>]])`,
        output: `[OK] Transformación ETL completada sin valores nulos.

--- TABLA DE HECHOS TRANSFORMADA (fact_project_execution) ---
  project_id  budget_usd  actual_cost  variance_usd  status
0    PRJ-101 $150,000.00  $47,300.00   -$102,700.00  En Curso
1    PRJ-102  $85,000.00  $45,000.00    -$40,000.00  En Curso
2    PRJ-103 $120,000.00 $83,350.00    -$36,650.00  En Curso`
    },
    3: {
        title: "Código Python - Etapa 03: Carga al Data Warehouse (DuckDB / SQLite)",
        code: `<span class="code-comment"># Etapa 3: Cargar Modelo en Estrella (Star Schema) a SQL Data Warehouse</span>
<span class="code-keyword">import</span> sqlite3

conn = sqlite3.connect(<span class="code-string">'bi_warehouse.db'</span>)

<span class="code-comment"># Guardar Tabla de Hechos y Dimensiones</span>
df_fact.to_sql(<span class="code-string">'fact_project_execution'</span>, conn, if_exists=<span class="code-string">'replace'</span>, index=<span class="code-keyword">False</span>)
df_resources.to_sql(<span class="code-string">'dim_resource'</span>, conn, if_exists=<span class="code-string">'replace'</span>, index=<span class="code-keyword">False</span>)

<span class="code-comment"># Consultar proyectos con mayor varianza presupuestaria</span>
query = <span class="code-string">"SELECT project_name, budget_usd, actual_cost, variance_usd FROM fact_project_execution ORDER BY variance_usd DESC;"</span>
df_sql = pd.read_sql_query(query, conn)
print(<span class="code-string">"[SQL RESULT]"</span>)
print(df_sql.head(3))`,
        output: `[OK] Data Warehouse cargado en bi_warehouse.db (SQLite/DuckDB).

[SQL RESULT]
            project_name   budget_usd  actual_cost  variance_usd
0    Rediseño Plataforma  $120,000.00   $83,350.00   -$36,650.00
1    Migración ERP Cloud  $150,000.00   $47,300.00  -$102,700.00
2           App Móvil V2   $85,000.00   $45,000.00   -$40,000.00`
    },
    4: {
        title: "Código Python - Etapa 04: Visualización & Dashboard de KPIs (Plotly)",
        code: `<span class="code-comment"># Etapa 4: Renderizar Dashboard Ejecutivo interactivo en Plotly</span>
<span class="code-keyword">import</span> plotly.graph_objects <span class="code-keyword">as</span> go

fig = go.Figure()
fig.add_trace(go.Bar(x=df_fact[<span class="code-string">'project_name'</span>], y=df_fact[<span class="code-string">'budget_usd'</span>], name=<span class="code-string">'Presupuesto'</span>, marker_color=<span class="code-string">'#10b981'</span>))
fig.add_trace(go.Bar(x=df_fact[<span class="code-string">'project_name'</span>], y=df_fact[<span class="code-string">'actual_cost'</span>], name=<span class="code-string">'Costo Real'</span>, marker_color=<span class="code-string">'#34d399'</span>))

fig.update_layout(title=<span class="code-string">'Presupuesto vs Costo Real'</span>, template=<span class="code-string">'plotly_dark'</span>)
fig.show()
print(<span class="code-string">"[OK] Dashboard ejecutivo renderizado con 3 gráficos interactivos."</span>)`,
        output: `[OK] Dashboard ejecutivo renderizado con 3 gráficos interactivos.

--- SUMMARY DE KPIS CALCULADOS ---
- Presupuesto Total Cartera: $555,000.00 USD
- Costo Real Incurrido:     $258,850.00 USD
- Margen Neto Estimado:     $296,150.00 USD (+53.3% ROI)`
    },
    5: {
        title: "Código Python - Etapa 05: Toma de Decisión Estratégica",
        code: `<span class="code-comment"># Etapa 5: Algoritmo prescriptivo de recomendación de recursos</span>
<span class="code-keyword">for</span> idx, row <span class="code-keyword">in</span> df_fact.iterrows():
    <span class="code-keyword">if</span> row[<span class="code-string">'actual_cost'</span>] > row[<span class="code-string">'budget_usd'</span>]:
        print(f<span class="code-string">"🚨 [ALERTA] Proyecto {row['project_name']}: Congelar contrataciones externas."</span>)
    <span class="code-keyword">else</span>:
        print(f<span class="code-string">"✅ [OK] Proyecto {row['project_name']}: Operación dentro del margen de rentabilidad."</span>)`,
        output: `=== INFORME DE ACCIONES DE NEGOCIO PRESCRIPTIVAS ===
✅ [OK] Proyecto Migración ERP Cloud: Operación dentro del margen.
✅ [OK] Proyecto App Móvil V2: Operación dentro del margen.
✅ [OK] Proyecto Rediseño Plataforma B2B: Operación dentro del margen.
🚨 [ALERTA] Proyecto Sistema BI & Analytics: Reasignar 2 desarrolladores para contener sobrecosto.`
    }
};

function selectPipelineStage(stageNum) {
    document.querySelectorAll('.pipeline-step').forEach(step => step.classList.remove('selected'));
    const selectedEl = document.getElementById(`pipe-${stageNum}`);
    if (selectedEl) selectedEl.classList.add('selected');

    const data = pipelineStageData[stageNum];
    if (data) {
        document.getElementById('stage-code-title').innerHTML = `<i class="fa-solid fa-code"></i> ${data.title}`;
        document.getElementById('stage-code-body').innerHTML = data.code;
        document.getElementById('stage-output-body').textContent = data.output;
    }
}

// SLIDE 6 VENDOR MATRIX FILTER WITH TEAL HIGHLIGHTING
function filterVendorCapa(capa, buttonElement) {
    // Update active state on filter buttons
    const filterButtons = document.querySelectorAll('.filter-card-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    if (buttonElement) {
        buttonElement.classList.add('active');
    }

    // Clear search input if user clicked a pill
    const searchInput = document.getElementById('vendorSearchInput');
    if (searchInput) searchInput.value = '';

    // Update status badge text
    const statusText = document.getElementById('filterStatusText');
    const capaNames = {
        'all': 'Todas las Capas (16 Soluciones Visibles)',
        'storage': 'Almacenamiento & Data Lake (4 Soluciones)',
        'engine': 'Data Warehouse Engine OLAP (4 Soluciones)',
        'etl': 'ETL & Orquestación (4 Soluciones)',
        'bi': 'Visualización & Dashboards BI (4 Soluciones)'
    };
    if (statusText) {
        statusText.textContent = capaNames[capa] || 'Filtro Activo en Azul Verdoso';
    }

    // Filter service rows and apply Teal highlight
    const rows = document.querySelectorAll('.service-row');
    rows.forEach(row => {
        if (capa === 'all' || row.dataset.capa === capa) {
            row.classList.remove('hidden');
            if (capa !== 'all' && row.dataset.capa === capa) {
                row.classList.add('highlighted-teal');
            } else {
                row.classList.remove('highlighted-teal');
            }
        } else {
            row.classList.add('hidden');
            row.classList.remove('highlighted-teal');
        }
    });

    // Synchronize pricing table rows
    const tableRows = document.querySelectorAll('#pricingTable tbody tr');
    tableRows.forEach(tRow => {
        const rowCapas = tRow.dataset.capa || '';
        if (capa === 'all' || rowCapas.includes(capa)) {
            tRow.style.opacity = '1';
            if (capa !== 'all') {
                tRow.style.background = 'rgba(20, 184, 166, 0.18)';
                tRow.style.boxShadow = 'inset 4px 0 0 #2dd4bf';
            } else {
                tRow.style.background = '';
                tRow.style.boxShadow = '';
            }
        } else {
            tRow.style.opacity = '0.35';
            tRow.style.background = '';
            tRow.style.boxShadow = '';
        }
    });
}

function searchVendorTech(query) {
    const q = query.toLowerCase().trim();
    const rows = document.querySelectorAll('.service-row');
    const tableRows = document.querySelectorAll('#pricingTable tbody tr');
    const statusText = document.getElementById('filterStatusText');

    if (!q) {
        const allBtn = document.querySelector('.filter-card-btn');
        filterVendorCapa('all', allBtn);
        return;
    }

    // Deactivate pill buttons while searching
    document.querySelectorAll('.filter-card-btn').forEach(btn => btn.classList.remove('active'));

    let matches = 0;
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(q)) {
            row.classList.remove('hidden');
            row.classList.add('highlighted-teal');
            matches++;
        } else {
            row.classList.add('hidden');
            row.classList.remove('highlighted-teal');
        }
    });

    tableRows.forEach(tRow => {
        const text = tRow.textContent.toLowerCase();
        if (text.includes(q)) {
            tRow.style.opacity = '1';
            tRow.style.background = 'rgba(20, 184, 166, 0.18)';
            tRow.style.boxShadow = 'inset 4px 0 0 #2dd4bf';
        } else {
            tRow.style.opacity = '0.35';
            tRow.style.background = '';
            tRow.style.boxShadow = '';
        }
    });

    if (statusText) {
        statusText.textContent = `Búsqueda: "${query}" (${matches} Coincidencias en Azul Verdoso)`;
    }
}

// COMMODITIES AI SIMULATOR
const commoditiesAiResults = {
    "cmd-1": {
        title: "🛢️ Análisis de Sensibilidad: Petróleo Brent vs. Fletes Logísticos",
        sql: "SELECT t.mes, t.precio_brent_barrel, f.costo_flete_contenedor, \n       ROUND(((t.precio_brent_barrel - LAG(t.precio_brent_barrel, 1) OVER (ORDER BY t.mes)) / LAG(t.precio_brent_barrel, 1) OVER (ORDER BY t.mes)) * 100, 2) AS pct_var_petroleo \nFROM dw_commodities_futures t \nJOIN dw_logistica_fletes f ON t.mes_id = f.mes_id \nWHERE t.commodity = 'Brent Crude' \nORDER BY t.mes DESC LIMIT 6;",
        summary: "⚠️ <strong>Alerta Estratégica:</strong> Se detecta un incremento del <strong>+14.2%</strong> en la cotización del barril de Brent ($84.50 USD). La correlación estadística con los fletes marítimos es de <strong>r = 0.88</strong>, lo que proyecta un impacto de <strong>+$320 USD por contenedor</strong> para el próximo trimestre. <br><br>💡 <strong>Recomendación Prescriptiva:</strong> Ejecutar cobertura de riesgo (*Hedging*) contratando fletes a tarifa fija para el 60% de los envíos proyectados de Q4.",
        kpi: "<span class='badge badge-accent'>Riesgo Logístico Alto</span>"
    },
    "cmd-2": {
        title: "☕ Pronóstico de Suministro: Café Arábica & Clima Andino",
        sql: "SELECT r.region, r.precipitacion_mm, c.produccion_sacos_proyectada, c.precio_libra_usd \nFROM dw_clima_historical r \nJOIN dw_coffee_yield_forecast c ON r.region_id = c.region_id \nWHERE c.variedad = 'Arabica' AND r.anomalia_climatica = 'Sequia' \nORDER BY c.precio_libra_usd DESC;",
        summary: "🌧️ <strong>Análisis Predictivo:</strong> El modelo de series temporales (Prophet) detecta un déficit hídrico del 30% en los departamentos cafeteros clave. La producción proyectada se reduce en <strong>1.2M de sacos</strong>, presionando el precio internacional a <strong>$2.45 USD/libra (+18%)</strong>.<br><br>💡 <strong>Recomendación Prescriptiva:</strong> Diversificar compras hacia lotes de origen Centroamérica para amortiguar el alza de costos.",
        kpi: "<span class='badge badge-accent'>Riesgo de Suministro</span>"
    },
    "cmd-3": {
        title: "⛏️ Evaluación Financiera: Cobre & Presupuesto de Infraestructura",
        sql: "SELECT p.proyecto_name, p.presupuesto_inicial, \n       (p.toneladas_cobre_requeridas * m.precio_tonelada_cobre) AS costo_actual_cobre, \n       ROUND((((p.toneladas_cobre_requeridas * m.precio_tonelada_cobre) - p.costo_cobre_estimado) / p.presupuesto_inicial) * 100, 2) AS desvio_total_pct \nFROM fact_proyectos_infraestructura p \nCROSS JOIN (SELECT precio_tonelada_cobre FROM dw_commodities_spot WHERE commodity = 'Copper' ORDER BY fecha DESC LIMIT 1) m \nWHERE desvio_total_pct > 5.0;",
        summary: "📊 <strong>Evaluación Diagnóstica:</strong> El precio spot del Cobre ha alcanzado los <strong>$9,850 USD/Ton</strong>. Para los proyectos de electrificación de infraestructura, el costo del cobre representa ahora el 24% del presupuesto total (desviación acumulada de <strong>+$185,000 USD</strong>).<br><br>💡 <strong>Recomendación Prescriptiva:</strong> Renegociar compras en volumen consolidado con distribuidores mayoristas.",
        kpi: "<span class='badge badge-accent'>Análisis Financiero OK</span>"
    }
};

function runCommoditiesAiQuery() {
    const promptKey = document.getElementById('ai-prompt-select').value;
    const outputBox = document.getElementById('sandbox-output-box');
    const result = commoditiesAiResults[promptKey];

    outputBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <strong style="color: var(--accent-mint); font-size: 1.05rem;"><i class="fa-solid fa-brain"></i> ${result.title}</strong>
            ${result.kpi}
        </div>
        <div style="font-size: 0.85rem; color: #a7f3d0; margin-bottom: 6px;">Consulta SQL ejecutada sobre el Data Warehouse de Commodities:</div>
        <pre style="background: #03120b; padding: 12px; border-radius: 6px; font-size: 0.85rem; color: #34d399; overflow-x: auto; margin-bottom: 14px; border: 1px solid var(--border-color);"><code>${result.sql}</code></pre>
        <div style="background: rgba(16, 185, 129, 0.18); border-left: 4px solid var(--accent-emerald); padding: 14px; border-radius: 6px; color: #ffffff; font-size: 0.95rem; line-height: 1.6;">
            ${result.summary}
        </div>
    `;
}

// FAQ Accordion
function toggleAccordion(element) {
    const item = element.parentElement;
    item.classList.toggle('open');
}

// Theme Toggle
document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const btnIcon = document.querySelector('#theme-toggle-btn i');
    if (document.body.classList.contains('light-theme')) {
        btnIcon.className = 'fa-solid fa-moon';
    } else {
        btnIcon.className = 'fa-solid fa-sun';
    }
}

// Fullscreen Toggle
document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error pantalla completa: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
