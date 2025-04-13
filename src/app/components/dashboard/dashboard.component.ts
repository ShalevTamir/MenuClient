import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DailyPlanComponent } from "./components/daily-plan/daily-plan.component";
import { WeekPlanManagerService } from './services/week-plan-manager.service';
import { NgForOf, NgIf } from '@angular/common';
import { MenuItemPickerComponent } from "../menu-item-picker/menu-item-picker.component";
import { MenuItem } from '../../common/components/menu-item-card/models/menu-item.interface';
import { MenuItemsManagerService } from '../../common/services/menu-items-manager.service';
import { NutrientCategory } from './components/daily-plan/models/enums/nutrient-category.enum';
import { DateRange } from '../../common/components/menu-item-card/models/date-range.interface';
import { DatePaginationManagerService } from '../../common/services/date-pagination-manager.service';

@Component({
  selector: 'app-dashboard',
  imports: [DailyPlanComponent, NgForOf, MenuItemPickerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MenuItemPickerComponent) private menuItemPickerComponent!: MenuItemPickerComponent;
  
  protected readonly daysOfTheWeek = WeekPlanManagerService.DAYS_OF_THE_WEEK;
  protected isChoosingMenuItem: boolean = false;
  protected menuItems: MenuItem[] = []
  
  constructor(
    private readonly menuItemsManagerService: MenuItemsManagerService,
    private readonly weeklyPlanManagerService: WeekPlanManagerService,
    private readonly _datePaginationManagerService: DatePaginationManagerService) {}
      
  ngAfterViewInit(): void {    
    this.menuItemsManagerService.getAllMenuItems().subscribe((menuItems: MenuItem[]) => {            
      this.menuItemPickerComponent.setMenuItems(menuItems);
    });    
  }

  ngOnInit(): void {
    this._datePaginationManagerService.listenToPagination().subscribe(this.handlePagination.bind(this));
  }

  public handlePagination(dateRange: DateRange) {
  }

  protected handleAddMenuItem(category: NutrientCategory) {
    this.menuItemPickerComponent.setNutrientCategory(category);
    this.isChoosingMenuItem = true;
  }
}
