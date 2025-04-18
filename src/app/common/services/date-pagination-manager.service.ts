import { Injectable } from "@angular/core";
import { DateRange } from "../models/paginator/date-range.interface";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ReadableDateRange } from "../models/paginator/parsed-date-range.interface";

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

    public parseDateRange(dateRange: DateRange): ReadableDateRange {
        return {
            startDate: this.parseDate(dateRange.startDate),
            endDate: this.parseDate(dateRange.endDate)
        }
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
    
    public getCurrentDateOfTheWeek(dayIndex: number): Date {
        const { startDate } = this._currentDateRange;
        const currentDateOftheWeek: Date = new Date(startDate);
        currentDateOftheWeek.setDate(currentDateOftheWeek.getDate() + dayIndex);
        return currentDateOftheWeek;
    }

    private initializeCurrentPage() {
        const todayLocal: Date = new Date();
        const todayUTC: Date = new Date(Date.UTC(
            todayLocal.getUTCFullYear(), 
            todayLocal.getUTCMonth(), 
            todayLocal.getUTCDate(), 
        ));

        const currentDayIndex: number = todayUTC.getDay(); // 0-6 (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const diffToSunday: number = -currentDayIndex; 

        const sunday = new Date(todayUTC);
        sunday.setDate(todayUTC.getDate() + diffToSunday);

        const friday = new Date(sunday);
        friday.setDate(sunday.getDate() + this.DAYS_TO_DISPLAY - 1);
        
        this._currentDateRange = {
            startDate: sunday, 
            endDate: friday    
        };        
    }
    
    private parseDate(date: Date): string {
        const day: string = String(date.getDate()).padStart(2, '0');
        const month: string = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const year: string = String(date.getFullYear()).slice(-2); // get last 2 digits
      
        return `${day}.${month}.${year}`;
    }
    
}