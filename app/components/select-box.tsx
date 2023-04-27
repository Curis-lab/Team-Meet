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
    return <div>hello</div>
}