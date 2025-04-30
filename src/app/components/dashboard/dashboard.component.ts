import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MenuItemPickerComponent } from "../menu-item-picker/menu-item-picker.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NutrientCategory } from '../../common/models/enums/nutrient-category.enum';
import { DateRange } from '../../common/models/paginator/date-range.interface';
import { DatePaginationManagerService } from '../../common/services/pagination/date-pagination-manager.service';
import { DailyPlanComponent } from './daily-plan/daily-plan.component';
import { MealPlanCrudService } from '../../common/services/crud/meal-plan-crud.service';
import { MenuItem } from '../../common/models/ros/menu-item.interface';
import { TriggerAddMenuItemEvent } from '../../common/models/daily-meal-plan/trigger-add-menu-item-event.interface';
import { MenuItemSelectedevent as MenuItemSelectedEvent } from '../../common/models/daily-meal-plan/menu-item-selected-event.interface';
import { DailyMealPlan } from '../../common/models/ros/daily-meal-plan.interface';
import { MealPlanUtilsService } from '../../common/services/utils/meal-plan-utils.service';

@Component({
  selector: 'app-dashboard',
  imports: [DailyPlanComponent, NgForOf, NgIf, MenuItemPickerComponent, MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild(MenuItemPickerComponent) private menuItemPickerComponent!: MenuItemPickerComponent;
  @ViewChildren(DailyPlanComponent) private dailyPlans!: QueryList<DailyPlanComponent>;
  
  protected readonly daysOfTheWeek = MealPlanUtilsService.DAYS_OF_THE_WEEK;
  protected menuItems: MenuItem[] = []  
  protected isLoading: boolean = true;

  constructor(
    private readonly _mealPlanCrudService: MealPlanCrudService,
    private readonly _mealPlanUtilsService: MealPlanUtilsService,
    private readonly _datePaginationManagerService: DatePaginationManagerService) {}  
    
    public ngAfterViewInit(): void {
      this._datePaginationManagerService.listenToPagination().subscribe(this.handlePagination.bind(this));
    }
    
    public handlePagination(dateRange: DateRange) {
      this.isLoading = true;
      this._mealPlanCrudService.getMealPlansByDateRange(dateRange.startDate, dateRange.endDate).subscribe((dailyMealPlans: DailyMealPlan[]) => {
        for (const dailyPlanComponent of this.dailyPlans) {
          const currentDateOfTheWeek: Date = this._datePaginationManagerService.getCurrentDateOfTheWeek(dailyPlanComponent.dayIndex);
          const dailyMealPlan: DailyMealPlan | undefined = this._mealPlanUtilsService.findDailyMealPlanByDate(currentDateOfTheWeek, dailyMealPlans);
          this.updateDailyMenuItems(dailyPlanComponent, dailyMealPlan?.menuItems || []);
        }      
        this.isLoading = false;
      });
    }

    private updateDailyMenuItems(dailyPlanComponent: DailyPlanComponent, menuItems: MenuItem[]) {
      for (const nutrientCategory of Object.values(NutrientCategory)) {
        const menuItem: MenuItem | undefined = menuItems.find((menuItem: MenuItem) => menuItem.type === nutrientCategory);
        if (menuItem) {
          dailyPlanComponent.setMenuItem(nutrientCategory, menuItem);
        } else {
          dailyPlanComponent.removeMenuItem(nutrientCategory); // Reset the menu item if not found
        }        
      }
    } 
    
    public handleMenuItemSelected(menuItemSelectedevent: MenuItemSelectedEvent) {
      const currentDateOftheWeek: Date = this._datePaginationManagerService.getCurrentDateOfTheWeek(menuItemSelectedevent.editedDailyPlan.dayIndex);      
      this._mealPlanCrudService.updateMealPlanByDate(currentDateOftheWeek, menuItemSelectedevent.menuItem).subscribe((_: DailyMealPlan) => {
        const selectedMenuItem: MenuItem = menuItemSelectedevent.menuItem;
        menuItemSelectedevent.editedDailyPlan.setMenuItem(selectedMenuItem.type, selectedMenuItem);
      });
    }

    protected triggerAddMenuItem(addMenuItemEvent: TriggerAddMenuItemEvent) {
      this.menuItemPickerComponent.open(addMenuItemEvent);
    }
  }
