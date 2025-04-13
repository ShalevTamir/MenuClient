import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NutrientCategory } from './models/enums/nutrient-category.enum';
import { MenuItemCardComponent } from "../../../../common/components/menu-item-card/menu-item-card.component";
import { NgForOf, NgIf } from '@angular/common';
import { EmptyCardComponent } from "./components/empty-card/empty-card.component";

@Component({
  selector: 'app-daily-plan',
  imports: [MenuItemCardComponent, NgIf, NgForOf, EmptyCardComponent],
  templateUrl: './daily-plan.component.html',
  styleUrl: './daily-plan.component.scss'
})
export class DailyPlanComponent {
  @Input({ required: true }) readableDayString!: string;
  @Output() onAddMenuItem: EventEmitter<NutrientCategory> = new EventEmitter<NutrientCategory>();

  private readonly menuItems: Map<NutrientCategory, string>;
  protected readonly nutrientCategories = Object.values(NutrientCategory);
  
  constructor() {
    this.menuItems = new Map<NutrientCategory, string>();
  }
  
  public setMenuItem(category: NutrientCategory, foodItem: string): void {
    this.menuItems.set(category, foodItem);
  }
  
  public hasMenuItem(category: NutrientCategory): boolean {
    return this.menuItems.has(category);
  }
  
  public getMenuItem(category: NutrientCategory): string {
    return <string>this.menuItems.get(category);
  }

  protected handleEmptyCardClick(category: NutrientCategory) {
    this.onAddMenuItem.emit(category)
  }
}
