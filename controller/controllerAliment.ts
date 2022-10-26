import { Aliment } from "../models/aliments";


/* Controller qui nous servira par la suite à vérifier que :
* 
* La requete contient les élements demandés (id dans le cas d'un get, un formulaire post complet,etc...)
* 
* L'appel est bien authentifié
* 
* Pour le moment nous avons un controlerAliment, mais nous pourrons faire évoluer le nom du controller plus tard
*/
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