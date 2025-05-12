import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-form-create-edit',
  templateUrl: './form-create-edit.component.html',
  styleUrls: ['./form-create-edit.component.css']
})
export class FormCreateEditComponent implements OnInit {

  form: Form = {
    id: 0 ,
    url: '',
    name: '',
    icon: ''
  };

  editMode = false;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id) {
      this.editMode = true;
      this.formService.getFormById(id).subscribe({
        next: (data: Form) => {
          this.form = data;
        },
        error: (err) => {
          console.error('Error al cargar el formulario', err);
          this.alertService.showError();
        }
      });
    }
  }

  onSubmit(): void {
    if (this.editMode) {
      this.formService.updateForm(this.form.id, this.form).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/forms']);
        },
        error: (err) => {
          console.error('Error actualizando el formulario', err);
          this.alertService.showError();
        }
      });
    } else {
      this.formService.createForm(this.form).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/forms']);
        },
        error: (err) => {
          console.error('Error creando el formulario', err);
          this.alertService.showError();
        }
      });
    }
  }
}
