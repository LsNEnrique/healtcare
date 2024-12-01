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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userInterface_1 = require("../interfaces/userInterface");
const firebase_admin_1 = require("firebase-admin");
class User extends userInterface_1.IUser {
    constructor(email, password, nombre, apaterno, amaterno, direccion, telefono) {
        super();
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.apaterno = apaterno;
        this.amaterno = amaterno;
        this.direccion = direccion;
        this.telefono = telefono;
    }
    // Método estático para crear un nuevo usuario
    static createUser(email, password, nombre, apaterno, amaterno, direccion, telefono) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Encriptar la contraseña antes de guardarla
                const hash = yield bcrypt_1.default.hash(password, 10);
                const userRef = firebase_admin_1.firestore.collection('users').doc(email);
                // Crear un nuevo usuario en la base de datos
                yield userRef.set({
                    email,
                    password: hash,
                    nombre,
                    apaterno,
                    amaterno,
                    direccion,
                    telefono
                });
                return new User(email, password, nombre, apaterno, amaterno, direccion, telefono);
            }
            catch (error) {
                console.log('Error => ', error);
                throw new Error('Error creating user');
            }
        });
    }
    // Método para verificar la contraseña
    verifyPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(password, this.password);
        });
    }
    // Método estático para encontrar un usuario por su correo
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRef = firebase_admin_1.firestore.collection('users').doc(email);
                const userDoc = yield userRef.get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    if (userData) {
                        return new User(userData.email, userData.password, userData.nombre, userData.apaterno, userData.amaterno, userData.direccion, userData.telefono);
                    }
                }
                return null;
            }
            catch (error) {
                console.log('Error => ', error);
                throw new Error('Error finding user');
            }
        });
    }
    // Método estático para obtener todos los usuarios
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersSnapshot = yield firebase_admin_1.firestore.collection('users').get();
                const foundUsers = [];
                usersSnapshot.forEach((doc) => {
                    foundUsers.push(Object.assign({ email: doc.id }, doc.data() // Se hace un casting para garantizar la estructura
                    ));
                });
                return foundUsers;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Método estático para eliminar un usuario
    static deleteUser(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield firebase_admin_1.firestore.collection('users').doc(userEmail).delete();
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Método estático para actualizar los datos de un usuario
    static updateUser(userEmail, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield firebase_admin_1.firestore.collection('users').doc(userEmail).update(userData);
                const userUpdatedDoc = yield firebase_admin_1.firestore.collection('users').doc(userEmail).get();
                return {
                    userUpdated: userUpdatedDoc.data()
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = User;
