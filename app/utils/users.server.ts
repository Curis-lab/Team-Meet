import {db} from './prisma.server';
import { Registerform } from './types.server';
import bcrypt from 'bcryptjs';

export const createUser = async(user: Registerform)=>{
    const passwordHash = await bcrypt.hash(user.password, 10);
    const newUser = await db.user.create({
        data:{
            email:user.email,
            password: passwordHash,
            profile:{
                firstName: user.firstName,
                lastName: user.lastName
            }
        }
    });
    return {id: newUser.id, email: user.email}
};