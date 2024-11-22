import { Registros } from "./Registros";
import { RedVeterinaria } from "./RedVeterinaria";

export class Proveedor implements Registros {
  private nombre: string;
  private telefono: number;
  private ID: number | null = null;
  private redVeterinaria: RedVeterinaria;

  constructor(
    nombre: string,
    telefono: number,
    redVeterinaria: RedVeterinaria
  ) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.redVeterinaria = redVeterinaria;
  }

  registrarse(): number {
    this.ID = Math.floor(Math.random() * 100000);
    console.log(`Proveedor registrado con ID: ${this.ID}`);
    this.redVeterinaria.agregarProveedor(this);
    return this.ID;
  }

  darBaja(): void {
    this.ID = null;
    console.log(`Proveedor dado de baja.`);
  }

  modRegistro(nombre: string, telefono?: number): void {
    if (nombre) this.nombre = nombre;
    if (telefono) this.telefono = telefono;
    console.log(`Registro actualizado: ${this.nombre} (ID: ${this.ID})`);
  }
}
