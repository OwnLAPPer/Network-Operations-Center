


import { LogEntity, LogServerityLevel } from "../entities/log.entity";

//
export abstract class LogRepository{
    
    abstract saveLogs(log:LogEntity):Promise<void>;
    abstract getLogs(severityLevel:LogServerityLevel):Promise<LogEntity[]>;
    
}