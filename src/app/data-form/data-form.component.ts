import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { distinctUntilChanged } from 'rxjs-compat/operator/distinctUntilChanged';
import { empty, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  estados: EstadoBr[] = [];
  cidades: string[] = [''];
  cargos: any[] = [''];
  tecnologias: any[] = [''];
  newsletterOp: any [] = [''];
  frameworks = ['angular', 'react', 'js'];

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, 
    private dropDownService: DropdownService,
    private consultaCepService: ConsultaCepService) { }

  ngOnInit(): void {

    // this.estados = this.dropDownService.getEstadosBr();

    this.dropDownService.getEstadosBr().
    subscribe(dados => {this.estados = dados; console.log(dados, this.estados, 'ENTROU NO SUBSCRIBE')})
    
    this.cargos = this.dropDownService.getCargos();
    this.tecnologias = this.dropDownService.getTecnologias();
    this.newsletterOp = this.dropDownService.getNewsletter();

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required,  Validators.minLength(3)]],
      email: [null,[Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero:[null, Validators.required],
        complemento:[],
        rua:[null, Validators.required],
        bairro:[null, Validators.required],
        cidade:[null, Validators.required],
        estado:[null, Validators.required],
      }), 
      cargo: [null],
      tecnologias: [null],
      newsletter:['s'],
      termos:[null, Validators.pattern('true')],
      frameworks: [this.buildFrameworks()]
     
    })

    this.formulario.get('endereco.cep')?.statusChanges.pipe(
    tap(value => console.log('status cep', value)),
      switchMap(status => status === 'VALID' ?
      this.consultaCepService.consultaCEP(this.formulario.get('endereco.cep')?.value)
      : empty()
    )
  )
  .subscribe(dados => dados ? this.populaDadosForm(dados) : {});
    
  }

  getFrameworksControls(){
    return null;
  }

  onSubimit(){
    if(this.formulario.valid){
      console.log(this.formulario.value);
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        // .map(res =>  res)
        .subscribe(dados => console.log(dados));
    }
    else {
      console.log('&&&&&&&&&&form invalido&&&&&&&&');
      this.verificaValidacoesForm(this.formulario)

    }
  }

  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));
    
    // return this.formBuilder.array(values);
    return [
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]
  }
  consultaCEP(){
    let cep = this.formulario.get('endereco.cep')?.value;
    if( cep != null && cep !== '') {
      this.consultaCepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados))
    }
  }


  populaDadosForm(dados: any) {
    // this.formulario.setValue({});

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    // console.log(form);
  }

  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(this.formulario.controls).forEach(campo => {
      console.log(campo)
      const controle = this.formulario.get(campo);
      controle?.markAsTouched();
      if(controle instanceof FormGroup)  {
        this.verificaValidacoesForm(controle)
      }
    })
  }

  setarCargo(){
    const cargo = {nome: 'Dev', nivel:'Pleno', desc:'Dev Pleno'}
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome) : obj1 === obj2;

  }
  verificaValidTouched(campo: any){
    return this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched
  }

  aplicaCssErro(campo: string){
    return {
      'has-error' : this.verificaValidTouched(campo),
      'has-feedback' : this.verificaValidTouched(campo)
    }
  }

}
