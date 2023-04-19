import { useState } from "react"

interface FormfieldProps{
    htmlFor: string,
    label: string,
    type:string,
    value: any,
    onChange?:(...args: any) => any,
    error: string
}

export function Formfield({
    htmlFor,
    label,
    type="text",
    value,
    onChange=()=>{},
    error=""
}:FormfieldProps){

    const [errorText, setErrorText] = useState(error);
    return<>
    <label className="text-blue-600 font-semibold">{label}</label>
    <input onChange={e=>{
        onChange(e)
        setErrorText('')}}
        type={type}
        id={htmlFor}
        name={htmlFor}
        className="w-full p-2 rounded-xl my-2"
        value={value}    
    />
    <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
        {errorText || ""}
    </div>
    </>
}