


import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugins";
import { LogModel, MongoDb } from "./data/mongo";
import { Server } from "./presentation/server";


(async()=>{
    main();
})();



async function main(){

    await MongoDb.connect({
        mongoUrl:envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME
    });


    const prisma = new PrismaClient();
    // const newLog= await prisma.logModel.create({
    //     data:{
    //         level:'HIGH',
    //         message:'test message05',
    //         origin:'app.ts'
    //     }
    // });


    //console.log(newLog)


    // const logs = await prisma.logModel.findMany({
    //     where:{
    //         level:'LOW'
    //     }
    // });
    // console.log(logs);
    //crear un registro

    // const newLog = await LogModel.create({
    //     message:'teste04',
    //     origin:'app.ts',
    //     level:'low',
    // })

    // await newLog.save();
    // console.log(newLog);

    // const logs = await LogModel.find();
    // console.log(logs);



    Server.start();
  
   
}