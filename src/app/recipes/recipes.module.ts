import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes.component";
import {RecipesListComponent} from "./recipes-list/recipes-list.component";
import {RecipesDetailComponent} from "./recipes-detail/recipes-detail.component";
import {RecipesItemComponent} from "./recipes-list/recipes-item/recipes-item.component";
import {RecipesStartComponent} from "./recipes-start/recipes-start.component";
import {RecipesEditComponent} from "./recipes-edit/recipes-edit.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {SharedModules} from "../shared/shared.modules";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    RecipesStartComponent,
    RecipesEditComponent,
  ],
  imports: [RouterModule, ReactiveFormsModule, RecipesRoutingModule, SharedModules],
})
export class RecipesModule {
}
