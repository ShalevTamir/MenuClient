import { NutrientCategory } from "../../enums/nutrient-category.enum";
import { EditEventType } from "./edit-event-type.enums";

export interface EditMenuItemEvent {
    eventType: EditEventType;
    menuItemCategory: NutrientCategory;
}