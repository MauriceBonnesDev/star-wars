import {Component, OnInit} from '@angular/core';
import {PeopleService} from "../services/people.service";
import {PageEvent} from "@angular/material/paginator";
import {map} from "rxjs";
import {Vehicle} from "../interfaces/vehicles";
import {Species} from "../interfaces/species";

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {
  species: any[] = [];
  displayedColumns = ['Name', 'Classification', 'AverageHeight', 'AverageLifespan'];
  speciesLength:number = 37;
  previousPageToken: string | null = null;
  nextPageToken: string | null = null;
  pageIndex: number = 0;
  loadingStatus = '';

  constructor(private speciesService: PeopleService) {}

  ngOnInit(): void {
    this.loadSpeciesData(null);
  }

  handlePageEvent(e: PageEvent) {
    if (e.pageIndex > this.pageIndex) {
      this.loadSpeciesData(this.nextPageToken);
    } else {
      this.loadSpeciesData(this.previousPageToken);
    }
    this.pageIndex = e.pageIndex;
  }

  loadSpeciesData(paginationToken: string | null) {
    this.species = [];
    this.loadingStatus = 'loading';
    this.speciesService.getAllSpecies(paginationToken).pipe(
      map(speciesSwapi => {
        this.previousPageToken = speciesSwapi.previous;
        this.nextPageToken = speciesSwapi.next;
        return speciesSwapi.results.map(species => {
            let v: Species = {
              Name: species.name,
              Classification: species.classification,
              AverageHeight: species.average_height,
              AverageLifespan: species.average_lifespan
            }
            return v;
          }
        )
      }),
    ).subscribe(species => {
      console.log(species);
      this.species = species;

      if (this.species.length === 0) {
        this.loadingStatus = 'none'
      } else {
        this.loadingStatus = 'table'
      }
    })
  }

}
