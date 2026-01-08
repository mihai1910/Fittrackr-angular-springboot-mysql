import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-nav></app-nav>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class App {}
