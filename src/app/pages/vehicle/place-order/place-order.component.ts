import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceOrder } from 'src/app/model/place-order';
import { VehicleTransactionalService } from 'src/app/service/vehicle-transactional.service';
import { VehiclesService } from 'src/app/service/vehicles.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  dataSource?: PlaceOrder[];
  displayedColumns: string[] = ['Id', 'UserId', 'CarId', 'Model', 'StartTime', 'EndTime', 'Actions'];
  userId: number = 1;
  //form?: FormGroup;

  constructor(
    private _vehicleService: VehiclesService,
    private _transactionalService: VehicleTransactionalService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.onGetAll();
      /*this.form = new FormGroup({
        'startTime': new FormControl(new Date(), [Validators.required]),
        'endTime': new FormControl(new Date(), [Validators.required])
      });*/

      /*this.route.params.subscribe(data => {
        this.carId = data['carId'];
        this.userId = data['userId'];
      })*/
  }

  onGetAll() {
    this._transactionalService.getAll().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (e) => {
        this._snackbar.open("Place orders went wrong :(")
          ._dismissAfter(2000);
      },
      complete: () => {
        this._snackbar.open("Place orders loaded.")
          ._dismissAfter(2000);
      }
    })
  }

  onGetAllCars() {
    this._vehicleService.getAll().subscribe({
      next: (data) => {
        // TODO: dropdown
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {

      }
    })
  }

  onDelete() {
    
  }
}
