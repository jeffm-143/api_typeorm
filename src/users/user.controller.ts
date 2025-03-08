import { Router, Request, Response, NextFunction } from 'express';
import { UserService } from '../users/user.service';
import { validateRequest } from '../_middleware/validate-request';
import { Role } from '../_helpers/role';
import Joi from 'joi';

const router = Router();
const userService = new UserService();


interface UserDTO {
    title?: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const createUserSchema = Joi.object<UserDTO>({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid(Role.Admin, Role.User).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(), 
    confirmPassword: Joi.string().valid(Joi.ref('password')).optional(),
});

const updateUserSchema = Joi.object<UserDTO>({
    title: Joi.string().optional(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    role: Joi.string().valid(Role.Admin, Role.User).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).optional(),
}).with('password', 'confirmPassword');

// Routes
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.json(await userService.getAll());
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);
        res.json(await userService.getById(id));
    } catch (err) {
        next(err);
    }
});

router.post('/', validateRequest(createUserSchema), async (req: Request<{}, {}, UserDTO>, res: Response, next: NextFunction): 
Promise<void> => {
    try {
        await userService.create(req.body);
        res.json({ message: 'User created successfully' });
    } catch (err) {
        next(err);
    }
});

router.put('/:id', validateRequest(updateUserSchema), async (req: Request<{ id: string }, {}, UserDTO>, res: Response, next: NextFunction): 
Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);
        await userService.update(id, req.body);
        res.json({ message: 'User updated' });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);
        await userService.delete(id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        next(err);
    }
});

export default router;
