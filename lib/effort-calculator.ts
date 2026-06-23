export const moduleEffortMap: Record<string, number> = {
  FI: 10,
  CO: 8,
  MM: 10,
  SD: 10,
  PP: 10,
  QM: 6,
  PM: 6,
  PS: 6,
  EWM: 12,
  TM: 12,
  GTS: 8,
  MDG: 10,
  BW: 8,
  BPC: 8,
};

export const localizationEffortMap: Record<string, number> = {
  Türkiye: 5,
  Rusya: 8,
  "Birleşik Arap Emirlikleri": 8,
  "Suudi Arabistan": 8,
  Almanya: 6,
  Diğer: 5,
};

export function getModuleEffort(module: string) {
  return moduleEffortMap[module] ?? 0;
}

export function getLocalizationEffort(country: string) {
  return localizationEffortMap[country] ?? 0;
}
