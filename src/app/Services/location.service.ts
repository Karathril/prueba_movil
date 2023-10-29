import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../Models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  async getRegion(){
    return await lastValueFrom(this.http.get<ApiResponse<any>>(environment.apiUrl+'region'));

  }

  async getComuna(idRegion:number){
    return await lastValueFrom(this.http.get<ApiResponse<any>>(environment.apiUrl+'comuna/' + idRegion));
  }
}
