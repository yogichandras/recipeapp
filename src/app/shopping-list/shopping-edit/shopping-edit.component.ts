import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild,} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  // @ViewChild('nameInput')
  // nameInputRef: ElementRef;
  //
  // @ViewChild('amountInput')
  // amountInputRef: ElementRef;
  subcription:Subscription;

  @Output()
  ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('f') slForm:NgForm;

  editMode: boolean;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
  this.subcription = this.slService.startedEditing.subscribe(
    (index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    }
  );
  }

  ngOnDestroy(){
    this.subcription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName,ingAmount);
    // this.slService.addIngredient(newIngredient);
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
    this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
    }

  resetForm() {
    this.slForm.reset();
    this.editMode = false;
  }

  deleteItem() {
    this.resetForm();
    this.slService.deleteIngredient(this.editedItemIndex);
  }
}
