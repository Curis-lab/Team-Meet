interface props{
    options:{
        name: string,
        value: any
    }[],
    className?: string,
    containerClassName?: string,
    id?:string,
    name?:string,
    label?: string,
    value?: any,
    onChange?:(...args: any) => any
}

export function Selectbox({
    options=[],
    label,
    className,
    containerClassName
}:props){
    return (
        <div>
            <label className="text-blue-600 font-semibold">{label}</label>
            <div className={`${className} ${containerClassName} my-2`}>
                <select className={`${className} appearance-none`}>
                    {options.map(o=>(
                        <option key={o.name} value={o.value}>
                            {o.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}