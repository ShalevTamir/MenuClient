import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItemCardComponent } from "../../common/components/menu-item-card/menu-item-card.component";
import { MatIconModule } from '@angular/material/icon';
import { NgForOf, NgIf } from '@angular/common';
import { NutrientCategory } from '../../common/models/enums/nutrient-category.enum';
import { MenuItem } from '../../common/models/ros/menu-item.interface';
import { TriggerAddMenuItemEvent } from '../../common/models/daily-meal-plan/trigger-add-menu-item-event.interface';
import { MenuItemSelectedevent } from '../../common/models/daily-meal-plan/menu-item-selected-event.interface';
import { MenuItemsCrudService } from '../../common/services/crud/menu-items-crud.service';
import { DailyPlanComponent } from '../dashboard/daily-plan/daily-plan.component';

@Component({
  selector: 'app-menu-item-picker',
  imports: [MenuItemCardComponent, MatIconModule, NgForOf, NgIf],
  templateUrl: './menu-item-picker.component.html',
  styleUrl: './menu-item-picker.component.scss'
})
export class MenuItemPickerComponent {  
  // Emits the object id of the selected menu item
  @Output() public onMenuItemSelected: EventEmitter<MenuItemSelectedevent> = new EventEmitter<MenuItemSelectedevent>();  

  protected isVisible: boolean = false;
  protected menuItemsToDisplay: MenuItem[] = [];
  private menuItems: MenuItem[] = [];
  private editedDailyPlan!: DailyPlanComponent;

  public constructor(private readonly _menuItemsManagerService: MenuItemsCrudService) {    

  }

  public ngOnInit(): void {
    this._menuItemsManagerService.getAllMenuItems().subscribe((menuItems: MenuItem[]) => {
      this.menuItems = menuItems;
    });
  }

  public open(addMenuItemEvent: TriggerAddMenuItemEvent): void {
    this.menuItemsToDisplay = this.menuItems.filter((menuItem: MenuItem) => {
      return menuItem.type === addMenuItemEvent.category;
    });
    this.editedDailyPlan = addMenuItemEvent.editedDailyPlan;
    this.isVisible = true;
  }

  protected handleCloseClick(): void {
    this.isVisible = false;
  }

  protected handleMenuItemSelected(menuItem: MenuItem) {    
    this.onMenuItemSelected.emit({ menuItem: menuItem, editedDailyPlan: this.editedDailyPlan });
    this.isVisible = false;
  }
}
