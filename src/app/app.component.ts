import { Component } from '@angular/core';
import { PaginatorComponent } from "./components/paginator/paginator.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  imports: [PaginatorComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MenuClient';
}
