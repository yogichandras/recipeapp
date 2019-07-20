import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModules} from "../shared/shared.modules";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path:'',component:AuthComponent}
    ]),
    SharedModules
  ]
})
export class AuthModule {

}
