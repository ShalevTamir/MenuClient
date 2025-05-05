import { MenuItemEntry } from "../menu-item/menu-item-entry.interface";

export interface DailyMealPlan {
    date: Date;
    menuItemEntries: MenuItemEntry[];
}