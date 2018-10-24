import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
//   providedIn: 'root'
export class HttpService {
  constructor(private _http: HttpClient) {
    console.log("Entered http service file");
  }
  getPet(id) {
    return this._http.get('/pets/' + id);
  }

  getAllPets() {
    return this._http.get('/pets');
  }
  
  getAll() {
    return this._http.get('/pets');
  }


  getOnePet(_id){
    // return this._http.get(`/${_id}`);
    return this._http.get(`/pets/${_id}`);

  }

  onButtonClick(pets): void {
    console.log(`Click event is working with event: ${pets}`);
  }

  addPet(newPet){
    return this._http.post('/pets/new', newPet);
  }

  editPet(editPet) {
    return this._http.put(`/pets/${editPet._id}/edit`, editPet);
  }
  deletePet(_id){
  return this._http.delete(`/pets/${_id}`);
  }
  
  removePet(_id){
    return this._http.delete(`/pets/${_id}`);
  }

}





// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpService {

//   constructor(private _http: HttpClient) { }

//   getAuthors() {
//     return this._http.get('/authors');
//   }

//   // createAuthor(data) {
//   //   return this._http.post('/authors', data);
//   // }

//   onButtonClick(tasks): void {
//     console.log(`Click event is working with event: ${tasks}`);
//   }


//   getAuthor(id) {
//     return this._http.get(`/authors/${id}`);
//   }

//   editAuthor(id, data) {
//     return this._http.put(`/authors/${id}`, data);
//   }

//   deleteAuthor(id) {
//     return this._http.delete(`/authors/${id}`);
//   }
  
// }

