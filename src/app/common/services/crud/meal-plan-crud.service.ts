import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DailyMealPlan } from "../../models/ros/daily-meal-plan.interface";
import { UpdateDailyMealPlanDto } from "../../models/dtos/update-daily-meal-plan.dto";
import { MenuItem } from "../../models/ros/menu-item.interface";
import { ContextService } from "../../config/context.service";

@Injectable({
    providedIn: 'root'
})
export class MealPlanCrudService {        
    constructor(private _httpClient: HttpClient, private _contextService: ContextService) {} 

    public getMealPlansByDateRange(startDate: Date, endDate: Date) : Observable<DailyMealPlan[]>{
        return this._httpClient.get<DailyMealPlan[]>(`${this._contextService.DailyMealPlansManagerUrl}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
    }
    
    public updateMealPlanByDate(date: Date, menuItemToAdd: MenuItem): Observable<DailyMealPlan> {
        const updateMealPlanDto: UpdateDailyMealPlanDto = {
            date: date.toISOString(),
            menuItemToAdd: menuItemToAdd
        };
        return this._httpClient.patch<DailyMealPlan>(this._contextService.DailyMealPlansManagerUrl, updateMealPlanDto);
    }
}