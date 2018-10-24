import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _httpService: HttpService) { }
  pets = [];
  editPet= {_id: '', name: '', type: '', description: '', skill1: '', skill2: '', skill3: ''};
  loadEdit=false;
  show: {};
  deletePet= {_id: '', name: '', type: '', description: '', skill1: '', skill2: '', skill3: ''};

  ngOnInit() {
    this.getAllPets();
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

  showData(pet) {
    console.log(pet);
    this.show = pet;
  }
  getOnePet(pet) {    
    this.loadEdit=true;
    this.editPet = {_id: pet._id, name: pet.name, type: pet.type, description: pet.description, skill1: pet.skill1, skill2: pet.skill2, skill3: pet.skill3};
    console.log("Success at get one  pet- edit ")
  }

  onDelete(pet) {  
    this.deletePet = {_id: pet._id, name: pet.name, type: pet.type, description: pet.description, skill1: pet.skill1, skill2: pet.skill2, skill3: pet.skill3};
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


  // getOneProduct(product) {    
  //   this.loadEdit=true;
  //   this.editProduct={_id: task._id, title: task.title, description: task.description};
  //   console.log("Success at getone task- edit ")
  // }

  // onDelete(task) {  
  //   this.deleteTask = {_id:task._id, title: task.title, description: task.description};
  //   let observable = this._httpService.deleteTask(this.deleteTask);
  //   observable.subscribe(data => {
  //     for (var i=0;i< this.tasks.length; i++) { //this edits the tasks without a refresh by updating the tasks array (Defined above)
  //       if(this.tasks[i]['_id'] == this.deleteTask._id) {
  //         this.tasks.splice(i,1); //removes array element starting at index i and for 1 value (only that index)
  //       }
  //     }

//     });
//   }
// }
// }
