import { createCookieSessionStorage, json, redirect } from "@remix-run/node"
import { db } from "./prisma.server"
import type { Registerform, loginForm } from "./types.server"
import { createUser } from "./users.server"

const secret = process.env.SESSION_SECRET;

if(!secret){
    throw new Error("SESSION_SECRET is not set");
}

const storage = createCookieSessionStorage({
    cookie:{
        name: "kudos-session",
        secure: process.env.NODE_ENV === "production",
        secrets: [secret],
        sameSite: "lax",
        path: "/",
        maxAge: 60*60*60*24*30,
        httpOnly: true
    },
});

export const register = async(form: Registerform)=>{

    const exist = await db.user.count({where:{email: form.email}})
    if(exist){
        return json(
            {error:'they alerady have an account'},
            {status:404}
        )
    }

    //return {id, email}
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

    //impliment for cookies
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