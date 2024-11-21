interface Cita {
    doctorId: string;
    pacienteId: string;
    fecha: string;
  }
  
export class ICita {
    /*
      Verificar si una cita está disponible
      @param {string} doctorId -> ID del doctor
      @param {string} pacienteId -> ID del paciente
      @param {string} fecha -> fecha de la cita
      @returns {Promise<boolean>} -> Devuelve un booleano indicando si la cita está disponible
      @throws {Error} -> Si hay un error al verificar la disponibilidad
    */
    static async isCitaDisponible(doctorId: string, pacienteId: string, fecha: string): Promise<boolean> {
      // Aquí iría la lógica para verificar si la cita está disponible
      throw new Error('Not implemented');
    }
  
    /*
      Crear una nueva cita
      @param {Cita} cita -> Objeto con los datos de la cita
      @returns {Promise<Cita>} -> Devuelve la cita creada
      @throws {Error} -> Si hay un error al crear la cita
    */
    static async createCita(cita: Cita): Promise<Cita> {
      // Aquí iría la lógica para crear una cita
      throw new Error('Not implemented');
    }
  
    /*
      Obtener todas las citas
      @returns {Promise<Cita[]>} -> Devuelve un array de citas
      @throws {Error} -> Si hay un error al obtener las citas
    */
    static async getCitas(): Promise<Cita[]> {
      // Aquí iría la lógica para obtener todas las citas
      throw new Error('Not implemented');
    }
  
    /*
      Obtener las citas por paciente
      @param {string} pacienteId -> ID del paciente
      @returns {Promise<Cita[]>} -> Devuelve un array de citas para el paciente especificado
      @throws {Error} -> Si hay un error al obtener las citas del paciente
    */
    static async getCitasByPaciente(pacienteId: string): Promise<Cita[]> {
      // Aquí iría la lógica para obtener las citas por paciente
      throw new Error('Not implemented');
    }
  }
  
