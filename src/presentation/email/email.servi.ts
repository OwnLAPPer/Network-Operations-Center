
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogServerityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions{
    to:string | string[];
    subject:string;
    htmlBody:string;
    attachments?: Attachment[];
}

interface Attachment{
    filename:string;
    path:string;
}


export class EmailService{


    private transporter= nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass:envs.MAILER_SECRET_KEY,
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    constructor(){

    }
    
    async sendEmail(options:SendMailOptions):Promise<boolean>{

        const {to,htmlBody,subject,attachments=[]}=options;


        try {
            const sentInformation = await this.transporter.sendMail({
                to:to,
                subject:subject,
                html:htmlBody,
                attachments:attachments,
            });
          


            return true;

        } catch (error) {
            

            return false;

        }
    }

    async sendEmailWithLogs(to:string|string[]){

        const subject= 'logs del servidor';
        const htmlBody=  `
        <h3> logs del sistema - NOC</h3>
        <p> lorem lorem lorem lorem</p>
        <p>ver adjuntos</p>  
        `
        const attachments:Attachment[]=[
            {filename:'logs-all.log',path:'./logs/logs-all.log'},
            {filename:'logs-high.log',path:'./logs/logs-high.log'},
            {filename:'logs-all.log',path:'./logs/logs-medium.log'}
        ]

        return this.sendEmail({
            to,subject,attachments,htmlBody
        });
    }



}