import { Injectable } from "@angular/core";
import { DailyMealPlan } from "../../models/ros/daily-meal-plan.interface";
import { MealPlanCrudService } from "../crud/meal-plan-crud.service";
import { DateRange } from "../../models/paginator/date-range.interface";
import { DatePaginationManagerService } from "../pagination/date-pagination-manager.service";
import { DailyPlanComponent } from "../../../components/dashboard/daily-plan/daily-plan.component";
import { MenuItem } from "../../models/ros/menu-item.interface";

@Injectable({
    providedIn: 'root'  
})
export class MealPlanManagerService {
    public static readonly DAYS_OF_THE_WEEK = [
        'יום ראשון',
        'יום שני',
        'יום שלישי',
        'יום רביעי',
        'יום חמישי',
        'יום שישי'        
    ];

    constructor(
        private readonly _mealPlanCrudService: MealPlanCrudService,
        private readonly _datePaginationManagerService: DatePaginationManagerService) {}

    public updateMealPlans(dateRange: DateRange, dailyPlanComponents: DailyPlanComponent[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this._mealPlanCrudService.getMealPlans(dateRange).subscribe(
            { 
                next: (dailyMealPlans: DailyMealPlan[]) => {
                    for (const dailyPlanComponent of dailyPlanComponents) {
                        const currentDateOfTheWeek: Date = this._datePaginationManagerService.getCurrentDateOfTheWeek(dailyPlanComponent.dayIndex);
                        const dailyMealPlan: DailyMealPlan | undefined = this.findDailyMealPlanByDate(currentDateOfTheWeek, dailyMealPlans);
                        dailyPlanComponent.resetMenuItems(dailyMealPlan?.menuItems || []);
                    }
                    resolve();
                },
                error: (error: Error) => { reject(error) }
            });
        })
        
    }

    public updateMenuItem(dailyMealPlanIndex: number, updatedMenuItem: MenuItem): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const currentDateOftheWeek: Date = this._datePaginationManagerService.getCurrentDateOfTheWeek(dailyMealPlanIndex);      
            this._mealPlanCrudService.editMenuItem(currentDateOftheWeek, updatedMenuItem).subscribe({
                next: (_: DailyMealPlan) => { resolve() },
                error: (error: Error) => { reject(error) }
            });
        })
    }

    public removeMenuItem(dailyMealPlanIndex: number, itemToRemoveId: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const currentDateOftheWeek: Date = this._datePaginationManagerService.getCurrentDateOfTheWeek(dailyMealPlanIndex);      
            this._mealPlanCrudService.removeMenuItem(currentDateOftheWeek, itemToRemoveId).subscribe({
                next: (_: DailyMealPlan) => { resolve() },
                error: (error: Error) => { reject(error) }
            });
        });
    }

    private findDailyMealPlanByDate(date: Date, dailyMealPlans: DailyMealPlan[]): DailyMealPlan | undefined {
        return dailyMealPlans.find((dailyMealPlan: DailyMealPlan) => date.getTime() === new Date(dailyMealPlan.date).getTime());
    }
}
