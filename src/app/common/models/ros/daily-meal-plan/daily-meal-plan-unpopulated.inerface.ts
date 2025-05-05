import { MenuItemEntryRef } from "../menu-item/menu-item-entry-ref.interface";

export interface DailyMealPlanUnpopulated {
    date: Date;
    menuItemEntries: MenuItemEntryRef[];
}