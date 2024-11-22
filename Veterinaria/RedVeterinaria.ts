export class RedVeterinaria {
  private arrayVeterinarias: Veterinaria[] = [];
  private arrayProveedores: Proveedor[] = [];

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