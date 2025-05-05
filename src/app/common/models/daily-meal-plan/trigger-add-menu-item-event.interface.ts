import { DailyPlanComponent } from "../../../components/dashboard/daily-plan/daily-plan.component";
import { NutrientCategory } from "../nutrient-category/nutrient-category.enum";

export interface TriggerAddMenuItemEvent {
    editedDailyPlan: DailyPlanComponent,
    category: NutrientCategory
}