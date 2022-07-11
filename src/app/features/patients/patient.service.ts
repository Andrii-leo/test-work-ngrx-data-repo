import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  constructor() {}

  calculateAgeFromData(startDate: string): number {
    if (!startDate) {
      return null;
    }
    const timeDiff = Date.now() - new Date(startDate).getTime();
    const ageDt = new Date(timeDiff);
    return Math.abs(ageDt.getUTCFullYear() - 1970) || null;
  }
}
