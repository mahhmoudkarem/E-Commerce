import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
    {path:'' , redirectTo:'home' ,pathMatch:'full'},
    {
        path:'',
        component:AuthLayoutComponent,
        children:[
            {path:'login' , component:LoginComponent , title:'Login'},
            {path:'register' ,component:RegisterComponent , title:'Register'}
        ]
    },
    {
        path:'',
        component:MainLayoutComponent,
        children:[
            {path:'home' , component:HomeComponent , title:'Home'},
            {path:'cart' , component:CartComponent , title:'Cart'},
            {path:'products' , component:ProductsComponent , title:'Products'},
            {path:'brands' , component:BrandsComponent , title:'Brands'},
            {path:'category' , component:CategoriesComponent , title:'Categories'},
            {path:'checkout' , component:CheckoutComponent , title:'Checkout'},
            {path:'**' , component:NotfoundComponent , title:'Not Found'}
        ]
    }    
];
