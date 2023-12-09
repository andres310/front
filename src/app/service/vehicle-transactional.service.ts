import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Vehicle } from '../model/vehicle';
import { BaseService } from './base.service';
import { PlaceOrder } from '../model/place-order';
import { MostRentedCar } from '../model/most-rented-car';
import { NumberVehiclesUser } from '../model/number-vehicles-user';
import { RentalCountPerVehicle } from '../model/rental-count-per-vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleTransactionalService {

  private url = environment.transactionalBackend;
  //private requestUrl = "/orders";
  private messageChange = new Subject<string>;
  public vehicleChange = new Subject<Vehicle[]>;

  constructor(private _baseService: BaseService) { }

  // Spring

  getAll(): Observable<PlaceOrder[]> {
    return this._baseService.get<PlaceOrder[]>(this.url, '/orders');
  }

  getMostRentedCars(): Observable<MostRentedCar> {
    return this._baseService.get<MostRentedCar>(this.url, '/most-rented-cars');
  }
  
  getNumberOfVehiclesPerUser(): Observable<NumberVehiclesUser> {
    return this._baseService.get<NumberVehiclesUser>(this.url, '/vehicles-per-user');
  }

  getRentalCountPerVehicle(): Observable<RentalCountPerVehicle> {
    return this._baseService.get<RentalCountPerVehicle>(this.url, '/rental-count-per-vehicle');
  }

  submitOrder(placeOrder: PlaceOrder): Observable<PlaceOrder> {
    return this._baseService.post<PlaceOrder>(this.url, '/orders', placeOrder);
  }

  // no c pa q son
  setMessageChange(message: string){
    this.messageChange.next(message);
  }
  
  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
