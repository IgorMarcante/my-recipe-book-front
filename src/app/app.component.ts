import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { NotificationComponent } from './notification/notification.component';
import { LoadingService } from './services/loading.service';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, NotificationComponent, AsyncPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-recipe-book';
  isLoading: Observable<boolean>;

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoading = this.loadingService.loading$;
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/recipes']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}