import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter, Subscription } from 'rxjs';
import { WorkoutApi, Workout } from '../../workout.api';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900">Workouts</h1>
          <button 
            (click)="showForm = !showForm"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors">
            {{ showForm ? 'Cancel' : '+ New Workout' }}
          </button>
        </div>

        <div *ngIf="showForm" class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">
            {{ editingWorkout ? 'Edit Workout' : 'Create New Workout' }}
          </h2>
          <form (ngSubmit)="saveWorkout()" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select 
                  [(ngModel)]="form.type" 
                  name="type" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="push">Push</option>
                  <option value="pull">Pull</option>
                  <option value="legs">Legs</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <input 
                  type="number" 
                  [(ngModel)]="form.durationMinutes" 
                  name="durationMinutes" 
                  min="45" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input 
                  type="date" 
                  [(ngModel)]="form.date" 
                  name="date" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>

            <div class="flex space-x-4">
              <button 
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors">
                {{ editingWorkout ? 'Update' : 'Create' }}
              </button>
              <button 
                type="button"
                (click)="cancelEdit()"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div *ngIf="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ error }}
        </div>

        <div *ngIf="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="mt-4 text-gray-600">Loading workouts...</p>
        </div>

        <div *ngIf="!loading && workouts.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No workouts</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new workout.</p>
        </div>

        <div *ngIf="!loading && workouts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let workout of workouts" 
               class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize"
                      [ngClass]="getTypeBadgeClass(workout.type)">
                  {{ workout.type.toLowerCase() }}
                </span>
                <span class="text-sm text-gray-500">{{ workout.date | date:'shortDate' }}</span>
              </div>
              
              <div class="space-y-2">
                <div class="flex items-center text-gray-600">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{{ workout.durationMinutes }} minutes</span>
                </div>
              </div>

              <div class="mt-6 flex space-x-2">
                <button 
                  (click)="editWorkout(workout)"
                  class="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded transition-colors">
                  Edit
                </button>
                <button 
                  (click)="deleteWorkout(workout.id!)"
                  class="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded transition-colors">
                  Delete
                </button>
                <a 
                  [routerLink]="['/workouts', workout.id]"
                  class="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-medium py-2 px-4 rounded transition-colors text-center">
                  View
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  workouts: Workout[] = [];
  loading = true;
  error = '';
  showForm = false;
  editingWorkout: Workout | null = null;
  private routerSubscription?: Subscription;

  form = {
    type: 'push',
    durationMinutes: 60,
    date: new Date().toISOString().slice(0, 10)
  };

  constructor(
    private workoutApi: WorkoutApi,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWorkouts();
    
    // Reload data when navigating back to this route
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url === '/workouts') {
          this.loadWorkouts();
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  loadWorkouts(): void {
    this.loading = true;
    this.workoutApi.getAll().subscribe({
      next: (data) => {
        this.workouts = data.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load workouts', err);
        this.error = 'Failed to load workouts';
        this.loading = false;
      }
    });
  }

  saveWorkout(): void {
    this.error = '';
    const workoutData = { ...this.form };

    if (this.editingWorkout) {
      this.workoutApi.update(this.editingWorkout.id!, workoutData).subscribe({
        next: (updated) => {
          this.loadWorkouts();
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Failed to update workout', err);
          this.error = 'Failed to update workout';
        }
      });
    } else {
      this.workoutApi.create(workoutData).subscribe({
        next: (created) => {
          this.loadWorkouts();
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Failed to create workout', err);
          this.error = 'Failed to create workout';
        }
      });
    }
  }

  editWorkout(workout: Workout): void {
    this.editingWorkout = workout;
    this.form = {
      type: workout.type.toLowerCase(),
      durationMinutes: workout.durationMinutes,
      date: workout.date
    };
    this.showForm = true;
  }

  deleteWorkout(id: number): void {
    if (confirm('Are you sure you want to delete this workout?')) {
      this.workoutApi.delete(id).subscribe({
        next: () => {
          this.loadWorkouts();
        },
        error: (err) => {
          console.error('Failed to delete workout', err);
          this.error = 'Failed to delete workout';
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingWorkout = null;
    this.showForm = false;
    this.form = {
      type: 'push',
      durationMinutes: 60,
      date: new Date().toISOString().slice(0, 10)
    };
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
