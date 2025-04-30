import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { NutrientCategory } from '../../../common/models/enums/nutrient-category.enum';
import { MenuItemCardComponent } from "../../../common/components/menu-item-card/menu-item-card.component";
import { EmptyCardComponent } from "./empty-card/empty-card.component";
import { MealPlanCrudService } from '../../../common/services/crud/meal-plan-crud.service';
import { TriggerAddMenuItemEvent } from '../../../common/models/daily-meal-plan/trigger-add-menu-item-event.interface';
import { MenuItem } from '../../../common/models/ros/menu-item.interface';
import { MenuItemState } from '../../../common/models/menu-item/context/menu-item-state.enum';
import { MenuItemContext } from '../../../common/models/menu-item/context/menu-item-context.interface';
import { EditCardComponent } from './edit-card/edit-card.component';
import { EditMenuItemEvent } from '../../../common/models/menu-item/edit/edit-menu-item.event.interface';

@Component({
  selector: 'app-daily-plan',
  templateUrl: './daily-plan.component.html',
  styleUrl: './daily-plan.component.scss',
  imports: [MenuItemCardComponent, EmptyCardComponent, NgForOf, NgSwitchCase, NgSwitch, EditCardComponent],
})
export class DailyPlanComponent {
  @Input({ required: true }) public dayIndex!: number;
  @Input({ required: true }) readableDayString!: string;
  @Output() onTriggerAddMenuItem: EventEmitter<TriggerAddMenuItemEvent> = new EventEmitter<TriggerAddMenuItemEvent>();

  protected readonly nutrientCategories: NutrientCategory[] = Object.values(NutrientCategory);
  protected readonly menuItemState: typeof MenuItemState = MenuItemState;
  private readonly menuItems: Map<NutrientCategory, MenuItemContext>;
  
  constructor() {
    this.menuItems = new Map<NutrientCategory, MenuItemContext>();    
    this.initMenuItemsDict();
  }
  
  private initMenuItemsDict(): void {
    for (const nutrientCategory of this.nutrientCategories) {
      this.menuItems.set(nutrientCategory, { menuItem: undefined, state: MenuItemState.MISSING });
    }
  }
  
  public setMenuItem(category: NutrientCategory, menuItemName: MenuItem): void {
    this.menuItems.set(category, { menuItem: menuItemName, state: MenuItemState.VIEW });
  }

  public removeMenuItem(category: NutrientCategory): void {
    this.menuItems.set(category, { menuItem: undefined, state: MenuItemState.MISSING });
  }

  protected handleTriggerEditMenuItem(category: NutrientCategory): void {
    this.menuItems.get(category)!.state = MenuItemState.EDIT;
  }

  protected handleEditMenuItem(editMenuItemEvent: EditMenuItemEvent) {
    console.log("Edit menu item event triggered:", editMenuItemEvent);
  }
  
  protected getMenuItemState(category: NutrientCategory): MenuItemState {
    return this.menuItems.get(category)!.state;
  }
  
  protected getMenuItem(category: NutrientCategory): MenuItem {
    return this.menuItems.get(category)!.menuItem!;
  }

  protected triggerAddMenuItemEvent(category: NutrientCategory) {
    this.onTriggerAddMenuItem.emit({ category: category, editedDailyPlan: this });
  }
}
