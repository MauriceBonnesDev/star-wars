import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from "./people/people.component";
import { PeopleDetailsComponent } from "./people/people-details/people-details.component";
import { HomeComponent } from "./home/home.component";
import {VehiclesComponent} from "./vehicles/vehicles.component";
import {PlanetsComponent} from "./planets/planets.component";
import {MoviesComponent} from "./movies/movies.component";
import {SpeciesComponent} from "./species/species.component";
import {MovieCrawlTextComponent} from "./movies/movie-crawl-text/movie-crawl-text.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MovieCrawlTextComponent },
  { path: 'species', component: SpeciesComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'people/:id', component: PeopleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
