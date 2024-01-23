import {NgModule} from "@angular/core";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {CommonModule} from "@angular/common";
import { BackButtonComponent } from './back-button/back-button.component';
import {RouterModule} from "@angular/router";

  @NgModule({
    declarations: [LoadingSpinnerComponent, BackButtonComponent],
    imports: [CommonModule, RouterModule],
    exports: [LoadingSpinnerComponent, BackButtonComponent],
  })
export class SharedModule {

}
