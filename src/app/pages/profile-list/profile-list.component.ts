import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  profiles: Profile[] = [];

  constructor(
    private profileService: ProfileService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.profileService.getProfiles().subscribe(
      (data: Profile[]) => {
        this.profiles = data;
      },
      (error) => {
        console.error('Error al cargar los perfiles', error);
      }
    );
  }

  deleteProfile(id: number): void {
    this.profileService.deleteProfile(id).subscribe(
      () => {
        this.profiles = this.profiles.filter(profile => profile.id !== id);
        this.alertService.showSuccess();
      },
      (error) => {
        console.error('Error al eliminar el perfil', error);
        this.alertService.showError();
      }
    );
  }
}
