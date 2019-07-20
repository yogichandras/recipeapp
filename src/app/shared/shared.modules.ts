import {NgModule} from "@angular/core";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {DropdownDirective} from "./dropdown.directive";
import {CommonModule} from "@angular/common";
import {AlertComponent} from "./alert/alert.component";

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropdownDirective,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerComponent,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModules {

}
