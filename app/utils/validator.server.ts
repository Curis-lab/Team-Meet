export const validateName = (name: string) : string | undefined =>{
   if( ! name.length){
      return `Please enter a value`;
   }
}