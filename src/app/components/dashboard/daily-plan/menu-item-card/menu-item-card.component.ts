import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IMAGE_DIRECTORY } from '../../../../common/models/constants/directories';
import { MenuItemEntry } from '../../../../common/models/ros/menu-item/menu-item-entry.interface';
import { MenuItem } from '../../../../common/models/ros/menu-item/menu-item.interface';

@Component({
  selector: 'app-menu-item-card',
  imports: [MatIconModule],
  templateUrl: './menu-item-card.component.html',
  styleUrl: './menu-item-card.component.scss'
})
export class MenuItemCardComponent{
  @Input({ required: true }) public menuItemEntry!: MenuItemEntry;  
  @Output() protected onToggleMenuItemEditMode: EventEmitter<void> = new EventEmitter<void>();
  @Output() protected onCancelReady: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();
  
  public buildImagePath(): string {
    return IMAGE_DIRECTORY + this.menuItemEntry.menuItem.name + '.png';
  }

  public handleIconClick(): void {
    if (this.menuItemEntry.isReady) {
      this.onCancelReady.emit(this.menuItemEntry.menuItem);
    }
    else {
      this.onToggleMenuItemEditMode.emit();
    }
  }
}
