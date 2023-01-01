import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/operators';

import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

readonly URL_API = 'http://localhost:5005/country';

  constructor(private http: HttpClient) { }

  postCountry(data : Country) {  /* Para postear al país. Se agrega (Objeto: Clase) */
    return this.http.post(this.URL_API, data)
  }

  getCountries(){
    return this.http.get(this.URL_API)
  }

  patchCountry(data: Country) {  
    return this.http.patch(this.URL_API+`/${data._id}`, data)
  }

  deleteCountry(data: Country) {  
    return this.http.delete(this.URL_API+`/${data._id}`)
  }
}


