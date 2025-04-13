import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class WeekPlanManagerService {
    public static readonly DAYS_OF_THE_WEEK = [
        'יום ראשון',
        'יום שני',
        'יום שלישי',
        'יום רביעי',
        'יום חמישי',
        'יום שישי'        
    ];
}