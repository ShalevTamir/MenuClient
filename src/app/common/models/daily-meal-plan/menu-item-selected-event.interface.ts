import { DailyPlanComponent } from "../../../components/dashboard/daily-plan/daily-plan.component";
import { MenuItem } from "../ros/menu-item/menu-item.interface";

export interface MenuItemSelectedevent {
    menuItem: MenuItem,
    editedDailyPlan: DailyPlanComponent
}