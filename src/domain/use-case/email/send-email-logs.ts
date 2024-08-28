import { EmailService } from '../../../presentation/email/email.servi';
import { LogEntity, LogServerityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';



interface sedLogEmailUseCase{
    execute:(to:string| string[])=>Promise<boolean>
}

export  class SendEmailLogs implements sedLogEmailUseCase{
    constructor(
        private readonly  emailService:EmailService,
        private readonly logRepository:LogRepository
    ){}
    async execute(to: string | string[]){

        try {
            const sent = this.emailService.sendEmailWithLogs(to)
            if (!sent) {
                throw new Error('error email')
            }

            const log=new LogEntity({
                message: `email log sent `,
                level:LogServerityLevel.low,
                origin:'send email usea cases'
                
            })

            this.logRepository.saveLogs(log)
            
            return true;
        } catch (error) {
            const log=new LogEntity({
                message: `${error} `,
                level:LogServerityLevel.high,
                origin:'send email usea cases'
                
            })
            this.logRepository.saveLogs(log)
            return false;
        }
    }
    
}