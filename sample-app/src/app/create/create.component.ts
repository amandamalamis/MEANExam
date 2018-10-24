import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newPet = { name: '', type: '', description: '', skill1: '', skill2: '', skill3: '' };
  pets = [];
  error= { name: '', type: '', description: ''};
  message = '';

  constructor(private _httpService: HttpService, private _router: Router) { }
  ngOnInit() {
  }
  goHome(){
    this._router.navigate(['/']);
  }
  goToAll(){
    this._router.navigate(['/pets']);
  
  }
  onSubmitAdd(){
    let observable = this._httpService.addPet(this.newPet);
    observable.subscribe(data => { 
      if (data['errors']){
        this.error = data['errors']
      }
      else{
        this.goHome();
      }
    })
  }  
}

