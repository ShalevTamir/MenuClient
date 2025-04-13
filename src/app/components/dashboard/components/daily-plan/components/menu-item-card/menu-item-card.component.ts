import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item-card',
  imports: [],
  templateUrl: './menu-item-card.component.html',
  styleUrl: './menu-item-card.component.scss'
})
export class MenuItemCardComponent implements AfterViewInit{
  private static readonly IMAGE_DIRECTORY = 'assets/images/';
  @Input({ required: true }) menuItemName!: string;
  protected IMAGE_PATH: string = "";
  
  ngAfterViewInit(): void {
    this.IMAGE_PATH = MenuItemCardComponent.IMAGE_DIRECTORY + this.menuItemName + '.png';
  }
}
