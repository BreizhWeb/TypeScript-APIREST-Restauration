import { ControlerAliment } from "./controller/controllerAliment";
import { ControlerPlat } from "./controller/controllerPlat";

const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser');

const app = express();
let controllerAliment:ControlerAliment = new ControlerAliment();
let controllerPlat:ControlerPlat = new ControlerPlat();

const swaggerJSDoc = require ('swagger-jsdoc');
const swaggerUi = require ('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
    'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.'
    },
    servers: [
    {
    url: 'http://localhost:3001/',
    description: 'Development server',
    },
    ],
    };
    const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./*.js','./controller/*.js'],
    };
    
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
/**
 * @swagger
 * components:
 *   schemas:
 *     Aliment:
 *       type: object
 *       required:
 *         - nom
 *         - type
 *         - quantite
 *         - date
 *       properties:
 *         nom:
 *           type: string
 *           description: nom de l'aliment
 *         type:
 *           type: string
 *           description: type d'aliment
 *         quantite:
 *           type: integer
 *           descripton: quantite de l'aliment
 *         date:
 *           type: date
 *           descripton: date de l'aliment
 *       example:
 *         nom: Tomate
 *         type: Legume
 *         quantite: 4
 *         date: 2022-10-26T07:21:54.302Z
 *
 */

/**
* @swagger
* /aliments:
*   get:
*     summary: Retourne la liste des aliments
*     tags: [Aliments]
*     description:
*     responses:
*       200:
*         description: Liste des aliments.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 nom:
*                   type: string
*                   description: Le nom de l'aliment
*                   example: Tomate
*                 type:
*                   type: string
*                   description: Le type d'aliment.
*                   example: Légume
*                 quantite:
*                   type: integer
*                   description: La quantite de l'aliment.
*                   example: 4
*                 date:
*                   type: date
*                   description: La date de l'aliment.
*                   example: 2022-10-26T07:21:54.302+00:00
*/
app.get('/aliments',(req,res)=>controllerAliment.getAliments(req,res));

/**
 * @swagger
 * /aliments/{id}:
 *   get:
 *     summary:  Retourne l'aliment de l'id
 *     tags: [Aliments]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de l'aliment
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Retourne l'aliment de l'id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aliment'
 *       400:
 *         description: Aliment non trouvé
 */
app.get('/aliments/:id',(req,res)=>controllerAliment.getAliment(req,res));

/**
 * @swagger
 * /aliments:
 *   post:
 *     summary: Ajoute un aliment
 *     tags: [Aliments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aliment'
 *     responses:
 *       200:
 *         description: Ajout réussi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aliment'
 *       500:
 *         description: Erreur serveur
 */
app.post('/aliments',(req,res)=>controllerAliment.postAliment(req,res));

/**
 * @swagger
 * /aliments/{id}:
 *   put:
 *     summary: Modifier un aliment
 *     tags: [Aliments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id de l'aliment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aliment'
 *     responses:
 *       200:
 *         decsription: aliment modifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aliment'
 *       404:
 *         description: aliment non existant
 *       500:
 *         description: Server introuvable
 *
 */
app.put('/aliments/:id',(req,res)=>controllerAliment.updateAliment(req,res));
/**
 * @swagger
 *  /aliments/{id}:
 *    delete:
 *      summary: Supprime l'aliment
 *      tags: [Aliments]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: id de l'aliment
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: aliment supprimé
 *        404:
 *          description: aliment non trouvé
 */
app.delete('/aliments/:id',(req,res)=>controllerAliment.deleteAliment(req,res)); 

/**
 * @swagger
 * components:
 *   schemas:
 *     Plats:
 *       type: object
 *       required:
 *         - nom
 *         - type
 *         - prix
 *         - aliment
 *       properties:
 *         nom:
 *           type: string
 *           description: nom du plat
 *         type:
 *           type: string
 *           description: type du plat
 *         prix:
 *           type: number
 *           descripton: prix du plat
 *         aliment:
 *           type: array
 *           descripton: aliment du plat
 *           items:
 *           properties:
 *             nom:
 *               type: string:
 *               descripton: nom de l'aliment
 *             quantite:
 *               type: integer:
 *               descripton: quantite de l'aliment
 *       example:
 *         nom: Reine
 *         type: Pizza
 *         prix: 11.50
 *         aliment: []
 *
 */

/**
* @swagger
* /plats:
*   get:
*     summary: Retourne la liste des plats
*     tags: [Plats]
*     description:
*     responses:
*       200:
*         description: Liste des plats.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 nom:
*                   type: string
*                   description: nom du plat
*                 type:
*                   type: string
*                   description: type du plat
*                 prix:
*                   type: integer
*                   descripton: prix du plat
*                 aliment:
*                   type: array
*                   descripton: aliment du plat
*                   items:
*                   properties:
*                     nom:
*                       type: string:
*                       descripton: nom de l'aliment
*                     quantite:
*                       type: integer:
*                       descripton: quantite de l'aliment
*/
app.get('/plats',(req,res)=>controllerPlat.getPlats(req,res));
app.get('/plats/:id',(req,res)=>controllerPlat.getPlat(req,res));
app.post('/plats',(req,res)=>controllerPlat.postPlat(req,res));
app.put('/plats/:id',(req,res)=>controllerPlat.updatePlat(req,res));
app.delete('/plats/:id',(req,res)=>controllerPlat.deletePlat(req,res)); 

app.listen(3001,()=>{
    "Serveur listening on port :3001"
})

async function main() {
     await mongoose.connect('mongodb+srv://dodo56:dodo56@cluster0.lsjx2pq.mongodb.net/API_restauration');
    console.log("Connexion mongoose ok")
}
main().catch(err => console.log(err));