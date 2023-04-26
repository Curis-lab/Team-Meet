import { json, redirect } from "@remix-run/node"
import { db } from "./prisma.server"
import type { Registerform, loginForm } from "./types.server"
import { createUser } from "./users.server"
import bcrypt from 'bcryptjs';

export const register = async(form: Registerform)=>{
    const exist = await db.user.count({where:{email: form.email}})
    if(exist){
        return json(
            {error:'they alerady have an account'},
            {status:404}
        )
    }

    const newUser = await createUser(form)
    
    if(!newUser){
        return json(
            {
            error:'something went worng trying to create a new user.',
            fields:{email: form.email, password: form.password}
            },
            {
                status: 400
            })
    }

    console.log('set success');
    return null;
}

export const login = async (form: loginForm)=>{
    const user = await db.user.findUnique({
        where: {email: form.email},
    })
    if(!user){
        return json({error: `Incorrect login`},{ status: 400})
    }
    return redirect('/home');
} 