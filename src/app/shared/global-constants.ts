export class GlobalConstants{
    //message
    public static genericError: string="Something went wrong. Please try again";

    public static unauthorized:string="You are not authorized person to access this page.";

    public static productExistError:string="Poduct alerady exists.";

    public static productAdded:string="Product added successfully.";
    //Regex
    public static nameRegex:string="[a-zA-Z0-9 ]*";
    //Regex
    public static emailRegex:string="[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    //Regex
    public static contactNumberRegex:string="^[e0-9]{10,10}$";
    
    //Variable
    public static error:string ="error";
}
/*
Name [a-zA-Z0-9 ]*

Email [A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}

Contact Number ^[e0-9]{10,10}$
*/