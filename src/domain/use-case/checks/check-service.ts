import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface checkServiceUseCase{
    execute(url:string):Promise<boolean>;
}


type SuccessCallback=()=> void;
type ErrorCallBack=(error:string)=> void;





//servicio para saber si algun url sirve o no y manda errores
export class CheckService implements checkServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback:SuccessCallback,
        private readonly errorCallback:ErrorCallBack
    ){

    }

    //pido un url para revisar m,i servicio y 
    //me tiene que devolver un booleando
    public async execute(url:string):Promise<boolean>{
    
        try {
            const req=await fetch(url);
            if (!req.ok) {
                throw new Error ( `error check service ${url}`);
            }

            const log = new LogEntity({  
                message:`service ${url} working `,
                level:LogServerityLevel.low,
                origin:'check-service.ts'});

            this.logRepository.saveLogs(log)

            this.successCallback();

            return true;
        } catch (error) {
            const errorString = `${error}`
            
            const log = new LogEntity({ 
                message:`service ${url} is NOT OK ${errorString}`,
                level:LogServerityLevel.high,
                origin:'check-service.ts'
            });

            this.logRepository.saveLogs(log);

            this.errorCallback(`${errorString}`);

            return false;
        }


       
    }
}