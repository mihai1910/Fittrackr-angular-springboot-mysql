import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { WorkoutDetailComponent } from './components/workout-detail/workout-detail.component';
import { ExercisesComponent } from './components/exercises/exercises.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'workouts/:id', component: WorkoutDetailComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: '**', redirectTo: '/dashboard' }
];
