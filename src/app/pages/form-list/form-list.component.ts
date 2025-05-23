import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';
import { AlertService } from 'src/app/services/alert.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'translateY(10px)' })
        ),
      ]),
    ]),
  ],
})
export class FormListComponent implements OnInit {
  forms: Form[] = [];

  constructor(
    private formService: FormService,
    private alertService: AlertService
  ) {}

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
        this.forms = this.forms.filter((form) => form.id !== id);
        this.alertService.showSuccess();
      },
      (error) => {
        console.error('Error al eliminar el formulario', error);
        this.alertService.showError();
      }
    );
  }
}
