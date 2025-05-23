import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol';
import { AlertService } from 'src/app/services/alert.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
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
export class RoleListComponent implements OnInit {
  roles: Rol[] = [];

  constructor(
    private rolService: RolService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.rolService.getRoles().subscribe(
      (data: Rol[]) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al cargar los roles', error);
        this.alertService.showError();
      }
    );
  }

  deleteRole(id: number): void {
    this.rolService.deleteRol(id).subscribe(
      () => {
        this.roles = this.roles.filter((role) => role.id !== id);
        this.alertService.showSuccess();
      },
      (error) => {
        console.error('Error al eliminar el rol', error);
        this.alertService.showError();
      }
    );
  }
}
