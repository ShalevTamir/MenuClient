import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NutrientCategory } from '../../../../common/models/nutrient-category/nutrient-category.enum';

@Component({
  selector: 'app-empty-card',
  imports: [MatIconModule],
  templateUrl: './empty-card.component.html',
  styleUrl: './empty-card.component.scss'
})
export class EmptyCardComponent {
  @Input({ required: true }) nutrientCategory!: NutrientCategory      
}
