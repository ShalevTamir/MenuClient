import { Component } from '@angular/core';
import { DailyPlanComponent } from "./components/daily-plan/daily-plan.component";
import { WeekPlanManagerService } from './services/week-plan-manager.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [DailyPlanComponent, NgForOf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  protected readonly daysOfTheWeek = WeekPlanManagerService.DAYS_OF_THE_WEEK;
  constructor(private readonly weekPlanManagerService: WeekPlanManagerService) { }    
}
