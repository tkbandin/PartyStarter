import { Component, OnInit } from "@angular/core";
import { DataService } from "../DataService";

export class Party {
  title: String;
  description: String;
  pictureUrl: String;
  address: String;
  coords: Number[];
  venue: String;
  date: Date;
  startTime: String;
  endTime: String;
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
}
