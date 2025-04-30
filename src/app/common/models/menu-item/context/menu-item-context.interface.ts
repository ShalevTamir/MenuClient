import { MenuItem } from "../../ros/menu-item.interface";
import { MenuItemState } from "./menu-item-state.enum";

export interface MenuItemContext {
    menuItem: MenuItem | undefined,
    state: MenuItemState
}