/**
 * Application Routes Configuration
 * 
 * Defines the navigation structure of the application
 */
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Link Shortener - Home'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard - Link Shortener'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
