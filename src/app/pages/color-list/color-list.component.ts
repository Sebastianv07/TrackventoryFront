import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/colors.service';
import { Color } from 'src/app/models/color';
import { AlertService } from 'src/app/services/alert.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css'],
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
export class ColorListComponent implements OnInit {
  colors: Color[] = [];

  constructor(
    private colorService: ColorService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadColors();
  }

  loadColors(): void {
    this.colorService.getColors().subscribe(
      (data: Color[]) => {
        this.colors = data;
      },
      (error) => {
        console.error('Error al cargar los colores', error);
      }
    );
  }

  deleteColor(id: number): void {
    this.colorService.deleteColor(id).subscribe(
      () => {
        this.colors = this.colors.filter((color) => color.id !== id);
        this.alertService.showSuccess();
      },
      (error) => {
        console.error('Error al eliminar el color', error);
        this.alertService.showError();
      }
    );
  }
}
