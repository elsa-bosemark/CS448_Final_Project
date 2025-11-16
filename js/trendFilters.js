import { createMultiCountryTrend } from './charts.js';
import { countryData } from './data.js';

const filterState = {
  selectedCountries: ['United States', 'United Kingdom', 'Germany', 'France', 'Japan'],
  ageGroup: 'adults',
  yearStart: 1975,
  yearEnd: 2022,
  currentYear: null
};

export function setupTrendFilters() {
  setupCountryFilters();
  setupAgeFilters();
  setupYearRangeFilters();
  updateTrendChart();
}

function setupCountryFilters() {
  const container = document.getElementById('country-filters');
  if (!container) return;

  const topCountries = ['United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'China', 'Canada', 'Australia', 'Mexico', 'Brazil'];

  topCountries.forEach(country => {
    const label = document.createElement('label');
    label.className = 'country-checkbox-label';
    if (country === 'United States') {
      label.classList.add('usa-label');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = country;
    checkbox.checked = filterState.selectedCountries.includes(country);

    if (country === 'United States') {
      checkbox.checked = true;
      checkbox.disabled = true;
    }

    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        if (filterState.selectedCountries.length < 8) {
          filterState.selectedCountries.push(country);
        } else {
          e.target.checked = false;
          return;
        }
      } else {
        filterState.selectedCountries = filterState.selectedCountries.filter(c => c !== country);
      }
      updateTrendChart();
    });

    const span = document.createElement('span');
    span.textContent = country;

    label.appendChild(checkbox);
    label.appendChild(span);
    container.appendChild(label);
  });
}

function setupAgeFilters() {
  const buttons = document.querySelectorAll('[data-filter="age"]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterState.ageGroup = btn.dataset.value;
      updateTrendChart();
    });
  });
}

function setupYearRangeFilters() {
  const yearStartInput = document.getElementById('year-start');
  const yearEndInput = document.getElementById('year-end');
  const yearStartLabel = document.getElementById('year-start-label');
  const yearEndLabel = document.getElementById('year-end-label');

  if (!yearStartInput || !yearEndInput) return;

  yearStartInput.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    filterState.yearStart = value;
    yearStartLabel.textContent = value;

    if (value > filterState.yearEnd) {
      filterState.yearEnd = value;
      yearEndInput.value = value;
      yearEndLabel.textContent = value;
    }

    updateTrendChart();
  });

  yearEndInput.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    filterState.yearEnd = value;
    yearEndLabel.textContent = value;

    if (value < filterState.yearStart) {
      filterState.yearStart = value;
      yearStartInput.value = value;
      yearStartLabel.textContent = value;
    }

    updateTrendChart();
  });
}

function updateTrendChart() {
  createMultiCountryTrend(
    'multi-country-trend',
    filterState.selectedCountries,
    filterState.ageGroup,
    filterState.yearStart,
    filterState.yearEnd,
    filterState.currentYear
  );
}

export function updateTrendChartWithYear(year) {
  filterState.currentYear = year;
  updateTrendChart();
}
