import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehicle } from 'src/app/model/vehicle';
import { VehiclesService } from 'src/app/service/vehicles.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {

  myDataSource: Vehicle[] = [];
  displayedColumns: string[] = ['Id', 'Manufacturer', 'Model', 'Year', 'Price', 'Reserved', 'Actions'];

  constructor(private _vehicleService: VehiclesService,
    private _snackbar: MatSnackBar) {}

  ngOnInit(): void {
      this.onGetAll();
  }

  onGetAll() {
    this._vehicleService.getAll().subscribe({
      next: (data) => {
        this.myDataSource = data;
      },
      error: (err) => {
        this._snackbar.open("Something went wrong :/")
          ._dismissAfter(2000);
      },
      complete: () => {
        this._snackbar.open("Vehicles loaded.")
          ._dismissAfter(2000);
      },
    })
  }

  onSave(id: number) {
    // TODO
    // Si el id es null, crear nuevo
    if (!id) {

    } else {
      // Sino, actualizar existente
    }
  }

  onDelete(id: number) {
    // TODO
  }

}
