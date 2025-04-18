import { NutrientCategory } from "../enums/nutrient-category.enum";

export interface MenuItem {
    name: string;
    type: NutrientCategory;
}