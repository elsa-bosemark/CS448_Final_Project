export const countryData = [
  { country: "United States", code: "USA", obesity: 36.2, activity: 5800, upf: 58.7, inactivity: 43, lat: 37.09, lon: -95.71 },
  { country: "China", code: "CHN", obesity: 6.2, activity: 4200, upf: 22.3, inactivity: 14, lat: 35.86, lon: 104.19 },
  { country: "India", code: "IND", obesity: 3.9, activity: 4500, upf: 18.5, inactivity: 34, lat: 20.59, lon: 78.96 },
  { country: "United Kingdom", code: "GBR", obesity: 27.8, activity: 5200, upf: 50.7, inactivity: 36, lat: 55.37, lon: -3.43 },
  { country: "Germany", code: "DEU", obesity: 22.3, activity: 5400, upf: 46.2, inactivity: 42, lat: 51.16, lon: 10.45 },
  { country: "France", code: "FRA", obesity: 21.6, activity: 5300, upf: 35.9, inactivity: 29, lat: 46.22, lon: 2.21 },
  { country: "Japan", code: "JPN", obesity: 4.3, activity: 6800, upf: 25.1, inactivity: 36, lat: 36.20, lon: 138.25 },
  { country: "Australia", code: "AUS", obesity: 29.0, activity: 5900, upf: 42.0, inactivity: 44, lat: -25.27, lon: 133.77 },
  { country: "Canada", code: "CAN", obesity: 29.4, activity: 5700, upf: 48.3, inactivity: 46, lat: 56.13, lon: -106.34 },
  { country: "Mexico", code: "MEX", obesity: 28.9, activity: 4100, upf: 30.0, inactivity: 26, lat: 23.63, lon: -102.55 },
  { country: "Brazil", code: "BRA", obesity: 22.1, activity: 3800, upf: 27.4, inactivity: 47, lat: -14.23, lon: -51.92 },
  { country: "Italy", code: "ITA", obesity: 19.9, activity: 5100, upf: 33.5, inactivity: 41, lat: 41.87, lon: 12.56 },
  { country: "Spain", code: "ESP", obesity: 23.8, activity: 5000, upf: 31.7, inactivity: 36, lat: 40.46, lon: -3.74 },
  { country: "Netherlands", code: "NLD", obesity: 20.4, activity: 5600, upf: 38.9, inactivity: 26, lat: 52.13, lon: 5.29 },
  { country: "Sweden", code: "SWE", obesity: 20.6, activity: 5500, upf: 34.2, inactivity: 32, lat: 60.12, lon: 18.64 },
  { country: "South Korea", code: "KOR", obesity: 4.7, activity: 5300, upf: 24.8, inactivity: 38, lat: 35.90, lon: 127.76 },
  { country: "Turkey", code: "TUR", obesity: 32.1, activity: 3900, upf: 26.5, inactivity: 49, lat: 38.96, lon: 35.24 },
  { country: "Saudi Arabia", code: "SAU", obesity: 35.4, activity: 3200, upf: 44.2, inactivity: 53, lat: 23.88, lon: 45.07 },
  { country: "United Arab Emirates", code: "ARE", obesity: 31.7, activity: 3500, upf: 52.1, inactivity: 38, lat: 23.42, lon: 53.84 },
  { country: "Indonesia", code: "IDN", obesity: 6.9, activity: 3600, upf: 16.2, inactivity: 27, lat: -0.78, lon: 113.92 },
  { country: "Philippines", code: "PHL", obesity: 6.4, activity: 3400, upf: 19.8, inactivity: 31, lat: 12.87, lon: 121.77 },
  { country: "Ireland", code: "IRL", obesity: 25.3, activity: 5800, upf: 45.9, inactivity: 32, lat: 53.41, lon: -8.24 },
  { country: "Poland", code: "POL", obesity: 23.1, activity: 4800, upf: 34.6, inactivity: 40, lat: 51.91, lon: 19.14 },
  { country: "Taiwan", code: "TWN", obesity: 8.0, activity: 4900, upf: 22.7, inactivity: 22, lat: 23.69, lon: 120.96 },
];

export const historicalObesityData = {
  1975: { multiplier: 0.33 },
  1980: { multiplier: 0.37 },
  1985: { multiplier: 0.42 },
  1990: { multiplier: 0.49 },
  1995: { multiplier: 0.57 },
  2000: { multiplier: 0.66 },
  2005: { multiplier: 0.75 },
  2010: { multiplier: 0.85 },
  2015: { multiplier: 0.93 },
  2020: { multiplier: 1.0 },
  2022: { multiplier: 1.0 }
};

export function getObesityForYear(country, year, ageGroup = 'adults') {
  const baseObesity = countryData.find(c => c.country === country)?.obesity || 0;
  const yearData = historicalObesityData[year];
  if (!yearData) return baseObesity;

  let adjustedRate = baseObesity * yearData.multiplier;

  if (ageGroup === 'children') {
    adjustedRate = adjustedRate * 0.55;
  }

  return adjustedRate;
}

export const trendYears = [1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2022];

export const obesityTrends = [
  { year: 1975, value: 12.0 },
  { year: 1980, value: 13.5 },
  { year: 1985, value: 15.2 },
  { year: 1990, value: 17.8 },
  { year: 1995, value: 20.5 },
  { year: 2000, value: 23.9 },
  { year: 2005, value: 27.3 },
  { year: 2010, value: 30.6 },
  { year: 2015, value: 33.8 },
  { year: 2020, value: 36.2 },
  { year: 2022, value: 36.8 },
];

export const topObeseCountries = [
  { country: "United States", value: 36.2 },
  { country: "Saudi Arabia", value: 35.4 },
  { country: "Turkey", value: 32.1 },
  { country: "United Arab Emirates", value: 31.7 },
  { country: "Canada", value: 29.4 },
  { country: "Australia", value: 29.0 },
  { country: "Mexico", value: 28.9 },
  { country: "United Kingdom", value: 27.8 },
  { country: "Spain", value: 23.8 },
  { country: "Poland", value: 23.1 },
];

export const beliefData = {
  question: "What percentage of Americans do you think believe obesity is caused by not exercising enough?",
  actual: 73,
  options: [20, 40, 60, 80, 100]
};

export const populationData = [
  { name: "Hadza", economy: "HG", economyFull: "hunter-gatherer", lat: -3.5, lon: 35.0, pal: 1.75, tee: 2650, hdi_rank: 220, sex: "M", bodyFat: 12, upf: null },
  { name: "Hadza", economy: "HG", economyFull: "hunter-gatherer", lat: -3.5, lon: 35.0, pal: 1.72, tee: 2100, hdi_rank: 220, sex: "F", bodyFat: 23, upf: null },
  { name: "Tsimane", economy: "HORT", economyFull: "horticulturalist", lat: -14.0, lon: -67.0, pal: 1.85, tee: 2800, hdi_rank: 210, sex: "M", bodyFat: 15, upf: 2.5 },
  { name: "Tsimane", economy: "HORT", economyFull: "horticulturalist", lat: -14.0, lon: -67.0, pal: 1.55, tee: 1950, hdi_rank: 210, sex: "F", bodyFat: 25, upf: 2.5 },
  { name: "Shuar", economy: "HORT", economyFull: "horticulturalist", lat: -3.0, lon: -78.0, pal: 1.75, tee: 2700, hdi_rank: 205, sex: "M", bodyFat: 14, upf: 2.8 },
  { name: "Shuar", economy: "HORT", economyFull: "horticulturalist", lat: -3.0, lon: -78.0, pal: 1.65, tee: 2050, hdi_rank: 205, sex: "F", bodyFat: 26, upf: 2.8 },
  { name: "Yakut", economy: "AGP", economyFull: "agropastoralist", lat: 62.0, lon: 130.0, pal: 2.2, tee: 3300, hdi_rank: 50, sex: "M", bodyFat: 18, upf: 28 },
  { name: "Yakut", economy: "AGP", economyFull: "agropastoralist", lat: 62.0, lon: 130.0, pal: 1.78, tee: 2200, hdi_rank: 50, sex: "F", bodyFat: 28, upf: 28 },
  { name: "Evenki", economy: "AGP", economyFull: "agropastoralist", lat: 63.0, lon: 130.5, pal: 2.58, tee: 3200, hdi_rank: 52, sex: "F", bodyFat: 22, upf: 37 },
  { name: "Ghana", economy: "lowHDI", economyFull: "low HDI", lat: 7.9, lon: -1.0, pal: 1.85, tee: 2850, hdi_rank: 175, sex: "M", bodyFat: 14, upf: 8 },
  { name: "Ghana", economy: "lowHDI", economyFull: "low HDI", lat: 7.9, lon: -1.0, pal: 1.72, tee: 2150, hdi_rank: 175, sex: "F", bodyFat: 28, upf: 8 },
  { name: "Kenya", economy: "lowHDI", economyFull: "low HDI", lat: -0.0, lon: 37.9, pal: 2.4, tee: 3600, hdi_rank: 165, sex: "M", bodyFat: 12, upf: null },
  { name: "Kenya", economy: "lowHDI", economyFull: "low HDI", lat: -0.0, lon: 37.9, pal: 2.25, tee: 2800, hdi_rank: 165, sex: "F", bodyFat: 25, upf: null },
  { name: "Tanzania", economy: "lowHDI", economyFull: "low HDI", lat: -6.3, lon: 34.8, pal: 1.8, tee: 2700, hdi_rank: 170, sex: "M", bodyFat: 13, upf: null },
  { name: "Tanzania", economy: "lowHDI", economyFull: "low HDI", lat: -6.3, lon: 34.8, pal: 1.75, tee: 2200, hdi_rank: 170, sex: "F", bodyFat: 27, upf: null },
  { name: "Gambia", economy: "lowHDI", economyFull: "low HDI", lat: 13.4, lon: -15.3, pal: 1.8, tee: 2650, hdi_rank: 180, sex: "M", bodyFat: 11, upf: null },
  { name: "Senegal", economy: "lowHDI", economyFull: "low HDI", lat: 14.4, lon: -14.4, pal: 2.28, tee: 3400, hdi_rank: 168, sex: "M", bodyFat: 13, upf: null },
  { name: "Nigeria", economy: "lowHDI", economyFull: "low HDI", lat: 9.0, lon: 8.6, pal: 2.42, tee: 3550, hdi_rank: 161, sex: "M", bodyFat: 15, upf: null },
  { name: "Ethiopia", economy: "lowHDI", economyFull: "low HDI", lat: 9.1, lon: 40.4, pal: 1.55, tee: 1900, hdi_rank: 173, sex: "F", bodyFat: 24, upf: null },
  { name: "Jamaica", economy: "midHDI", economyFull: "mid HDI", lat: 18.1, lon: -77.3, pal: 1.65, tee: 2550, hdi_rank: 110, sex: "M", bodyFat: 22, upf: 40 },
  { name: "Jamaica", economy: "midHDI", economyFull: "mid HDI", lat: 18.1, lon: -77.3, pal: 1.60, tee: 2000, hdi_rank: 110, sex: "F", bodyFat: 35, upf: 40 },
  { name: "Philippines", economy: "midHDI", economyFull: "mid HDI", lat: 12.8, lon: 121.8, pal: 1.93, tee: 2900, hdi_rank: 116, sex: "M", bodyFat: 18, upf: 10 },
  { name: "Philippines", economy: "midHDI", economyFull: "mid HDI", lat: 12.8, lon: 121.8, pal: 1.48, tee: 1850, hdi_rank: 116, sex: "F", bodyFat: 30, upf: 10 },
  { name: "South Africa", economy: "midHDI", economyFull: "mid HDI", lat: -30.5, lon: 22.9, pal: 1.52, tee: 2350, hdi_rank: 114, sex: "M", bodyFat: 20, upf: 4 },
  { name: "Seychelles", economy: "midHDI", economyFull: "mid HDI", lat: -4.6, lon: 55.5, pal: 1.58, tee: 2400, hdi_rank: 72, sex: "M", bodyFat: 24, upf: null },
  { name: "Seychelles", economy: "midHDI", economyFull: "mid HDI", lat: -4.6, lon: 55.5, pal: 1.30, tee: 1650, hdi_rank: 72, sex: "F", bodyFat: 38, upf: null },
  { name: "USA_1", economy: "highHDI", economyFull: "high HDI", lat: 37.0, lon: -95.7, pal: 1.83, tee: 2850, hdi_rank: 8, sex: "M", bodyFat: 28, upf: 56 },
  { name: "USA_2", economy: "highHDI", economyFull: "high HDI", lat: 37.5, lon: -96.0, pal: 1.98, tee: 3100, hdi_rank: 8, sex: "M", bodyFat: 26, upf: 56 },
  { name: "USA_3", economy: "highHDI", economyFull: "high HDI", lat: 38.0, lon: -95.5, pal: 2.0, tee: 3150, hdi_rank: 8, sex: "M", bodyFat: 25, upf: 56 },
  { name: "USA_4", economy: "highHDI", economyFull: "high HDI", lat: 37.2, lon: -95.2, pal: 1.78, tee: 2250, hdi_rank: 8, sex: "F", bodyFat: 35, upf: 56 },
  { name: "USA_5", economy: "highHDI", economyFull: "high HDI", lat: 36.8, lon: -96.2, pal: 1.95, tee: 2450, hdi_rank: 8, sex: "F", bodyFat: 32, upf: 56 },
  { name: "USA_6", economy: "highHDI", economyFull: "high HDI", lat: 37.3, lon: -95.8, pal: 1.75, tee: 2200, hdi_rank: 8, sex: "F", bodyFat: 36, upf: 56 },
  { name: "UK", economy: "highHDI", economyFull: "high HDI", lat: 55.3, lon: -3.4, pal: 1.69, tee: 2600, hdi_rank: 18, sex: "M", bodyFat: 24, upf: 50 },
  { name: "UK", economy: "highHDI", economyFull: "high HDI", lat: 55.3, lon: -3.4, pal: 1.63, tee: 2050, hdi_rank: 18, sex: "F", bodyFat: 33, upf: 50 },
  { name: "Netherlands_1", economy: "highHDI", economyFull: "high HDI", lat: 52.1, lon: 5.2, pal: 1.91, tee: 2950, hdi_rank: 10, sex: "M", bodyFat: 22, upf: 30 },
  { name: "Netherlands_2", economy: "highHDI", economyFull: "high HDI", lat: 52.3, lon: 5.0, pal: 2.09, tee: 3200, hdi_rank: 10, sex: "M", bodyFat: 20, upf: 30 },
  { name: "Netherlands_3", economy: "highHDI", economyFull: "high HDI", lat: 52.0, lon: 5.4, pal: 1.78, tee: 2750, hdi_rank: 10, sex: "M", bodyFat: 25, upf: 30 },
  { name: "Sweden", economy: "highHDI", economyFull: "high HDI", lat: 60.1, lon: 18.6, pal: 2.42, tee: 3800, hdi_rank: 7, sex: "M", bodyFat: 18, upf: 20 },
  { name: "Sweden", economy: "highHDI", economyFull: "high HDI", lat: 60.1, lon: 18.6, pal: 2.26, tee: 2850, hdi_rank: 7, sex: "F", bodyFat: 28, upf: 20 },
  { name: "Norway_1", economy: "highHDI", economyFull: "high HDI", lat: 60.4, lon: 8.4, pal: 1.82, tee: 2800, hdi_rank: 1, sex: "M", bodyFat: 23, upf: 32 },
  { name: "Norway_2", economy: "highHDI", economyFull: "high HDI", lat: 60.6, lon: 8.2, pal: 1.84, tee: 2300, hdi_rank: 1, sex: "F", bodyFat: 32, upf: 32 },
  { name: "Italy", economy: "highHDI", economyFull: "high HDI", lat: 41.8, lon: 12.5, pal: 1.63, tee: 2500, hdi_rank: 30, sex: "M", bodyFat: 26, upf: 29 },
  { name: "Poland_1", economy: "highHDI", economyFull: "high HDI", lat: 51.9, lon: 19.1, pal: 1.70, tee: 2650, hdi_rank: 32, sex: "M", bodyFat: 24, upf: 39 },
  { name: "Poland_2", economy: "highHDI", economyFull: "high HDI", lat: 52.1, lon: 19.3, pal: 1.30, tee: 2000, hdi_rank: 32, sex: "M", bodyFat: 28, upf: 39 },
  { name: "Poland_3", economy: "highHDI", economyFull: "high HDI", lat: 51.8, lon: 18.9, pal: 1.50, tee: 2300, hdi_rank: 32, sex: "M", bodyFat: 26, upf: 39 },
  { name: "Japan", economy: "highHDI", economyFull: "high HDI", lat: 36.2, lon: 138.2, pal: 1.63, tee: 2500, hdi_rank: 19, sex: "M", bodyFat: 20, upf: 43 },
  { name: "Japan", economy: "highHDI", economyFull: "high HDI", lat: 36.2, lon: 138.2, pal: 1.64, tee: 2050, hdi_rank: 19, sex: "F", bodyFat: 28, upf: 43 }
];
