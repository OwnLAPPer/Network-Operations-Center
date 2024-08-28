
export enum LogServerityLevel{
    low    = 'low',
    medium = 'medium',
    high   = 'high',
}
export interface LogEntityOptions{
    level:LogServerityLevel;
    message:string;
    createAt?:Date;
    origin: string;
}
export class LogEntity{
    public level:LogServerityLevel;//enum
    public message:string;
    public createAt:Date;
    public origin: string;

    constructor(options:LogEntityOptions){
        const {level,message,origin,createAt=new Date()}=options;
        this.message=message;
        this.level=level;   
        this.createAt=createAt;
        this.origin=origin;
    }


    //static para que no haya que instanciar la clase para poder llamar al metodo
    //este metodo recibe un string  y devuelve un logentity
    static fromJson=(json:string):LogEntity=>{
        json=(json==='')?'{}':json;
        //al recibir el string lo parsea como un json  y lo desestructura sacando sus atributos
        const {message,level,createAt,origin} = JSON.parse(json);
        //se crea una variable que crea la instancia de logentity y se le pasan los atributos
        const log = new LogEntity({
            message:message,
            level:level,
            createAt:createAt,
            origin:origin,
        });

        // se retorna el log en formato  logentity
        return log;
    }


    static fromObject=( object: { [key:string]: any } ):LogEntity=>{

        const {message,level,origin,createAt}=object;

        const log = new LogEntity({
            message,origin,level,createAt
        });

        return log;
    }
    




}







