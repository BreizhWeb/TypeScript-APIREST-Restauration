import { Plat } from "../models/plat";
export class ControlerPlat{
    
    public async getPlats(req,res){
        
        let listePlats = await Plat.getAllPlats();
        res.send(listePlats);
    }

    public async getPlat(req,res){
        let platId:string = req.params.id;
        let platDetail = await Plat.getOnePlat(platId);
        res.send(platDetail);
    }

    public async postPlat(req,res){
        let listePlats = await Plat.postOnePlat(req.body);
        res.send(listePlats);
    }

    public async updatePlat(req,res){
        let platId:string = req.params.id;
        let listePlats = await Plat.updateOnePlat(platId,req.body);
        res.send(listePlats);
    }

    public async deletePlat(req,res){
        let platId:string = req.params.id;
        let listePlats = await Plat.deleteOnePlat(platId);
        res.send(listePlats);
    }
}

