import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessResponseDto } from '../dto/response.dto';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, SuccessResponseDto<T>> {
  constructor(private readonly message: string = 'Operation successful') {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<SuccessResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        // If the data is already a SuccessResponseDto, return it as is
        if (data && typeof data === 'object' && 'success' in data && 'message' in data && 'data' in data) {
          return data as SuccessResponseDto<T>;
        }
        
        // Otherwise, wrap it in a SuccessResponseDto
        return new SuccessResponseDto(this.message, data);
      }),
    );
  }
}
