import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";




const prismaClient = new PrismaClient();

const severityEnum={
    low: SeverityLevel.LOW,
    high: SeverityLevel.HIGH,
    medium: SeverityLevel.MEDIUM
}
export  class PostgresLogDataSource implements LogDataSource{


    async saveLogs(log: LogEntity): Promise<void> {
        
        const  level = severityEnum[log.level];

        const newLog= await prismaClient.logModel.create({
            data:{
                ...log,
                level:level
            }
        });

        //console.log('postgres saved')
    }
    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
       

        const level = severityEnum[severityLevel];
        const  dbLogs= await prismaClient.logModel.findMany({
            where:{level}
        });


        //como tengo que retornar un array de logs entities
        //entonces mapeo todos los datos de la db y
        // uso mi metodo fromObject que convierte un objeto en un log entity
        return dbLogs.map(logs=> LogEntity.fromObject(logs) );



    }
    
}