import { MenuItem } from "../ros/menu-item.interface";

export interface UpdateDailyMealPlanDto {
    date: string;
    menuItemToAdd: MenuItem;
}