import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DailyMealPlan } from "../../../common/components/menu-item-card/models/daily-meal-plan.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WeekPlanManagerService {
    private readonly DAILY_MEAL_PLANS_MANAGER_URL = "http://localhost:3000/daily-meal-plan";

    public static readonly DAYS_OF_THE_WEEK = [
        'יום ראשון',
        'יום שני',
        'יום שלישי',
        'יום רביעי',
        'יום חמישי',
        'יום שישי'        
    ];

    constructor(private _httpClient: HttpClient) {}

    public getMealPlansByDateRange(startDate: Date, endDate: Date) : Observable<DailyMealPlan[]>{
        return this._httpClient.get<DailyMealPlan[]>(this.DAILY_MEAL_PLANS_MANAGER_URL + `?startDate=${startDate}&endDate=${endDate}`);
    }
}