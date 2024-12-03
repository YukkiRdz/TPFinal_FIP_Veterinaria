import { Veterinaria } from "./Veterinaria";
import { Proveedor } from "./Proveedor";

export class RedVeterinaria {
  private nombre: string;
  private registroVeterinarias: Veterinaria[] = [];
  private registroProveedores: Proveedor[] = [];
  private registroID: number[] = [];
  
  constructor(nombre: string) {
    this.nombre = nombre;
  }

//getters
  public getNombre(): string {
    return this.nombre;
  }

  public listadoVeterinarias(): Veterinaria[] {
    return this.registroVeterinarias;
  }
  
  public listadoProveedores(): Proveedor[] {
    return this.registroProveedores;
  }

  public listadoID(): number[] {
    return this.registroID;
  }
}