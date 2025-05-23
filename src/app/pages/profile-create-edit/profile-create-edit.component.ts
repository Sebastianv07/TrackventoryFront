import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';
import { AlertService } from 'src/app/services/alert.service';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol';
import { PermissionService } from 'src/app/services/permission.service';
import { FormService } from 'src/app/services/form.service';
import { Permission } from 'src/app/models/permission';
import { Form } from 'src/app/models/form';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-profile-create-edit',
  templateUrl: './profile-create-edit.component.html',
  styleUrls: ['./profile-create-edit.component.css'],
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
export class ProfileCreateEditComponent implements OnInit {
  profile: Profile = {
    id: 0,
    name: '',
    rol_prf: { id: 0, name: '' },
  };

  roles: Rol[] = [];
  forms: Form[] = [];
  // Trabajaremos con un array de permisos en lugar de un objeto indexado
  permissionsList: Permission[] = [];
  editMode = false;

  constructor(
    private profileService: ProfileService,
    private rolService: RolService,
    private permissionService: PermissionService,
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.profileService.getProfileById(+id).subscribe({
        next: (data: Profile) => {
          this.profile = data;
          // Primero cargamos los permisos existentes
          this.permissionService
            .getPermissionsByProfile(this.profile.id)
            .subscribe({
              next: (existingPermissions) => {
                // Guardamos los permisos existentes en la lista
                this.permissionsList = existingPermissions;
                // Después cargamos los formularios y unimos ambos
                this.loadForms(true);
              },
              error: (err) => {
                console.error('Error al cargar permisos', err);
                this.alertService.showError();
              },
            });
        },
        error: (err) => {
          console.error('Error al cargar el perfil', err);
          this.alertService.showError();
        },
      });
    } else {
      // Modo creación: solo cargamos formularios y creamos permisos vacíos
      this.loadForms(false);
    }
  }

  loadRoles(): void {
    this.rolService.getRoles().subscribe({
      next: (roles) => (this.roles = roles),
      error: (err) => {
        console.error('Error al cargar los roles', err);
        this.alertService.showError();
      },
    });
  }

  loadForms(mergePermissions: boolean): void {
    this.formService.getForms().subscribe({
      next: (forms) => {
        this.forms = forms;
        if (mergePermissions) {
          // Fusionar permisos existentes con los formularios
          this.mergePermissions();
        } else {
          // Modo creación: inicializamos permisos vacíos
          this.initializeEmptyPermissions();
        }
      },
      error: (err) => {
        console.error('Error al cargar los formularios', err);
        this.alertService.showError();
      },
    });
  }

  // Si es un nuevo perfil, creamos permisos vacíos para cada formulario
  initializeEmptyPermissions(): void {
    this.forms.forEach((form) => {
      this.permissionsList.push({
        profilePms: this.profile,
        form_pms: { ...form }, // Copiamos todos los datos del form
        C: false,
        R: false,
        U: false,
        D: false,
      });
    });
  }

  // Si es un perfil existente, fusionamos los permisos que ya existen con los formularios
  mergePermissions(): void {
    // 1. Para cada formulario, verifica si existe un permiso
    this.forms.forEach((form) => {
      const existingPermission = this.permissionsList.find(
        (perm) => perm.form_pms.id === form.id
      );
      // 2. Si no existe, creamos un permiso vacío
      if (!existingPermission) {
        this.permissionsList.push({
          profilePms: this.profile,
          form_pms: { ...form },
          C: false,
          R: false,
          U: false,
          D: false,
        });
      }
    });

    // (Opcional) Ordenar la lista por nombre de formulario para una vista coherente
    this.permissionsList.sort((a, b) =>
      a.form_pms.name.localeCompare(b.form_pms.name)
    );
  }

  // Toggle para checkboxes
  togglePermission(permission: Permission, field: 'C' | 'R' | 'U' | 'D'): void {
    permission[field] = !permission[field];
  }

  onSubmit(): void {
    if (this.editMode) {
      this.profileService
        .updateProfile(this.profile.id, this.profile)
        .subscribe({
          next: () => {
            this.savePermissions();
            this.alertService.showSuccess();
            this.router.navigate(['/profiles']);
          },
          error: (err) => {
            console.error('Error actualizando el perfil', err);
            this.alertService.showError();
          },
        });
    } else {
      this.profileService.createProfile(this.profile).subscribe({
        next: (newProfile) => {
          if (newProfile && newProfile.id) {
            this.profile.id = newProfile.id;
          }
          this.savePermissions();
          this.alertService.showSuccess();
          this.router.navigate(['/profiles']);
        },
        error: (err) => {
          console.error('Error creando el perfil', err);
          this.alertService.showError();
        },
      });
    }
  }

  savePermissions(): void {
    // Enviar cada permiso al backend
    this.permissionsList.forEach((perm) => {
      perm.profilePms = this.profile; // Aseguramos que tenga el perfil correcto
      this.permissionService.createPermission(perm).subscribe({
        error: (err) => console.error('Error guardando permiso', err),
      });
    });
  }
}
