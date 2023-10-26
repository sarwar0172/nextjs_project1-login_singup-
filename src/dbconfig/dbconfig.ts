import mongoose from "mongoose";


export async function connect(){
    try{
        mongoose.connect("mongodb+srv://robin015:robin258@cluster0.rubt83n.mongodb.net/")

        const connection=mongoose.connection

           connection.on('connected',()=>{
            console.log('mongoDb connceted successfully')
        })

        connection.on('error',(err)=>{
            console.log('MongoDb connection error'+err)
            process.exit()
        })
        

    }catch{
        console.log('somthing is wrong in dbconfig')
    }
}