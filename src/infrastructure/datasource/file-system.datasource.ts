import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from '../../domain/entities/log.entity';
import fs from 'node:fs';




export class FileSytemDataSource implements LogDataSource{

    private readonly logPath      ='logs/';
    private readonly allLogPath   ='logs/logs-all.log';
    private readonly mediumLogPath='logs/logs-medium.log';
    private readonly highLogPath  ='logs/logs-high.log';

    constructor(){
        this.createLogsFiles();
    }

    // este metodo crea el path si no existe
    private createLogsFiles=()=>{
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        }


       [
        this.allLogPath,
        this.mediumLogPath,
        this.highLogPath,
       ].forEach(path=>{
        if (fs.existsSync(path)) return;

        fs.writeFileSync(path,'');
        
       })
    }

    //este metodo guarda los logs en sus diferentes paths
    // recibe un log de tipo logentity
    async saveLogs(newLog: LogEntity): Promise<void> {

        //seriealiza a json
        const logAsjson=`${JSON.stringify(newLog)}\n`;
        //con appendFileSync se revisa que exista el archivo, si no existe lo crea
        // si existe agrega la informacion en la ultima linea 
        // aqui guardamos todos los logs en este path
        fs.appendFileSync(this.allLogPath,logAsjson);

        //si el nivel del log es low que no haga nada
        if (newLog.level===LogServerityLevel.low) return;

        //si el nivel del log es medio que lo guarde con appendFileSync en su path
        if (newLog.level===LogServerityLevel.medium) {

            fs.appendFileSync(this.mediumLogPath,logAsjson)

            //si no que lo guarde en el otro path de los log level high
        }else{

            fs.appendFileSync(this.highLogPath,logAsjson)
        }
            
    }
 


    //este metodo recibe el path de los logs que quieren obtener
    // y lo que devuelve es un array de tipo logentity
    private getLogsFromFile=(path:string): LogEntity[] =>{

        //se lee el archivo y se guarda en una variable
        const content = fs.readFileSync(path,'utf-8');

        if (content==='') return[];

        //se splitea el contenido que esta en la variable content con cada \n 
        //luego se mapea cada dato del array que devuelve split(son STRINGs)
        const Logs = content.split('\n').map(
            //dentro de map llamamos el metodo static de FromJson y 
             //se le pasa el string para que lo devuelva en  formato logEntity
            log=>LogEntity.fromJson(log)

        );

        // se retorna el array pero ya no es un array de string
        // ahora es un array de logEntity
        return Logs;
    }

    

    //getter de los logs
    // se pide el nivel de los logs que quiere ver y se devuelve un array
    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        
        switch (severityLevel) {
            case LogServerityLevel.low:
                 return this.getLogsFromFile(this.allLogPath);

            case LogServerityLevel.medium:
                 return this.getLogsFromFile(this.mediumLogPath);
                
            case LogServerityLevel.high:
                 return this.getLogsFromFile(this.highLogPath);    
        
            default:
                throw new Error(`${severityLevel}  not implemented`)
        }

    }

}