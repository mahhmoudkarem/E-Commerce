import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router:Router = inject(Router)
  const authService:AuthService = inject(AuthService)
  const token = localStorage.getItem('token')
  try {

  } catch (error) {
    
  }
  return true;
};
