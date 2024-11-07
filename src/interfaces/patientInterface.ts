interface Patient {
    nombre: string;
  }
  
  class IPatient {
    /*
      Crear un nuevo paciente
      @param {string} nombre -> Nombre del paciente
      @returns {Promise<Patient>} -> Devuelve el paciente creado
      @throws {Error} -> Si hay un error al crear el paciente
    */
    static async createPatient(nombre: string): Promise<Patient> {
      // Aquí iría la lógica para crear el paciente
      throw new Error('Not implemented');
    }
  
    /*
      Buscar un paciente por nombre
      @param {string} nombre -> Nombre del paciente
      @returns {Promise<Patient | null>} -> Devuelve el paciente encontrado o null si no se encuentra
      @throws {Error} -> Si hay un error al buscar el paciente
    */
    static async findByName(nombre: string): Promise<Patient | null> {
      // Aquí iría la lógica para buscar el paciente
      throw new Error('Not implemented');
    }
  }
  
  export default IPatient;