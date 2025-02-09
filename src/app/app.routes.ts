import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

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
            {path:'home' , loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent) , title:'Home'},
            {path:'cart' , loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent) , title:'Cart'},
            {path:'products' , loadComponent:()=>import('./pages/products/products.component').then((c)=>c.ProductsComponent) , title:'Products'},
            {path:'brands' , loadComponent:()=>import('./pages/brands/brands.component').then((c)=>c.BrandsComponent) , title:'Brands'},
            {path:'category' , loadComponent:()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent) , title:'Categories'},
            {path:'checkout' , loadComponent:()=>import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent) , title:'Checkout'},
            {path:'**' , loadComponent:()=>import('./pages/notfound/notfound.component').then((c)=>c.NotfoundComponent) , title:'Not Found'}
        ]
    }    
];
