import { ActionFunction, json } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
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

    const errors = {
        email: validateEmail(email),
        password: validatePassword(password),
        ...(action === 'Sign In'? 
        { 
            firstName: validateName(firstName as string || ''),
            lastName: validateName(lastName as string || '')
        }:{})
    }


    //09687914553 sa hai
    if(Object.values(errors).some(Boolean))
        return json({errors, fields: {email, password, firstName, lastName}, form: action},{status: 400})

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
    const[ errors , setErrors] = useState(actionData?.errors || {});
    const firstLoad = useRef(true);
    const [action, setAction] = useState('login');
    
    const [formData, setFormData] = useState({
        email:'',
        password:'',
        firstName:'',
        lastName:''
    })

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>, field:string)=>{
        //only take one object
        
        setFormData(form=>({
            ...form,
            [field]: e.target.value
        }))
    }


    //when action does something
    useEffect(()=>{
        if(!firstLoad.current){
            const newState = {
                email: '',
                password:'',
                firstName:'',
                lastName:''
            }
            setErrors(newState);
            setFormError('');
            setFormData(newState);
        }
    },[action]);

    useEffect(()=>{
        if(!firstLoad.current){
            setFormError('')
        }
    },[formData]);

    return (
        <Layout>
            <div className="h-full flex justify-center items-center flex-col gap-y-4">
                <button onClick={e=>setAction(action==='login'? 'signup':'login')} className="absolute top-0 right-0 bg-yellow-300 rounded-md font-semibold text-blue-600 px-3 py-2 hover:bg-yellow-500 hover:translate-y-1">{action === 'login'?'Sign Out':'Sign In'}</button>
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
                        error={errors.email}
                        onChange={e=>handleInputChange(e, 'email')}
                    />
                    <Formfield
                        htmlFor ='password'
                        label ='password'
                        type="password"
                        value={formData.password}
                        error={errors.password}
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
                            error={errors?.firstName}
                            onChange={e=>handleInputChange(e,'firstName')}/>  
                            <Formfield
                            htmlFor = 'lastName'
                            label = 'Last Name'
                            type="text"
                            value={formData.lastName}
                            error={errors?.lastName}
                            onChange={e=>handleInputChange(e,'lastName')}/>  
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
  