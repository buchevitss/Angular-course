import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  verificarEmail(email: string)  {
    return this.httpClient.get('/assets/dados/verificarEmail.json').pipe(
      map((dados: {emails: any[]}) => dados.emails),
      //tap(console.log),
      map((dados: {email: string}[])=> dados.filter(v=> v.email === email)),
      //tap(console.log),
      map((dados:any[]) => dados.length > 0),
      //tap(console.log),
  )
  }
  
}