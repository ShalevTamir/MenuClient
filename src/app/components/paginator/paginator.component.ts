import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DatePaginationManagerService } from '../../common/services/pagination/date-pagination-manager.service';
import { DateRange } from '../../common/models/paginator/date-range.interface';
import { ReadableDateRange } from '../../common/models/paginator/readable-date-range.interface';

@Component({
  selector: 'app-paginator',
  imports: [MatIconModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnInit{
  protected parsedStartDate: string = "";
  protected parsedEndDate: string = "";
  
  constructor(private readonly _datePaginationManagerService: DatePaginationManagerService) {
  }
  
  ngOnInit(): void {
    this._datePaginationManagerService.listenToPagination().subscribe((dateRange: DateRange) => {
      const parsedDateRange: ReadableDateRange = this._datePaginationManagerService.parseDateRange(dateRange);
      this.parsedStartDate = parsedDateRange.startDate;
      this.parsedEndDate = parsedDateRange.endDate;
    });
  }

  protected handlePaginateBack() {
    this._datePaginationManagerService.paginateBack();
  }

  protected handlePaginateForward() {
    this._datePaginationManagerService.paginateForward();
  }
}
