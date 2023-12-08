import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BaseService } from './base.service';
import { Observable, Subject } from 'rxjs';
import { Vehicle } from '../model/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private url = environment.vehicleBackend;
  private requestUrl = "/Vehicles";
  private messageChange = new Subject<string>;
  public vehicleChange = new Subject<Vehicle[]>;

  constructor(private _baseService: BaseService) { }

  getAll(): Observable<Vehicle[]> {
    return this._baseService.get<Vehicle[]>(this.url, this.requestUrl);
  }

  getOne(id: number): Observable<any> {
    return this._baseService.get<Vehicle[]>(this.url, `${this.requestUrl}/${id}`);
  }

  save(vehicle: Vehicle): Observable<Vehicle> {
    return this._baseService.post(this.url, this.requestUrl, vehicle);
  }

  update(id: number, vehicle: Vehicle): Observable<Vehicle> {
    return this._baseService.put(this.url, `${this.requestUrl}/${id}`, vehicle);
  }

  delete(id: number): Observable<any> {
    return this._baseService.delete(this.url, `${this.requestUrl}/${id}`);
  }

  // no c pa q son
  setMessageChange(message: string){
    this.messageChange.next(message);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
