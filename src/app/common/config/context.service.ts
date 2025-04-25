import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ContextService {
    private readonly DAILY_MEAL_PLANS_MANAGER_URL = "https://meals-manager-two.vercel.app/daily-meal-plan";
    private readonly MENU_ITEMS_MANAGER_URL = "https://meals-manager-two.vercel.app/menu-item";

    public get DailyMealPlansManagerUrl(): string {
        return this.DAILY_MEAL_PLANS_MANAGER_URL;
    }
    
    public get MenuItemsManagerUrl(): string {
        return this.MENU_ITEMS_MANAGER_URL;
    }
}