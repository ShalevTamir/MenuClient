import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DailyMealPlan } from "../../models/ros/daily-meal-plan.interface";
import { UpdateDailyMealPlanDto } from "../../models/dtos/update-daily-meal-plan.dto";
import { MenuItem } from "../../models/ros/menu-item.interface";

@Injectable({
    providedIn: 'root'
})
export class MealPlanCrudService {
    private readonly DAILY_MEAL_PLANS_MANAGER_URL = "https://meals-manager-two.vercel.app/daily-meal-plan";
        
    constructor(private _httpClient: HttpClient) {} 

    public getMealPlansByDateRange(startDate: Date, endDate: Date) : Observable<DailyMealPlan[]>{
        return this._httpClient.get<DailyMealPlan[]>(this.DAILY_MEAL_PLANS_MANAGER_URL + `?startDate=${startDate}&endDate=${endDate}`);
    }

    //Menu items are represented by their object id
    public updateMealPlanByDate(date: Date, menuItemToAdd: MenuItem): Observable<DailyMealPlan> {
        const updateMealPlanDto: UpdateDailyMealPlanDto = {
            date: date.toISOString(),
            menuItemToAdd: menuItemToAdd
        };
        return this._httpClient.patch<DailyMealPlan>(this.DAILY_MEAL_PLANS_MANAGER_URL, updateMealPlanDto);
    }
}