/* ==========================================================================
   ESTADÍSTICA DESCRIPTIVA & EDA — INTERACTIVE ENGINE & SLIDE PRESENTATION (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. RENDER KATEX MATH FORMULAS
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError: false
    });
  }

  // 2. THEME TOGGLE (FONDO CLARO CON VERDECITO BY DEFAULT)
  const themeToggleBtn = document.getElementById('themeToggle');
  let currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      }
    });
  }

  // 3. PRESENTATION SLIDE CONTROLLER (DESPLAZAMIENTO DE DIAPOSITIVAS)
  const slides = Array.from(document.querySelectorAll('.hero-card, .section-block'));
  const totalSlidesNum = document.getElementById('totalSlidesNum');
  const currentSlideNum = document.getElementById('currentSlideNum');
  const btnPrevSlide = document.getElementById('btnPrevSlide');
  const btnNextSlide = document.getElementById('btnNextSlide');
  const sidebarLinks = Array.from(document.querySelectorAll('.sidebar-menu li a'));

  let currentSlideIndex = 0;
  if (totalSlidesNum) totalSlidesNum.innerText = slides.length;

  function scrollToSlide(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    
    currentSlideIndex = index;
    if (currentSlideNum) currentSlideNum.innerText = currentSlideIndex + 1;

    const targetSlide = slides[currentSlideIndex];
    if (targetSlide) {
      targetSlide.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    updateActiveSidebarLink();
  }

  if (btnNextSlide) {
    btnNextSlide.addEventListener('click', () => scrollToSlide(currentSlideIndex + 1));
  }
  if (btnPrevSlide) {
    btnPrevSlide.addEventListener('click', () => scrollToSlide(currentSlideIndex - 1));
  }

  // KEYBOARD NAVIGATION (TECLAS ← Y →)
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      scrollToSlide(currentSlideIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToSlide(currentSlideIndex - 1);
    }
  });

  // INTERSECTION OBSERVER TO AUTO-UPDATE ACTIVE SIDEBAR LINK AND SLIDE COUNTER ON SCROLL
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = slides.indexOf(entry.target);
        if (index !== -1) {
          currentSlideIndex = index;
          if (currentSlideNum) currentSlideNum.innerText = currentSlideIndex + 1;
          updateActiveSidebarLink();
        }
      }
    });
  }, observerOptions);

  slides.forEach(slide => observer.observe(slide));

  function updateActiveSidebarLink() {
    const currentSlide = slides[currentSlideIndex];
    if (!currentSlide) return;

    const currentId = currentSlide.id;
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentId || currentSlide.querySelector('#' + href)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // 4. SAMPLE DATASETS PRESETS
  const samples = {
    deptoA: "85, 88, 90, 87, 89, 91, 92, 88, 87, 90, 89, 91, 93, 94, 88, 87, 90, 92, 91, 89, 90, 93, 94, 95, 88, 87, 89, 91, 92, 90",
    deptoB: "70, 72, 75, 73, 74, 71, 76, 72, 73, 74, 75, 76, 74, 73, 72, 71, 75, 76, 74, 73, 72, 71, 75, 76, 74, 73, 72, 71, 75, 74",
    helado: "494, 495, 496, 497, 497, 497, 498, 498, 498, 499, 499, 499, 499, 500, 500, 500, 500, 501, 501, 501, 502, 502, 502, 503, 503, 503, 504, 504, 505, 506",
    retardos: "12, 15, 8, 25, 10, 14, 18, 5, 30, 11, 13, 16, 9, 22, 12, 15, 7, 28, 10, 14, 11, 17, 8, 20, 12, 14, 9, 24, 13, 15"
  };

  const sampleSelector = document.getElementById('sampleSelector');
  const dataInput = document.getElementById('dataInput');
  const btnCalculate = document.getElementById('btnCalculate');

  if (sampleSelector) {
    sampleSelector.addEventListener('change', (e) => {
      const val = e.target.value;
      if (samples[val]) {
        dataInput.value = samples[val];
        calculateAndRender();
      }
    });
  }

  if (btnCalculate) {
    btnCalculate.addEventListener('click', () => {
      calculateAndRender();
    });
  }

  // INITIAL CALCULATION ON LOAD & WINDOW LOAD
  let edaChartInstance = null;
  calculateAndRender();
  window.addEventListener('load', calculateAndRender);

  // 5. STATISTICAL CALCULATOR ENGINE
  function calculateAndRender() {
    if (!dataInput) return;
    const rawText = dataInput.value;
    const nums = rawText.split(',')
      .map(v => parseFloat(v.trim()))
      .filter(v => !isNaN(v))
      .sort((a, b) => a - b);

    if (nums.length < 3) {
      alert("Por favor ingresa al menos 3 datos numéricos válidos.");
      return;
    }

    const n = nums.length;
    const sum = nums.reduce((acc, val) => acc + val, 0);
    const mean = sum / n;

    // Mediana
    let median;
    if (n % 2 === 0) {
      median = (nums[n / 2 - 1] + nums[n / 2]) / 2;
    } else {
      median = nums[Math.floor(n / 2)];
    }

    // Moda
    const freqMap = {};
    let maxFreq = 0;
    nums.forEach(x => {
      freqMap[x] = (freqMap[x] || 0) + 1;
      if (freqMap[x] > maxFreq) maxFreq = freqMap[x];
    });

    let modes = [];
    if (maxFreq > 1) {
      for (const key in freqMap) {
        if (freqMap[key] === maxFreq) {
          modes.push(Number(key));
        }
      }
    } else {
      modes = ["Sin moda (Todos 1)"];
    }

    // Varianza Muestral & Desviación Estándar
    const sqDiffSum = nums.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0);
    const variance = sqDiffSum / (n - 1);
    const stdDev = Math.sqrt(variance);

    // Rango
    const minVal = nums[0];
    const maxVal = nums[n - 1];
    const range = maxVal - minVal;

    // Curtosis A (Momento 4) y Curtosis B (Excel =CURTOSIS)
    const m4 = nums.reduce((acc, x) => acc + Math.pow(x - mean, 4), 0) / n;
    const m2 = nums.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0) / n;
    const kurtosisA = (m4 / Math.pow(m2, 2)) - 3;

    let kurtosisB = 0;
    if (n > 3 && stdDev > 0) {
      const z4Sum = nums.reduce((acc, x) => acc + Math.pow((x - mean) / stdDev, 4), 0);
      kurtosisB = ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * z4Sum - ((3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3)));
    }

    let kurtosisLabel = `${kurtosisA.toFixed(2)} (g2) | ${kurtosisB.toFixed(2)} (Excel)`;
    if (kurtosisB < -0.1) kurtosisLabel += " • Platicúrtica";
    else if (kurtosisB > 0.1) kurtosisLabel += " • Leptocúrtica";
    else kurtosisLabel += " • Mesocúrtica";

    // ACTUALIZAR CARDS DE MÉTRICAS EN EL DOM
    if (document.getElementById('resN')) document.getElementById('resN').innerText = n;
    if (document.getElementById('resMean')) document.getElementById('resMean').innerText = mean.toFixed(2);
    if (document.getElementById('resMedian')) document.getElementById('resMedian').innerText = median.toFixed(2);
    if (document.getElementById('resMode')) document.getElementById('resMode').innerText = Array.isArray(modes) ? modes.join(', ') : modes;
    if (document.getElementById('resVar')) document.getElementById('resVar').innerText = variance.toFixed(2);
    if (document.getElementById('resStd')) document.getElementById('resStd').innerText = stdDev.toFixed(2);
    if (document.getElementById('resRange')) document.getElementById('resRange').innerText = range.toFixed(2);
    if (document.getElementById('resKurtosis')) document.getElementById('resKurtosis').innerText = kurtosisLabel;

    // 6. REGLA DE STURGES Y TABLA DE FRECUENCIAS
    const k = Math.max(3, Math.ceil(1 + 3.322 * Math.log10(n)));
    const amplitude = range / k;

    const intervals = [];
    const freqCounts = new Array(k).fill(0);

    for (let i = 0; i < k; i++) {
      const lower = minVal + i * amplitude;
      const upper = (i === k - 1) ? maxVal + 0.0001 : minVal + (i + 1) * amplitude;
      intervals.push({ lower, upper, mark: (lower + (minVal + (i + 1) * amplitude)) / 2 });
    }

    nums.forEach(x => {
      for (let i = 0; i < k; i++) {
        if (x >= intervals[i].lower && x < intervals[i].upper) {
          freqCounts[i]++;
          break;
        }
      }
    });

    // Llenar HTML de la tabla
    const tbody = document.querySelector('#freqTable tbody');
    if (tbody) {
      tbody.innerHTML = '';
      let accumFi = 0;

      const labels = [];
      const chartData = [];

      intervals.forEach((interval, idx) => {
        const fi = freqCounts[idx];
        accumFi += fi;
        const hi = fi / n;
        const xi_fi = interval.mark * fi;

        const labelStr = `[${interval.lower.toFixed(1)} – ${(idx === k-1 ? interval.upper - 0.0001 : interval.upper).toFixed(1)})`;
        labels.push(labelStr);
        chartData.push(fi);

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${labelStr}</strong></td>
          <td>${interval.mark.toFixed(2)}</td>
          <td><strong>${fi}</strong></td>
          <td>${hi.toFixed(3)} (${(hi * 100).toFixed(1)}%)</td>
          <td>${accumFi}</td>
          <td>${xi_fi.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
      });

      // 7. GRAFICAR HISTOGRAMA EN EL CONTENEDOR
      renderHistogramChart(labels, chartData, n);
    }
  }

  function renderHistogramChart(labels, chartData, n) {
    const chartWrapper = document.querySelector('.chart-wrapper');
    if (!chartWrapper) return;

    if (typeof Chart !== 'undefined') {
      let canvas = document.getElementById('edaChart');
      if (!canvas) {
        chartWrapper.innerHTML = '<canvas id="edaChart"></canvas>';
        canvas = document.getElementById('edaChart');
      }
      const ctx = canvas.getContext('2d');
      if (edaChartInstance) {
        edaChartInstance.destroy();
      }

      edaChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Frecuencia Absoluta (fi)',
            data: chartData,
            backgroundColor: 'rgba(16, 185, 129, 0.75)',
            borderColor: '#059669',
            borderWidth: 2,
            borderRadius: 6,
            barPercentage: 0.95,
            categoryPercentage: 1.0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true, labels: { color: '#064e3b', font: { weight: 'bold' } } },
            tooltip: {
              callbacks: {
                label: (context) => `Frecuencia: ${context.parsed.y} datos (${((context.parsed.y / n) * 100).toFixed(1)}%)`
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#374151', font: { weight: '600' } },
              grid: { color: 'rgba(16, 185, 129, 0.1)' }
            },
            y: {
              beginAtZero: true,
              ticks: { color: '#374151', stepSize: 1, font: { weight: '600' } },
              grid: { color: 'rgba(16, 185, 129, 0.1)' }
            }
          }
        }
      });
    } else {
      // RENDER FALLBACK SVG HISTOGRAM
      renderSvgHistogram(chartWrapper, labels, chartData, n);
    }
  }

  function renderSvgHistogram(wrapper, labels, chartData, n) {
    const maxVal = Math.max(...chartData, 1);
    const svgWidth = 600;
    const svgHeight = 240;
    const padLeft = 40;
    const padBottom = 40;
    const padTop = 20;
    const padRight = 20;

    const graphW = svgWidth - padLeft - padRight;
    const graphH = svgHeight - padTop - padBottom;
    const barWidth = graphW / labels.length;

    let barsSvg = '';
    chartData.forEach((val, idx) => {
      const h = (val / maxVal) * graphH;
      const x = padLeft + idx * barWidth + 4;
      const y = svgHeight - padBottom - h;
      const w = barWidth - 8;
      const pct = ((val / n) * 100).toFixed(1);
      
      const shortLabel = labels[idx].replace(/\[|\]|\)/g, '');

      barsSvg += `
        <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#10b981" rx="4" stroke="#059669" stroke-width="2" />
        <text x="${x + w/2}" y="${y - 5}" text-anchor="middle" font-size="11" fill="#047857" font-weight="bold">${val} (${pct}%)</text>
        <text x="${x + w/2}" y="${svgHeight - 12}" text-anchor="middle" font-size="9" fill="#374151" font-weight="600">${shortLabel}</text>
      `;
    });

    wrapper.innerHTML = `
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width: 100%; height: 100%;">
        <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${svgHeight - padBottom}" stroke="#cbd5e1" stroke-width="2" />
        <line x1="${padLeft}" y1="${svgHeight - padBottom}" x2="${svgWidth - padRight}" y2="${svgHeight - padBottom}" stroke="#cbd5e1" stroke-width="2" />
        ${barsSvg}
      </svg>
    `;
  }

});

// FUNCIÓN PARA COPIAR CÓDIGO CON RETROALIMENTACIÓN VISUAL
function copyCode(elementId) {
  const codeText = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(codeText).then(() => {
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
    btn.style.backgroundColor = '#059669';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.backgroundColor = '';
    }, 2000);
  });
}
