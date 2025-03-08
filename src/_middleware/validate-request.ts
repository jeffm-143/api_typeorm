import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

function validateRequest(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false, allowUnknown: true, stripUnknown: true });
        if (error) {
            return next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        }
        req.body = value;
        next();
    };
}

export { validateRequest };