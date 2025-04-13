import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItemCardComponent } from "../../common/components/menu-item-card/menu-item-card.component";
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../../common/components/menu-item-card/models/menu-item.interface';
import { NgForOf, NgIf } from '@angular/common';
import { NutrientCategory } from '../dashboard/components/daily-plan/models/enums/nutrient-category.enum';

@Component({
  selector: 'app-menu-item-picker',
  imports: [MenuItemCardComponent, MatIconModule, NgForOf, NgIf],
  templateUrl: './menu-item-picker.component.html',
  styleUrl: './menu-item-picker.component.scss'
})
export class MenuItemPickerComponent {
  @Input({ required: true }) public isVisible!: boolean;
  @Output() public onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onMenuItemSelected: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();  

  protected menuItemsToDisplay: MenuItem[] = [];
  private menuItems: MenuItem[] = [];

  public setNutrientCategory(nutrientCategory: NutrientCategory): void {
    this.menuItemsToDisplay = this.menuItems.filter((menuItem: MenuItem) => {
      return menuItem.type === nutrientCategory;
    });
  }

  public setMenuItems(menuItems: MenuItem[]): void {
    this.menuItems = menuItems;
  }

  protected handleCloseClick(): void {
    this.onClose.emit();
  }

  protected handleMenuItemSelected(menuItem: MenuItem) {    
    this.onMenuItemSelected.emit(menuItem);
  }
}
