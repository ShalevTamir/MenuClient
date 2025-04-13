import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-daily-plan',
  imports: [],
  templateUrl: './daily-plan.component.html',
  styleUrl: './daily-plan.component.scss'
})
export class DailyPlanComponent {
  @Input({ required: true }) readableDayString!: string;
}
