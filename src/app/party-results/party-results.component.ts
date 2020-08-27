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
}
