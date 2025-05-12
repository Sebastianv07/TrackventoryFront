import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  forms: Form[] = [];

  constructor(
    private formService: FormService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms(): void {
    this.formService.getForms().subscribe(
      (data: Form[]) => {
        this.forms = data;
      },
      (error) => {
        console.error('Error al cargar los formularios', error);
        this.alertService.showError();
      }
    );
  }

  deleteForm(id: number): void {
    this.formService.deleteForm(id).subscribe(
      () => {
        this.forms = this.forms.filter(form => form.id !== id);
        this.alertService.showSuccess();
      },
      (error) => {
        console.error('Error al eliminar el formulario', error);
        this.alertService.showError();
      }
    );
  }
}
