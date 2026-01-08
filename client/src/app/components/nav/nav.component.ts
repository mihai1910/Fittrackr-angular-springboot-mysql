import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <a routerLink="/" class="text-2xl font-bold hover:text-blue-200 transition-colors">
              FitTrackr
            </a>
            <div class="flex space-x-4">
              <a routerLink="/dashboard" 
                 routerLinkActive="text-blue-200 underline"
                 class="hover:text-blue-200 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </a>
              <a routerLink="/workouts" 
                 routerLinkActive="text-blue-200 underline"
                 class="hover:text-blue-200 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Workouts
              </a>
              <a routerLink="/exercises" 
                 routerLinkActive="text-blue-200 underline"
                 class="hover:text-blue-200 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Exercises
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavComponent {}

