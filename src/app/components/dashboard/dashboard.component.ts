import { Component, ViewChild } from '@angular/core';
import { DailyPlanComponent } from "./components/daily-plan/daily-plan.component";
import { WeekPlanManagerService } from './services/week-plan-manager.service';
import { NgForOf, NgIf } from '@angular/common';
import { MenuItemPickerComponent } from "../menu-item-picker/menu-item-picker.component";
import { MenuItem } from '../../common/components/menu-item-card/models/menu-item.interface';
import { MenuItemsManagerService } from '../../common/services/menu-items-manager.service';
import { NutrientCategory } from './components/daily-plan/models/enums/nutrient-category.enum';

@Component({
  selector: 'app-dashboard',
  imports: [DailyPlanComponent, NgForOf, MenuItemPickerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild(MenuItemPickerComponent) private menuItemPickerComponent!: MenuItemPickerComponent;
  
  protected readonly daysOfTheWeek = WeekPlanManagerService.DAYS_OF_THE_WEEK;
  protected isChoosingMenuItem: boolean = false;
  protected menuItems: MenuItem[] = []
  
  constructor(private readonly menuItemsManagerService: MenuItemsManagerService) {}
  
  ngAfterViewInit(): void {    
    this.menuItemsManagerService.getAllMenuItems().subscribe((menuItems: MenuItem[]) => {            
      this.menuItemPickerComponent.setMenuItems(menuItems);
    });
  }

  protected handleAddMenuItem(category: NutrientCategory) {
    this.menuItemPickerComponent.setNutrientCategory(category);
    this.isChoosingMenuItem = true;
  }
}
