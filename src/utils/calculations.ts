import { PredictionResult } from '../types';
import { jobData } from './jobData';

/**
 * Calculate destiny number from date of birth
 */
export const calculateDestinyNumber = (day: number, month: number, year: number): number => {
  // Sum all digits from day
  let sum = 0;
  let tempDay = day;
  while (tempDay > 0) {
    sum += tempDay % 10;
    tempDay = Math.floor(tempDay / 10);
  }

  // Sum all digits from month
  let tempMonth = month;
  while (tempMonth > 0) {
    sum += tempMonth % 10;
    tempMonth = Math.floor(tempMonth / 10);
  }

  // Sum all digits from year
  let tempYear = year;
  while (tempYear > 0) {
    sum += tempYear % 10;
    tempYear = Math.floor(tempYear / 10);
  }

  // Reduce to single digit
  let destinyNumber = 0;
  while (sum > 0) {
    destinyNumber += sum % 10;
    sum = Math.floor(sum / 10);
  }

  // If result is still multi-digit, reduce once more
  if (destinyNumber > 9) {
    let tempNumber = destinyNumber;
    destinyNumber = 0;
    while (tempNumber > 0) {
      destinyNumber += tempNumber % 10;
      tempNumber = Math.floor(tempNumber / 10);
    }
  }

  return destinyNumber;
};

/**
 * Get prediction result based on destiny number
 */
export const getPrediction = (destinyNumber: number): PredictionResult => {
  // Default to 1 if outside valid range
  const num = destinyNumber >= 1 && destinyNumber <= 9 ? destinyNumber : 1;
  return {
    number: num,
    jobs: jobData[num].jobs,
    image: jobData[num].image
  };
};