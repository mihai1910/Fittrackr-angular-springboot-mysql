import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter, Subscription } from 'rxjs';
import { WorkoutApi, Workout } from '../../workout.api';
import { ExerciseApi, Exercise } from '../../exercise.api';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          (click)="goBack()"
          class="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Workouts
        </button>

        <div *ngIf="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <div *ngIf="!loading && workout" class="space-y-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between mb-4">
              <h1 class="text-3xl font-bold text-gray-900 capitalize">{{ workout.type.toLowerCase() }} Workout</h1>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                    [ngClass]="getTypeBadgeClass(workout.type)">
                {{ workout.type }}
              </span>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p class="text-sm text-gray-500">Date</p>
                <p class="text-lg font-semibold text-gray-900">{{ workout.date | date:'fullDate' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Duration</p>
                <p class="text-lg font-semibold text-gray-900">{{ workout.durationMinutes }} minutes</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-2xl font-semibold text-gray-900">Exercises</h2>
              <button 
                (click)="showExerciseForm = !showExerciseForm"
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors">
                + Add Exercise
              </button>
            </div>

            <div *ngIf="showExerciseForm" class="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                {{ editingExercise ? 'Edit Exercise' : 'Add New Exercise' }}
              </h3>
              <form (ngSubmit)="saveExercise()" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Exercise Name</label>
                    <input 
                      type="text" 
                      [(ngModel)]="exerciseForm.name" 
                      name="name" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select 
                      [(ngModel)]="exerciseForm.category" 
                      name="category" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
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

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Sets</label>
                    <input 
                      type="number" 
                      [(ngModel)]="exerciseForm.sets" 
                      name="sets" 
                      min="1" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Reps</label>
                    <input 
                      type="number" 
                      [(ngModel)]="exerciseForm.reps" 
                      name="reps" 
                      min="1" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                    <input 
                      type="number" 
                      [(ngModel)]="exerciseForm.weight" 
                      name="weight" 
                      min="0" 
                      step="0.5"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  </div>
                </div>

                <div class="flex space-x-4">
                  <button 
                    type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors">
                    {{ editingExercise ? 'Update' : 'Add' }}
                  </button>
                  <button 
                    type="button"
                    (click)="cancelExerciseEdit()"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div *ngIf="exercises.length === 0" class="text-center py-8 text-gray-500">
              No exercises added yet. Add your first exercise!
            </div>

            <div *ngIf="exercises.length > 0" class="space-y-3">
              <div *ngFor="let exercise of exercises" 
                   class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900">{{ exercise.name }}</h3>
                    <div class="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                      <span class="capitalize">{{ exercise.category.toLowerCase().replace('_', ' ') }}</span>
                      <span>{{ exercise.sets }} sets × {{ exercise.reps }} reps</span>
                      <span class="font-medium">{{ exercise.weight }} kg</span>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button 
                      (click)="editExercise(exercise)"
                      class="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-1 px-3 rounded transition-colors">
                      Edit
                    </button>
                    <button 
                      (click)="deleteExercise(exercise.id!)"
                      class="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-3 rounded transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class WorkoutDetailComponent implements OnInit, OnDestroy {
  workout: Workout | null = null;
  exercises: Exercise[] = [];
  loading = true;
  showExerciseForm = false;
  editingExercise: Exercise | null = null;
  private routeSubscription?: Subscription;
  private routerSubscription?: Subscription;
  private workoutId: number | null = null;

  exerciseForm = {
    name: '',
    category: 'chest',
    sets: 3,
    reps: 10,
    weight: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutApi: WorkoutApi,
    private exerciseApi: ExerciseApi
  ) {}

  ngOnInit(): void {
    // Subscribe to route params to reload when ID changes
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && +id !== this.workoutId) {
        this.workoutId = +id;
        this.loadWorkout(+id);
        this.loadExercises(+id);
      }
    });

    // Reload data when navigating back to this route
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url.startsWith('/workouts/') && !event.url.includes('#')) {
          const id = this.route.snapshot.paramMap.get('id');
          if (id) {
            this.loadExercises(+id);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }

  loadWorkout(id: number): void {
    this.workoutApi.getById(id).subscribe({
      next: (data) => {
        this.workout = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load workout', err);
        this.loading = false;
      }
    });
  }

  loadExercises(workoutId: number): void {
    this.exerciseApi.getByWorkoutId(workoutId).subscribe({
      next: (data) => {
        this.exercises = data;
      },
      error: (err) => console.error('Failed to load exercises', err)
    });
  }

  saveExercise(): void {
    if (!this.workout) return;

    const exerciseData = {
      ...this.exerciseForm,
      workoutId: this.workout.id!
    };

    if (this.editingExercise) {
      this.exerciseApi.update(this.editingExercise.id!, exerciseData).subscribe({
        next: (updated) => {
          // Reload to ensure we have the latest data
          if (this.workout) {
            this.loadExercises(this.workout.id!);
          }
          this.cancelExerciseEdit();
        },
        error: (err) => console.error('Failed to update exercise', err)
      });
    } else {
      this.exerciseApi.create(exerciseData).subscribe({
        next: (created) => {
          // Reload to ensure we have the latest data
          if (this.workout) {
            this.loadExercises(this.workout.id!);
          }
          this.cancelExerciseEdit();
        },
        error: (err) => console.error('Failed to create exercise', err)
      });
    }
  }

  editExercise(exercise: Exercise): void {
    this.editingExercise = exercise;
    this.exerciseForm = {
      name: exercise.name,
      category: exercise.category.toLowerCase(),
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight
    };
    this.showExerciseForm = true;
  }

  deleteExercise(id: number): void {
    if (confirm('Are you sure you want to delete this exercise?')) {
      this.exerciseApi.delete(id).subscribe({
        next: () => {
          // Reload to ensure we have the latest data
          if (this.workout) {
            this.loadExercises(this.workout.id!);
          }
        },
        error: (err) => console.error('Failed to delete exercise', err)
      });
    }
  }

  cancelExerciseEdit(): void {
    this.editingExercise = null;
    this.showExerciseForm = false;
    this.exerciseForm = {
      name: '',
      category: 'chest',
      sets: 3,
      reps: 10,
      weight: 0
    };
  }

  goBack(): void {
    this.router.navigate(['/workouts']);
  }

  getTypeBadgeClass(type: string): string {
    const classes: { [key: string]: string } = {
      'push': 'bg-blue-100 text-blue-800',
      'pull': 'bg-green-100 text-green-800',
      'legs': 'bg-purple-100 text-purple-800'
    };
    return classes[type.toLowerCase()] || 'bg-gray-100 text-gray-800';
  }
}
