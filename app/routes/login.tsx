import { ActionFunction, json } from "@remix-run/node";
import { useState } from "react";
import { Formfield } from "~/components/form-field";
import {Layout} from "~/components/layout";
import { login, register } from "~/utils/auth.server";
import { validateEmail, validatePassword,  validateName } from "~/utils/validators.server";
import { useActionData } from "@remix-run/react";


export const action: ActionFunction = async({request})=>{
    
    const form = await request.formData()

    const action = form.get("_action");
    const email = form.get("email");
    const password = form.get("password");
    let firstName = form.get("firstName");
    let lastName = form.get("lastName");

    if( 
        typeof action !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ){
        return json({error:`Invalid Form Data`, form: action},{status:400});
    }

    if(
        action === 'register' && (
            typeof firstName !== "string"||
            typeof lastName !== "string"
        )
    ){
        return json({error: `invalid Form Data`, form: action},{status: 400});
    }

    // const errors = {
    //     email: validateEmail(email),
    //     password: validatePassword(password),
    //     ...(action === 'register'? 
    //     { 
    //         firstName: validateName(firstName as string || ''),
    //         lastName: validateName(lastName as string || '')
    //     }:{})
    // }

    // if(Object.values(errors).some(Boolean))
    //     return json({errors, fields: {email, password, firstName, lastName}, form: action},{status: 400})

    console.log(typeof email);
    switch(action){

        case 'Sign In':
            return await login({email, password})
        
        case 'Sign Up':
            firstName = firstName as string;
            lastName = lastName as string;
            return register({email, password, firstName, lastName})
        
        default:
            return json({error:`Invalid Form Data`},{status: 400})
    
        }
}

export default function Login() {

    const actionData = useActionData();

    const[ formError, setFormError] = useState(actionData?.error || '');
    const [action, setAction] = useState('signup');
    const [formData, setFormData] = useState({
        email:'',
        password:'',
        firstName:'',
        secondName:''
    })

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>, field:string)=>{
        //only take one object
        
        setFormData(form=>({
            ...form,
            [field]: e.target.value
        }))
    }

    return (
        <Layout>
            <div className="h-full flex justify-center items-center flex-col gap-y-4">
                <button onClick={e=>setAction(action==='login'? 'signup':'login')} className="absolute top-0 right-0 bg-yellow-300 rounded-md font-semibold text-blue-600 px-3 py-2 hover:bg-yellow-500 hover:translate-y-1">Sign Up</button>
                <h2 className="text-5xl font-extrabold">Welcome to Teams</h2>
                <p className="font-semibold text-slate-300">Log In to Give Some Paraise!</p>
                <form method="post" className="rounded-2xl bg-gray-200 p-6 w-96">
                    <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
                        {formError}
                    </div>
                    <Formfield
                        htmlFor = 'email'
                        label = 'email'
                        type="text"
                        value={formData.email}
                        error=""
                        onChange={e=>handleInputChange(e, 'email')}
                    />
                    <Formfield
                        htmlFor = 'password'
                        label = 'password'
                        type="password"
                        value={formData.password}
                        error=""
                        onChange={e=>handleInputChange(e,'password')}
                    />
                    {
                        action ==='signup'?
                        <>
                            <Formfield
                            htmlFor = 'firstName'
                            label = 'First Name'
                            type="text"
                            value={formData.firstName}
                            error=""
                            onChange={e=>handleInputChange(e,'firstName')}/>  
                            <Formfield
                            htmlFor = 'lastName'
                            label = 'Last Name'
                            type="text"
                            value={formData.secondName}
                            error=""
                            onChange={e=>handleInputChange(e,'secondName')}/>  
                        </>: null
                    }
                    <div className="w-full text-center">
                        <input
                        type="submit"
                        name="_action"
                        className="rounded-xl bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-150 hover:translate-y-2"
                        value={action === 'login'?"Sign In":"Sign Up"}
                        />
                    </div>
                </form>
            </div>
        </Layout>
    );
  }
  