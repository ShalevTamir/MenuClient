import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DailyMealPlan } from "../../models/ros/daily-meal-plan.interface";
import { UpdateDailyMealPlanDto } from "../../models/dtos/update-daily-meal-plan.dto";
import { MenuItem } from "../../models/ros/menu-item.interface";
import { ContextService } from "../../config/context.service";
import { DateRange } from "../../models/paginator/date-range.interface";
import { RemoveMenuItemDto } from "../../models/dtos/remove-menu-item.dto";

@Injectable({
    providedIn: 'root'
})
export class MealPlanCrudService {        
    constructor(private _httpClient: HttpClient, private _contextService: ContextService) {} 

    public getMealPlans(dateRange: DateRange) : Observable<DailyMealPlan[]>{
        return this._httpClient.get<DailyMealPlan[]>(`${this._contextService.DailyMealPlansManagerUrl}/date-range?startDate=${dateRange.startDate.toISOString()}&endDate=${dateRange.endDate.toISOString()}`);
    }
    
    public editMenuItem(date: Date, menuItemToAdd: MenuItem): Observable<DailyMealPlan> {
        const updateMealPlanDto: UpdateDailyMealPlanDto = {
            date: date.toISOString(),
            menuItemToAdd: menuItemToAdd
        };
        return this._httpClient.patch<DailyMealPlan>(`${this._contextService.DailyMealPlansManagerUrl}/edit-menu-item`, updateMealPlanDto);
    }

    public removeMenuItem(date: Date, menuItemId: string): Observable<DailyMealPlan> {
        const removeMenuItemDto: RemoveMenuItemDto = {
            date: date.toISOString(),
            menuItemId: menuItemId
        }
        return this._httpClient.patch<DailyMealPlan>(`${this._contextService.DailyMealPlansManagerUrl}/remove-menu-item`, removeMenuItemDto);
    }
}