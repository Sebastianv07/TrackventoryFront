import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorService } from 'src/app/services/colors.service';
import { Color } from 'src/app/models/color';
import { AlertService } from 'src/app/services/alert.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-color-create-edit',
  templateUrl: './color-create-edit.component.html',
  styleUrls: ['./color-create-edit.component.css'],
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
export class ColorCreateEditComponent implements OnInit {
  color: Color = {
    id: 0,
    name: '',
    hexCode: '#ffffff',
  };

  editMode = false;

  constructor(
    private colorService: ColorService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id !== null && !isNaN(id)) {
      this.editMode = true;
      this.colorService.getColorById(id).subscribe({
        next: (data: Color) => {
          this.color = data;
        },
        error: (err) => {
          console.error('Error al cargar el color', err);
          this.alertService.showError();
        },
      });
    }
  }

  onSubmit(): void {
    if (this.editMode) {
      this.colorService.updateColor(this.color.id, this.color).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/colors']);
        },
        error: (err) => {
          console.error('Error actualizando el color', err);
          this.alertService.showError();
        },
      });
    } else {
      this.colorService.createColor(this.color).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/colors']);
        },
        error: (err) => {
          console.error('Error creando el color', err);
          this.alertService.showError();
        },
      });
    }
  }
}
