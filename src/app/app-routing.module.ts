import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupComponent } from "./signup/signup.component";
import { PartyResultsComponent } from "./party-results/party-results.component";
import { HomeComponent } from "./home/home.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "parties",
    component: PartyResultsComponent,
  },
  {
    path: "",
    component: HomeComponent,
  },
];
console.log("routes");
console.log(routes);

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
