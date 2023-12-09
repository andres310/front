import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Month } from 'src/app/model/month';
import { MostRentedCar } from 'src/app/model/most-rented-car';
import { NumberVehiclesUser } from 'src/app/model/number-vehicles-user';
import { RentalCountPerVehicle } from 'src/app/model/rental-count-per-vehicle';
import { VehicleTransactionalService } from 'src/app/service/vehicle-transactional.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  mostRented?: MostRentedCar[];
  month?: number;
  months: Month[] = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
  ]
  displayColumnsMostRented = ['Model', 'RentalCount'];

  vehiclesPerUser?: NumberVehiclesUser[];
  displayColumnsPerUser = ['UserId', 'VehicleCount'];

  rentalCountPerVehicle?: RentalCountPerVehicle[];
  displayColumnsRentalPerVehicle = ['Model', 'RentalCount'];

  constructor(
    private _transactionalService: VehicleTransactionalService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
      //this.onGetMostRentedCars();
      this.onGetNumberOfCarsPerUser();
      this.onGetRentalCountPerVehicle();
  }

  onGetMostRentedCars() {
    this._transactionalService.getMostRentedCars(this.month!).subscribe(data => {
      this.mostRented = data;
      this._snackbar.open("Most rented cars loaded.")
        ._dismissAfter(2000);
    });
  }

  onGetNumberOfCarsPerUser() {
    this._transactionalService.getNumberOfVehiclesPerUser().subscribe(data => {
      this.vehiclesPerUser = data;
      this._snackbar.open("Number of cars per user loaded.")
        ._dismissAfter(2000);
    });
  }

  onGetRentalCountPerVehicle() {
    this._transactionalService.getRentalCountPerVehicle().subscribe(data => {
      this.rentalCountPerVehicle = data;
      this._snackbar.open("Rental count per car loaded.")
      ._dismissAfter(2000);
    });
  }

  onMonthChange(e: any) {
    this.month = e.value;
    this.onGetMostRentedCars();
  }
}
