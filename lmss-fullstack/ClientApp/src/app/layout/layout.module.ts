import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule} from "@angular/router";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from 'primeng/button';
import {MegaMenuModule} from 'primeng/megamenu';
import {ProfileAvatarComponent} from "./main-layout/components/profile-avatar.component";
import {SharedModule} from "../shared/shared.module";
import {DirectiveModule} from "../directive/directive.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SanitizerPipe } from './main-layout/pipes/sanitizer.pipe';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    MainLayoutComponent,
    ProfileAvatarComponent,
    SanitizerPipe
  ],
    imports: [
        CommonModule,
        RouterModule,
        SidebarModule,
        ButtonModule,
        MegaMenuModule,
        SharedModule,
        DirectiveModule,
        BrowserAnimationsModule,
    ]
})
export class LayoutModule { }
