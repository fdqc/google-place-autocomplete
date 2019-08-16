import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { AutocompleteComponent } from './components/autocomplete.component';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [
    NativeScriptCommonModule
  ],
  exports: [AutocompleteComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AutocompleteModule { }
