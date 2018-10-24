import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  pets = [];
  showPet = { _id: '', name: '', type: '', description: '', skill1: '', skill2: '', skill3: '' };
  deletePet= {_id: '', name: '', type: '', description: '', skill1: '', skill2: '', skill3: '' };
  show: {};
  deleteTask= {_id:'', title: '', description: ''};
  idToView = '';
  params: any;
  pet : any;
  loadEdit = false;
  editPet= {_id: '', name: '', type: '', description: '', skill1: '', skill2: '', skill3: ''};

  ngOnInit() { 
    this._route.params.subscribe((params: Params) => {
    this.idToView = params['id'];
    this.getPet();
  })
  }


  getAllPets() {
    let observable = this._httpService.getAll();
    observable.subscribe(data => {
      console.log("successful route", data);
      for (var pet in data){
      this.pets.push(data[pet])}
      // this.tasks = data;
    })
  }
  goHome() {
    this._router.navigate(['/']);
    this.getPet();
  }

  getPet(){
    let observable = this._httpService.getPet(this.idToView);
    observable.subscribe(data => {
      console.log('got pet: ', data)
      this.showPet = data['pet'];
    })
  }

  showData(pet) {
    console.log(pet);
    this.showPet = pet;
  }
  getOnePet(pet) {    
    this.loadEdit=true;
    this.editPet = {_id: pet._id, name: pet.name, type: pet.type, description: pet.description, skill1: pet.skill1, skill2: pet.skill2, skill3: pet.skill3};
    console.log("Success at get one  pet- edit ")
  }

  onDelete(pet) {  
    this.deletePet = {_id:pet._id, name: pet.name, type: pet.type, description: pet.description, skill1: pet.skill1, skill2: pet.skill2, skill3: pet.skill3};
    let observable = this._httpService.deletePet(this.deletePet);
    observable.subscribe(data => {
      for (var i=0;i< this.pets.length; i++) { //this edits the pets without a refresh by updating the pets array (Defined above)
        if(this.pets[i]['_id'] == this.deletePet._id) {
          this.pets.splice(i,1); //removes array element starting at index i and for 1 value (only that index)
        }
      }
    });
  }
}

