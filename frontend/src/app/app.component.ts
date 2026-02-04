/**
 * Root Application Component
 * 
 * This is the main component that wraps the entire application
 * It includes the header, notification system, and router outlet for page content
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NotificationComponent } from './components/notification/notification.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        HeaderComponent,
        NotificationComponent
    ],
    template: `
    <!-- Notification System (always present) -->
    <app-notification></app-notification>
    
    <!-- Header Navigation -->
    <app-header></app-header>
    
    <!-- Main Content Area (Router Outlet) -->
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    
    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p class="footer-text">
          Made with ❤️ using Angular & Spring Boot | © 2026 Link Shortener
        </p>
      </div>
    </footer>
  `,
    styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
    }

    .footer {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding: 2rem 0;
      margin-top: 4rem;
    }

    .footer-text {
      text-align: center;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      font-size: 0.9375rem;
    }

    @media (max-width: 768px) {
      .footer {
        padding: 1.5rem 0;
        margin-top: 3rem;
      }

      .footer-text {
        font-size: 0.875rem;
      }
    }
  `]
})
export class AppComponent {
    title = 'Link Shortener';
}
