import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { StoreListComponent } from './pages/store-list/store-list.component';
import { StoreCreateEditComponent } from './pages/store-create-edit/store-create-edit.component';
import { ProductCreateEditComponent } from './pages/product-create-edit/product-create-edit.component';
import { ProductVariationCreateEditComponent } from './pages/product-variation-create-edit/product-variation-create-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StockCreateEditComponent } from './pages/stock-create-edit/stock-create-edit.component';
import { SaleListComponent } from './pages/sale-list/sale-list.component';
import { SaleCreateEditComponent } from './pages/sale-create-edit/sale-create-edit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryCreateEditComponent } from './pages/category-create-edit/category-create-edit.component';
import { ColorListComponent } from './pages/color-list/color-list.component';
import { ColorCreateEditComponent } from './pages/color-create-edit/color-create-edit.component'; 
import { MatMenuModule } from '@angular/material/menu';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleCreateEditComponent } from './pages/role-create-edit/role-create-edit.component';
import { FormListComponent } from './pages/form-list/form-list.component';
import { FormCreateEditComponent } from './pages/form-create-edit/form-create-edit.component';
import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { ProfileCreateEditComponent } from './pages/profile-create-edit/profile-create-edit.component';
import { TransactionTypesListComponent } from './pages/transaction-types-list/transaction-types-list.component';
import { TransactionTypeCreateEditComponent } from './pages/transaction-types-create-edit/transaction-types-create-edit.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    ProductListComponent,
    StoreListComponent,
    StoreCreateEditComponent,
    ProductCreateEditComponent,
    ProductVariationCreateEditComponent,
    StockCreateEditComponent,
    SaleListComponent,
    SaleCreateEditComponent,
    CategoryListComponent,
    CategoryCreateEditComponent,
    ColorListComponent,
    ColorCreateEditComponent,
    RoleListComponent,
    RoleCreateEditComponent,
    FormListComponent,
    FormCreateEditComponent,
    ProfileListComponent,
    ProfileCreateEditComponent,
    TransactionTypesListComponent,
    TransactionTypeCreateEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule, 
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatMenuModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
