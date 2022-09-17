import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import {ValidationError} from 'class-validator';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let errorMsgs: string[] = [];

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof HttpException) {
            console.log('========> Error Exception.message : ', exception.message);
            if (Array.isArray(exception.message.message)) {
                const error = exception.message.message;
                for (const err of error) {
                    if (err instanceof ValidationError) {
                        console.log('======> ValidationError: ', err);
                        const property = err.property.toUpperCase();
                        for (const c of Object.values(err.constraints)) {
                            const line = `${property}: ${c}`;
                            errorMsgs.push(line);
                        }
                    }
                }
            } else {
                errorMsgs.push(exception.message.message);
            }
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: errorMsgs.join('\n')
        });
    }
}
