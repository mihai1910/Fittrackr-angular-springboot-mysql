import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Workout {
    id: number;
    type: string;
    durationMinutes: number;
    date: string;
}

@Injectable({ providedIn: "root" })
export class WorkoutApi {
    private readonly baseUrl = "/workouts";

    constructor(private http: HttpClient) {}

    getAll(): Observable<Workout[]> {
        return this.http.get<Workout[]>(this.baseUrl);
    }

    getById(id: number): Observable<Workout> {
        return this.http.get<Workout>(`${this.baseUrl}/${id}`);
    }

    create(workout: Omit<Workout, 'id'>): Observable<Workout> {
        return this.http.post<Workout>(this.baseUrl, workout);
    }

    update(id: number, workout: Omit<Workout, 'id'>): Observable<Workout> {
        return this.http.put<Workout>(`${this.baseUrl}/${id}`, workout);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}