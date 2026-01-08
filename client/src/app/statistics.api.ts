import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface WorkoutStatistics {
    totalWorkouts: number;
    totalDuration: number;
    workoutsByType: { [key: string]: number };
    averageDuration: number;
    workoutsThisMonth: number;
}

@Injectable({ providedIn: "root" })
export class StatisticsApi {
    private readonly baseUrl = "/statistics";

    constructor(private http: HttpClient) {}

    getWorkoutStatistics(): Observable<WorkoutStatistics> {
        return this.http.get<WorkoutStatistics>(`${this.baseUrl}/workouts`);
    }
}

