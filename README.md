# About this repository
The main focus was to test and implement Google's Place Autocomplete API within a NativeScript project. If you want to use it in your project you have to:
* Grab the AutocompleteModule (/src/app/modules/) and place it in your project.
* Import it at your app.module.ts:
    import { AutocompleteModule } from "./modules/autocomplete/autocomplete.module";
    
    @NgModule({
    ...
    imports: [ ..., AutocompleteModule ]
    ],
    ...
    })
    
* Place the autocomplete component in your html:
    <ns-autocomplete [location]="selectedLocation" [API_KEY]="API_KEY"></ns-autocomplete>
    <!-- Note: the location input should be a string [location]='lat,lng' -->
    
## Dependencies
The only dependency you need to use the autocomplete component is _uuid-js_ and you can install it by running
`$ npm install uuid-js`