import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NutrientCategory } from '../../../../common/models/nutrient-category/nutrient-category.enum';
import { IMAGE_DIRECTORY } from '../../../../common/models/constants/directories';
import { MenuItemEntry } from '../../../../common/models/ros/menu-item/menu-item-entry.interface';

@Component({
  selector: 'app-menu-item-card',
  imports: [MatIconModule, NgIf],
  templateUrl: './menu-item-card.component.html',
  styleUrl: './menu-item-card.component.scss'
})
export class MenuItemCardComponent{
  @Input({ required: true }) public menuItemEntry!: MenuItemEntry;
  @Input({ required: true }) public isEditable!: boolean;
  @Output() protected onToggleMenuItemEditMode: EventEmitter<void> = new EventEmitter<void>();
  
  public buildImagePath(): string {
    return IMAGE_DIRECTORY + this.menuItemEntry.menuItem.name + '.png';
  }

  public handleEditClick(): void {
    this.onToggleMenuItemEditMode.emit();
  }
}
