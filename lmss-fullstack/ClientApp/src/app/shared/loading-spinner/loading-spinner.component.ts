import {Component} from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`,
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {

  constructor() { }
}
