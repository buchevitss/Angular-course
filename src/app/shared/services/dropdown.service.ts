import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
    // return this.http.get('assets/dados/estadosbr.json').pipe(
    // map((res: any) =>  res.json())); 
  }

  getCargos(){
    return [
      {nome: 'Dev', nivel:'Jr', desc:'Dev Jr'},
      {nome: 'Dev', nivel:'Pleno', desc:'Dev Pleno'},
      {nome: 'Dev', nivel:'Senior', desc:'Dev Sr'}

    ]
  }

  getTecnologias() {
    return [
      { nome: 'java', desc: 'Java' },
      { nome: 'javascript', desc: 'JavaScript' },
      { nome: 'php', desc: 'PHP' },
      { nome: 'ruby', desc: 'Ruby' }
    ];
  }

  getNewsletter() {
    return [
      { valor: 's', desc: 'Sim' },
      { valor: 'n', desc: 'Não' }
    ];
  }
}
