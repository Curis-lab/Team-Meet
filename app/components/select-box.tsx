interface props{
    options:{
        name: string,
        value: any
    }[],
    className?: string,
    containerClassName?: string,
    id?: string,
    name?: string,
    label?: string,
    value?: any,
    onChange?:(...args: any)=> any
}

export function Selectbox({
    options=[],
    onChange = ()=>{},
    className = "",
    containerClassName = "",
    name,
    id,
    value,
    label,    
}:props){
    return(
    <div>
        <label htmlFor={id} className="text-blue-600 font-semibold">{label}</label>
        <div className={`flex items-center ${containerClassName} my-2`}>
            <select 
            className={`${className} appearance-none`}
            id={id}
            name={name}
            value={value || ''}
            onChange={onChange}>
                {
                    options.map(option=>(
                        <option key={option.name} value={option.value}>
                            {option.name}
                        </option>
                    ))
                }
            </select>
        </div>
    </div>)
}