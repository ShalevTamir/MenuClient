import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { NutrientCategory } from '../../../common/models/nutrient-category/nutrient-category.enum';
import { MenuItemCardComponent } from "./menu-item-card/menu-item-card.component";
import { EmptyCardComponent } from "./empty-card/empty-card.component";
import { MealPlanCrudService } from '../../../common/services/crud/meal-plan-crud.service';
import { TriggerAddMenuItemEvent } from '../../../common/models/daily-meal-plan/trigger-add-menu-item-event.interface';
import { CardState } from '../../../common/models/menu-item/context/card-state.enum';
import { MenuItemContext } from '../../../common/models/menu-item/context/menu-item-context.interface';
import { EditCardComponent } from './edit-card/edit-card.component';
import { EditMenuItemEvent } from '../../../common/models/menu-item/edit/edit-menu-item.event.interface';
import { EditEventType } from '../../../common/models/menu-item/edit/edit-event-type.enums';
import { MealPlanManagerService } from '../../../common/services/managers/meal-plan-manager.service';
import { MenuItemEntry } from '../../../common/models/ros/menu-item/menu-item-entry.interface';

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

  protected readonly nutrientCategories: NutrientCategory[] = Object.values(NutrientCategory);
  protected readonly CardState: typeof CardState = CardState;
  protected menuItemsStates: MenuItemContext[] = [];
  
  constructor(private readonly _mealPlanManagerService: MealPlanManagerService) {}

  public resetMenuItems(menuItemEntries: MenuItemEntry[]) {
    this.menuItemsStates = menuItemEntries.map(menuItemEntry => { return { menuItemEntry: menuItemEntry, state: CardState.VIEW } });
  }

  public resetMenuItem(menuItemEntry: MenuItemEntry) {
    this.removeMenuItemEntry(menuItemEntry.menuItem.type);
    this.menuItemsStates.push({ menuItemEntry: menuItemEntry, state: CardState.VIEW });
  }

  public setMenuItemState(category: NutrientCategory, state: CardState) {
    const menuItemContext: MenuItemContext | undefined = this.getMenuItemContext(category);
    if (menuItemContext !== undefined) {
      menuItemContext.state = state;
    }
  }  
  
  protected getMenuItemContext(category: NutrientCategory): MenuItemContext | undefined {
    return this.menuItemsStates.find(menuItemContext => menuItemContext.menuItemEntry.menuItem.type === category);
  }
  
  protected triggerMenuItemPicker(category: NutrientCategory) {
    this.onTriggerMenuItemPicker.emit({ category: category, editedDailyPlan: this });
  }

  protected async handleEditMenuItem(editMenuItemEvent: EditMenuItemEvent): Promise<void> {
    switch (editMenuItemEvent.eventType) {
      case EditEventType.CHANGE:
        this.triggerMenuItemPicker(editMenuItemEvent.menuItem.type);
        this.setMenuItemState(editMenuItemEvent.menuItem.type, CardState.VIEW);
        break;
      case EditEventType.DELETE:
        await this._mealPlanManagerService.removeMenuItemEntry(this.dayIndex, editMenuItemEvent.menuItem._id);
        this.removeMenuItemEntry(editMenuItemEvent.menuItem.type);
        break;
      case EditEventType.COMPLETE:
        
    }
  }
  
  private removeMenuItemEntry(category: NutrientCategory): void {
    const stateIndex: number = this.menuItemsStates.findIndex(menuItemContext => menuItemContext.menuItemEntry.menuItem.type === category);
    if (stateIndex !== -1)
      this.menuItemsStates.splice(stateIndex, 1);
  }
}
