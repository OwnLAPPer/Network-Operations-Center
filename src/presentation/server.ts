import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-case/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSytemDataSource } from '../infrastructure/datasource/file-system.datasource';
import { EmailService } from "./email/email.servi";
import { envs } from "../config/plugins/envs.plugins";
import { SendEmailLogs } from "../domain/use-case/email/send-email-logs";
import { MongoLogDataSource } from "../infrastructure/datasource/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasource/postgres-logs.datasource";
import { CheckServiceMultiple } from "../domain/use-case/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(
    new FileSytemDataSource()
);

const mongoRepository= new LogRepositoryImpl(
    new MongoLogDataSource()
);

const postgresRepository = new LogRepositoryImpl(
    new PostgresLogDataSource()
);

const emailService= new EmailService();

export class Server{
    public static start(){
        console.log('server started...'); 
        console.log(envs)

    //mandar email
        // new SendEmailLogs(
        //     emailService,FileSystemLogRepository
        // ).execute(
        //     [ 'andresppu@hotmail.com']
        // )


        // emailService.sendEmailWithLogs([
        //     'andresppu@hotmail.com','lapp7u7@gmail.com'
        // ])




        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
                const url:string='http://google.com';
                new CheckServiceMultiple(
                    [fsLogRepository,mongoRepository,postgresRepository],
                    ()=>console.log( `${url} is ok `),
                    (error)=>console.log(error),
                ).execute(url)
                //new CheckService().execute('http://localhost:3000/posts');
            }
        );



    }
}