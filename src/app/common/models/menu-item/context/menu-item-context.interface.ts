import { MenuItem } from "../../ros/menu-item.interface";
import { CardState } from "./card-state.enum";

export interface MenuItemContext {
    menuItem: MenuItem,
    state: CardState
}