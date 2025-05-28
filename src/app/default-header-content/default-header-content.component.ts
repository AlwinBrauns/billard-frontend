import {booleanAttribute, Component, input} from '@angular/core';
import {KeycloakInstance} from '../../main';
import {AuthService, UserState} from '../auth.service';
import {Location, NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-default-header-content',
  imports: [
    NgIf
  ],
  templateUrl: './default-header-content.component.html',
  styleUrl: './default-header-content.component.css'
})
export class DefaultHeaderContentComponent {

  back = input(false, {transform: booleanAttribute});

  constructor(protected authService: AuthService, protected location: Location, protected router: Router) {
  }

  protected readonly KeycloakInstance = KeycloakInstance;
  protected readonly UserState = UserState;
}
