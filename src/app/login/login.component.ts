import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, map } from 'rxjs';
import { User, UserGQL } from '../../../graphql/generated';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user$: Observable<User | null | undefined>;

  constructor(userService: UserGQL, public authService: AuthService) {
    this.user$ = userService
      .fetch({
        id: 1,
      })
      .pipe(map((result) => result.data.user));
  }
}
