import bcrypt from 'bcrypt';
import db from '../config/firebase';
import { IUser } from '../interfaces/userInterface';

export class User implements IUser {
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
    this.email = email;
    this.password = password;
    this.nombre = nombre;
    this.apaterno = apaterno;
    this.amaterno = amaterno;
    this.direccion = direccion;
    this.telefono = telefono;
  }

  /**
   * Crear un nuevo usuario en la base de datos.
   * @param email 
   * @param password 
   * @returns Instancia de User
   */
  async createUser(email: string, password: string): Promise<IUser> {
    try {
      const hash = await bcrypt.hash(password, 10);
      const userRef = db.collection('users').doc(email);

      await userRef.set({
        email,
        password: hash,
        nombre: this.nombre,
        apaterno: this.apaterno,
        amaterno: this.amaterno,
        direccion: this.direccion,
        telefono: this.telefono,
      });

      return new User(email, hash, this.nombre, this.apaterno, this.amaterno, this.direccion, this.telefono);
    } catch (error) {
      console.error('Error creating user => ', error);
      throw new Error('Error creating user');
    }
  }

  /**
   * Verificar la contraseña ingresada con la almacenada.
   * @param password 
   * @returns True si coinciden, False si no.
   */
  async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  /**
   * Buscar un usuario en la base de datos por su email.
   * @param email 
   * @returns Instancia de User o null.
   */
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const userRef = db.collection('users').doc(email);
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
      console.error('Error finding user => ', error);
      throw new Error('Error finding user');
    }
  }

  // Métodos Estáticos

  /**
   * Obtener todos los usuarios de la base de datos.
   * @returns Lista de usuarios como instancias de User.
   */
  static async getAllUsers(): Promise<IUser[]> {
    try {
      const usersSnapshot = await db.collection('users').get();
      const foundUsers: IUser[] = [];

      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData) {
          foundUsers.push(new User(
            doc.id,
            userData.password,
            userData.nombre,
            userData.apaterno,
            userData.amaterno,
            userData.direccion,
            userData.telefono
          ));
        }
      });

      return foundUsers;
    } catch (error) {
      console.error('Error getting all users => ', error);
      throw new Error('Error getting all users');
    }
  }

  /**
   * Eliminar un usuario de la base de datos.
   * @param email Correo del usuario a eliminar.
   */
  static async deleteUser(email: string): Promise<void> {
    try {
      await db.collection('users').doc(email).delete();
    } catch (error) {
      console.error('Error deleting user => ', error);
      throw new Error('Error deleting user');
    }
  }

  /**
   * Actualizar los datos de un usuario en la base de datos.
   * @param email Correo del usuario a actualizar.
   * @param userData Datos a actualizar.
   * @returns Instancia actualizada del usuario o null.
   */
  static async updateUser(email: string, userData: Partial<User>): Promise<IUser | null> {
    try {
      await db.collection('users').doc(email).update(userData);
      const userDoc = await db.collection('users').doc(email).get();

      if (userDoc.exists) {
        const updatedData = userDoc.data();
        if (updatedData) {
          return new User(
            updatedData.email,
            updatedData.password,
            updatedData.nombre,
            updatedData.apaterno,
            updatedData.amaterno,
            updatedData.direccion,
            updatedData.telefono
          );
        }
      }
      return null;
    } catch (error) {
      console.error('Error updating user => ', error);
      throw new Error('Error updating user');
    }
  }
}
