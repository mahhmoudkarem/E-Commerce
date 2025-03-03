import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icategories } from '../../shared/interfaces/icategories';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-home',
  imports: [ RouterLink , SearchPipe , FormsModule , TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  search:string = '';
  products:Iproduct[] = [];
  categories:Icategories[] = [];
  wishListData:string[] = [];
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
    this.wishlistService.getAllWishList().subscribe(res=>{
      this.wishListData = res.data.map((item:any)=>item._id)
    })
    
  }


  getAllProducts(){
    
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products = res.data
        
      }
      
    })
  }

  getAllCategories(){
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories = res.data
        
        
      }
    })
  }


  addToCart(id:string){
    this.cartService.addToCart(id).subscribe({
      next:res=>{
        this.toastrService.success( res.message , 'Exclusive');
        this.cartService.cartNumber.set(res.numOfCartItems)

        
        
      }
    })

  }

  addProductToWishList(id:string){

    this.wishlistService.addProductToWishList(id).subscribe({
      next:res=>{
        
        
          this.toastrService.success( res.message , 'Exclusive');
          this.wishlistService.wishListCount.set(res.data.length);
          localStorage.setItem('red','text-red-500');
          this.wishListData = res.data


          

          
        
      }
      
    })
    
  }



  removeproductFromWishList(id:string):void{
    this.wishlistService.removeProductFromWishList(id).subscribe(res=>{ 
      this.toastrService.success( res.message , 'Exclusive');
      this.wishListData = res.data
    })
  }





}



