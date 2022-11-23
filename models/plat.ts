import mongoose, { Schema } from "mongoose";

const platSchema = new Schema({​
    nom:  String, 
    type: String,​
    prix:   Number,​
    aliment: [{
      nom: String,
      quantite: Number,
    }]

});​​
const PlatModel= mongoose.model('Plat', platSchema);

  export class Plat{
    public static async getAllPlats():Promise<any>{
        return new Promise(async (resolve)=>{
            resolve (await PlatModel.find())
        })
    }

    public static async getOnePlat(id:string):Promise<any>{
      return new Promise(async (resolve)=>{
        resolve (await PlatModel.findOne({_id:id}))
      })
    }
    
    public static async postOnePlat(body:{nom:string,type:string,prix:number,aliment:[{nom:string,quantite:number}]}){
      const plat = new PlatModel({
        nom:body.nom,
        type:body.type,
        prix:body.prix,
        aliment:body.aliment
      });
      return await plat.save()
    }

    public static async updateOnePlat(id:string,body):Promise<any>{
      return await PlatModel.findByIdAndUpdate(id, body)
    }

    public static async deleteOnePlat(id:string):Promise<any>{
      return await PlatModel.findByIdAndRemove(id);
    }
  }



