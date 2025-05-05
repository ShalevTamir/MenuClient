import { MenuItem } from "../../ros/menu-item/menu-item.interface";
import { EditEventType } from "./edit-event-type.enums";

export interface EditMenuItemEvent {
    eventType: EditEventType;
    menuItem: MenuItem;
}