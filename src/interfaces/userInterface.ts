// Definición de la interfaz IUser (interfaz abstracta para la creación y verificación de usuarios)
export abstract class IUser {
    /**
     * Crear un nuevo usuario
     * @param {string} email -> correo del usuario
     * @param {string} password -> contraseña del usuario
     * @returns {Promise<User>} -> Retorna una promesa que resuelve un objeto de tipo User
     * @throws {Error} -> Si hay un error en la creación
     */
    abstract createUser(email: string, password: string): Promise<IUser>;
  
    /**
     * Buscar un usuario por su correo
     * @param {string} email -> correo del usuario a buscar
     * @returns {Promise<User | null>} -> Retorna una promesa con un objeto de tipo User o null si no se encuentra
     */
    abstract findByEmail(email: string): Promise<IUser | null>;
  
    /**
     * Verificar la contraseña del usuario
     * @param {string} password -> contraseña a verificar
     * @returns {Promise<boolean>} -> Retorna una promesa con un valor booleano indicando si la contraseña es correcta
     */
    abstract verifyPassword(password: string): Promise<boolean>;
  }
  