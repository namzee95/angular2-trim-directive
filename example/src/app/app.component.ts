import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component( {
  'selector'     : 'in-app',
  'templateUrl'  : './app.component.html',
  'styles'       : ['pre { background-color: whitesmoke;} small {color: #AAA}'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AppComponent {

  trigger: FormControl;

  exampleForm: FormGroup;

  exampleFormInfo = {};

  constructor( @Inject( FormBuilder ) private fb: FormBuilder ) {
    this.trigger = this.fb.control( 'input' );

    this.exampleForm = this.fb.group( {

      'text'          : ['', Validators.required],
      'text_undefined': [null, Validators.required],
      'text_autofill' : [undefined, Validators.required],
      'email'         : ['', [Validators.required, Validators.email]],
      'number'        : ['', [Validators.required]],
      'url'           : ['', [Validators.required]],
      'textarea'      : ['', [Validators.required, Validators.maxLength( 10 )]]

    } );

    this.updateStates();

  }

  /**
   * ngFor Helper
   */
  getKeys( obj: Object ): Array<string> {

    this.updateStates();

    return Object.keys( obj );
  }

  /**
   * Can be simplified
   */
  updateStates() {

    const fields = ['status', 'dirty', 'touched'];

    for (let item in this.exampleForm.controls) {
      this.exampleFormInfo[item] = {};
      for (let field of fields) {
        this.exampleFormInfo[item][field] = this.exampleForm.controls[item][field];
      }

    }

  }

  onSubmit(): void {
  }

}
