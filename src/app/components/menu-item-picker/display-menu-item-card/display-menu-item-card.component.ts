import { Component, Input } from '@angular/core';
import { IMAGE_DIRECTORY } from '../../../common/models/constants/directories';

@Component({
  selector: 'app-display-menu-item-card',
  imports: [],
  templateUrl: './display-menu-item-card.component.html',
  styleUrl: './display-menu-item-card.component.scss'
})
export class DisplayMenuItemCardComponent {
  @Input({ required: true }) public menuItemName!: string;
  public buildImagePath(): string {
    return IMAGE_DIRECTORY + this.menuItemName + '.png';
  }
}
