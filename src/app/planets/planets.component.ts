import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {map} from "rxjs";
import {Vehicle} from "../interfaces/vehicles";
import {PeopleService} from "../services/people.service";
import {Planet} from "../interfaces/planets";

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  planets: any[] = [];
  displayedColumns = ['Name', 'Population', 'Terrain'];
  planetsLength:number = 60;
  previousPageToken: string | null = null;
  nextPageToken: string | null = null;
  pageIndex: number = 0;
  loadingStatus = '';

  constructor(private planetsService: PeopleService) {}

  ngOnInit(): void {
    this.loadPlanetsData(null);
  }

  handlePageEvent(e: PageEvent) {
    if (e.pageIndex > this.pageIndex) {
      this.loadPlanetsData(this.nextPageToken);
    } else {
      this.loadPlanetsData(this.previousPageToken);
    }
    this.pageIndex = e.pageIndex;
  }

  loadPlanetsData(paginationToken: string | null) {
    this.planets = [];
    this.loadingStatus = 'loading';
    this.planetsService.getAllPlanets(paginationToken).pipe(
      map(planetSwapi => {
        this.previousPageToken = planetSwapi.previous;
        this.nextPageToken = planetSwapi.next;
        return planetSwapi.results.map(planet => {
            let v: Planet = {
              Name: planet.name,
              Population: planet.population,
              Terrain: planet.terrain
            }
            return v;
          }
        )
      }),
    ).subscribe(vehicles => {
      console.log(vehicles);
      this.planets = vehicles;

      if (this.planets.length === 0) {
        this.loadingStatus = 'none'
      } else {
        this.loadingStatus = 'table'
      }
    })
  }
}
