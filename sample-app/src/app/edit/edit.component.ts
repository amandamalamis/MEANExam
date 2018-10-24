import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editPet = { name: '', type: '', description: '', skill1: '', skill2: '', skill3: '' };
  pets = [];
  error= { name: '', type: '', description: '' };
  loadEdit = false;
  idToEdit = ""
  params: any;
  
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
      this._route.params.subscribe((params: Params) => {
      this.idToEdit = params['id'];
      this.getPet();
    })
  }
  
  goToAll() {
    this._router.navigate(['/pets']);
  }

  getPet(){
    let observable = this._httpService.getPet(this.idToEdit);
    observable.subscribe(data => {
      console.log('got pet: ', data)
      this.editPet= data['pet'];
    })
  }

  onSubmitEdit() {
    let observable = this._httpService.editPet(this.editPet);
    observable.subscribe(data => {
      if (data['errors']){
        this.error = data['errors'];
      }
      else{
        this.goToAll();
        // this._router.navigate(['/home'])
      }
    })
  }

}

