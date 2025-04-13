import { MenuItem } from "./menu-item.interface";

export interface DailyMealPlan {
    date: Date;
    carb: MenuItem,
    protein: MenuItem,
    extra: MenuItem
}