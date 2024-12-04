import { Registro } from "./Interface";
import { RedVeterinaria } from "./RedVeterinaria";
import { Proveedor } from "./Proveedor";
import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";

export class Veterinaria implements Registro<Veterinaria> {
  private nombre: string;
  private direccion: string;
  private telefono: number;
  private ID: number | null = null;
  private clientes: Cliente[] = [];
  private pacientes: Paciente[] = [];

  constructor(nombre: string, direccion: string, telefono: number) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
  }

  //getters
  public getNombre(): string {
    return this.nombre;
  }

  public getDireccion(): string {
    return this.direccion;
  }

  public getTelefono(): number {
    return this.telefono;
  }

  public getID(): number {
    return this.ID;
  }

  public getClientes(): Cliente[] {
    return this.clientes;
  }

  public getPacientes(): Paciente[] {
    return this.pacientes;
  }

  //setters
  public setNombre(nombre: string): void {
    if(!nombre){
      throw new Error('Nombre invalido');
    }
    this.nombre = nombre;
  }

  public setDireccion(direccion: string): void {
    if(!direccion){
      throw new Error('Direccion invalida');
    }
    this.direccion = direccion;
  }

  public setTelefono(telefono: number): void {
    if(telefono <= 0){
        throw new Error('Numero de telefono invalido');
    }
    this.telefono = telefono;
  }

//metodo de registro de veterinaria;
registrarse(registroVeterinarias: Veterinaria[], registroID: number[]): void {
//verifica si la veterinaria esta registrada o no;
const veterinariaRegistrada = registroVeterinarias.find(veterinaria => veterinaria.getNombre() === this.nombre && veterinaria.getTelefono() === this.telefono);

//si la veterinaria ya fue registrada;
if(veterinariaRegistrada) {
  console.error(`La veterinaria ${veterinariaRegistrada.getNombre()} ya está registrada. Su ID es ${veterinariaRegistrada.getID()}`);
  return;
}

//genera el ID unico para cada veterinaria;
let nuevoID: number = this.generarID();
  
//mientras el nuevoID ya haya sido registrado;
while(registroID.includes(nuevoID)) {
    //genera un ID nuevamente;
    nuevoID = this.generarID();
}

this.ID = nuevoID; //ID asignado a cada veterinaria;
registroID.push(this.ID); //almacena el ID correspondiente;
registroVeterinarias.push(this); //almacena las veterinarias registradas;

console.log(`La veterinaria ${this.nombre} ha sido registrada exitosamente. Su ID es ${this.ID}`);
}

//metodo para generar IDs randoms;
generarID(): number {
  return Math.floor(Math.random() * 100000); //Genera un ID random;
}

//dar de baja una veterinaria;
darBaja(registroVeterinarias: Veterinaria[]): void {
    //verifica si el veterinaria esta registrado o no;
    const veterinariaRegistrada = registroVeterinarias.findIndex(veterinaria => veterinaria.getID() === this.ID);
    //si el veterinaria esta registrado, lo elimina del array;
    if (veterinariaRegistrada >= 0) {
        registroVeterinarias.splice(veterinariaRegistrada, 1);
        console.log(`La veterinaria ${this.nombre} con ID ${this.ID} ha sido eliminada.`);
    } else {
        console.error(`La veterinaria con ID ${this.ID} no ha sido encontrada.`);
    }
}

//Modificar un registro;
modRegistro(registroVeterinarias: Veterinaria[], datosAModificar: { nombre?: string; direccion?: string; telefono?: number}): void {
  //verifica si la veterinaria esta registrado o no;
  const indexVeterinariaRegistrada = registroVeterinarias.findIndex(veterinaria => veterinaria.getID() === this.ID);
  //si el veterinaria esta registrado, modifica los datos ingresados;
  if (indexVeterinariaRegistrada >= 0) {
      const veterinariaMod = registroVeterinarias[indexVeterinariaRegistrada];
      if (datosAModificar.nombre) veterinariaMod.setNombre(datosAModificar.nombre);
      if (datosAModificar.direccion) veterinariaMod.setDireccion(datosAModificar.direccion);
      if (datosAModificar.telefono) veterinariaMod.setTelefono(datosAModificar.telefono);
      console.log(`La veterinaria ${this.nombre} con ID ${this.ID} ha sido modificada exitosamente. Sus nuevos datos son: \n Nombre: ${veterinariaMod.getNombre()}.\nDireccion: ${veterinariaMod.getDireccion()}.\nTelefono: ${veterinariaMod.getTelefono()}.`);
  } else {
      console.error(`La veterinaria con ID ${this.ID} no ha sido encontrado.`);
  }
}

public mostrarClientes(): void {
  if (this.clientes.length === 0) {
    console.log("No hay clientes registrados.");
  } else {
    console.log("Lista de Clientes:");
    this.clientes.forEach((cliente, index) => {
      console.log(`${index + 1}. Cliente: ${cliente.getNombre()}, Teléfono: ${cliente.getTelefono()}`);
    });
  }
}

public mostrarPacientes(): void {
  if (this.pacientes.length === 0) {
    console.log("No hay pacientes registrados.");
  } else {
    console.log("Lista de Pacientes:");
    this.pacientes.forEach((paciente, index) => {
      console.log(`${index + 1}. Paciente: ${paciente.getNombre()}, Cliente ${paciente.getID()}`);
    });
  }
}
}