import { Injectable } from "@angular/core";
import { DateRange } from "../components/menu-item-card/models/date-range.interface";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ParsedDateRange } from "../components/menu-item-card/models/parsed-date-range.interface";

@Injectable({
    providedIn: 'root'
})
export class DatePaginationManagerService {
    private _currentDateRange!: DateRange;
    private _paginationSubject: BehaviorSubject<DateRange>;
    private readonly DAYS_IN_A_WEEK: number = 7;
    private readonly DAYS_TO_DISPLAY: number = 6;

    constructor() {
        this.initializeCurrentPage();
        this._paginationSubject = new BehaviorSubject<DateRange>(this._currentDateRange);
    }   
    
    public listenToPagination(): Observable<DateRange> {
        return this._paginationSubject.asObservable();
    }

    public parseDateRange(dateRange: DateRange): ParsedDateRange {
        return {
            startDate: this.parseDate(dateRange.startDate),
            endDate: this.parseDate(dateRange.endDate)
        }
    }

    private parseDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const year = String(date.getFullYear()).slice(-2); // get last 2 digits
      
        return `${day}.${month}.${year}`;
    }

    public paginateForward(): void {
        const { startDate, endDate } = this._currentDateRange;       
        startDate.setDate(startDate.getDate() + this.DAYS_IN_A_WEEK);
        endDate.setDate(endDate.getDate() + this.DAYS_IN_A_WEEK);
        this._paginationSubject.next(this._currentDateRange);
    }

    public paginateBack(): void {
        const { startDate, endDate } = this._currentDateRange;        
        startDate.setDate(startDate.getDate() - this.DAYS_IN_A_WEEK);
        endDate.setDate(endDate.getDate() - this.DAYS_IN_A_WEEK);
        this._paginationSubject.next(this._currentDateRange);
    }

    private initializeCurrentPage() {
        const today: Date = new Date();
        const currentDayIndex: number = today.getDay(); // 0-6 (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const diffToSunday: number = -currentDayIndex; 

        const sunday = new Date(today);
        sunday.setDate(today.getDate() + diffToSunday);
        sunday.setHours(0, 0, 0, 0);

        const friday = new Date(sunday);
        friday.setDate(sunday.getDate() + this.DAYS_TO_DISPLAY - 1);
        friday.setHours(0, 0, 0, 0);
        
        this._currentDateRange = {
            startDate: sunday, 
            endDate: friday    
        };        
    }
    
}