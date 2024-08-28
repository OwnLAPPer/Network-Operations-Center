

// sirve para obligar el comportamiento sobre otras clases

import { LogEntity, LogServerityLevel } from "../entities/log.entity";

//
export abstract class LogDataSource{

    abstract saveLogs(log:LogEntity):Promise<void>;
    abstract getLogs(severityLevel:LogServerityLevel):Promise<LogEntity[]>;
    
}