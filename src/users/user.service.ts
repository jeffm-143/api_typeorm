import bcrypt from 'bcryptjs';
import { AppDataSource } from '../_helpers/db';
import { User } from './user';
import { classToPlain } from "class-transformer";

export class UserService {
    async getAll() {
        const users = await AppDataSource.getRepository(User).find();
        return classToPlain(users);
    }

    async getById(id: number) {
        const user = await AppDataSource.getRepository(User).findOneBy({ id });
        return user ? classToPlain(user) : null;
    }

    async create(params: any) {
        const userRepository = AppDataSource.getRepository(User);
    
        if (await userRepository.findOneBy({ email: params.email })) {
            throw 'Email is already registered';
        }
    
        if (!params.password) {
            throw 'Password is required';
        }
    
        const user = new User();
        Object.assign(user, {
            email: params.email,
            title: params.title,
            firstName: params.firstName,
            lastName: params.lastName,
            role: params.role,
            passwordHash: await bcrypt.hash(params.password, 10)
        });
    
        await userRepository.save(user);
    }
    
    async update(id: number, params: any) {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id });
        if (!user) throw 'User not found';

        // Only update password if provided
        if (params.password) {
            params.passwordHash = await bcrypt.hash(params.password, 10);
            delete params.password;
        }

        Object.assign(user, params);
        await userRepository.save(user);
    }

    async delete(id: number) {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id });
        if (!user) throw 'User not found';
        await userRepository.remove(user);
    }
}
