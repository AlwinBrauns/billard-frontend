import {Component, input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-general-error',
  imports: [
    NgIf
  ],
  templateUrl: './general-error.component.html',
  styleUrl: './general-error.component.css'
})
export class GeneralErrorComponent {

  error = input<any>({});
  protected readonly JSON = JSON;
}
