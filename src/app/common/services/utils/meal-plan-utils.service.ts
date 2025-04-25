import { Injectable } from "@angular/core";
import { DailyMealPlan } from "../../models/ros/daily-meal-plan.interface";

@Injectable({
    providedIn: 'root'  
})
export class MealPlanUtilsService {
    public static readonly DAYS_OF_THE_WEEK = [
        'יום ראשון',
        'יום שני',
        'יום שלישי',
        'יום רביעי',
        'יום חמישי',
        'יום שישי'        
    ];

    public findDailyMealPlanByDate(date: Date, dailyMealPlans: DailyMealPlan[]): DailyMealPlan | undefined {
        return dailyMealPlans.find((dailyMealPlan: DailyMealPlan) => 
        date.getTime() === new Date(dailyMealPlan.date).getTime()
        );
    }
}
