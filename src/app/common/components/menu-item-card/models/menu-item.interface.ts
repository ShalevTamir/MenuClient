import { NutrientCategory } from "../../../../components/dashboard/components/daily-plan/models/enums/nutrient-category.enum";

export interface MenuItem {
    name: string;
    type: NutrientCategory;
}