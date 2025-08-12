import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Customer Support Portal</h1>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container { min-height: 100vh; }
    .app-header { background: #343a40; color: white; padding: 1rem; text-align: center; }
    .app-header h1 { margin: 0; }
    .app-main { padding: 20px; }
  `]
})
export class AppComponent {
  title = 'Customer Support Portal';
}