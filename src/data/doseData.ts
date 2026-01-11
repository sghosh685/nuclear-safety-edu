// Radiation Dose Calculator - Data and Calculation Logic
// Sources: UNSCEAR 2008, NCRP 160, EPA, ACR, EURADOS

// ============================================================================
// TYPES
// ============================================================================

export interface DoseInput {
  // Location
  region: string;
  altitudeMeters: number;
  nuclearPlantProximity: 'none' | 'beyond_20km' | 'within_20km' | 'within_10km' | 'within_5km';

  // Home
  homeType: 'apartment' | 'house_concrete' | 'house_wood' | 'house_brick';
  hasBasement: boolean;
  radonLevel: 'low' | 'average' | 'high' | 'unknown';

  // Medical
  chestXrays: number;
  dentalXrays: number;
  mammograms: number;
  ctHead: number;
  ctChest: number;
  ctAbdomen: number;
  otherMedical: number;

  // Travel
  shortFlights: number;  // <3 hours
  mediumFlights: number; // 3-6 hours
  longFlights: number;   // >6 hours

  // Lifestyle
  smokingPacks: number;  // packs per day (0 = non-smoker)
  bananasPerWeek: number;
  brazilNutsPerWeek: number;
}

export interface DoseResult {
  totalDose: number;
  breakdown: {
    cosmic: number;
    terrestrial: number;
    radon: number;
    internal: number;
    medical: number;
    travel: number;
    smoking: number;
    dietary: number;
    nuclearPlant: number;
  };
  comparisons: {
    bananaEquivalent: number;
    chestXrayEquivalent: number;
    percentOfWorkerLimit: number;
    percentOfUSAverage: number;
  };
  riskCategory: 'very_low' | 'low' | 'average' | 'elevated' | 'high';
}

// ============================================================================
// DOSE CONSTANTS (mSv/year unless noted)
// ============================================================================

// Regional background radiation (terrestrial + cosmic at sea level)
export const REGIONAL_BACKGROUND: Record<string, number> = {
  'us_average': 3.1,
  'canada': 1.8,
  'uk': 2.7,
  'germany': 2.1,
  'france': 2.4,
  'japan': 2.1,
  'australia': 1.5,
  'brazil_high': 5.5,  // High natural background areas
  'india_kerala': 10.0, // Monazite sands
  'iran_ramsar': 25.0,  // Highest natural background
  'global_average': 2.4,
};

// Altitude adjustment (cosmic radiation increases with altitude)
// Additional mSv per 1000m above sea level
export const ALTITUDE_FACTOR = 0.30; // mSv per 1000m per year

// Home/Building materials contribution (mSv/year)
export const HOME_DOSES: Record<string, number> = {
  'apartment': 0.5,      // Concrete buildings
  'house_concrete': 0.7, // Concrete/masonry
  'house_wood': 0.3,     // Wood frame
  'house_brick': 0.6,    // Brick
};

// Radon exposure (mSv/year) - largest natural source
export const RADON_DOSES: Record<string, number> = {
  'low': 0.5,      // Well-ventilated, low-radon area
  'average': 2.0,  // US/Canada average
  'high': 8.0,     // Poorly ventilated, high-radon area
  'unknown': 2.0,  // Default to average
};

// Basement contribution (additional radon)
export const BASEMENT_ADDITIONAL = 0.5; // mSv/year

// Internal dose from food/water (potassium-40, etc.)
export const INTERNAL_DOSE = 0.29; // mSv/year average

// ============================================================================
// MEDICAL PROCEDURE DOSES (mSv per procedure)
// ============================================================================

export const MEDICAL_DOSES = {
  chestXray: 0.1,
  dentalXray: 0.005,
  mammogram: 0.4,
  ctHead: 2.0,
  ctChest: 7.0,
  ctAbdomen: 10.0,
  otherMedical: 0.5, // Average for "other"
};

// ============================================================================
// TRAVEL DOSES (mSv per flight)
// ============================================================================

export const FLIGHT_DOSES = {
  short: 0.01,   // <3 hours (e.g., NYC → Chicago)
  medium: 0.03,  // 3-6 hours (e.g., NYC → LA)
  long: 0.07,    // >6 hours (e.g., NYC → London)
};

// ============================================================================
// LIFESTYLE DOSES
// ============================================================================

export const LIFESTYLE_DOSES = {
  smokingPerPackPerDay: 36.0, // mSv/year to lungs from polonium-210
  bananaEach: 0.0001,         // mSv per banana (potassium-40)
  brazilNutHandful: 0.001,    // mSv per handful (radium)
};

// ============================================================================
// REFERENCE VALUES
// ============================================================================

export const REFERENCE_VALUES = {
  usAverageAnnual: 6.2,        // mSv (including medical)
  naturalBackgroundOnly: 3.1,   // mSv (excluding medical)
  nuclearWorkerLimit: 50.0,     // mSv/year occupational
  publicLimitNearPlants: 1.0,   // mSv/year additional
  singleChestXray: 0.1,         // mSv
  singleBanana: 0.0001,         // mSv (BED - Banana Equivalent Dose)
  acuteEffectsThreshold: 250.0, // mSv (noticeable health effects)
  annualDoseForRiskIncrease: 100.0, // mSv (slight cancer risk increase)
};

// ============================================================================
// NUCLEAR PLANT PROXIMITY (Nuclear Engineer Input)
// Based on NRC 10 CFR 20.1301 - Public dose limits
// ============================================================================

export const NUCLEAR_PLANT_DOSES: Record<string, number> = {
  'none': 0,           // Not near a plant
  'within_5km': 0.05,  // mSv/year - well below regulatory limit
  'within_10km': 0.02, // mSv/year
  'within_20km': 0.005, // mSv/year
  'beyond_20km': 0.001, // Negligible
};

export const NUCLEAR_PLANT_OPTIONS = [
  { value: 'none', label: 'Not near a nuclear plant or unknown' },
  { value: 'beyond_20km', label: 'Beyond 20 km from a plant' },
  { value: 'within_20km', label: 'Within 10-20 km of a plant' },
  { value: 'within_10km', label: 'Within 5-10 km of a plant' },
  { value: 'within_5km', label: 'Within 5 km of a plant' },
];

// ============================================================================
// OCCUPATIONAL REFERENCE (For Context)
// ============================================================================

export const OCCUPATIONAL_DOSES = {
  nuclear_worker_avg: 2.0,    // mSv/year actual average (limit is 50)
  radiologist: 1.5,           // mSv/year average
  airline_crew: 3.0,          // mSv/year average
  coal_miner: 2.5,            // mSv/year (radon in mines)
  astronaut_iss: 180,         // mSv/year on ISS
};

// ============================================================================
// RISK CONTEXT (Sustainable Engineer / Climate Analyst Input)
// Comparative annual risks for perspective
// ============================================================================

export const RISK_CONTEXT = {
  driving_10k_miles: 'Risk equivalent to driving 10,000 miles',
  smoking_1_cigarette: 'Risk equivalent to smoking 1-2 cigarettes',
  air_pollution_1_week: 'Risk equivalent to 1 week of urban air pollution',
  eating_100_bananas: 'Contains the potassium-40 of 100 bananas',
};

// ============================================================================
// CLIMATE CONTEXT MESSAGING
// ============================================================================

export const CLIMATE_CONTEXT = {
  nuclear_carbon: 'Nuclear power produces 12g CO₂/kWh - similar to wind, 40x less than gas.',
  medical_tradeoff: 'Medical imaging doses are justified by diagnostic benefits.',
  radon_mitigation: 'Radon is reducible through home ventilation and sealing.',
};

// ============================================================================
// CALCULATION FUNCTIONS
// ============================================================================

export function calculateDose(input: DoseInput): DoseResult {
  // 1. Cosmic radiation (altitude-dependent)
  const baseBackground = REGIONAL_BACKGROUND[input.region] || REGIONAL_BACKGROUND['global_average'];
  const cosmicBase = 0.39; // Sea level cosmic
  const altitudeBonus = (input.altitudeMeters / 1000) * ALTITUDE_FACTOR;
  const cosmic = cosmicBase + altitudeBonus;

  // 2. Terrestrial radiation (from ground/soil)
  const terrestrial = baseBackground - 0.39 - 0.29; // Remove cosmic and internal from regional

  // 3. Radon
  const radonBase = RADON_DOSES[input.radonLevel];
  const radonBasement = input.hasBasement ? BASEMENT_ADDITIONAL : 0;
  const radon = radonBase + radonBasement + HOME_DOSES[input.homeType];

  // 4. Internal (food/water)
  const internal = INTERNAL_DOSE;

  // 5. Medical
  const medical =
    (input.chestXrays * MEDICAL_DOSES.chestXray) +
    (input.dentalXrays * MEDICAL_DOSES.dentalXray) +
    (input.mammograms * MEDICAL_DOSES.mammogram) +
    (input.ctHead * MEDICAL_DOSES.ctHead) +
    (input.ctChest * MEDICAL_DOSES.ctChest) +
    (input.ctAbdomen * MEDICAL_DOSES.ctAbdomen) +
    (input.otherMedical * MEDICAL_DOSES.otherMedical);

  // 6. Travel
  const travel =
    (input.shortFlights * FLIGHT_DOSES.short) +
    (input.mediumFlights * FLIGHT_DOSES.medium) +
    (input.longFlights * FLIGHT_DOSES.long);

  // 7. Lifestyle
  const smoking = input.smokingPacks * LIFESTYLE_DOSES.smokingPerPackPerDay;
  const dietary =
    ((input.bananasPerWeek * 52) * LIFESTYLE_DOSES.bananaEach) +
    ((input.brazilNutsPerWeek * 52) * LIFESTYLE_DOSES.brazilNutHandful);

  // 8. Nuclear Plant Proximity
  const nuclearPlant = NUCLEAR_PLANT_DOSES[input.nuclearPlantProximity] || 0;

  // Total
  const totalDose = cosmic + terrestrial + radon + internal + medical + travel + smoking + dietary + nuclearPlant;

  // Comparisons
  const bananaEquivalent = Math.round(totalDose / REFERENCE_VALUES.singleBanana);
  const chestXrayEquivalent = Math.round(totalDose / REFERENCE_VALUES.singleChestXray * 10) / 10;
  const percentOfWorkerLimit = Math.round((totalDose / REFERENCE_VALUES.nuclearWorkerLimit) * 100);
  const percentOfUSAverage = Math.round((totalDose / REFERENCE_VALUES.usAverageAnnual) * 100);

  // Risk category
  let riskCategory: DoseResult['riskCategory'];
  if (totalDose < 2) {
    riskCategory = 'very_low';
  } else if (totalDose < 5) {
    riskCategory = 'low';
  } else if (totalDose < 10) {
    riskCategory = 'average';
  } else if (totalDose < 20) {
    riskCategory = 'elevated';
  } else {
    riskCategory = 'high';
  }

  return {
    totalDose: Math.round(totalDose * 100) / 100,
    breakdown: {
      cosmic: Math.round(cosmic * 100) / 100,
      terrestrial: Math.round(terrestrial * 100) / 100,
      radon: Math.round(radon * 100) / 100,
      internal: Math.round(internal * 100) / 100,
      medical: Math.round(medical * 100) / 100,
      travel: Math.round(travel * 100) / 100,
      smoking: Math.round(smoking * 100) / 100,
      dietary: Math.round(dietary * 1000) / 1000,
      nuclearPlant: Math.round(nuclearPlant * 1000) / 1000,
    },
    comparisons: {
      bananaEquivalent,
      chestXrayEquivalent,
      percentOfWorkerLimit,
      percentOfUSAverage,
    },
    riskCategory,
  };
}

// Default/initial values
export const DEFAULT_INPUT: DoseInput = {
  region: 'us_average',
  altitudeMeters: 0,
  nuclearPlantProximity: 'none',
  homeType: 'house_wood',
  hasBasement: false,
  radonLevel: 'unknown',
  chestXrays: 0,
  dentalXrays: 0,
  mammograms: 0,
  ctHead: 0,
  ctChest: 0,
  ctAbdomen: 0,
  otherMedical: 0,
  shortFlights: 0,
  mediumFlights: 0,
  longFlights: 0,
  smokingPacks: 0,
  bananasPerWeek: 7,
  brazilNutsPerWeek: 0,
};

// Step information for the wizard
export const WIZARD_STEPS = [
  { id: 1, name: 'Location', description: 'Where you live' },
  { id: 2, name: 'Home', description: 'Your living environment' },
  { id: 3, name: 'Medical', description: 'Healthcare procedures' },
  { id: 4, name: 'Travel', description: 'Flying habits' },
  { id: 5, name: 'Lifestyle', description: 'Daily choices' },
];

// Region display names
export const REGION_NAMES: Record<string, string> = {
  'us_average': 'United States (Average)',
  'canada': 'Canada',
  'uk': 'United Kingdom',
  'germany': 'Germany',
  'france': 'France',
  'japan': 'Japan',
  'australia': 'Australia',
  'brazil_high': 'Brazil (High Background Areas)',
  'india_kerala': 'India (Kerala)',
  'iran_ramsar': 'Iran (Ramsar)',
  'global_average': 'Global Average',
};

// Risk category labels and colors
export const RISK_CATEGORIES = {
  very_low: { label: 'Very Low', color: 'emerald', description: 'Below global average' },
  low: { label: 'Low', color: 'green', description: 'Normal natural exposure' },
  average: { label: 'Average', color: 'blue', description: 'Typical for developed countries' },
  elevated: { label: 'Elevated', color: 'amber', description: 'Above average, often due to medical scans' },
  high: { label: 'High', color: 'red', description: 'Significantly above average' },
};
