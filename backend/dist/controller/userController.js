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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Buscar al usuario por email
        const userDoc = yield User_1.User.findByEmail(email);
        // Si no se encuentra el usuario
        if (!userDoc) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        // Verificar si la contraseña es válida
        const isValidPass = yield userDoc.verifyPassword(password);
        if (!isValidPass) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        // Generar el JWT token
        const token = jsonwebtoken_1.default.sign({ email: userDoc.email }, process.env.SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'success',
            token
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, nombre, apaterno, amaterno, direccion, telefono } = req.body;
        const existingUser = yield User_1.User.findByEmail(email);
        if (existingUser) {
            return res.status(404).json({
                message: 'User already exists :C'
            });
        }
        const newUser = yield User_1.User.createUser(email, password, nombre, apaterno, amaterno, direccion, telefono);
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error😭'
        });
    }
});
exports.registerUser = registerUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.getAllUsers();
        res.json({
            users,
            message: 'success'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.params.email;
    try {
        yield User_1.User.deleteUser(userEmail);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error😭'
        });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.params.email;
    const userData = req.body;
    try {
        const userUpdated = yield User_1.User.updateUser(userEmail, userData);
        res.json({
            userUpdated,
            message: 'success'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error😭'
        });
    }
});
exports.updateUser = updateUser;
