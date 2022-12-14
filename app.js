"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var controllerAliment_1 = require("./controller/controllerAliment");
var controllerPlat_1 = require("./controller/controllerPlat");
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var app = express();
var controllerAliment = new controllerAliment_1.ControlerAliment();
var controllerPlat = new controllerPlat_1.ControlerPlat();
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
var swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
        description: 'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.'
    },
    servers: [
        {
            url: 'http://localhost:3001/',
            description: 'Development server',
        },
    ],
};
var options = {
    swaggerDefinition: swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./*.js', './controller/*.js'],
};
var swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/**
 *
 * On utilise express pour g??rer notre serveur http, toute la doc se trouve ici
 * https://expressjs.com/
 */
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
function authenticateToken(req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        if (err) {
            return res.sendStatus(401);
        }
        req.user = user;
        next();
    });
}
app.get('/', authenticateToken, function (req, res) { return res.send('????'); });
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
*               $ref: '#/components/schemas/Aliment'
*/
app.get('/aliments', function (req, res) { return controllerAliment.getAliments(req, res); });
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
 *         description: Aliment non trouv??
 */
app.get('/aliments/:id', function (req, res) { return controllerAliment.getAliment(req, res); });
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
 *         description: Ajout r??ussi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aliment'
 *       500:
 *         description: Erreur serveur
 */
app.post('/aliments', function (req, res) { return controllerAliment.postAliment(req, res); });
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
 *         decsription: aliment modifi??
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
app.put('/aliments/:id', function (req, res) { return controllerAliment.updateAliment(req, res); });
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
 *          description: aliment supprim??
 *        404:
 *          description: aliment non trouv??
 */
app.delete('/aliments/:id', function (req, res) { return controllerAliment.deleteAliment(req, res); });
/**
 * @swagger
 * components:
 *   schemas:
 *     Plat:
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
 *         aliments:
 *           type: array
 *           descripton: diff??rent aliment du plat
 *           items:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 descripton: nom de l'aliment
 *               quantite:
 *                 type: integer
 *                 descripton: quantite de l'aliment
 *       example:
 *         nom: Reine
 *         type: Pizza
 *         prix: 11.50
 *         aliment: [{
 *         nom: Tomate, quantite: 2},{nom: Jambon, quantite: 1}]
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
*               $ref: '#/components/schemas/Plat'
*/
app.get('/plats', function (req, res) { return controllerPlat.getPlats(req, res); });
/**
 * @swagger
 * /plats/{id}:
 *   get:
 *     summary:  Retourne le plat
 *     tags: [Plats]
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
 *               $ref: '#/components/schemas/Plat'
 *       400:
 *         description: Aliment non trouv??
 */
app.get('/plats/:id', function (req, res) { return controllerPlat.getPlat(req, res); });
/**
 * @swagger
 * /plats:
 *   post:
 *     summary: Ajoute un plat
 *     tags: [Plats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plats'
 *     responses:
 *       200:
 *         description: Ajout r??ussi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plats'
 *       500:
 *         description: Erreur serveur
 */
app.post('/plats', function (req, res) { return controllerPlat.postPlat(req, res); });
/**
 * @swagger
 * /plats/{id}:
 *   put:
 *     summary: Modifier un plat
 *     tags: [Plats]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id du plat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plat'
 *     responses:
 *       200:
 *         decsription: aliment modifi??
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plat'
 *       404:
 *         description: plat non existant
 *       500:
 *         description: Server introuvable
 *
 */
app.put('/plats/:id', function (req, res) { return controllerPlat.updatePlat(req, res); });
/**
 * @swagger
 *  /plats/{id}:
 *    delete:
 *      summary: Supprime le plat
 *      tags: [Plats]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: id du plat
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: plat supprim??
 *        404:
 *          description: plat non trouv??
 */
app.delete('/plats/:id', function (req, res) { return controllerPlat.deletePlat(req, res); });
app.listen(3001, function () {
    "Serveur listening on port :3001";
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose.connect('mongodb+srv://dodo56:dodo56@cluster0.lsjx2pq.mongodb.net/API_restauration')];
                case 1:
                    _a.sent();
                    console.log("Connexion mongoose ok");
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) { return console.log(err); });
//# sourceMappingURL=app.js.map