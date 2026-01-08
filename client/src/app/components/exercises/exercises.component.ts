import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter, Subscription } from 'rxjs';
import { ExerciseApi, Exercise } from '../../exercise.api';
import { WorkoutApi } from '../../workout.api';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900">All Exercises</h1>
          <div class="flex space-x-4">
            <select 
              [(ngModel)]="selectedCategory" 
              (ngModelChange)="filterExercises()"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Categories</option>
              <option value="chest">Chest</option>
              <option value="back">Back</option>
              <option value="shoulders">Shoulders</option>
              <option value="arms">Arms</option>
              <option value="legs">Legs</option>
              <option value="core">Core</option>
              <option value="cardio">Cardio</option>
              <option value="full_body">Full Body</option>
            </select>
          </div>
        </div>

        <div *ngIf="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <div *ngIf="!loading && filteredExercises.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
          <p class="text-gray-500">No exercises found.</p>
        </div>

        <div *ngIf="!loading && filteredExercises.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let exercise of filteredExercises" 
               class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-gray-900">{{ exercise.name }}</h3>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                {{ exercise.category.toLowerCase().replace('_', ' ') }}
              </span>
            </div>
            
            <div class="space-y-2 mb-4">
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <span>{{ exercise.sets }} sets</span>
              </div>
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span>{{ exercise.reps }} reps</span>
              </div>
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
                <span>{{ exercise.weight }} kg</span>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <p class="text-sm text-gray-500">Workout ID: {{ exercise.workoutId }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ExercisesComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  filteredExercises: Exercise[] = [];
  loading = true;
  selectedCategory = '';
  private routerSubscription?: Subscription;

  constructor(
    private exerciseApi: ExerciseApi,
    private workoutApi: WorkoutApi,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadExercises();
    
    // Reload data when navigating back to this route
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url === '/exercises') {
          this.loadExercises();
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  loadExercises(): void {
    this.loading = true;
    this.exerciseApi.getAll().subscribe({
      next: (data) => {
        this.exercises = data;
        this.filteredExercises = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load exercises', err);
        this.loading = false;
      }
    });
  }

  filterExercises(): void {
    if (!this.selectedCategory) {
      this.filteredExercises = this.exercises;
    } else {
      this.filteredExercises = this.exercises.filter(
        e => e.category.toLowerCase() === this.selectedCategory.toUpperCase()
      );
    }
  }
}
