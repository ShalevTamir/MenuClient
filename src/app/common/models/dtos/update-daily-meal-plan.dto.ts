import { MenuItem } from "../ros/menu-item/menu-item.interface";

export interface UpdateDailyMealPlanDto {
    date: string;
    menuItemToAdd: MenuItem;
}