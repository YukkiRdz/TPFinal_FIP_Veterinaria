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

  public mostrarProveedores(): void {
    if (this.registroProveedores.length === 0) {
      console.log("No hay proveedores registrados.");
    } else {
      console.log("Proveedores registrados:");
      this.registroProveedores.forEach((proveedor, index) => {
        console.log(
          `${index + 1}. Proveedor: ${proveedor.getNombre()}, Telefono: ${proveedor.getTelefono()}, ID: ${proveedor.getID()}`
        );
      });
    }
  }
  
  public mostrarVeterinarias(): void {
    if (this.registroVeterinarias.length === 0) {
      console.log("No hay veterinarias registradas.");
    } else {
      console.log("Veterinarias registradas:");
      this.registroVeterinarias.forEach((veterinaria, index) => {
        console.log(
          `${index + 1}. Veterinaria: ${veterinaria.getNombre()}, Dirección: ${veterinaria.getDireccion()}, Teléfono: ${veterinaria.getTelefono()}, ID: ${veterinaria.getID()}`
        );
      });
    }
  }
  
}
