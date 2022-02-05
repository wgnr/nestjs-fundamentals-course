import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('WrapResponseInterceptor Before...');
    return next.handle().pipe(
      tap((data) => console.log('WrapResponseInterceptor After...', data)),
      map((data) => ({ data })),
    );
  }
}
