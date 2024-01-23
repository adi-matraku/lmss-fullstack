import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-button',
  template: `
    <div class="link-box">
      <a class="go-back-link" routerLink="../">Go Back &larr;</a>
    </div>
  `,
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
