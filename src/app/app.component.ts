import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginatorComponent } from "./components/paginator/paginator.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MenuItemPickerComponent } from "./components/menu-item-picker/menu-item-picker.component";
import { NgIf } from '@angular/common';
import { MenuItemsManagerService } from './common/services/menu-items-manager.service';
import { MenuItem } from './common/components/menu-item-card/models/menu-item.interface';
import { NutrientCategory } from './components/dashboard/components/daily-plan/models/enums/nutrient-category.enum';

@Component({
  selector: 'app-root',
  imports: [PaginatorComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MenuClient';    
}
