import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleTransactionalService } from 'src/app/service/vehicle-transactional.service';
import { VehiclesService } from 'src/app/service/vehicles.service';

@Component({
  selector: 'app-place-order-form',
  templateUrl: './place-order-form.component.html',
  styleUrls: ['./place-order-form.component.css']
})
export class PlaceOrderFormComponent implements OnInit {
  
  dropdownData?: Vehicle[];
  userId?: number;
  public form: FormGroup = this.formBuilder.group({
    id: [{ value: 0, disabled: true }, [Validators.required]],
    userId:  [{ value: 0, disabled: true }, [Validators.required]],
    carId:  [{ value: 0 }, [Validators.required]],
    model:  [{ value: 0, disabled: true }, [Validators.required]],
    startTime:  [{ value: new Date() }, [Validators.required]],
    endTime:  [{ value: new Date() }, [Validators.required]]
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private transactionalService: VehicleTransactionalService,
    private snackbar: MatSnackBar,
    private vehicleService: VehiclesService
  ) {}

  ngOnInit(): void {
    this.onGetAllVehicles();
    this.route.params.subscribe(data => {
      this.userId = data['userId'];
    })
    this.form.get('userId')?.patchValue(this.userId);
  }

  onGetAllVehicles() {
    this.vehicleService.getAll().subscribe({
      next: (n) => {
        this.dropdownData = n;
        this.form.get('carId')?.setValue(this.dropdownData[0]?.id);
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        this.snackbar.open("Vehicles loaded.")
        ._dismissAfter(2000);
      }
    });
  }

  onSave() {
    let index = this.form.get('carId');
    let data = { 
      ...this.form.value,
      //model: this.dropdownData[index]
    }
    this.transactionalService.submitOrder(data).subscribe({
      next: (n) => {

      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        this.snackbar.open("Order submitted :D")
          ._dismissAfter(2000);
      }
    });
  }
}
