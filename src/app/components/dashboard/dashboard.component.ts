import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MenuItemPickerComponent } from "../menu-item-picker/menu-item-picker.component";
import { MenuItemsManagerService } from '../../common/services/menu-items-manager.service';
import { NutrientCategory } from '../../common/models/enums/nutrient-category.enum';
import { DateRange } from '../../common/models/paginator/date-range.interface';
import { DatePaginationManagerService } from '../../common/services/date-pagination-manager.service';
import { DailyPlanComponent } from './daily-plan/daily-plan.component';
import { WeekPlanManagerService } from '../../common/services/week-plan-manager.service';
import { MenuItem } from '../../common/models/ros/menu-item.interface';
import { TriggerAddMenuItemEvent } from '../../common/models/daily-meal-plan/trigger-add-menu-item-event.interface';
import { MenuItemSelectedevent as MenuItemSelectedEvent } from '../../common/models/daily-meal-plan/menu-item-selected-event.interface';
import { DailyMealPlan } from '../../common/models/ros/daily-meal-plan.interface';

@Component({
  selector: 'app-dashboard',
  imports: [DailyPlanComponent, NgForOf, MenuItemPickerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  @ViewChild(MenuItemPickerComponent) private menuItemPickerComponent!: MenuItemPickerComponent;
  
  protected readonly daysOfTheWeek = WeekPlanManagerService.DAYS_OF_THE_WEEK;
  protected menuItems: MenuItem[] = []  

  constructor(
    private readonly _weeklyPlanManagerService: WeekPlanManagerService,
    private readonly _datePaginationManagerService: DatePaginationManagerService) {}  
    
    public ngOnInit(): void {
      this._datePaginationManagerService.listenToPagination().subscribe(this.handlePagination.bind(this));
    }
    
    public handlePagination(dateRange: DateRange) {
    }
    
    public handleMenuItemSelected(menuItemSelectedevent: MenuItemSelectedEvent) {
      const currentDateOftheWeek: Date = this._datePaginationManagerService.getCurrentDateOfTheWeek(menuItemSelectedevent.editedDailyPlan.dayIndex);      
      this._weeklyPlanManagerService.updateMealPlanByDate(currentDateOftheWeek, menuItemSelectedevent.menuItem).subscribe((_: DailyMealPlan) => {
        const selectedMenuItem: MenuItem = menuItemSelectedevent.menuItem;
        menuItemSelectedevent.editedDailyPlan.setMenuItem(selectedMenuItem.type, selectedMenuItem.name);
      });
    }

    protected triggerAddMenuItem(addMenuItemEvent: TriggerAddMenuItemEvent) {
      this.menuItemPickerComponent.open(addMenuItemEvent);
    }
  }
