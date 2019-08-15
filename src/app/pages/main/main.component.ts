import { Component, OnInit } from '@angular/core';
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { TextField } from "tns-core-modules/ui/text-field";
import { PlaceService } from '~/app/shared/services/place.service';
var UUID = require('uuid-js');

@Component({
  selector: 'ns-main',
  providers: [PlaceService],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  moduleId: module.id,
})
export class MainComponent implements OnInit {
  public provinces = ['Santiago del Estero','Neuquen','Cordoba'];
  public provincesDetails = [
    {
      name: 'sgo',
      center: {
        lat: -27.7951100,
        lng: -64.2614900
      }
    },
    {
      name: 'nqn',
      center: {
        lat: -38.95,
        lng: -68.06667
      }
    },
    {
      name: 'cba',
      center: {
        lat: -31.3989,
        lng: -64.1821
      }
    }
  ];
  
  public selectedIndex = 0;
  private selectedLocation;
  public searchString: string;
  public places: string[];
  private sessionToken: string;

  constructor(private placeService: PlaceService) {
    // Sets the initial point around to retrieve place information
    this.selectedLocation = `${this.provincesDetails[0].center.lat},${this.provincesDetails[0].center.lng}`;
  }

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
   * Updates the point to retrieve place information
   * when a province is selected
   * @param args SelectedIndexChangedEventData
   */
  public onchange(args: SelectedIndexChangedEventData) {
    this.selectedIndex = args.newIndex;
    this.selectedLocation = `${this.provincesDetails[this.selectedIndex].center.lat},${this.provincesDetails[this.selectedIndex].center.lng}`;
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

    this.placeService.autocomplete(uriEncoded,this.selectedLocation,this.sessionToken)
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
