import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { People, PeopleAkabab, PeopleSwapi, SwapiResponse } from "../interfaces/people";
import { SpeciesSwapi } from "../interfaces/species";
import { VehicleSwapi } from "../interfaces/vehicles";
import {PlanetSwapi} from "../interfaces/planets";
import {MovieSwapi} from "../interfaces/movies";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  swapiBaseURL: string = 'https://swapi.dev/api';
  akababBaseURL: string = 'https://akabab.github.io/starwars-api/api';

  constructor(private http: HttpClient) { }

  getAllPeople(paginationToken: string | null): Observable<SwapiResponse<PeopleSwapi>> {
    if (paginationToken === null) {
      return this.http.get<SwapiResponse<PeopleSwapi>>(`${ this.swapiBaseURL }/people/`);
    } else {
      return this.http.get<SwapiResponse<PeopleSwapi>>(paginationToken);
    }
  }

  getSpecies(species: string): Observable<any> {
    return this.http.get<any>(`${ this.swapiBaseURL}/species/?search=${ species }`);
  }

  getAkababCharacter(id: number): Observable<PeopleAkabab> {
    return this.http.get<PeopleAkabab>(`${ this.akababBaseURL }/id/${ id }.json`)
  }

  getSwapiCharacter(id: number): Observable<PeopleSwapi> {
    return this.http.get<PeopleSwapi>(`${ this.swapiBaseURL }/people/${ id }`)
  }

  searchCharacter(searchTerm: string): Observable<SwapiResponse<PeopleSwapi>> {
    return this.http.get<SwapiResponse<PeopleSwapi>>(`${ this.swapiBaseURL }/people/?search=${ searchTerm }`)
  }

  getAllVehicles(paginationToken: string | null): Observable<SwapiResponse<VehicleSwapi>> {
    if (paginationToken === null) {
      return this.http.get<SwapiResponse<VehicleSwapi>>(`${ this.swapiBaseURL }/vehicles/`)
    } else {
      return this.http.get<SwapiResponse<VehicleSwapi>>(paginationToken);
    }
  }

  getAllPlanets(paginationToken: string | null): Observable<SwapiResponse<PlanetSwapi>> {
    if (paginationToken === null) {
      return this.http.get<SwapiResponse<PlanetSwapi>>(`${ this.swapiBaseURL }/planets/`)
    } else {
      return this.http.get<SwapiResponse<PlanetSwapi>>(paginationToken);
    }
  }

  getAllMovies(): Observable<SwapiResponse<MovieSwapi>> {
      return this.http.get<SwapiResponse<MovieSwapi>>(`${ this.swapiBaseURL }/films/`)
  }

  getAllSpecies(paginationToken: string | null): Observable<SwapiResponse<SpeciesSwapi>> {
    if (paginationToken === null) {
      return this.http.get<SwapiResponse<SpeciesSwapi>>(`${ this.swapiBaseURL }/species/`)
    } else {
      return this.http.get<SwapiResponse<SpeciesSwapi>>(paginationToken);
    }
  }
}
