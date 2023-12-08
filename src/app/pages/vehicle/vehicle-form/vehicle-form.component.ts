import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Vehicle } from 'src/app/model/vehicle';
import { VehiclesService } from 'src/app/service/vehicles.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  
  id: number = 0;
  isEdit: boolean = true;
  form?: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehiclesService) {}

    ngOnInit(): void {
      this.form = new FormGroup({
        'id': new FormControl(0),
        'manufacturer': new FormControl('', [Validators.required]),
        'model': new FormControl('', [Validators.required]),
        'year': new FormControl('', [Validators.required]),
        'price': new FormControl('', [Validators.required]),
        'reserved': new FormControl('', [Validators.required]),
      });

      this.route.params.subscribe(data => {
        this.id = data['id'];
        this.isEdit = data['id'] != null;
        this.initForm();
      })
    }

    initForm(): void {
      if (this.isEdit) {
        this.vehicleService.getOne(this.id).subscribe(data => {
          this.form = new FormGroup({
            'id': new FormControl(data.id, [Validators.required]),
            'manufacturer': new FormControl(data.manufacturer, [Validators.required]),
            'model': new FormControl(data.model, [Validators.required]),
            'year': new FormControl(data.year, [Validators.required]),
            'price': new FormControl(data.price, [Validators.required]),
            'reserved': new FormControl(data.reserved, [Validators.required]),
          });
        });
      }
      
    }

    get f() {
      return this.form!.controls;
    }

    operate() {
      //if (this.form!.invalid) { return; }

      let vehicle: Vehicle = {
        id: this.form!.value['id'],
        manufacturer: this.form!.value['manufacturer'],
        model: this.form!.value['model'],
        year: this.form!.value['year'],
        price: this.form!.value['price'],
        reserved: this.form!.value['reserved'] === 'true' ? true : false
      }

      this.vehicleService.save(vehicle)
        .pipe(switchMap(() => this.vehicleService.getAll()))
        .subscribe(data => {
          this.vehicleService.vehicleChange.next(data);
          this.vehicleService.setMessageChange('Saved!');
        })

      /*if (this.isEdit) {
        this.vehicleService.update(vehicle.id!, vehicle)
        .pipe(switchMap(() => this.vehicleService.getAll()))
        .subscribe(data => {
          this.vehicleService.vehicleChange.next(data);
          this.vehicleService.setMessageChange('Saved!');
        })
      } else {
        this.vehicleService.save(vehicle)
        .pipe(switchMap(() => this.vehicleService.getAll()))
        .subscribe(data => {
          this.vehicleService.vehicleChange.next(data);
          this.vehicleService.setMessageChange('Saved!');
        })
      }*/
      
      this.router.navigate(['/pages/vehicles']);
    }
}
