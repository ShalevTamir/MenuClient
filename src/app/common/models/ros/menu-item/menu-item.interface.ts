import { NutrientCategory } from "../../nutrient-category/nutrient-category.enum";

export interface MenuItem {
    _id: string;
    name: string;
    type: NutrientCategory;
}