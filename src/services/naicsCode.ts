import { NAICSCode } from '../queries/Contents/types';

export const LOCAL_STORAGE_NAICS = 'naics';

const clearNAICS = () => {
  localStorage.removeItem(LOCAL_STORAGE_NAICS);
};

const setNAICS = (naicsCode: NAICSCode[]) => {
  localStorage.setItem(LOCAL_STORAGE_NAICS, JSON.stringify(naicsCode));
};

const getNaics = (): NAICSCode[] => {
  const naics = localStorage.getItem(LOCAL_STORAGE_NAICS);
  if (!naics) return null;
  return JSON.parse(naics);
};

export default {
  clearNAICS,
  setNAICS,
  getNaics,
};
