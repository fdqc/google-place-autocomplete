import { Component, OnInit, Input } from '@angular/core';
import { TextField } from "tns-core-modules/ui/text-field";
import { PlaceService } from '~/app/modules/autocomplete/shared/services/place.service';
var UUID = require('uuid-js');

@Component({
  selector: 'ns-autocomplete',
  providers: [PlaceService],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  moduleId: module.id,
})
export class AutocompleteComponent implements OnInit {
  @Input() location: string;
  @Input() API_KEY: string;

  public searchString: string;
  public places: string[];
  private sessionToken: string;

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.generateSessionToken();
  }

  /**
   * Generates a session token using uuid v4
   */
  private generateSessionToken() {
    this.sessionToken = UUID.create(4);
  }

  /**
   * Request the Place autocomplete API
   * for places predictions and populates the autocomplete
   * suggestions
   * @param args
   */
  public onTextChange(args) {
    this.places = [];
    let textField = <TextField>args.object;
    let uriEncoded = encodeURI(textField.text);

    this.placeService.autocomplete(uriEncoded, this.location, this.sessionToken, this.API_KEY)
      .subscribe(
        (response: any) => {
          for (let prediction of response.predictions) {
            this.places.push(prediction.description);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /**
   * Updates the TextField with the selected place
   * and generates a new session token
   * @param place string
   */
  public placeSelected(place: string) {
    this.searchString = place;
    this.generateSessionToken();
    this.places = [];
  }

}
