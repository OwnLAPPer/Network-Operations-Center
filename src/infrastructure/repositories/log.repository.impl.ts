import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";




export class LogRepositoryImpl implements LogRepository{


    constructor(
        private readonly logDataSource:LogDataSource,
    ){}

    async saveLogs(log: LogEntity): Promise<void> {
        this.logDataSource.saveLogs(log);
    }
    getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel);
    }
    
}