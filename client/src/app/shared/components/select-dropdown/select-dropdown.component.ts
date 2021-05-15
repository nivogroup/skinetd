import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Input, Self } from '@angular/core';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent<T extends { id: number, name: string }> implements OnInit, ControlValueAccessor {
  //Template Referance value, so that we can access this inside our component
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() label: string;
  @Input() Items: T[];
  @Input() selectedId: number;

  constructor(@Self() public controlDir: NgControl) {
    //This binds it at our class
    //Now we got access to our control directve inside our components / template
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);

    control.updateValueAndValidity();
   }
  
  onChange(event: number) {
  }
  onTouched() {
  }


  writeValue(obj: number): void {
    this.input.nativeElement.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
