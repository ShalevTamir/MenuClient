import { MenuItemEntry } from "../ros/menu-item/menu-item-entry.interface";

export interface UpdateDailyMealPlanDto {
    date: string;
    editedEntry: MenuItemEntry;
}