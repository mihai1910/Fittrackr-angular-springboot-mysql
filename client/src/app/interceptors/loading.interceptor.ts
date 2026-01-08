import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('HTTP Request started:', req.method, req.url);
  
  return next(req).pipe(
    finalize(() => {
      console.log('HTTP Request completed:', req.method, req.url);
    })
  );
};
