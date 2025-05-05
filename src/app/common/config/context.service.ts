import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ContextService {
    private readonly DAILY_MEAL_PLANS_MANAGER_URL = "http://10.0.0.22:3000/daily-meal-plan";
    private readonly MENU_ITEMS_MANAGER_URL = "http://10.0.0.22:3000/menu-item";

    public get DailyMealPlansManagerUrl(): string {
        return this.DAILY_MEAL_PLANS_MANAGER_URL;
    }
    
    public get MenuItemsManagerUrl(): string {
        return this.MENU_ITEMS_MANAGER_URL;
    }
}