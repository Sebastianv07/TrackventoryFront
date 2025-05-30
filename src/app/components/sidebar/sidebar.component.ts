import { Component, HostListener, OnInit } from '@angular/core';
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

  isCollapsed: boolean = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    const sidebar = document.querySelector('.sidebar');

    if (sidebar) {
      this.isCollapsed
        ? sidebar.classList.add('collapsed')
        : sidebar.classList.remove('collapsed');
    }
  }

  ngOnInit(): void {
    this.loadForms();
  }

  private loadForms(): void {
    this.formService.getForms().subscribe({
      next: (data: Form[]) => {
        this.forms = data;
      },
      error: (err) => {
        console.error('Error cargando los formularios', err);
      },
    });
  }

  closeAllSubmenus(): void {
    const submenus = document.querySelectorAll('.collapse.show');
    submenus.forEach((submenu) => {
      submenu.classList.remove('show');
    });
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const sidebar = document.querySelector('.sidebar');
    const clickedInside = (event.target as HTMLElement).closest('.sidebar');

    if (this.isCollapsed && sidebar && !clickedInside) {
      const collapses = sidebar.querySelectorAll('.collapse.show');
      collapses.forEach((collapse) => {
        collapse.classList.remove('show');
      });
    }
  }
  
}
