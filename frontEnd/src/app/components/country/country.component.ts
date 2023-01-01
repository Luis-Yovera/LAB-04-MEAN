import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countries: Country [] = []; /* Se trabajará con un array */

  selectedCountry: Country = new Country ();

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.getCountries() 
  }

  resetForm(form: NgForm) { /* Método que ayuda a dar formato a los datos por ingrsar */
    if(form){
      form.reset()
    }
  }

  addCountry (form: NgForm) {
    if(form.value._id) {/* Si el form existe */
      this.countryService.patchCountry (form.value)
      .subscribe ( res => {
        this.resetForm(form)
      })
    } else {
      this.countryService.postCountry(form.value)
      .subscribe( res => {
        this.resetForm(form)
      })
      this.getCountries() //Para actualizar la lista
    } 
  } 

  getCountries(){
    this.countryService.getCountries()
    .subscribe  ( res =>{
      this.countries = res as Country []
    })
  }

  editCountry (country: Country) {
    this.selectedCountry = country
    console.log ("editando");
  }

  deleteCountry (country: Country) {
    if(confirm('¿Está seguro que quiere borrar este País?')) {
      this.countryService.deleteCountry(country)
      .subscribe (res => {
        this.getCountries()
      })
      console.log ("borrando")
    }
  }

  save(){
    console.log('salavando');
  }

  delete(){
  }
}
