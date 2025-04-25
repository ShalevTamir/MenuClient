import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { NutrientCategory } from '../../../common/models/enums/nutrient-category.enum';
import { MenuItemCardComponent } from "../../../common/components/menu-item-card/menu-item-card.component";
import { EmptyCardComponent } from "./empty-card/empty-card.component";
import { MealPlanCrudService } from '../../../common/services/crud/meal-plan-crud.service';
import { TriggerAddMenuItemEvent } from '../../../common/models/daily-meal-plan/trigger-add-menu-item-event.interface';

@Component({
  selector: 'app-daily-plan',
  templateUrl: './daily-plan.component.html',
  styleUrl: './daily-plan.component.scss',
  imports: [MenuItemCardComponent, EmptyCardComponent, NgForOf, NgIf],
})
export class DailyPlanComponent {
  @Input({ required: true }) public dayIndex!: number;
  @Input({ required: true }) readableDayString!: string;
  @Output() onTriggerAddMenuItem: EventEmitter<TriggerAddMenuItemEvent> = new EventEmitter<TriggerAddMenuItemEvent>();

  // value - menu item name
  private readonly menuItems: Map<NutrientCategory, string>;
  protected readonly nutrientCategories = Object.values(NutrientCategory);
  
  constructor() {
    this.menuItems = new Map<NutrientCategory, string>();
  }
  
  public setMenuItem(category: NutrientCategory, menuItemName: string): void {
    this.menuItems.set(category, menuItemName);
  }

  public removeMenuItem(category: NutrientCategory): void {
    this.menuItems.delete(category);
  }
  
  public hasMenuItem(category: NutrientCategory): boolean {
    return this.menuItems.has(category);
  }
  
  public getMenuItem(category: NutrientCategory): string {
    return <string>this.menuItems.get(category);
  }

  protected triggerAddMenuItemEvent(category: NutrientCategory) {
    this.onTriggerAddMenuItem.emit({ category: category, editedDailyPlan: this });
  }
}
