import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Exercise {
    id: number;
    name: string;
    category: string;
    sets: number;
    reps: number;
    weight: number;
    workoutId: number;
}

@Injectable({ providedIn: "root" })
export class ExerciseApi {
    private readonly baseUrl = "/exercises";

    constructor(private http: HttpClient) {}

    getAll(): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(this.baseUrl);
    }

    getById(id: number): Observable<Exercise> {
        return this.http.get<Exercise>(`${this.baseUrl}/${id}`);
    }

    getByWorkoutId(workoutId: number): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${this.baseUrl}/workout/${workoutId}`);
    }

    create(exercise: Omit<Exercise, 'id'>): Observable<Exercise> {
        return this.http.post<Exercise>(this.baseUrl, exercise);
    }

    update(id: number, exercise: Omit<Exercise, 'id'>): Observable<Exercise> {
        return this.http.put<Exercise>(`${this.baseUrl}/${id}`, exercise);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}

