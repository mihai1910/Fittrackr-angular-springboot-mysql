import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { StatisticsApi, WorkoutStatistics } from '../../statistics.api';
import { WorkoutApi } from '../../workout.api';
import { DurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DurationPipe],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div *ngIf="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="mt-4 text-gray-600">Loading statistics...</p>
        </div>

        <div *ngIf="!loading && stats" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Workouts</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalWorkouts }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Duration</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalDuration | duration }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Avg Duration</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.averageDuration | number:'1.0-0' }} min</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">This Month</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.workoutsThisMonth }}</p>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="!loading && stats && stats.workoutsByType" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Workouts by Type</h2>
            <div class="space-y-3">
              <div *ngFor="let entry of getWorkoutTypeEntries()" class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="inline-block w-3 h-3 rounded-full mr-3" 
                        [ngClass]="getTypeColorClass(entry.key)"></span>
                  <span class="text-gray-700 font-medium capitalize">{{ entry.key.toLowerCase() }}</span>
                </div>
                <span class="text-gray-900 font-semibold">{{ entry.value }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div *ngIf="recentWorkouts.length > 0; else noRecentWorkouts" class="space-y-3">
              <div *ngFor="let workout of recentWorkouts" 
                   class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span class="font-medium text-gray-900 capitalize">{{ workout.type.toLowerCase() }}</span>
                  <span class="text-sm text-gray-500 ml-2">{{ workout.date | date:'shortDate' }}</span>
                </div>
                <span class="text-gray-600">{{ workout.durationMinutes }} min</span>
              </div>
            </div>
            <ng-template #noRecentWorkouts>
              <p class="text-gray-500 text-center py-4">No recent workouts</p>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats: WorkoutStatistics | null = null;
  loading = true;
  recentWorkouts: any[] = [];
  private routerSubscription?: Subscription;

  constructor(
    private statisticsApi: StatisticsApi,
    private workoutApi: WorkoutApi,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
    
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url === '/dashboard' || event.url === '/') {
          this.loadData();
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  loadData(): void {
    this.loadStatistics();
    this.loadRecentWorkouts();
  }

  loadStatistics(): void {
    this.statisticsApi.getWorkoutStatistics().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load statistics', err);
        this.loading = false;
      }
    });
  }

  loadRecentWorkouts(): void {
    this.workoutApi.getAll().subscribe({
      next: (workouts) => {
        this.recentWorkouts = workouts
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
      },
      error: (err) => console.error('Failed to load recent workouts', err)
    });
  }

  getWorkoutTypeEntries(): Array<{key: string, value: number}> {
    if (!this.stats?.workoutsByType) return [];
    return Object.entries(this.stats.workoutsByType).map(([key, value]) => ({ key, value }));
  }

  getTypeColorClass(type: string): string {
    const colors: { [key: string]: string } = {
      'PUSH': 'bg-blue-500',
      'PULL': 'bg-green-500',
      'LEGS': 'bg-purple-500'
    };
    return colors[type] || 'bg-gray-500';
  }
}
