import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CheckoutService } from './../../core/services/checkout/checkout.service';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Icart } from '../../shared/interfaces/icart';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private readonly cartService = inject(CartService)
  private readonly checkoutService = inject(CheckoutService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)
  stripUrl:string = ''
  cartDetails:Icart = {} as Icart;
  cartId:string = ''
  cartProduct:boolean = false
  'shippingAddress':FormGroup = new FormGroup({
    'details': new FormControl(null , [Validators.required , Validators.minLength(10)]),
    'city': new FormControl(null , [Validators.required]) ,
    'phone': new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  })
  ngOnInit(): void {
    this.getCartData();
    this.activatedRoute.paramMap.subscribe({
      next:(res) => {
        this.cartId = res.get('id') as string;
      } 
    })

  }

  getCartData(){

   
      this.cartService.getLoggedUserCart().subscribe({
        next:(res) =>{
          console.log(res.data);
          this.cartDetails = res.data
          }      })
    

  }


  placeOrder(){
    if (this.shippingAddress.invalid ) {
      this.shippingAddress.markAllAsTouched();
    }else if(this.cartDetails.products.length > 0 && this.shippingAddress.valid){
      this.checkoutService.checkOutSession(this.cartId,this.shippingAddress.value).subscribe({
        next:(res) =>{console.log(res); 
          this.stripUrl = res.session.url
          if(res.status === 'success'){
            this.cartService.clearUserCart().subscribe({
              next:(res) =>{console.log(res); this.getCartData();
                open(this.stripUrl,'_self');
                this.router.navigate(['/home'])
                
              }
            })
          }
          
        }
        
      })
    }
    else{
      this.cartProduct = true
    }

    
  }
}
