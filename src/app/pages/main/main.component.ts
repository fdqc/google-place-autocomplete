import { Component, OnInit } from '@angular/core';
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

@Component({
  selector: 'ns-main',
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
  private selectedLocation: string;
  private API_KEY = 'your-api-key';

  constructor() {
    // Sets the initial point around to retrieve place information
    this.selectedLocation = `${this.provincesDetails[0].center.lat},${this.provincesDetails[0].center.lng}`;
  }

  ngOnInit() {
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

}
