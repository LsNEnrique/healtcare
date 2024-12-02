interface Cita {
  doctorId: string;
  pacienteId: string;
  fecha: string;
}

export class ICita {
  /**
   * Verificar si una cita está disponible.
   * @param doctorId ID del doctor.
   * @param pacienteId ID del paciente.
   * @param fecha Fecha de la cita.
   * @returns Promesa que resuelve a un booleano indicando si la cita está disponible.
   * @throws Error si ocurre un problema durante la verificación.
   */
  static async isCitaDisponible(doctorId: string, pacienteId: string, fecha: string): Promise<boolean> {
    // Implementación pendiente
    throw new Error('Not implemented');
  }

  /**
   * Crear una nueva cita.
   * @param cita Objeto con los datos de la cita.
   * @returns Promesa que resuelve a la cita creada.
   * @throws Error si ocurre un problema durante la creación de la cita.
   */
  static async createCita(cita: Cita): Promise<Cita> {
    // Implementación pendiente
    throw new Error('Not implemented');
  }

  /**
   * Obtener todas las citas.
   * @returns Promesa que resuelve a un array de citas.
   * @throws Error si ocurre un problema durante la obtención de citas.
   */
  static async getCitas(): Promise<Cita[]> {
    // Implementación pendiente
    throw new Error('Not implemented');
  }

  /**
   * Obtener citas de un paciente específico.
   * @param pacienteId ID del paciente.
   * @returns Promesa que resuelve a un array de citas para el paciente especificado.
   * @throws Error si ocurre un problema durante la obtención de citas.
   */
  static async getCitasByPaciente(pacienteId: string): Promise<Cita[]> {
    // Implementación pendiente
    throw new Error('Not implemented');
  }
}

export default ICita;
