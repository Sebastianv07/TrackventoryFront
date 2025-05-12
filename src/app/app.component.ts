import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Trackventory';
  showNavbar = true;
  constructor(private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showNavbar = this.router.url !== '/login' && this.router.url !== '/signup';
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadScript('assets/js/sb-admin-2.js');
    }, 100);
  }

  private loadScript(scriptUrl: string) {
    const script = this.renderer.createElement('script');
    script.src = scriptUrl;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.onload = () => console.log(`Script cargado: ${scriptUrl}`);
    document.body.appendChild(script);
  }
}
