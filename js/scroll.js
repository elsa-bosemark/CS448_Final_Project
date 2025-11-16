import { createWorldMap, createInactivityChart, createInactivityScatterPlot, createUPFChart, createDataCollectionMap, createMetricBoxPlot, createMetricScatterPlot, createUPFScatterPlot, createUPFBodyFatScatterPlot, createInteractiveScatterPlot, updateFilters } from './charts.js';

const state = {
  map: { step: 0, totalSteps: 4, currentYear: 2022 },
  'combined-question': { step: 0, totalSteps: 2 },
  inactivity: { step: 0, totalSteps: 6, userGuess: null, viewMode: 'box', metric: 'tee', showRawData: true },
  upf: { step: 0, totalSteps: 2 },
  interactiveFilters: {
    xVar: 'upf',
    yVar: 'bodyFat',
    economies: ['highHDI', 'AGP', 'midHDI', 'HG', 'lowHDI', 'HORT'],
    sexes: ['M', 'F']
  }
};

const sectionOrder = ['map-section', 'combined-question-section', 'inactivity-section', 'conclusion-section'];

function updateSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const sectionKey = sectionId.replace('-section', '');
  const currentStep = state[sectionKey].step;
  const totalSteps = state[sectionKey].totalSteps;

  const cards = section.querySelectorAll('.content-card');
  cards.forEach((card, index) => {
    if (index === currentStep) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  const prevBtn = section.querySelector('.prev-btn');
  const nextBtn = section.querySelector('.next-btn');

  if (prevBtn) {
    const currentIndex = sectionOrder.indexOf(sectionId);
    // Disable prev button only if on first card of first section
    prevBtn.disabled = currentStep === 0 && currentIndex === 0;
  }

  if (nextBtn) {
    nextBtn.disabled = false;
    if (currentStep === totalSteps - 1) {
      const currentIndex = sectionOrder.indexOf(sectionId);
      if (currentIndex === sectionOrder.length - 1) {
        nextBtn.disabled = true;
      }
    }
  }

  updateChart(sectionKey, currentStep);
}

function updateChart(sectionKey, step) {
  switch (sectionKey) {
    case 'map':
      createWorldMap('world-map', step === 2 ? 'United States' : null, state.map.currentYear);
      break;
    case 'inactivity':
      const chartTitle = document.getElementById('inactivity-chart-title');
      const metricContainer = document.getElementById('metric-selector-container');
      const metricSelector = document.getElementById('metric-selector');
      const toggleBtn = document.getElementById('toggle-view-btn');

      if (step === 0) {
        if (chartTitle) chartTitle.textContent = 'Data Collection Locations';
        if (metricContainer) metricContainer.style.display = 'none';
        createDataCollectionMap('inactivity-chart');
      } else if (step === 1) {
        // Card 2: TEE
        state.inactivity.metric = 'tee';
        if (chartTitle) chartTitle.textContent = 'TEE by Economy Type';
        if (metricContainer) metricContainer.style.display = 'flex';
        if (metricSelector) metricSelector.value = 'tee';

        // Update metric toggle buttons
        const metricToggleBtns = document.querySelectorAll('.metric-toggle-btn');
        metricToggleBtns.forEach(btn => {
          if (btn.dataset.metric === 'tee') {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });

        if (toggleBtn) {
          toggleBtn.textContent = state.inactivity.viewMode === 'box' ? 'Show Scatter Plot' : 'Show Box Plot';
        }
        if (state.inactivity.viewMode === 'box') {
          createMetricBoxPlot('inactivity-chart', 'tee', state.inactivity.showRawData);
        } else {
          createMetricScatterPlot('inactivity-chart', 'tee');
        }
      } else if (step === 2) {
        // Card 3: PAL
        state.inactivity.metric = 'pal';
        if (chartTitle) chartTitle.textContent = 'PAL by Economy Type';
        if (metricContainer) metricContainer.style.display = 'flex';
        if (metricSelector) metricSelector.value = 'pal';

        // Update metric toggle buttons
        const metricToggleBtns = document.querySelectorAll('.metric-toggle-btn');
        metricToggleBtns.forEach(btn => {
          if (btn.dataset.metric === 'pal') {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });

        if (toggleBtn) {
          toggleBtn.textContent = state.inactivity.viewMode === 'box' ? 'Show Scatter Plot' : 'Show Box Plot';
        }
        if (state.inactivity.viewMode === 'box') {
          createMetricBoxPlot('inactivity-chart', 'pal', state.inactivity.showRawData);
        } else {
          createMetricScatterPlot('inactivity-chart', 'pal');
        }
      } else if (step === 3) {
        if (chartTitle) chartTitle.textContent = 'UPF Intake vs HDI Rank';
        if (metricContainer) metricContainer.style.display = 'none';
        createUPFScatterPlot('inactivity-chart');
      } else if (step === 4) {
        if (chartTitle) chartTitle.textContent = 'UPF Intake vs Body Fat';
        if (metricContainer) metricContainer.style.display = 'none';
        createUPFBodyFatScatterPlot('inactivity-chart');
      } else if (step === 5) {
        if (chartTitle) chartTitle.textContent = 'Interactive Data Explorer';
        if (metricContainer) metricContainer.style.display = 'none';
        createInteractiveScatterPlot('inactivity-chart');
        setupInteractiveFilters();
      }
      break;
    case 'scatter':
      break;
    case 'upf':
      createUPFChart(
        'upf-chart',
        step >= 1,
        step >= 1 ? 'United States' : null
      );
      break;
  }
}

function navigateToNextSection(currentSectionId) {
  const currentIndex = sectionOrder.indexOf(currentSectionId);
  if (currentIndex < sectionOrder.length - 1) {
    const nextSectionId = sectionOrder[currentIndex + 1];
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function navigateToPrevSection(currentSectionId) {
  const currentIndex = sectionOrder.indexOf(currentSectionId);
  if (currentIndex > 0) {
    const prevSectionId = sectionOrder[currentIndex - 1];
    const prevSection = document.getElementById(prevSectionId);
    if (prevSection) {
      prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

export function setupNavigation() {
  document.querySelectorAll('.prev-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.section;
      const sectionKey = sectionId.replace('-section', '');

      if (state[sectionKey].step > 0) {
        state[sectionKey].step--;
        updateSection(sectionId);

        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      } else {
        // On first card, navigate to previous section
        navigateToPrevSection(sectionId);
      }
    });
  });

  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.section;
      const sectionKey = sectionId.replace('-section', '');

      if (state[sectionKey].step < state[sectionKey].totalSteps - 1) {
        state[sectionKey].step++;
        updateSection(sectionId);

        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      } else {
        // On last card, navigate to next section
        navigateToNextSection(sectionId);
      }
    });
  });

  Object.keys(state).forEach(key => {
    updateSection(`${key}-section`);
  });
}

export function setUserActivityGuess(value) {
  state.inactivity.userGuess = value;
  updateChart('inactivity', state.inactivity.step);
}

export function updateMapYear(year) {
  state.map.currentYear = year;
  updateChart('map', state.map.step);
}

export function toggleView(view) {
  state.inactivity.viewMode = view;

  const rawDataControl = document.getElementById('raw-data-control');
  if (rawDataControl) {
    rawDataControl.style.display = view === 'box' ? 'flex' : 'none';
  }

  updateChartTitle();
  updateChart('inactivity', state.inactivity.step);
}

export function setMetric(metric) {
  state.inactivity.metric = metric;
  updateChartTitle();
  updateChart('inactivity', state.inactivity.step);
}

export function toggleRawData(show) {
  state.inactivity.showRawData = show;
  updateChart('inactivity', state.inactivity.step);
}

function updateChartTitle() {
  const titleEl = document.getElementById('inactivity-chart-title');
  if (!titleEl) return;
  const metricName = state.inactivity.metric.toUpperCase();
  titleEl.textContent = `${metricName} by Economy Type`;
}

export function getState() {
  return state;
}

export function navigateToCard(sectionId, step) {
  const sectionKey = sectionId.replace('-section', '');
  state[sectionKey].step = step;
  updateSection(sectionId);
}

function setupInteractiveFilters() {
  const ySelect = document.getElementById('y-variable-select');
  const xSelect = document.getElementById('x-variable-select');
  const economyCheckboxes = document.querySelectorAll('.economy-checkbox');
  const sexCheckboxes = document.querySelectorAll('.sex-checkbox');

  if (!ySelect || !xSelect) return;

  ySelect.value = state.interactiveFilters.yVar;
  xSelect.value = state.interactiveFilters.xVar;

  const updatePlot = () => {
    const selectedEconomies = Array.from(economyCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const selectedSexes = Array.from(sexCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value === 'M' ? 'M' : 'F');

    state.interactiveFilters = {
      xVar: xSelect.value,
      yVar: ySelect.value,
      economies: selectedEconomies,
      sexes: selectedSexes
    };

    updateFilters(state.interactiveFilters);
    createInteractiveScatterPlot('inactivity-chart');
  };

  ySelect.addEventListener('change', updatePlot);
  xSelect.addEventListener('change', updatePlot);
  economyCheckboxes.forEach(cb => cb.addEventListener('change', updatePlot));
  sexCheckboxes.forEach(cb => cb.addEventListener('change', updatePlot));
}
