import mongoose, { Schema } from "mongoose";

const alimentSchema = new Schema({​
    nom:  String, 
    type: String,​
    quantite:   String,​
    date: { type: Date, default: Date.now },​

  });​​
const AlimentModel= mongoose.model('Aliment', alimentSchema);

  export class Aliment{
    public static async getAllAliments():Promise<any>{
        return new Promise(async (resolve)=>{
            resolve (await AlimentModel.find())
        })
    }

    public static async getOneAliment(id:string):Promise<any>{
      return new Promise(async (resolve)=>{
        resolve (await AlimentModel.findOne({_id:id}))
      })
    }

    public static async postOneAliment(body:{nom:string,type:string,quantite:number}){
      const aliment = new AlimentModel({
        nom:body.nom,
        type:body.type,
        quantite:body.quantite,
        date:new Date()
      });
      return await aliment.save()
    }

    public static async updateOneAliment(id:string,body):Promise<any>{
      return await AlimentModel.findByIdAndUpdate(id, body)
    }

    public static async deleteOneAliment(id:string):Promise<any>{
      return await AlimentModel.findByIdAndRemove(id);
    }
  }



  