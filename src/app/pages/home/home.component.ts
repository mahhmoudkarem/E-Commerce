import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icategories } from '../../shared/interfaces/icategories';



@Component({
  selector: 'app-home',
  imports: [ ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
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



