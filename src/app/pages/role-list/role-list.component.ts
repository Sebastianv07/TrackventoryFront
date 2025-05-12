import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles: Rol[] = [];

  constructor(
    private rolService: RolService,
    private alertService: AlertService
  ) { }

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
        this.roles = this.roles.filter(role => role.id !== id);
        this.alertService.showSuccess();
      },
      (error) => {
        console.error('Error al eliminar el rol', error);
        this.alertService.showError();
      }
    );
  }
}
