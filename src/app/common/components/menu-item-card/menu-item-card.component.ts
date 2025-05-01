import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../../models/ros/menu-item.interface';
import { NutrientCategory } from '../../models/enums/nutrient-category.enum';

@Component({
  selector: 'app-menu-item-card',
  imports: [MatIconModule, NgIf],
  templateUrl: './menu-item-card.component.html',
  styleUrl: './menu-item-card.component.scss'
})
export class MenuItemCardComponent{
  private static readonly IMAGE_DIRECTORY = 'assets/images/';
  @Input({ required: true }) public menuItem!: MenuItem;
  @Input({ required: true }) public isEditable!: boolean;
  @Output() public onToggleMenuItemEditMode: EventEmitter<void> = new EventEmitter<void>();
  
  protected IMAGE_PATH: string = "";
  
  public buildImagePath(): string {
    return MenuItemCardComponent.IMAGE_DIRECTORY + this.menuItem.name + '.png';
  }

  public handleEditClick(): void {
    this.onToggleMenuItemEditMode.emit();
  }
}
