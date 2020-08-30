import { FormControl} from "@angular/forms";

export class DateFormControl extends FormControl {

  setValue(value: string | null, options?: any): void {
    //if not 0..9 or \
    if (!value ) {
      super.setValue(null, {...options, emitModelToViewChange: true});
      return;
    }
    if (value.match(/[^0-9|\/]/gi)){
      super.setValue(this.value,{...options, emitModelToViewChange:true});
      return;
    }
    if (value.length >5){
      super.setValue(this.value,{...options, emitModelToViewChange:true});
      return;
    }

    if (value.length === 2 && this.value.length === 3){
      super.setValue(value,{...options, emitModelToViewChange:true});
      return;
    }

    if (value.length === 2){
      super.setValue(value + '/', {...options, emitModelToViewChange:true});
      return;
    }
    super.setValue(value, {...options, emitModelToViewChange:true});
  }
}
