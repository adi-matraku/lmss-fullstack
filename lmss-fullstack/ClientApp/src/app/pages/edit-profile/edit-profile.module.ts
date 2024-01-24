import {RouterModule, Routes} from "@angular/router";
import {EditProfileComponent} from "./containers/edit-profile/edit-profile.component";
import {NgModule} from "@angular/core";
import {ChipsModule} from 'primeng/chips';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {InputMaskModule} from 'primeng/inputmask';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: EditProfileComponent,
  }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ChipsModule,
        InputTextModule,
        ReactiveFormsModule,
        InputMaskModule,
        FileUploadModule,
        HttpClientModule,
        FormsModule,
    ],
  declarations: [
    EditProfileComponent
  ]
})
export class EditProfileModule {}
