import { MenuItem } from "./menu-item.interface";

export interface DailyMealPlan {
    date: Date;
    menuItems: MenuItem[];
}