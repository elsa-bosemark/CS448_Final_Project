import { updateMapYear } from './scroll.js';
import { historicalObesityData } from './data.js';
import { updateTrendChartWithYear } from './trendFilters.js';

const years = Object.keys(historicalObesityData).map(Number).sort((a, b) => a - b);
let isPlaying = false;
let currentYearIndex = years.length - 1;
let intervalId = null;

export function setupTimeline() {
  const playBtn = document.getElementById('play-btn');
  const yearDisplay = document.getElementById('current-year');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const playText = document.getElementById('play-text');

  if (!playBtn) return;

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopTimeline();
      updateTrendChartWithYear(null);
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
      playText.textContent = 'Play Timeline';
    } else {
      startTimeline();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
      playText.textContent = 'Pause';
    }
  });

  updateYearDisplay();
}

function startTimeline() {
  isPlaying = true;
  currentYearIndex = 0;

  intervalId = setInterval(() => {
    if (currentYearIndex < years.length) {
      const year = years[currentYearIndex];
      updateMapYear(year);
      updateTrendChartWithYear(year);
      updateYearDisplay();
      currentYearIndex++;
    } else {
      stopTimeline();
      currentYearIndex = years.length - 1;
      updateTrendChartWithYear(null);
      const playIcon = document.getElementById('play-icon');
      const pauseIcon = document.getElementById('pause-icon');
      const playText = document.getElementById('play-text');
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
      playText.textContent = 'Play Timeline';
    }
  }, 800);
}

function stopTimeline() {
  isPlaying = false;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function updateYearDisplay() {
  const yearDisplay = document.getElementById('current-year');
  if (yearDisplay && currentYearIndex >= 0 && currentYearIndex < years.length) {
    yearDisplay.textContent = years[currentYearIndex];
  }
}
