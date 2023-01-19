import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {map} from "rxjs";
import {People} from "../interfaces/people";
import {PeopleService} from "../services/people.service";
import {Vehicle} from "../interfaces/vehicles";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicles: any[] = [];
  displayedColumns = ['Name', 'Model', 'Cost'];
  columnNames = ['Name', 'Model', 'Cost'];
  vehiclesLength:number = 39;
  previousPageToken: string | null = null;
  nextPageToken: string | null = null;
  pageIndex: number = 0;
  loadingStatus = '';

  constructor(private vehiclesService: PeopleService) {}

  ngOnInit(): void {
    this.loadVehiclesData(null);
  }

  handlePageEvent(e: PageEvent) {
    if (e.pageIndex > this.pageIndex) {
      this.loadVehiclesData(this.nextPageToken);
    } else {
      this.loadVehiclesData(this.previousPageToken);
    }
    this.pageIndex = e.pageIndex;
  }

  loadVehiclesData(paginationToken: string | null) {
    this.vehicles = [];
    this.loadingStatus = 'loading';
    this.vehiclesService.getAllVehicles(paginationToken).pipe(
      map(vehiclesSwapi => {
        this.previousPageToken = vehiclesSwapi.previous;
        this.nextPageToken = vehiclesSwapi.next;
        return vehiclesSwapi.results.map(vehicle => {
            let v: Vehicle = {
              Name: vehicle.name,
              Model: vehicle.model,
              Cost: vehicle.cost_in_credits
            }
            return v;
          }
        )
      }),
    ).subscribe(vehicles => {
      console.log(vehicles);
      this.vehicles = vehicles;

      if (this.vehicles.length === 0) {
        this.loadingStatus = 'none'
      } else {
        this.loadingStatus = 'table'
      }
    })
  }
}
