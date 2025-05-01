import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { NutrientCategory } from '../../../common/models/enums/nutrient-category.enum';
import { MenuItemCardComponent } from "../../../common/components/menu-item-card/menu-item-card.component";
import { EmptyCardComponent } from "./empty-card/empty-card.component";
import { MealPlanCrudService } from '../../../common/services/crud/meal-plan-crud.service';
import { TriggerAddMenuItemEvent } from '../../../common/models/daily-meal-plan/trigger-add-menu-item-event.interface';
import { MenuItem } from '../../../common/models/ros/menu-item.interface';
import { CardState } from '../../../common/models/menu-item/context/card-state.enum';
import { MenuItemContext } from '../../../common/models/menu-item/context/menu-item-context.interface';
import { EditCardComponent } from './edit-card/edit-card.component';
import { EditMenuItemEvent } from '../../../common/models/menu-item/edit/edit-menu-item.event.interface';

@Component({
  selector: 'app-daily-plan',
  templateUrl: './daily-plan.component.html',
  styleUrl: './daily-plan.component.scss',
  imports: [MenuItemCardComponent, EmptyCardComponent, NgForOf, NgSwitchCase, NgSwitchDefault, NgSwitch, EditCardComponent],
})
export class DailyPlanComponent {
  @Input({ required: true }) public dayIndex!: number;
  @Input({ required: true }) public readableDayString!: string;
  @Output() protected onTriggerMenuItemPicker: EventEmitter<TriggerAddMenuItemEvent> = new EventEmitter<TriggerAddMenuItemEvent>();
  @Output() protected onEditMenuItem: EventEmitter<EditMenuItemEvent> = new EventEmitter<EditMenuItemEvent>();

  protected readonly nutrientCategories: NutrientCategory[] = Object.values(NutrientCategory);
  protected readonly CardState: typeof CardState = CardState;
  protected menuItemsStates: MenuItemContext[] = [];
     
  public resetMenuItems(menuItems: MenuItem[]) {
    this.menuItemsStates = menuItems.map(menuItem => { return { menuItem: menuItem, state: CardState.VIEW } });
  }

  public resetMenuItem(menuItem: MenuItem) {
    this.removeMenuItem(menuItem.type);
    this.menuItemsStates.push({ menuItem: menuItem, state: CardState.VIEW });
  }

  public setMenuItemState(category: NutrientCategory, state: CardState) {
    const menuItemContext: MenuItemContext | undefined = this.getMenuItemContext(category);
    if (menuItemContext !== undefined) {
      menuItemContext.state = state;
    }
  }
  
  public removeMenuItem(category: NutrientCategory): void {
    const stateIndex: number = this.menuItemsStates.findIndex(menuItemContext => menuItemContext.menuItem.type === category);
    if (stateIndex !== -1)
      this.menuItemsStates.splice(stateIndex);
  }
  
  protected getMenuItemContext(category: NutrientCategory): MenuItemContext | undefined {
    return this.menuItemsStates.find(menuItemContext => menuItemContext.menuItem.type === category);
  }

  protected handleEditMenuItem(editMenuItemEvent: EditMenuItemEvent) {
    this.onEditMenuItem.emit(editMenuItemEvent);
  }
  
  protected triggerMenuItemPicker(category: NutrientCategory) {
    this.onTriggerMenuItemPicker.emit({ category: category, editedDailyPlan: this });
  }
}
