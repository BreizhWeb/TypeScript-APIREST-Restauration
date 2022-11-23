import { Aliment } from "../models/aliments";
export class ControlerAliment{
    
    public async getAliments(req,res){
        
        let listeAliments = await Aliment.getAllAliments();
        res.send(listeAliments);
    }

    public async getAliment(req,res){
        let alimentId:string = req.params.id;
        let alimentDetail = await Aliment.getOneAliment(alimentId);
        console.log(alimentDetail);
        res.send(alimentDetail);
    }

    public async postAliment(req,res){
        let listeAliments = await Aliment.postOneAliment(req.body);
        res.send(listeAliments);
    }

    public async updateAliment(req,res){
        let alimentId:string = req.params.id;
        let listeAliments = await Aliment.updateOneAliment(alimentId,req.body);
        res.send(listeAliments);
    }

    public async deleteAliment(req,res){
        let alimentId:string = req.params.id;
        let listeAliments = await Aliment.deleteOneAliment(alimentId);
        res.send(listeAliments);
    }
}

