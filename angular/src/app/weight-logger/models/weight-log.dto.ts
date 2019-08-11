export class WeightLogDto {
  date: Date;

  kg: number;
}

export function calculatelbs(kg: number) {
  return rountToOndeDecimal(kg * 2.20462);
}

export function calculatekg(lbs: number) {
  return rountToOndeDecimal(lbs / 2.20462);
}

export function rountToOndeDecimal(num: number) {
  return Math.round(num * 10) / 10;
}
