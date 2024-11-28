import { Registros } from "./Registros";
import { Registro } from "./Interface";
import { RedVeterinaria } from "./RedVeterinaria";

export class Proveedor implements Registro<Proveedor> {
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

  //getters
  public getID(): number{
    return this.ID;
  }

  public getNombre(): string{
    return this.nombre;
  }

  public getTelefono(): number{
    return this.telefono;
  }

  //setters

  public setNombre(nombre: string): void {
    if(!nombre){
        throw new Error('Nombre invalido');
    }
    this.nombre = nombre;
  }

  public setTelefono(telefono: number): void {
    if(telefono <= 0){
        throw new Error('Numero de telefono invalido');
    }
    this.telefono = telefono;
  }

  registrarse(Proveedor: Proveedor[]): number {
    this.ID = Math.floor(Math.random() * 100); //3
    console.log(`Proveedor registrado con ID: ${this.ID}`);
    this.redVeterinaria.agregarProveedor(this);
    return this.ID;
  }

  darBaja(registroProveedores: Proveedor[]): void {
      //verifica si el cliente esta registrado o no;
      const proveedorRegistrado = registroProveedores.findIndex(proveedor => proveedor.getID() === this.ID);
      //si el cliente esta registrado, lo elimina del array;
      if (proveedorRegistrado >= 0) {
          registroProveedores.splice(proveedorRegistrado, 1);
          console.log(`El proveedor ${this.nombre} con ID ${this.ID} ha sido eliminado.`);
      } else {
          console.error(`El cliente con ID ${this.ID} no ha sido encontrado. Intente nuevamente`);
      }
  }

  modRegistro(registroProveedores: Proveedor[], datosAModificar: { nombre?: string; telefono?: number}): void {
    //verifica si el cliente esta registrado o no;
    const indexProveedorRegistrado = registroProveedores.findIndex(proveedor => proveedor.getID() === this.ID);
    //si el proveedor esta registrado, modifica los datos ingresados;
    if (indexProveedorRegistrado >= 0) {
        const proveedorMod = registroProveedores[indexProveedorRegistrado];
        if (datosAModificar.nombre) proveedorMod.setNombre(datosAModificar.nombre);
        if (datosAModificar.telefono) proveedorMod.setTelefono(datosAModificar.telefono);
        console.log(`El cliente ${this.nombre} con ID ${this.ID} ha sido modificado exitosamente. Sus nuevos datos son ${this}`);
    } else {
        console.error(`El cliente con ID ${this} no ha sido encontrado. Intente nuevamente`);
    }
  }
}