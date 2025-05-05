import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MenuItemPickerComponent } from "../menu-item-picker/menu-item-picker.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NutrientCategory } from '../../common/models/nutrient-category/nutrient-category.enum';
import { DateRange } from '../../common/models/paginator/date-range.interface';
import { DatePaginationManagerService } from '../../common/services/pagination/date-pagination-manager.service';
import { DailyPlanComponent } from './daily-plan/daily-plan.component';
import { MealPlanCrudService } from '../../common/services/crud/meal-plan-crud.service';
import { TriggerAddMenuItemEvent } from '../../common/models/daily-meal-plan/trigger-add-menu-item-event.interface';
import { MenuItemSelectedevent as MenuItemSelectedEvent } from '../../common/models/daily-meal-plan/menu-item-selected-event.interface';
import { DailyMealPlan } from '../../common/models/ros/daily-meal-plan/daily-meal-plan.interface';
import { MealPlanManagerService } from '../../common/services/managers/meal-plan-manager.service';
import { EditMenuItemEvent } from '../../common/models/menu-item/edit/edit-menu-item.event.interface';
import { EditEventType } from '../../common/models/menu-item/edit/edit-event-type.enums';
import { CardState } from '../../common/models/menu-item/context/card-state.enum';
import { MenuItem } from '../../common/models/ros/menu-item/menu-item.interface';

@Component({
  selector: 'app-dashboard',
  imports: [DailyPlanComponent, NgForOf, NgIf, MenuItemPickerComponent, MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild(MenuItemPickerComponent) private menuItemPickerComponent!: MenuItemPickerComponent;
  @ViewChildren(DailyPlanComponent) private dailyPlans!: QueryList<DailyPlanComponent>;
  
  protected readonly daysOfTheWeek = MealPlanManagerService.DAYS_OF_THE_WEEK;
  protected menuItems: MenuItem[] = []  
  protected isLoading: boolean = true;

  constructor(
    private readonly _mealPlanManagerService: MealPlanManagerService,
    private readonly _datePaginationManagerService: DatePaginationManagerService) {}  
    
    public ngAfterViewInit(): void {
      this._datePaginationManagerService.listenToPagination().subscribe(this.handlePagination.bind(this));
    }
    
    private async handlePagination(dateRange: DateRange): Promise<void> {
      this.isLoading = true;
      await this._mealPlanManagerService.updateMealPlans(dateRange, this.dailyPlans.toArray());
      this.isLoading = false;
    }

    public async handleMenuItemSelected(menuItemSelectedevent: MenuItemSelectedEvent): Promise<void> {    
      const updatedEntry = await this._mealPlanManagerService.editMenuItemEntry(
        menuItemSelectedevent.editedDailyPlan.dayIndex,
        { isReady: MealPlanManagerService.DEFAULT_ENTRY_IS_READY_VALUE, menuItem: menuItemSelectedevent.menuItem }
      );
      menuItemSelectedevent.editedDailyPlan.resetMenuItem(updatedEntry);
    }

    protected openMenuItemPicker(addMenuItemEvent: TriggerAddMenuItemEvent) {
      this.menuItemPickerComponent.open(addMenuItemEvent);
    }
  }
