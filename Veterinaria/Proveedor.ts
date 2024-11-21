export class Proveedor implements interface {
  private nombre: string;
  private telefono: number;
  private ID: number | null = null;

  constructor(nombre: string, telefono: number) {
    this.nombre = nombre;
    this.telefono = telefono;
  }

  registrarse(): number {
    this.ID = Math.floor(Math.random() * 100000);
    console.log(`El proveedor ha sido registrado con el ID: ${this.ID}`);
    return this.ID;
  }

  darBaja(): void {
    this.ID = null;
    console.log(`El proveedor ha sido dado de baja y eliminado del registro.`);
  }

  modRegistro(nombre: string, direccion: string, telefono: number): void {
    if (nombre) this.nombre = nombre;
    if (telefono) this.telefono = telefono;
    console.log(
      `Proveedor Nombre - ${this.nombre} (ID: ${this.ID}) ha sido actualizada.`
    );
  }
}