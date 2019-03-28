import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

type FormGroupStyle = {
  title: string,
  formName: string,
  arrayForm: Array<FormControlStyle[]>,
}

type FormControlStyle = {
  id: number,
  controlName: string,
  placeholder?: string,
  col?: string,
  label: string,
  class: string,
  break: boolean,
  disable: boolean,
  keyup?: (...args: any) => void,
  focus?: (...args: any) => void,
  focusout?: (...args: any) => void,
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // Grupo pai onde seus controls são os grupos de formulários da tela
  public fatherGroup: FormGroup;

  // Formulários de cada campo na tela
  public formGroup1: FormGroup;
  public formGroup2: FormGroup;

  public id: number = -1;

  public arrayForm1: Array<FormControlStyle[]> = [
    [
      { id: this.sumId(), controlName: 'cpf', label: 'cpf', placeholder: '000.000.000-00', class: 'one', col: 'col-2', break: false,
        keyup: () => this.func1(), disable: true },
      { id: this.sumId(), controlName: 'name', label: 'nome', class: 'two', break: true,
        focus: () => this.func1(), disable: true },
    ],
    [
      { id: this.sumId(), controlName: 'nickname', label: 'sobrenome', class: 'two', break: false,
        focusout: () => this.func1(), disable: true }
    ]
  ];
  public arrayForm2: Array<FormControlStyle[]> = [
    [
      { id: this.sumId(), controlName: 'cnpj', label: 'cnpj', placeholder: '00.000.000/0000-00',
        class: 'three', break: true, disable: true },
      { id: this.sumId(), controlName: 'name', label: 'nome', class: 'three', break: false, disable: true },
    ], [
      { id: this.sumId(), controlName: 'nickname', label: 'sobrenome', class: 'three', break: false, disable: true },
      { id: this.sumId(), controlName: 'field', label: 'campo', class: 'one', break: false, disable: true },
    ]
  ];

  public arrays: FormGroupStyle[] = [
    { arrayForm: this.arrayForm1, formName: 'formGroup1', title: 'Sobre o cliente' }, 
    { arrayForm: this.arrayForm2, formName: 'formGroup2', title: 'Dados para contato' }
  ];

  get cpf(): AbstractControl {
    return this.fatherGroup.get('formGroup1').get('cpf');
  }
  get nomeGroup1(): AbstractControl {
    return this.fatherGroup.get('formGroup1').get('name');
  }
  get sobrenomeGroup1(): AbstractControl {
    return this.fatherGroup.get('formGroup1').get('nickname');
  }

  get cnpj(): AbstractControl {
    return this.fatherGroup.get('formGroup2').get('cnpj');
  }
  get nomeGroup2(): AbstractControl {
    return this.fatherGroup.get('formGroup2').get('name');
  }
  get sobrenomeGroup2(): AbstractControl {
    return this.fatherGroup.get('formGroup2').get('nickname');
  }
  get campo(): AbstractControl {
    return this.fatherGroup.get('formGroup2').get('field');
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.fatherGroup = this.formBuilder.group({
      formGroup1: this.formBuilder.group({
        cpf: [''],
        name: [''],
        nickname: ['']
      }),
      formGroup2: this.formBuilder.group({
        cnpj: [''],
        name: [''],
        nickname: [''],
        field: ['']
      })
    });
  }

  public sumId(): number {
    this.id++;
    return this.id;
  }

  func1() {
    console.log('entrando');
  }

  submit() {
    console.log('submitted');
  }
}
