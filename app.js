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
        while (_) try {
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
var app = express();
var controllerAliment = new controllerAliment_1.ControlerAliment();
var controllerPlat = new controllerPlat_1.ControlerPlat();
/**
 *
 * On utilise express pour gérer notre serveur http, toute la doc se trouve ici
 * https://expressjs.com/
 */
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.get('/', function (req, res) { return res.send('🏠'); });
app.get('/aliments', function (req, res) { return controllerAliment.getAliments(req, res); });
app.get('/aliments/:id', function (req, res) { return controllerAliment.getAliment(req, res); });
app.post('/aliments', function (req, res) { return controllerAliment.postAliment(req, res); });
app.put('/aliments/:id', function (req, res) { return controllerAliment.updateAliment(req, res); });
app.delete('/aliments/:id', function (req, res) { return controllerAliment.deleteAliment(req, res); });
app.get('/plats', function (req, res) { return controllerPlat.getPlats(req, res); });
app.get('/plats/:id', function (req, res) { return controllerPlat.getPlat(req, res); });
app.post('/plats', function (req, res) { return controllerPlat.postPlat(req, res); });
app.put('/plats/:id', function (req, res) { return controllerPlat.updatePlat(req, res); });
app.delete('/plats/:id', function (req, res) { return controllerPlat.deletePlat(req, res); });
app.listen(3000, function () {
    "Serveur listening on port :3000";
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