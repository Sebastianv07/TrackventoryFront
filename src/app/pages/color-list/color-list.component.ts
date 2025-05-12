import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/colors.service';
import { Color } from 'src/app/models/color';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colors: Color[] = [];

  constructor(
    private colorService: ColorService,
    private alertService: AlertService
  ) { }

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
        this.colors = this.colors.filter(color => color.id !== id);
        this.alertService.showSuccess();
      },
      (error) => {
        console.error('Error al eliminar el color', error);
        this.alertService.showError();
      }
    );
  }
}
