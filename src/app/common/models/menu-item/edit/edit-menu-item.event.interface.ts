import { NutrientCategory } from "../../enums/nutrient-category.enum";
import { MenuItem } from "../../ros/menu-item.interface";
import { EditEventType } from "./edit-event-type.enums";

export interface EditMenuItemEvent {
    eventType: EditEventType;
    menuItem: MenuItem;
}