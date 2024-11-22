import { Registros } from "./Registros";
import { RedVeterinaria } from "./RedVeterinaria";

export class Veterinaria implements Registros {
  private nombre: string;
  private direccion: string;
  private telefono: number;
  private ID: number | null = null;
  private clientes: Cliente[] = [];
  private pacientes: Paciente[] = [];
  private redVeterinaria: RedVeterinaria;

  constructor(
    nombre: string,
    direccion: string,
    telefono: number,
    redVeterinaria: RedVeterinaria
  ) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
    this.redVeterinaria = redVeterinaria;
  }

  registrarse(): number {
    this.ID = Math.floor(Math.random() * 100000);
    console.log(`Veterinaria registrada con ID: ${this.ID}`);
    this.redVeterinaria.agregarVeterinaria(this);
    return this.ID;
  }

  darBaja(): void {
    this.ID = null;
    console.log(`Veterinaria dada de baja.`);
  }

  modRegistro(nombre: string, direccion?: string, telefono?: number): void {
    if (nombre) this.nombre = nombre;
    if (direccion) this.direccion = direccion;
    if (telefono) this.telefono = telefono;
    console.log(`Registro actualizado: ${this.nombre} (ID: ${this.ID})`);
  }

  mostrarClientes(): void {
    console.log("Lista de Clientes:");
    this.clientes.forEach((cliente) => console.log(cliente));
  }

  mostrarPacientes(): void {
    console.log("Lista de Pacientes:");
    this.pacientes.forEach((paciente) => console.log(paciente));
  }
}

const red = new RedVeterinaria();
const veterinaria = new Veterinaria('Clinica Olavarria', 'Calle Hinojo', 22845555555, red);
const proveedor = new Proveedor('Proveedor Hinojo', 800555555, red);

veterinaria.registrarse();
proveedor.registrarse();
red.listadoVeterinarias();
red.listadoProveedores();