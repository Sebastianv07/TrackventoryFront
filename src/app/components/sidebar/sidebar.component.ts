import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { Form } from 'src/app/models/form';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  forms: Form[] = [];

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.loadForms();
  }

  private loadForms(): void {
    this.formService.getForms().subscribe({
      next: (data: Form[]) => {
        console.log('data cruda', data);
        this.forms = data; 
        console.log('Formularios agrupados:', this.forms);
      },
      error: (err) => {
        console.error('Error cargando los formularios', err);
      },
    });
  }
}
