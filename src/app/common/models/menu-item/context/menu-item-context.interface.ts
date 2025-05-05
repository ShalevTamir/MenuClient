import { MenuItemEntry } from "../../ros/menu-item/menu-item-entry.interface";
import { CardState } from "./card-state.enum";

export interface MenuItemContext {
    menuItemEntry: MenuItemEntry,
    state: CardState
}