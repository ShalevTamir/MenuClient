import { Injectable } from "@angular/core";
import { DailyMealPlan } from "../../models/ros/daily-meal-plan/daily-meal-plan.interface";
import { MealPlanCrudService } from "../crud/meal-plan-crud.service";
import { DateRange } from "../../models/paginator/date-range.interface";
import { DatePaginationManagerService } from "../pagination/date-pagination-manager.service";
import { DailyPlanComponent } from "../../../components/dashboard/daily-plan/daily-plan.component";
import { MenuItemEntry } from "../../models/ros/menu-item/menu-item-entry.interface";
import { MenuItem } from "../../models/ros/menu-item/menu-item.interface";
import { DailyMealPlanUnpopulated } from "../../models/ros/daily-meal-plan/daily-meal-plan-unpopulated.inerface";
import { MenuItemEntryRef } from "../../models/ros/menu-item/menu-item-entry-ref.interface";

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

    public static readonly DEFAULT_ENTRY_IS_READY_VALUE: boolean = false;

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
                        dailyPlanComponent.resetMenuItems(dailyMealPlan?.menuItemEntries || []);
                    }
                    resolve();
                },
                error: (error: Error) => { reject(error) }
            });
        })
        
    }    

    public editMenuItemEntry(dailyMealPlanIndex: number, editedEntry: MenuItemEntry): Promise<MenuItemEntry> {
        return new Promise<MenuItemEntry>((resolve, reject) => {
            const currentDateOftheWeek: Date = this._datePaginationManagerService.getCurrentDateOfTheWeek(dailyMealPlanIndex);      
            this._mealPlanCrudService.editMenuItemEntry(currentDateOftheWeek, editedEntry).subscribe({
                next: (updatedMealPlan: DailyMealPlanUnpopulated) => { 
                    const updatedEntryRef: MenuItemEntryRef | undefined = updatedMealPlan.menuItemEntries.find(entry => entry.menuItem === editedEntry.menuItem._id);
                    if (updatedEntryRef === undefined) 
                        reject("Unable to find updated menu item entry in the response after trying to insert a new menu item entry");
                    else 
                        resolve(editedEntry); 
                },
                error: (error: Error) => { reject(error) }
            });
        })
    }

    public removeMenuItemEntry(dailyMealPlanIndex: number, itemToRemoveId: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const currentDateOftheWeek: Date = this._datePaginationManagerService.getCurrentDateOfTheWeek(dailyMealPlanIndex);      
            this._mealPlanCrudService.removeMenuItemEntry(currentDateOftheWeek, itemToRemoveId).subscribe({
                next: (_: DailyMealPlan) => { resolve() },
                error: (error: Error) => { reject(error) }
            });
        });
    }

    private findDailyMealPlanByDate(date: Date, dailyMealPlans: DailyMealPlan[]): DailyMealPlan | undefined {
        return dailyMealPlans.find((dailyMealPlan: DailyMealPlan) => date.getTime() === new Date(dailyMealPlan.date).getTime());
    }
}
