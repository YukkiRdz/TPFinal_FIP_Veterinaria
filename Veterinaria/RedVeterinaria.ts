import { Veterinaria } from "./Veterinaria";
import { Proveedor } from "./Proveedor";

export class RedVeterinaria {
    private arrayVeterinarias: Veterinaria[] = [];
    private arrayProveedores: Proveedor[] = [];
    protected registroID: number[] = [];
  
    listadoVeterinarias(): Veterinaria[] {
      return this.arrayVeterinarias;
    }
  
    listadoProveedores(): Proveedor[] {
      return this.arrayProveedores;
    }
  
    agregarVeterinaria(veterinaria: Veterinaria): void {
      this.arrayVeterinarias.push(veterinaria);
    }
  
    agregarProveedor(proveedor: Proveedor): void {
      this.arrayProveedores.push(proveedor);
    }
  }