import { NutrientCategory } from "../enums/nutrient-category.enum";

export interface MenuItem {
    _id: string;
    name: string;
    type: NutrientCategory;
}