import { Veterinaria } from "./Veterinaria";
import { Proveedor } from "./Proveedor";
import { ID } from "./ID";

export class RedVeterinaria {
    private arrayVeterinarias: Veterinaria[] = [];
    private arrayProveedores: Proveedor[] = [];
    private arrayID: ID[] = [];
  
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