import { ControlerAliment } from "./controller/controllerAliment";
import { ControlerPlat } from "./controller/controllerPlat";

const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser');

const app = express();
let controllerAliment:ControlerAliment = new ControlerAliment();
let controllerPlat:ControlerPlat = new ControlerPlat();

/**
 * 
 * On utilise express pour gérer notre serveur http, toute la doc se trouve ici
 * https://expressjs.com/
 */

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.get('/', (req, res) => res.send('🏠'));

app.get('/aliments',(req,res)=>controllerAliment.getAliments(req,res));
app.get('/aliments/:id',(req,res)=>controllerAliment.getAliment(req,res));
app.post('/aliments',(req,res)=>controllerAliment.postAliment(req,res));
app.put('/aliments/:id',(req,res)=>controllerAliment.updateAliment(req,res));
app.delete('/aliments/:id',(req,res)=>controllerAliment.deleteAliment(req,res)); 

app.get('/plats',(req,res)=>controllerPlat.getPlats(req,res));
app.get('/plats/:id',(req,res)=>controllerPlat.getPlat(req,res));
app.post('/plats',(req,res)=>controllerPlat.postPlat(req,res));
app.put('/plats/:id',(req,res)=>controllerPlat.updatePlat(req,res));
app.delete('/plats/:id',(req,res)=>controllerPlat.deletePlat(req,res)); 

app.listen(3000,()=>{
    "Serveur listening on port :3000"
})

async function main() {
     await mongoose.connect('mongodb+srv://dodo56:dodo56@cluster0.lsjx2pq.mongodb.net/API_restauration');
    console.log("Connexion mongoose ok")
}
main().catch(err => console.log(err));