"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    const access = token.split(' ');
    console.log('@@ token => ', token, access[1]);
    if (!access[1]) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    jsonwebtoken_1.default.verify(access[1], process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Forbidden',
            });
        }
        // Asignamos el usuario decodificado a la solicitud
        req.user = user;
        next();
    });
};
exports.default = authenticateToken;
