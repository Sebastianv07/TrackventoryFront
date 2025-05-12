import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-role-create-edit',
  templateUrl: './role-create-edit.component.html',
  styleUrls: ['./role-create-edit.component.css']
})
export class RoleCreateEditComponent implements OnInit {

  rol: Rol = {
    id: 0,
    name: ''
  };

  editMode = false;

  constructor(
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.rolService.getRolById(+id).subscribe({
        next: (data: Rol) => {
          this.rol = data;
        },
        error: (err) => {
          console.error('Error al cargar el rol', err);
          this.alertService.showError();
        }
      });
    }
  }

  onSubmit(): void {
    if (this.editMode) {
      this.rolService.updateRol(this.rol.id, this.rol).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/roles']);
        },
        error: (err) => {
          console.error('Error actualizando el rol', err);
          this.alertService.showError();
        }
      });
    } else {
      this.rolService.createRol(this.rol).subscribe({
        next: () => {
          this.alertService.showSuccess();
          this.router.navigate(['/roles']);
        },
        error: (err) => {
          console.error('Error creando el rol', err);
          this.alertService.showError();
        }
      });
    }
  }
}
