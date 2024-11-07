import bcrypt from 'bcrypt';
import admin from '../config/firebase';
import { IUser } from '../interfaces/userInterface';
import { firestore } from 'firebase-admin';

// Definición de la interfaz para los datos del usuario
interface UserData {
  email: string;
  password: string;
  nombre: string;
  apaterno: string;
  amaterno: string;
  direccion: string;
  telefono: string;
}

class User extends IUser {
  email: string;
  password: string;
  nombre: string;
  apaterno: string;
  amaterno: string;
  direccion: string;
  telefono: string;

  constructor(
    email: string,
    password: string,
    nombre: string,
    apaterno: string,
    amaterno: string,
    direccion: string,
    telefono: string
  ) {
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
  static async createUser(
    email: string,
    password: string,
    nombre: string,
    apaterno: string,
    amaterno: string,
    direccion: string,
    telefono: string
  ): Promise<User> {
    try {
      // Encriptar la contraseña antes de guardarla
      const hash = await bcrypt.hash(password, 10);
      const userRef = firestore.collection('users').doc(email);

      // Crear un nuevo usuario en la base de datos
      await userRef.set({
        email,
        password: hash,
        nombre,
        apaterno,
        amaterno,
        direccion,
        telefono
      });

      return new User(email, password, nombre, apaterno, amaterno, direccion, telefono);
    } catch (error) {
      console.log('Error => ', error);
      throw new Error('Error creating user');
    }
  }

  // Método para verificar la contraseña
  async verifyPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  // Método estático para encontrar un usuario por su correo
  static async findByEmail(email: string): Promise<User | null> {
    try {
      const userRef = firestore.collection('users').doc(email);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        if (userData) {
          return new User(
            userData.email,
            userData.password,
            userData.nombre,
            userData.apaterno,
            userData.amaterno,
            userData.direccion,
            userData.telefono
          );
        }
      }
      return null;
    } catch (error) {
      console.log('Error => ', error);
      throw new Error('Error finding user');
    }
  }

  // Método estático para obtener todos los usuarios
  static async getAllUsers(): Promise<UserData[]> {
    try {
      const usersSnapshot = await firestore.collection('users').get();
      const foundUsers: UserData[] = [];

      usersSnapshot.forEach((doc) => {
        foundUsers.push({
          email: doc.id,  // Usamos el id del documento como el email del usuario
          ...doc.data() as UserData  // Se hace un casting para garantizar la estructura
        });
      });

      return foundUsers;
    } catch (error) {
      throw error;
    }
  }

  // Método estático para eliminar un usuario
  static async deleteUser(userEmail: string): Promise<void> {
    try {
      await firestore.collection('users').doc(userEmail).delete();
    } catch (error) {
      throw error;
    }
  }

  // Método estático para actualizar los datos de un usuario
  static async updateUser(
    userEmail: string,
    userData: Partial<UserData>
  ): Promise<{ userUpdated: UserData | undefined }> {
    try {
      await firestore.collection('users').doc(userEmail).update(userData);
      const userUpdatedDoc = await firestore.collection('users').doc(userEmail).get();
      return {
        userUpdated: userUpdatedDoc.data() as UserData
      };
    } catch (error) {
      throw error;
    }
  }
}

export default User;