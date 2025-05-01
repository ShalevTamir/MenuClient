import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../../../../common/models/ros/menu-item.interface';
import { EditEventType } from '../../../../common/models/menu-item/edit/edit-event-type.enums';
import { EditMenuItemEvent } from '../../../../common/models/menu-item/edit/edit-menu-item.event.interface';

@Component({
  selector: 'app-edit-card',
  imports: [MatIconModule],
  templateUrl: './edit-card.component.html',
  styleUrl: './edit-card.component.scss'
})
export class EditCardComponent {
  @Input({ required: true }) public editedMenuItem!: MenuItem;
  @Output() public onEditMenuItem: EventEmitter<EditMenuItemEvent> = new EventEmitter<EditMenuItemEvent>();
  protected readonly eventTypes: typeof EditEventType = EditEventType;
  
  protected handleEditButtonClick(editMenuItemEventType: EditEventType): void {
    this.onEditMenuItem.emit({
      eventType: editMenuItemEventType,
      menuItem: this.editedMenuItem
    });
  }
}
