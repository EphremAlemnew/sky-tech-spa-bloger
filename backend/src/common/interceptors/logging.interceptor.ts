import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpCtx = context.switchToHttp();
    const request: Request = httpCtx.getRequest();

    const { method, url, body, headers, ip } = request;
    const userAgent = headers['user-agent'];
    const now = Date.now();

    const safeBody = { ...body };
    if ('password' in safeBody) {
      safeBody.password = '[REDACTED]';
    }

    return next.handle().pipe(
      tap(() => {
        const delay = Date.now() - now;
        this.logger.log(
          `[${method}] ${url} - ${delay}ms\n` +
            `IP: ${ip}\n` +
            `User-Agent: ${userAgent}\n` +
            `Body: ${JSON.stringify(safeBody)}`,
        );
      }),
      catchError((error) => {
        const delay = Date.now() - now;
        this.logger.error(
          `[${method}] ${url} - ${delay}ms\n` +
            `IP: ${ip}\n` +
            `User-Agent: ${userAgent}\n` +
            `Body: ${JSON.stringify(safeBody)}\n` +
            `Error: ${error.message || error}`,
        );
        return throwError(() => error);
      }),
    );
  }
}
