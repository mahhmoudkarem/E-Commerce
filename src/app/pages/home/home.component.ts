import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icategories } from '../../shared/interfaces/icategories';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [ RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);
  products:Iproduct[] = [];
  categories:Icategories[] = [];
  iconCategory:string[] = [
    'fa-solid fa-headphones',
    'fa-solid fa-person',
    'fa-solid fa-person-dress',
    'fa-solid fa-shop',
    'fa-solid fa-baby-carriage',
    'fa-solid fa-house'
  ]



  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    console.log(this.categories);
    
  }


  getAllProducts(){
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products = res.data
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getAllCategories(){
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories = res.data
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }



}



