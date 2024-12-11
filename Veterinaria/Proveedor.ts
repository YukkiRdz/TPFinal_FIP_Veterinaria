import { Registro } from "./Interface";

export class Proveedor implements Registro<Proveedor> {
  private nombre: string;
  private telefono: number;
  private ID: number | null = null;

  constructor(nombre: string, telefono: number) {
    this.nombre = nombre;
    this.telefono = telefono;
  }

  //getters
  public getID(): number | null {
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

  //metodo de registro de proveedor
  registrarse(registroProveedores: Proveedor[], registroID: number[]): void {
    //verifica si el proveedor esta registrado o no;
    const proveedorRegistrado = registroProveedores.find(proveedor => proveedor.getNombre() === this.nombre && proveedor.getTelefono() === this.telefono);

    //si el proveedor ya fue registrado;
    if(proveedorRegistrado) {
      console.error(`El proveedor ${proveedorRegistrado.getNombre()} ya está registrado. Su ID es ${proveedorRegistrado.getID()}`);
      return;
    }

    //genera el ID unico para cada proveedor;
    let nuevoID: number = this.generarID();
    
    //mientras el nuevoID ya haya sido registrado;
    while(registroID.includes(nuevoID)) {
        //genera un ID nuevamente;
        nuevoID = this.generarID();
    }

    this.ID = nuevoID; //ID asignado a cada proveedor;
    registroID.push(this.ID); //almacena el ID correspondiente;
    registroProveedores.push(this); //almacena los proveedors registrados;

    console.log(`El proveedor ${this.nombre} ha sido registrado exitosamente. Su ID es ${this.ID}`);
}

  //metodo para generar IDs randoms;
  generarID(): number {
    return Math.floor(Math.random() * 100000); //Genera un ID random;
  }

  darBaja(registroProveedores: Proveedor[]): void {
      //verifica si el proveedor esta registrado o no;
      const proveedorRegistrado = registroProveedores.findIndex(proveedor => proveedor.getID() === this.ID);
      //si el proveedor esta registrado, lo elimina del array;
      if (proveedorRegistrado >= 0) {
          registroProveedores.splice(proveedorRegistrado, 1);
          console.log(`El proveedor ${this.nombre} con ID ${this.ID} ha sido eliminado.`);
      } else {
          console.error(`El proveedor con ID ${this.ID} no ha sido encontrado. Intente nuevamente`);
      }
  }

  modRegistro(registroProveedores: Proveedor[], datosAModificar: { nombre?: string; telefono?: number}): void {
    //verifica si el proveedor esta registrado o no;
    const indexProveedorRegistrado = registroProveedores.findIndex(proveedor => proveedor.getID() === this.ID);
    //si el proveedor esta registrado, modifica los datos ingresados;
    if (indexProveedorRegistrado >= 0) {
        const proveedorMod = registroProveedores[indexProveedorRegistrado];
        if (datosAModificar.nombre) proveedorMod.setNombre(datosAModificar.nombre);
        if (datosAModificar.telefono) proveedorMod.setTelefono(datosAModificar.telefono);
        console.log(`El proveedor con ID ${this.ID} ha sido modificado exitosamente. Sus nuevos datos son:\nNombre: ${proveedorMod.getNombre()}.\nTelefono: ${proveedorMod.getTelefono()}.`);
    } else {
        console.error(`El proveedor no ha sido encontrado. Intente nuevamente`);
    }
  }
}