export interface Registros {
    registrarse(): number;
    darBaja(): void;
    modRegistro(nombre: string, direccion?: string, telefono?: number): void;
  }