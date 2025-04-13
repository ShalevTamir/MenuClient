import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NutrientCategory } from '../../models/enums/nutrient-category.enum';

@Component({
  selector: 'app-empty-card',
  imports: [MatIconModule],
  templateUrl: './empty-card.component.html',
  styleUrl: './empty-card.component.scss'
})
export class EmptyCardComponent {
  @Input({ required: true }) nutrientCategory!: NutrientCategory  
}
