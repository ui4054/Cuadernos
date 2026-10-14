/* ==========================================================================
   ⚙️ MOTOR JS — SIMULADORES DE PROCESO VISUAL EN 3 ETAPAS (MOD 00 AL MOD 08)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initKaTeX();
  initMermaid();
  initModuleTabs();
  
  // 9 Módulos Interactivos (Módulo 00 al Módulo 08)
  initMod0RelationalAlgebra();
  initMod1MultiEngineMatrix();
  initMod2LikeTester();
  initJoinSimulator();
  initNormalizationSimulator();
  initMod5TransactionSimulator();
  initMod6GroupByCalculator();
  initMod7WindowFunctionVisualizer();
  initMod8ExplainCboSimulator();
  
  initSlideNav();
  initOnPageNav();
});

/* --------------------------------------------------------------------------
   0. Gestor de Pestañas por Módulo (Teoría, Código, ERD, Simulador)
   -------------------------------------------------------------------------- */
function initModuleTabs() {
  document.querySelectorAll('.mod-tab-bar').forEach(tabBar => {
    const buttons = tabBar.querySelectorAll('.mod-tab-btn');
    const moduleCard = tabBar.closest('.section-block');
    if (!moduleCard) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        moduleCard.querySelectorAll('.mod-tab-panel').forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.add('active');
            renderMermaidInPanel(panel);
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  });

  // Manejar clics en sub-enlaces del menú lateral (#modX-teoria, #modX-erd, etc.)
  document.querySelectorAll('.sidebar-sub-menu a').forEach(subLink => {
    subLink.addEventListener('click', (e) => {
      const targetHash = subLink.getAttribute('href');
      if (targetHash && targetHash.startsWith('#')) {
        const panelId = targetHash.substring(1);
        const panel = document.getElementById(panelId);
        if (panel) {
          const moduleCard = panel.closest('.section-block');
          if (moduleCard) {
            const tabBtn = moduleCard.querySelector(`.mod-tab-btn[data-tab="${panelId}"]`);
            if (tabBtn) {
              tabBtn.click();
            }
          }
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   1. Conmutador de Modo Oscuro
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  });
}

/* --------------------------------------------------------------------------
   2. KaTeX Engine Renderer
   -------------------------------------------------------------------------- */
function initKaTeX() {
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }
}

/* --------------------------------------------------------------------------
   2B. Mermaid Diagram Engine Renderer
   -------------------------------------------------------------------------- */
function initMermaid() {
  if (typeof mermaid !== 'undefined') {
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default',
        securityLevel: 'loose'
      });
      document.querySelectorAll('.mermaid').forEach(node => {
        const raw = node.getAttribute('data-raw') || node.textContent.trim();
        node.setAttribute('data-raw', raw);
        const uniqueId = 'm-' + Math.floor(Math.random() * 1000000);
        try {
          mermaid.render(uniqueId, raw, (svgCode) => {
            node.innerHTML = svgCode;
          });
        } catch(e) {
          console.warn("Mermaid render error:", e);
        }
      });
    } catch(e) {
      console.warn("Mermaid init:", e);
    }
  }
}

function renderMermaidInPanel(panel) {
  if (typeof mermaid === 'undefined' || !panel) return;
  const nodes = panel.querySelectorAll('.mermaid');
  nodes.forEach((node) => {
    const raw = node.getAttribute('data-raw') || node.textContent.trim();
    if (!raw) return;
    node.setAttribute('data-raw', raw);
    const uniqueId = 'm-' + Math.floor(Math.random() * 1000000);
    try {
      mermaid.render(uniqueId, raw, (svgCode) => {
        node.innerHTML = svgCode;
      });
    } catch(e) {
      console.warn("Mermaid render error:", e);
    }
  });
}

/* --------------------------------------------------------------------------
   2C. Observador de Navegación Secundaria (On-Page Nav Scrollspy)
   -------------------------------------------------------------------------- */
function initOnPageNav() {
  const navLinks = document.querySelectorAll('.on-page-nav a');
  if (!navLinks.length) return;

  const sections = Array.from(navLinks).map(link => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      return document.querySelector(targetId);
    }
    return null;
  }).filter(Boolean);

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
}


/* ==========================================================================
   MÓDULO 00: Álgebra Relacional (3 Etapas: Tabla Base -> Evaluación -> Resultado)
   ========================================================================== */
const rawEmpleadosM0 = [
  { id: 101, nombre: 'Carlos Mendoza', salario: 8500000, depto: 1 },
  { id: 102, nombre: 'Ana María Gómez', salario: 6200000, depto: 1 },
  { id: 103, nombre: 'Luis Fernando Torres', salario: 4800000, depto: 1 },
  { id: 104, nombre: 'Sofía Ramírez', salario: 9000000, depto: 2 },
  { id: 105, nombre: 'Diego Silva', salario: 5500000, depto: 2 }
];

function initMod0RelationalAlgebra() {
  const container = document.getElementById('mod0SimDisplay');
  const buttons = document.querySelectorAll('.mod0-btn');
  if (!container || !buttons.length) return;

  function renderMod0(type) {
    let procRows = '';
    let resultRows = '';
    let sqlText = '';
    let opDesc = '';

    if (type === 'select') {
      opDesc = 'Operador Selección ($\\sigma_{\\text{salario} > 6.000.000}$): Evalúa fila a fila el salario. Verde = Coincide ($> 6M$), Rojo = Descartado.';
      sqlText = 'SELECT * FROM empleados WHERE salario > 6000000;';

      procRows = rawEmpleadosM0.map(e => {
        const pass = e.salario > 6000000;
        const cls = pass ? 'row-matched' : 'row-filtered';
        const status = pass ? '✅ Cumple (SELECCIONADA)' : '❌ No Cumple (DESCARTADA)';
        return `
          <tr class="${cls}">
            <td>${e.id}</td>
            <td>${e.nombre}</td>
            <td>$${e.salario.toLocaleString('es-CO')}</td>
            <td>Dept ${e.depto}</td>
            <td><strong>${status}</strong></td>
          </tr>
        `;
      }).join('');

      resultRows = rawEmpleadosM0.filter(e => e.salario > 6000000).map(e => `
        <tr>
          <td>${e.id}</td>
          <td>${e.nombre}</td>
          <td>$${e.salario.toLocaleString('es-CO')}</td>
          <td>Dept ${e.depto}</td>
        </tr>
      `).join('');

    } else if (type === 'project') {
      opDesc = 'Operador Proyección ($\\pi_{\\text{nombre, salario}}$): Filtra columnas verticalmente. Verde = Columna Proyectada, Gris = Columna Omitida.';
      sqlText = 'SELECT nombre, salario FROM empleados;';

      procRows = rawEmpleadosM0.map(e => `
        <tr>
          <td class="col-dimmed">${e.id} [Omitido]</td>
          <td class="col-highlight">${e.nombre} [PROYECTADO]</td>
          <td class="col-highlight">$${e.salario.toLocaleString('es-CO')} [PROYECTADO]</td>
          <td class="col-dimmed">Dept ${e.depto} [Omitido]</td>
          <td><span style="color: var(--accent-primary); font-weight:700;">Filtrado Columnas</span></td>
        </tr>
      `).join('');

      resultRows = rawEmpleadosM0.map(e => `
        <tr>
          <td>${e.nombre}</td>
          <td style="font-weight:700; color: var(--accent-primary);">$${e.salario.toLocaleString('es-CO')}</td>
        </tr>
      `).join('');

    } else if (type === 'join') {
      opDesc = 'Operador Natural Join ($R \\bowtie_{\\text{depto\\_id}} S$): Empareja la clave `depto_id` con la tabla `Departamentos`.';
      sqlText = 'SELECT e.nombre, d.nombre AS depto FROM empleados e JOIN departamentos d ON e.depto_id = d.depto_id;';

      procRows = rawEmpleadosM0.map(e => `
        <tr class="row-matched">
          <td>${e.id}</td>
          <td>${e.nombre}</td>
          <td>$${e.salario.toLocaleString('es-CO')}</td>
          <td>FK depto_id = ${e.depto}</td>
          <td><span style="color: #0369a1; font-weight:700;">🔗 Llave Vinculada</span></td>
        </tr>
      `).join('');

      resultRows = rawEmpleadosM0.map(e => `
        <tr>
          <td>${e.nombre}</td>
          <td>${e.depto === 1 ? 'Tecnología e Innovación' : 'Ventas y Comercio'}</td>
        </tr>
      `).join('');
    }

    container.innerHTML = `
      <div class="pipeline-stages">
        <div class="stage-box">
          <span class="stage-label label-base">1. TABLA BASE ORIGINAL (RAW DATA)</span>
          <table class="table-interactive">
            <thead><tr><th>ID</th><th>Nombre</th><th>Salario</th><th>Depto ID</th></tr></thead>
            <tbody>
              ${rawEmpleadosM0.map(e => `<tr><td>${e.id}</td><td>${e.nombre}</td><td>$${e.salario.toLocaleString('es-CO')}</td><td>${e.depto}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>

        <div class="stage-box">
          <span class="stage-label label-process">2. PROCESO DE EVALUACIÓN Y FILTRADO (COLOREADO)</span>
          <p style="font-size: 0.88rem; color: var(--text-main); margin-bottom: 8px;">${opDesc}</p>
          <div class="code-block" style="margin-bottom: 10px;"><code>${sqlText}</code></div>
          <table class="table-interactive">
            <thead><tr><th>ID</th><th>Nombre</th><th>Salario</th><th>Depto</th><th>Estado del Operador</th></tr></thead>
            <tbody>${procRows}</tbody>
          </table>
        </div>

        <div class="stage-box">
          <span class="stage-label label-result">3. TABLA RESULTADO FINAL (OUTPUT DATA)</span>
          <table class="table-interactive">
            <thead>
              <tr>
                ${type === 'project' ? '<th>Nombre</th><th>Salario</th>' : (type === 'join' ? '<th>Empleado</th><th>Departamento</th>' : '<th>ID</th><th>Nombre</th><th>Salario</th><th>Depto</th>')}
              </tr>
            </thead>
            <tbody>${resultRows}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMod0(btn.dataset.type);
    });
  });

  renderMod0('select');
}

/* ==========================================================================
   MÓDULO 01: Matriz Comparativa Multi-Motor SQL Interactiva
   ========================================================================== */
const engineMatrixData = {
  mssql: {
    name: 'Microsoft SQL Server / Azure SQL Database',
    badge: 'T-SQL Enterprise / Azure Cloud',
    auto: 'IDENTITY(1,1)',
    text: 'VARCHAR(n) / NVARCHAR(n)',
    decimal: 'DECIMAL(p,s) / MONEY',
    time: 'DATETIME2 / DATETIMEOFFSET',
    json: 'JSON / OPENJSON()',
    upsert: 'MERGE INTO ...',
    explain: 'SET SHOWPLAN_TEXT ON;',
    example: 'CREATE TABLE empleados (\n  empleado_id INT IDENTITY(1,1) PRIMARY KEY,\n  nombre NVARCHAR(100) NOT NULL,\n  salario DECIMAL(15,2) CHECK (salario > 0),\n  especificaciones JSON\n);'
  },
  informix: {
    name: 'IBM Informix Dynamic Server (IDS)',
    badge: 'Misión Crítica / Real-Time POS',
    auto: 'SERIAL / SERIAL8',
    text: 'VARCHAR(n) / LVARCHAR',
    decimal: 'MONEY(p,s) / DECIMAL',
    time: 'DATETIME YEAR TO SECOND',
    json: 'BSON / JSON',
    upsert: 'MERGE INTO ...',
    explain: 'SET EXPLAIN ON;',
    example: 'CREATE TABLE empleados (\n  empleado_id SERIAL PRIMARY KEY,\n  nombre VARCHAR(100) NOT NULL,\n  salario MONEY(15,2),\n  fecha_ingreso DATETIME YEAR TO DAY\n);'
  },
  postgres: {
    name: 'PostgreSQL',
    badge: 'Standard Open Source / Cloud',
    auto: 'GENERATED ALWAYS AS IDENTITY',
    text: 'VARCHAR(n) / TEXT',
    decimal: 'NUMERIC(p,s) / DECIMAL',
    time: 'TIMESTAMP WITH TIME ZONE',
    json: 'JSONB / JSON',
    upsert: 'INSERT ... ON CONFLICT DO UPDATE',
    explain: 'EXPLAIN ANALYZE ...;',
    example: 'CREATE TABLE empleados (\n  empleado_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  nombre TEXT NOT NULL,\n  salario NUMERIC(15,2),\n  metadata JSONB\n);'
  },
  oracle: {
    name: 'Oracle Database (OCI)',
    badge: 'Banca & ERP Enterprise',
    auto: 'NUMBER + IDENTITY / SEQUENCE',
    text: 'VARCHAR2(n) / CLOB',
    decimal: 'NUMBER(p,s)',
    time: 'DATE / TIMESTAMP',
    json: 'JSON / CLOB',
    upsert: 'MERGE INTO ...',
    explain: 'EXPLAIN PLAN FOR ...;',
    example: 'CREATE TABLE empleados (\n  empleado_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  nombre VARCHAR2(100) NOT NULL,\n  salario NUMBER(15,2)\n);'
  },
  mysql: {
    name: 'MariaDB / MySQL',
    badge: 'Ecosistema Web & e-Commerce',
    auto: 'INT AUTO_INCREMENT',
    text: 'VARCHAR(n) / TEXT',
    decimal: 'DECIMAL(p,s)',
    time: 'DATETIME / TIMESTAMP',
    json: 'JSON',
    upsert: 'INSERT ... ON DUPLICATE KEY UPDATE',
    explain: 'EXPLAIN FORMAT=JSON ...;',
    example: 'CREATE TABLE empleados (\n  empleado_id INT AUTO_INCREMENT PRIMARY KEY,\n  nombre VARCHAR(100) NOT NULL,\n  salario DECIMAL(15,2)\n);'
  },
  duckdb: {
    name: 'DuckDB (Google Colab / Python)',
    badge: 'Motor OLAP Incrustado',
    auto: 'BIGINT / SEQUENCE',
    text: 'VARCHAR',
    decimal: 'DECIMAL(p,s)',
    time: 'TIMESTAMP',
    json: 'JSON',
    upsert: 'INSERT ... ON CONFLICT',
    explain: 'EXPLAIN ...;',
    example: 'CREATE TABLE empleados (\n  empleado_id INT PRIMARY KEY,\n  nombre VARCHAR,\n  salario DECIMAL(15,2),\n  especificaciones JSON\n);'
  }
};

function initMod1MultiEngineMatrix() {
  const container = document.getElementById('mod1EngineDisplay');
  const buttons = document.querySelectorAll('.engine-btn');
  if (!container || !buttons.length) return;

  function renderEngine(type) {
    const e = engineMatrixData[type] || engineMatrixData.mssql;
    container.innerHTML = `
      <div style="background: var(--bg-card); padding: 18px; border-radius: 8px; border: 1px solid var(--border-color);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h4 style="color: var(--accent-dark);">${e.name}</h4>
          <span class="badge-tech">${e.badge}</span>
        </div>
        <table class="table-interactive" style="margin-bottom: 12px;">
          <thead><tr><th>Característica / Tipo</th><th>Especificación en ${e.name}</th></tr></thead>
          <tbody>
            <tr><td><strong>Autoincremental (PK)</strong></td><td><code>${e.auto}</code></td></tr>
            <tr><td><strong>Cadenas de Texto</strong></td><td><code>${e.text}</code></td></tr>
            <tr><td><strong>Moneda / Decimal</strong></td><td><code>${e.decimal}</code></td></tr>
            <tr><td><strong>Fecha / Tiempo</strong></td><td><code>${e.time}</code></td></tr>
            <tr><td><strong>Documentos JSON</strong></td><td><code>${e.json}</code></td></tr>
            <tr><td><strong>Operación Upsert</strong></td><td><code>${e.upsert}</code></td></tr>
            <tr><td><strong>Comando EXPLAIN Plan</strong></td><td><code>${e.explain}</code></td></tr>
          </tbody>
        </table>
        <strong style="font-size: 0.88rem; color: var(--accent-dark);">Ejemplo DDL en ${e.name}:</strong>
        <div class="code-block" style="margin-top:6px;"><code>${e.example}</code></div>
      </div>
    `;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderEngine(btn.dataset.engine);
    });
  });

  renderEngine('mssql');
}

/* --------------------------------------------------------------------------
   MÓDULO 02: Tester LIKE / ILIKE con Flujo de 3 Etapas
   -------------------------------------------------------------------------- */
const sampleClientsM2 = [
  { id: 201, nombre: 'Tech Solutions S.A.S.', ciudad: 'Bogotá', cat: 'Empresarial' },
  { id: 202, nombre: 'Comercializadora del Valle', ciudad: 'Cali', cat: 'Empresarial' },
  { id: 203, nombre: 'Juan Pablo Restrepo', ciudad: 'Medellín', cat: 'Individual' },
  { id: 204, nombre: 'Inversiones Caribe Ltd.', ciudad: 'Barranquilla', cat: 'Empresarial' },
  { id: 205, nombre: 'Diana Marcela Vargas', ciudad: 'Bogotá', cat: 'VIP' },
  { id: 206, nombre: 'Servicios Logísticos del Eje', ciudad: 'Pereira', cat: 'Empresarial' },
  { id: 207, nombre: 'Mateo Gutiérrez', ciudad: 'Bucaramanga', cat: 'Individual' }
];

function initMod2LikeTester() {
  const input = document.getElementById('likeInput');
  const container = document.getElementById('likeResults');
  if (!input || !container) return;

  function renderLikePipeline() {
    const pattern = input.value.trim().toLowerCase();
    const regexPattern = '^' + pattern.replace(/%/g, '.*').replace(/_/g, '.') + '$';
    let regex;
    try { regex = new RegExp(regexPattern, 'i'); } catch (e) { return; }

    const procRows = sampleClientsM2.map(c => {
      const matchName = regex.test(c.nombre.toLowerCase());
      const matchCity = regex.test(c.ciudad.toLowerCase());
      const pass = matchName || matchCity;
      const cls = pass ? 'row-matched' : 'row-filtered';
      const badge = pass ? '✅ MATCH PATRÓN' : '❌ SIN COINCIDENCIA';
      return `
        <tr class="${cls}">
          <td>${c.id}</td>
          <td>${c.nombre}</td>
          <td>${c.ciudad}</td>
          <td>${c.cat}</td>
          <td><strong>${badge}</strong></td>
        </tr>
      `;
    }).join('');

    const matchedClients = sampleClientsM2.filter(c => regex.test(c.nombre.toLowerCase()) || regex.test(c.ciudad.toLowerCase()));

    container.innerHTML = `
      <div class="pipeline-stages">
        <div class="stage-box">
          <span class="stage-label label-base">1. TABLA BASE ORIGINAL (7 CLIENTES)</span>
          <table class="table-interactive">
            <thead><tr><th>ID</th><th>Cliente</th><th>Ciudad</th><th>Categoría</th></tr></thead>
            <tbody>
              ${sampleClientsM2.map(c => `<tr><td>${c.id}</td><td>${c.nombre}</td><td>${c.ciudad}</td><td>${c.cat}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>

        <div class="stage-box">
          <span class="stage-label label-process">2. PROCESO DE COINCIDENCIA (VERDE = MATCH, ROJO = DESCARTADO)</span>
          <div class="code-block"><code>SELECT * FROM clientes WHERE nombre ILIKE '${pattern}' OR ciudad ILIKE '${pattern}';</code></div>
          <table class="table-interactive">
            <thead><tr><th>ID</th><th>Cliente</th><th>Ciudad</th><th>Categoría</th><th>Evaluación Patrón</th></tr></thead>
            <tbody>${procRows}</tbody>
          </table>
        </div>

        <div class="stage-box">
          <span class="stage-label label-result">3. TABLA RESULTADO FINAL (${matchedClients.length} FILAS RETORNADAS)</span>
          <table class="table-interactive">
            <thead><tr><th>ID</th><th>Cliente</th><th>Ciudad</th><th>Categoría</th></tr></thead>
            <tbody>
              ${matchedClients.length ? matchedClients.map(c => `<tr><td>${c.id}</td><td><strong>${c.nombre}</strong></td><td>${c.ciudad}</td><td>${c.cat}</td></tr>`).join('') : '<tr><td colspan="4" style="text-align:center; color: var(--text-muted);">Sin resultados para este patrón.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  input.addEventListener('input', renderLikePipeline);
  renderLikePipeline();
}

/* ==========================================================================
   MÓDULO 03: JOINs Complejos (3 Etapas: Tabla A y B -> Conexión Llaves -> Resultado)
   ========================================================================== */
const rawEmpsM3 = [
  { id: 101, nom: 'Carlos Mendoza', depto: 1 },
  { id: 102, nom: 'Ana María Gómez', depto: 1 },
  { id: 104, nom: 'Sofía Ramírez', depto: 2 },
  { id: 999, nom: 'Consultor Externo X', depto: 99 }
];

const rawDeptosM3 = [
  { id: 1, nom: 'Tecnología e Innovación' },
  { id: 2, nom: 'Ventas y Comercio' },
  { id: 88, nom: 'Departamento Nivel 6 (Nuevo)' }
];

function initJoinSimulator() {
  const container = document.getElementById('joinSimDisplay');
  const buttons = document.querySelectorAll('.join-btn');
  if (!container || !buttons.length) return;

  function renderJoin(type) {
    let title = '';
    let sql = '';
    let desc = '';
    let procRows = '';
    let resRows = '';

    if (type === 'inner') {
      title = 'INNER JOIN (Intersección de Coincidencias)';
      sql = 'SELECT e.nombre, d.nombre AS depto FROM empleados e INNER JOIN departamentos d ON e.depto_id = d.depto_id;';
      desc = 'Evalúa coincidencia de llaves (e.depto_id = d.depto_id). Solo pasan filas con pareja en ambas tablas.';

      procRows = rawEmpsM3.map(e => {
        const d = rawDeptosM3.find(dep => dep.id === e.depto);
        if (d) {
          return `<tr class="row-matched"><td>${e.nom} (Depto ${e.depto})</td><td>🔗 LLAVE COINCIDE (FK=${e.depto})</td><td>${d.nom} (ID ${d.id})</td><td><span style="color:#065f46; font-weight:700;">✅ RETENIDO</span></td></tr>`;
        } else {
          return `<tr class="row-filtered"><td>${e.nom} (Depto ${e.depto})</td><td>❌ SIN PAREJA EN DEPTOS</td><td>NULL</td><td><span style="color:#991b1b;">❌ DESCARTADO</span></td></tr>`;
        }
      }).join('');

      resRows = `
        <tr><td>Carlos Mendoza</td><td>Tecnología e Innovación</td></tr>
        <tr><td>Ana María Gómez</td><td>Tecnología e Innovación</td></tr>
        <tr><td>Sofía Ramírez</td><td>Ventas y Comercio</td></tr>
      `;
    } else if (type === 'left') {
      title = 'LEFT JOIN (Conserva todas las filas de la Izquierda)';
      sql = 'SELECT e.nombre, d.nombre AS depto FROM empleados e LEFT JOIN departamentos d ON e.depto_id = d.depto_id;';
      desc = 'Conserva todos los Empleados. Si no tiene departamento, rellena la derecha con NULL.';

      procRows = rawEmpsM3.map(e => {
        const d = rawDeptosM3.find(dep => dep.id === e.depto);
        if (d) {
          return `<tr class="row-matched"><td>${e.nom}</td><td>🔗 FK=${e.depto} MATCH</td><td>${d.nom}</td><td><span style="color:#065f46; font-weight:700;">✅ CON PAREJA</span></td></tr>`;
        } else {
          return `<tr class="row-partition"><td>${e.nom}</td><td>⚠️ SIN PAREJA $\\rightarrow$ RELLENO NULL</td><td><span class="badge-tech" style="background:#fef3c7; color:#b45309;">NULL</span></td><td><span style="color:#0369a1; font-weight:700;">✅ RETENIDO (CON NULL)</span></td></tr>`;
        }
      }).join('');

      resRows = `
        <tr><td>Carlos Mendoza</td><td>Tecnología e Innovación</td></tr>
        <tr><td>Ana María Gómez</td><td>Tecnología e Innovación</td></tr>
        <tr><td>Sofía Ramírez</td><td>Ventas y Comercio</td></tr>
        <tr><td>Consultor Externo X</td><td style="color:#b45309; font-style:italic;">NULL (Sin Depto)</td></tr>
      `;
    } else {
      title = 'RIGHT / FULL JOIN';
      sql = 'SELECT e.nombre, d.nombre AS depto FROM empleados e FULL OUTER JOIN departamentos d ON e.depto_id = d.depto_id;';
      desc = 'Evalúa combinaciones y rellena campos faltantes con valores NULL.';

      procRows = `
        <tr class="row-matched"><td>Carlos Mendoza</td><td>FK=1 Match</td><td>Tecnología e Innovación</td><td>✅ MATCH</td></tr>
        <tr class="row-partition"><td>Consultor Externo X</td><td>Sin Depto FK=99</td><td><span class="badge-tech" style="background:#fef3c7; color:#b45309;">NULL</span></td><td>✅ LEFT ORPHAN</td></tr>
        <tr class="row-partition"><td><span class="badge-tech" style="background:#fef3c7; color:#b45309;">NULL</span></td><td>Sin Empleado FK=88</td><td>Departamento Nivel 6</td><td>✅ RIGHT ORPHAN</td></tr>
      `;

      resRows = `
        <tr><td>Carlos Mendoza</td><td>Tecnología e Innovación</td></tr>
        <tr><td>Consultor Externo X</td><td style="color:#b45309;">NULL</td></tr>
        <tr style="color:#b45309;"><td>NULL</td><td>Departamento Nivel 6</td></tr>
      `;
    }

    container.innerHTML = `
      <div class="pipeline-stages">
        <div class="stage-box">
          <span class="stage-label label-base">1. TABLAS BASE ORIGINALES (EMPLEADOS & DEPARTAMENTOS)</span>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <strong style="font-size: 0.85rem; color: var(--accent-dark);">Tabla A (Izquierda - Empleados):</strong>
              <table class="table-interactive">
                <thead><tr><th>ID</th><th>Nombre</th><th>Depto FK</th></tr></thead>
                <tbody>${rawEmpsM3.map(e => `<tr><td>${e.id}</td><td>${e.nom}</td><td>${e.depto}</td></tr>`).join('')}</tbody>
              </table>
            </div>
            <div>
              <strong style="font-size: 0.85rem; color: var(--accent-dark);">Tabla B (Derecha - Deptos):</strong>
              <table class="table-interactive">
                <thead><tr><th>ID</th><th>Nombre Depto</th></tr></thead>
                <tbody>${rawDeptosM3.map(d => `<tr><td>${d.id}</td><td>${d.nom}</td></tr>`).join('')}</tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="stage-box">
          <span class="stage-label label-process">2. PROCESO DE VINCULACIÓN DE LLAVES (${title})</span>
          <p style="font-size: 0.88rem; color: var(--text-main); margin-bottom: 8px;">${desc}</p>
          <div class="code-block"><code>${sql}</code></div>
          <table class="table-interactive">
            <thead><tr><th>Empleado (A)</th><th>Estado de Coincidencia PK/FK</th><th>Departamento (B)</th><th>Acción Motor</th></tr></thead>
            <tbody>${procRows}</tbody>
          </table>
        </div>

        <div class="stage-box">
          <span class="stage-label label-result">3. TABLA RESULTADO RECONSTRUIDA</span>
          <table class="table-interactive">
            <thead><tr><th>Empleado</th><th>Departamento</th></tr></thead>
            <tbody>${resRows}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderJoin(btn.dataset.type);
    });
  });

  renderJoin('inner');
}

/* ==========================================================================
   MÓDULO 04: Normalización 1FN a 5FN (Visualizador por Pasos)
   ========================================================================== */
const normData = {
  unnorm: {
    title: '0. Tabla Plana Desnormalizada (Sucia / Hoja Excel)',
    desc: 'Celda con grupos repetitivos (múltiples teléfonos en una celda), dependencia parcial y redundancia.',
    base: 'Ventas_Planas(id_venta, cliente, ciudad, productos_lista, telefonos_lista)',
    proc: '<tr class="row-filtered"><td>V101</td><td>Tech Solutions</td><td>Bogotá</td><td>[Laptop, Monitor, Switch]</td><td>[3101234, 3209876]</td><td>❌ Anomalías Masivas</td></tr>',
    res: 'Ventas_Planas(id_venta, cliente, ciudad, productos_lista, telefonos_lista)'
  },
  fn1: {
    title: '1. Primera Forma Normal (1FN) — Atomicidad',
    desc: 'Elimina celdas no atómicas (listas de productos/teléfonos). Cada celda contiene un único valor.',
    base: 'Ventas_Planas(id_venta, cliente, ciudad, productos_lista)',
    proc: '<tr class="row-matched"><td>V101</td><td>Tech Solutions</td><td>Bogotá</td><td>Laptop Pro 16</td><td>✅ ATÓMICO (1 Fila por Producto)</td></tr><tr class="row-matched"><td>V101</td><td>Tech Solutions</td><td>Bogotá</td><td>Monitor Ultrawide</td><td>✅ ATÓMICO (1 Fila por Producto)</td></tr>',
    res: 'Ventas_1FN(id_venta, cliente, ciudad, producto)'
  },
  fn3: {
    title: '3. Tercera Forma Normal (3FN) & BCNF — Eliminación de Dependencias Transitivas',
    desc: 'Descompone atributos que no dependen de la Clave Primaria (ej. `ciudad` depende de `cliente`, no de `venta`).',
    base: 'Ventas_1FN(id_venta, cliente, ciudad, producto)',
    proc: '<tr class="row-partition"><td>Tabla Clientes</td><td>cliente_id (PK) $\\rightarrow$ ciudad</td><td>Sin Redundancia de Ciudad</td></tr><tr class="row-partition"><td>Tabla Pedidos</td><td>pedido_id (PK) $\\rightarrow$ cliente_id (FK)</td><td>Vinculación Limpia</td></tr>',
    res: 'Clientes(cliente_id, nombre, ciudad), Pedidos(pedido_id, cliente_id), Productos(prod_id, nombre)'
  },
  fn5: {
    title: '5. Quinta Forma Normal (5FN) — Reconstrucción Sin Pérdidas (Join Dependencies)',
    desc: 'Descomposición perfecta de proyección-unión. Reconstrucción unánime con JOINs sin tuplas espurias.',
    base: 'Esquema CUN 5FN (6 Tablas Normalizadas)',
    proc: '<tr class="row-matched"><td>Departamentos ↔ Empleados ↔ Pedidos ↔ Detalle ↔ Productos</td><td>✅ 0 Tuplas Espurias (Pérdidas = 0)</td></tr>',
    res: 'Esquema Final CUN (Departamentos, Empleados, Clientes, Productos, Pedidos, Detalle_Pedidos)'
  }
};

function initNormalizationSimulator() {
  const container = document.getElementById('normSimDisplay');
  const buttons = document.querySelectorAll('.norm-btn');
  if (!container || !buttons.length) return;

  function renderNorm(step) {
    const data = normData[step] || normData.unnorm;
    container.innerHTML = `
      <div class="pipeline-stages">
        <div class="stage-box">
          <span class="stage-label label-base">1. ESTRUCTURA ANTERIOR</span>
          <div class="code-block"><code>${data.base}</code></div>
        </div>
        <div class="stage-box">
          <span class="stage-label label-process">2. PROCESO DE NORMALIZACIÓN Y REFACTORIZACIÓN</span>
          <p style="font-size: 0.88rem; color: var(--text-main); margin-bottom: 8px;"><strong>${data.title}:</strong> ${data.desc}</p>
          <table class="table-interactive">
            <thead><tr><th>Entidad / Atributo</th><th>Transformación Aplicada</th><th>Resultado</th></tr></thead>
            <tbody>${data.proc}</tbody>
          </table>
        </div>
        <div class="stage-box">
          <span class="stage-label label-result">3. ESQUEMA FINAL RESULTANTE</span>
          <div class="code-block"><code>${data.res}</code></div>
        </div>
      </div>
    `;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderNorm(btn.dataset.step);
    });
  });

  renderNorm('unnorm');
}

/* ==========================================================================
   MÓDULO 05: Transacciones & Aislamiento (Commit / Rollback)
   ========================================================================== */
function initMod5TransactionSimulator() {
  const container = document.getElementById('mod5SimDisplay');
  const btnCommit = document.getElementById('btnSimCommit');
  const btnRollback = document.getElementById('btnSimRollback');
  if (!container || !btnCommit || !btnRollback) return;

  function renderTx(status) {
    let procClass = status === 'commit' ? 'row-matched' : 'row-filtered';
    let msg = status === 'commit' ? '✅ COMMIT: Cambios aplicados en el log transaccional y sincronizados a disco.' : '🔄 ROLLBACK: Transacción abortada. Los datos regresan a su versión original consistente.';

    container.innerHTML = `
      <div class="pipeline-stages">
        <div class="stage-box">
          <span class="stage-label label-base">1. ESTADO INICIAL DE TABLA PRODUCTOS</span>
          <table class="table-interactive">
            <thead><tr><th>ID</th><th>Producto</th><th>Precio Original</th></tr></thead>
            <tbody>
              <tr><td>301</td><td>Servidor Cloud Enterprise X1</td><td>$12.500.000,00</td></tr>
              <tr><td>302</td><td>Laptop Pro Developer 16</td><td>$8.200.000,00</td></tr>
            </tbody>
          </table>
        </div>
        <div class="stage-box">
          <span class="stage-label label-process">2. EJECUCIÓN EN BLOQUE TRANSACCIONAL (BEGIN TRANSACTION)</span>
          <div class="code-block"><code>BEGIN TRANSACTION;\nUPDATE productos SET precio = precio * 1.10 WHERE categoria = 'Hardware';\n${status.toUpperCase()};</code></div>
          <p style="font-size: 0.88rem; color: var(--text-main);">${msg}</p>
        </div>
        <div class="stage-box">
          <span class="stage-label label-result">3. ESTADO PERSISTIDO FINAL</span>
          <table class="table-interactive">
            <thead><tr><th>ID</th><th>Producto</th><th>Precio Final</th></tr></thead>
            <tbody>
              <tr class="${procClass}">
                <td>301</td><td>Servidor Cloud Enterprise X1</td>
                <td>${status === 'commit' ? '$13.750.000,00 (+10%)' : '$12.500.000,00 (Revertido)'}</td>
              </tr>
              <tr class="${procClass}">
                <td>302</td><td>Laptop Pro Developer 16</td>
                <td>${status === 'commit' ? '$9.020.000,00 (+10%)' : '$8.200.000,00 (Revertido)'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  btnCommit.addEventListener('click', () => renderTx('commit'));
  btnRollback.addEventListener('click', () => renderTx('rollback'));
  renderTx('commit');
}

/* ==========================================================================
   MÓDULO 06: Agregación GROUP BY & HAVING
   ========================================================================== */
const deptoSalariosM6 = [
  { depto: 'Tecnología e Innovación', suma: 19500000.00, count: 3 },
  { depto: 'Ventas y Comercio', suma: 19600000.00, count: 3 },
  { depto: 'Operaciones y Logística', suma: 11200000.00, count: 2 },
  { depto: 'Recursos Humanos', suma: 6500000.00, count: 1 },
  { depto: 'Finanzas y Contabilidad', suma: 5800000.00, count: 1 }
];

function initMod6GroupByCalculator() {
  const slider = document.getElementById('havingSlider');
  const valDisplay = document.getElementById('havingValDisplay');
  const container = document.getElementById('mod6Results');
  if (!slider || !valDisplay || !container) return;

  function updateGroupBy() {
    const threshold = parseFloat(slider.value);
    valDisplay.textContent = `$${(threshold / 1000000).toFixed(1)} Millones`;

    const procRows = deptoSalariosM6.map(d => {
      const pass = d.suma >= threshold;
      const cls = pass ? 'row-matched' : 'row-filtered';
      const badge = pass ? '✅ RETENIDO POR HAVING' : '❌ DESCARTADO (SUM < Umbral)';
      return `
        <tr class="${cls}">
          <td>${d.depto}</td>
          <td>${d.count} emp</td>
          <td>$${d.suma.toLocaleString('es-CO')}</td>
          <td><strong>${badge}</strong></td>
        </tr>
      `;
    }).join('');

    const filtered = deptoSalariosM6.filter(d => d.suma >= threshold);

    container.innerHTML = `
      <div class="pipeline-stages">
        <div class="stage-box">
          <span class="stage-label label-base">1. TABLA BASE DE EMPLEADOS SIN AGRUPAR</span>
          <p style="font-size: 0.85rem; color: var(--text-muted);">10 Empleados distribuidos en 5 departamentos de la empresa.</p>
        </div>
        <div class="stage-box">
          <span class="stage-label label-process">2. PROCESO DE AGRUPAMIENTO Y FILTRADO HAVING (UMBRAL: $${(threshold/1000000).toFixed(1)}M)</span>
          <div class="code-block"><code>SELECT d.nombre, SUM(e.salario) FROM empleados e JOIN departamentos d ON e.depto_id = d.depto_id GROUP BY d.nombre HAVING SUM(e.salario) >= ${threshold};</code></div>
          <table class="table-interactive">
            <thead><tr><th>Departamento</th><th>Conteo</th><th>Suma Nómina</th><th>Evaluación HAVING</th></tr></thead>
            <tbody>${procRows}</tbody>
          </table>
        </div>
        <div class="stage-box">
          <span class="stage-label label-result">3. TABLA RESULTADO RESUMIDO (${filtered.length} DEPARTAMENTOS)</span>
          <table class="table-interactive">
            <thead><tr><th>Departamento</th><th>Empleados</th><th>Nómina Total</th><th>Promedio</th></tr></thead>
            <tbody>
              ${filtered.map(d => `
                <tr>
                  <td><strong>${d.depto}</strong></td>
                  <td>${d.count}</td>
                  <td style="color: var(--accent-primary); font-weight:700;">$${d.suma.toLocaleString('es-CO')}</td>
                  <td>$${(d.suma/d.count).toLocaleString('es-CO', {maximumFractionDigits:0})}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  slider.addEventListener('input', updateGroupBy);
  updateGroupBy();
}

/* ==========================================================================
   MÓDULO 07: Window Functions (OVER / RANK / LAG)
   ========================================================================== */
function initMod7WindowFunctionVisualizer() {
  const container = document.getElementById('mod7WindowDisplay');
  const buttons = document.querySelectorAll('.win-btn');
  if (!container) return;

  function renderWindow(mode) {
    let modeTitle = '';
    let sqlCode = '';
    let explanation = '';
    let rowsHtml = '';

    if (mode === 'lag_lead') {
      modeTitle = '2. DESPLAZAMIENTO TEMPORAL Y COMPARATIVO (LAG & LEAD)';
      sqlCode = `SELECT nombre, salario,
       LAG(salario, 1) OVER (ORDER BY salario ASC) AS salario_anterior,
       (salario - LAG(salario, 1) OVER (ORDER BY salario ASC)) AS brecha_salarial
FROM empleados;`;
      explanation = 'LAG() accede a la fila previa en la ordenación sin necesidad de hacer un self-join. Permite calcular variaciones inmediatas.';
      rowsHtml = `
        <tr class="row-matched"><td>Luis Fernando Torres</td><td>$4.800.000</td><td><span class="badge-tech" style="background:#fef3c7; color:#b45309;">NULL</span> (Fila 1)</td><td>$0 (Base)</td></tr>
        <tr class="row-matched"><td>Diego Alejandro Silva</td><td>$5.500.000</td><td>$4.800.000</td><td>+$700.000</td></tr>
        <tr class="row-matched"><td>Camila Ospina</td><td>$5.800.000</td><td>$5.500.000</td><td>+$300.000</td></tr>
        <tr class="row-matched"><td>Ana María Gómez</td><td>$6.200.000</td><td>$5.800.000</td><td>+$400.000</td></tr>
        <tr class="row-matched"><td>Carlos Mendoza</td><td>$8.500.000</td><td>$6.200.000</td><td>+$2.300.000</td></tr>
        <tr class="row-matched"><td>Sofía Ramírez</td><td>$9.000.000</td><td>$8.500.000</td><td>+$500.000</td></tr>
      `;
    } else if (mode === 'running') {
      modeTitle = '2. ACUMULADO MÓVIL (RUNNING TOTAL CON ROWS BETWEEN)';
      sqlCode = `SELECT nombre, salario,
       SUM(salario) OVER (
           ORDER BY salario ASC
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS nomina_acumulada_movil
FROM empleados;`;
      explanation = 'El marco deslizante ROWS BETWEEN suma desde la primera fila de la partición (UNBOUNDED PRECEDING) hasta la fila actual (CURRENT ROW).';
      rowsHtml = `
        <tr class="row-partition"><td>Luis Fernando Torres</td><td>$4.800.000</td><td>Fila 1</td><td><strong>$4.800.000</strong></td></tr>
        <tr class="row-partition"><td>Diego Alejandro Silva</td><td>$5.500.000</td><td>Filas 1..2</td><td><strong>$10.300.000</strong></td></tr>
        <tr class="row-partition"><td>Camila Ospina</td><td>$5.800.000</td><td>Filas 1..3</td><td><strong>$16.100.000</strong></td></tr>
        <tr class="row-partition"><td>Ana María Gómez</td><td>$6.200.000</td><td>Filas 1..4</td><td><strong>$22.300.000</strong></td></tr>
        <tr class="row-partition"><td>Carlos Mendoza</td><td>$8.500.000</td><td>Filas 1..5</td><td><strong>$30.800.000</strong></td></tr>
        <tr class="row-partition"><td>Sofía Ramírez</td><td>$9.000.000</td><td>Filas 1..6</td><td><strong style="color:var(--accent-primary);">$39.800.000 (100%)</strong></td></tr>
      `;
    } else {
      // Default: ranking
      modeTitle = '2. RANKING RELACIONAL PARTICIONADO (PARTITION BY depto_id)';
      sqlCode = `SELECT d.nombre AS depto, e.nombre, e.salario,
       ROW_NUMBER() OVER (PARTITION BY e.depto_id ORDER BY e.salario DESC) AS row_num,
       DENSE_RANK() OVER (PARTITION BY e.depto_id ORDER BY e.salario DESC) AS dense_rnk
FROM empleados e
JOIN departamentos d ON e.depto_id = d.depto_id;`;
      explanation = 'PARTITION BY divide el conjunto en islas aisladas sin colapsar filas. La numeración se reinicia a 1 en cada nuevo departamento.';
      rowsHtml = `
        <tr class="row-partition"><td>Tecnología</td><td>Carlos Mendoza</td><td>$8.500.000</td><td>Ventana Depto 1</td><td><strong style="color:var(--accent-primary);">1</strong></td><td><strong>1</strong></td></tr>
        <tr class="row-partition"><td>Tecnología</td><td>Ana María Gómez</td><td>$6.200.000</td><td>Ventana Depto 1</td><td><strong style="color:var(--accent-primary);">2</strong></td><td><strong>2</strong></td></tr>
        <tr class="row-partition"><td>Tecnología</td><td>Luis Torres</td><td>$4.800.000</td><td>Ventana Depto 1</td><td><strong style="color:var(--accent-primary);">3</strong></td><td><strong>3</strong></td></tr>
        <tr class="row-matched"><td>Ventas</td><td>Sofía Ramírez</td><td>$9.000.000</td><td>Ventana Depto 2</td><td><strong style="color:#0284c7;">1</strong></td><td><strong>1</strong></td></tr>
        <tr class="row-matched"><td>Ventas</td><td>Diego Silva</td><td>$5.500.000</td><td>Ventana Depto 2</td><td><strong style="color:#0284c7;">2</strong></td><td><strong>2</strong></td></tr>
        <tr class="row-matched"><td>Ventas</td><td>Valentina Morales</td><td>$5.100.000</td><td>Ventana Depto 2</td><td><strong style="color:#0284c7;">3</strong></td><td><strong>3</strong></td></tr>
      `;
    }

    container.innerHTML = `
      <div class="pipeline-stages">
        <div class="stage-box">
          <span class="stage-label label-base">1. TABLA BASE INDIVIDUAL (CONSERVACIÓN DE ARIDAD ORIGINAL)</span>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            A diferencia de <code>GROUP BY</code> que colapsa múltiples filas en 1 sola, las <strong>Window Functions</strong> preservan el 100% de las tuplas individuales de la relación.
          </p>
        </div>
        <div class="stage-box">
          <span class="stage-label label-process">${modeTitle}</span>
          <p style="font-size: 0.88rem; color: var(--text-main); margin-bottom: 8px;">${explanation}</p>
          <div class="code-block"><code>${sqlCode}</code></div>
          <table class="table-interactive">
            <thead>
              <tr>
                ${mode === 'lag_lead' 
                  ? '<th>Empleado</th><th>Salario Base</th><th>Salario Anterior LAG(1)</th><th>Brecha Salarial Calculada</th>' 
                  : mode === 'running' 
                    ? '<th>Empleado</th><th>Salario</th><th>Marco ROWS BETWEEN</th><th>Nómina Acumulada Móvil</th>' 
                    : '<th>Departamento</th><th>Empleado</th><th>Salario</th><th>Marco de Ventana</th><th>ROW_NUMBER()</th><th>DENSE_RANK()</th>'}
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
        <div class="stage-box">
          <span class="stage-label label-result">3. IMPACTO ANALÍTICO EN PRODUCCIÓN</span>
          <p style="font-size: 0.88rem; color: var(--accent-dark); font-weight: 600;">
            ✅ Tiempo de cómputo en una sola pasada: $O(N \\log N)$ en lugar de subconsultas cuadráticas $O(N^2)$ o múltiples self-joins.
          </p>
        </div>
      </div>
    `;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderWindow(btn.dataset.mode);
    });
  });

  renderWindow('ranking');
}

/* ==========================================================================
   MÓDULO 08: Optimización EXPLAIN & CBO Cost Analyzer
   ========================================================================== */
function initMod8ExplainCboSimulator() {
  const container = document.getElementById('mod8ExplainDisplay');
  const btnNoIdx = document.getElementById('btnExplainNoIdx');
  const btnWithIdx = document.getElementById('btnExplainWithIdx');
  if (!container || !btnNoIdx || !btnWithIdx) return;

  function renderExplain(hasIndex) {
    if (hasIndex) {
      btnWithIdx.classList.add('active');
      btnNoIdx.classList.remove('active');
    } else {
      btnNoIdx.classList.add('active');
      btnWithIdx.classList.remove('active');
    }

    container.innerHTML = `
      <div class="pipeline-stages">
        <div class="stage-box">
          <span class="stage-label label-base">1. CONSULTA SQL INGRESADA AL MOTOR</span>
          <div class="code-block"><code>EXPLAIN SELECT e.nombre, d.nombre FROM empleados e JOIN departamentos d ON e.depto_id = d.depto_id WHERE e.salario > 5000000;</code></div>
        </div>
        <div class="stage-box">
          <span class="stage-label label-process">2. PLAN DE EJECUCIÓN FÍSICO DEL COST-BASED OPTIMIZER (CBO)</span>
          <div class="code-block" style="background: #0f172a;">
            ${hasIndex ? `
              <span style="color: #4ade80; font-weight:700;">PHYSICAL PLAN: INDEX_SCAN (B-Tree Index: idx_emp_salario)</span><br>
              ├── Operador de Filtro: Index Range Scan [salario > 5000000]<br>
              ├── Index Leaf Pages Read: 12 Páginas (0.096 MB)<br>
              ├── Join Algorithm: Hash Join (O(N + M)) en memoria RAM<br>
              └── Estimated Execution Time: 4.2 ms (⚡ 99.9% MÁS RÁPIDO)
            ` : `
              <span style="color: #ef4444; font-weight:700;">PHYSICAL PLAN: SEQ_SCAN (Full Table Scan Sin Índice)</span><br>
              ├── Operador de Filtro: Filter Predicate evaluado tupla por tupla<br>
              ├── Data Pages Read: 45,000 Páginas Secuenciales de Disco (360 MB)<br>
              ├── Join Algorithm: Nested Loop Join cuadrático (O(N * M))<br>
              └── Estimated Execution Time: 14,250 ms (⚠️ CUELLO DE BOTELLA I/O)
            `}
          </div>
        </div>
        <div class="stage-box">
          <span class="stage-label label-result">3. VEREDICTO DE RENDIMIENTO EN PRODUCCIÓN</span>
          <p style="font-size: 0.88rem; color: ${hasIndex ? 'var(--accent-dark)' : '#b91c1c'}; font-weight: 600;">
            ${hasIndex ? `
              ✅ Cómputo logarítmico O(log N): B-Tree reduce las lecturas de 45,000 bloques a solo 12 hojas. El Buffer Pool permanece intacto sin expulsión violenta de páginas (Zero Cache Thrashing).
            ` : `
              ❌ Cómputo lineal O(N) con I/O masivo: Escaneo completo de disco satura el canal de lectura y satura la CPU con 14.2 segundos de latencia inaceptable para SLAs transaccionales.
            `}
          </p>
        </div>
      </div>
    `;
  }

  btnNoIdx.addEventListener('click', () => renderExplain(false));
  btnWithIdx.addEventListener('click', () => renderExplain(true));
  renderExplain(false);
}

/* ==========================================================================
   Barra Flotante de Diapositivas & Scroll Counter
   ========================================================================== */
function initSlideNav() {
  const sections = document.querySelectorAll('.section-block, .hero-card');
  const counter = document.getElementById('slideCounter');
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');

  if (!sections.length || !counter) return;

  let currentIndex = 0;

  function updateCounter(index) {
    currentIndex = index;
    counter.textContent = `Módulo ${index} de ${sections.length - 1}`;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < sections.length - 1) {
        sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 100;
    sections.forEach((sec, i) => {
      if (sec.offsetTop <= fromTop && sec.offsetTop + sec.offsetHeight > fromTop) {
        updateCounter(i);
      }
    });
  });
}
