import { Component, OnInit } from "@angular/core";
import { DataService } from "../DataService";

export class Party {
  _id: String;
  title: String;
  description: String;
  pictureUrl: String;
  address: String;
  coords: Number[];
  venue: String;
  date: Date;
  startTime: String;
  endTime: String;
  going: number;
  isAttending: boolean = false;
}

@Component({
  selector: "app-party-results",
  templateUrl: "./party-results.component.html",
  styleUrls: ["./party-results.component.css"],
})
export class PartyResultsComponent implements OnInit {
  public parties: Party[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getParties().then((parties) => {
      console.log("Got parties:");
      console.log(parties);
      this.parties = parties;
    });
  }

  addGoing(party: Party) {
    console.log(party);
    party.going = party.going + 1;
    party.isAttending = true;
    this.dataService.addOneGoing(party._id);
  }

  removeGoing(party: Party) {
    console.log(party);
    party.going = party.going - 1;
    party.isAttending = false;
    this.dataService.minusOneGoing(party._id);
  }

  showMap(party: Party) {
    const location = {
      lat: party.coords[1],
      lng: party.coords[0],
    };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 12,
    });

    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: party.title,
    });

    // const infoWindow = new google.maps.InfoWindow();
    // // Try HTML5 geolocation.
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     function (position) {
    //       var pos = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       };

    //       infoWindow.setPosition(pos);
    //       infoWindow.setContent("Location found.");
    //       infoWindow.open(map);
    //       map.setCenter(pos);
    //     },
    //     function () {
    //       console.log("error!!!");
    //       // handleLocationError(true, infoWindow, map.getCenter());
    //     }
    //   );
    // } else {
    //   // Browser doesn't support Geolocation
    //   console.log("browser no location");
    //   // handleLocationError(false, infoWindow, map.getCenter());
    // }
    $("#dialog").dialog({
      width: 650,
      height: 680,
    });
  }
}
