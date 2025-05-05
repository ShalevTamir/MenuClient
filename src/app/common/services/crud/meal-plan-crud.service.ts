import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DailyMealPlan } from "../../models/ros/daily-meal-plan/daily-meal-plan.interface";
import { UpdateDailyMealPlanDto } from "../../models/dtos/update-daily-meal-plan.dto";
import { ContextService } from "../../config/context.service";
import { DateRange } from "../../models/paginator/date-range.interface";
import { RemoveMenuItemDto } from "../../models/dtos/remove-menu-item.dto";
import { MenuItem } from "../../models/ros/menu-item/menu-item.interface";
import { DailyMealPlanUnpopulated } from "../../models/ros/daily-meal-plan/daily-meal-plan-unpopulated.inerface";
import { MenuItemEntry } from "../../models/ros/menu-item/menu-item-entry.interface";

@Injectable({
    providedIn: 'root'
})
export class MealPlanCrudService {        
    constructor(private _httpClient: HttpClient, private _contextService: ContextService) {} 

    public getMealPlans(dateRange: DateRange) : Observable<DailyMealPlan[]>{
        return this._httpClient.get<DailyMealPlan[]>(`${this._contextService.DailyMealPlansManagerUrl}/date-range?startDate=${dateRange.startDate.toISOString()}&endDate=${dateRange.endDate.toISOString()}`);
    }
    
    public editMenuItemEntry(date: Date, editedEntry: MenuItemEntry): Observable<DailyMealPlanUnpopulated> {
        const updateMealPlanDto: UpdateDailyMealPlanDto = {
            date: date.toISOString(),
            editedEntry: editedEntry
        };
        return this._httpClient.patch<DailyMealPlanUnpopulated>(`${this._contextService.DailyMealPlansManagerUrl}/edit-entry`, updateMealPlanDto);
    }

    public removeMenuItemEntry(date: Date, menuItemId: string): Observable<DailyMealPlan> {
        const removeMenuItemDto: RemoveMenuItemDto = {
            date: date.toISOString(),
            menuItemId: menuItemId
        }
        return this._httpClient.patch<DailyMealPlan>(`${this._contextService.DailyMealPlansManagerUrl}/remove-entry`, removeMenuItemDto);
    }
}