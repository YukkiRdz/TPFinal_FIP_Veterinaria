export class Veterinaria extends interface {
  private nombre: string;
  private direccion: string;
  private telefono: number;
  private ID: number | null = null;

  constructor(nombre: string, direccion: string, numero: number, ID: number) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.numero = numero;
    this.ID = ID;
  }

  registrarse(): number {
    this.ID = Math.floor(Math.random() * 100000);
    console.log(`Su veterinaria ha sido registrada con el ID: ${this.ID}`);
  }

  darBaja(): void {
    this.ID = null;
    console.log(
      `La veterinaria ha sido dada de baja y eliminada del registro.`
    );
  }

  modRegistro(nombre: string, direccion: string, telefono: number) {
    if (nombre) this.nombre = nombre;
    if (direccion) this.direccion = direccion;
    if (telefono) this.telefono = telefono;
    console.log(
      `Veterinaria Nombre - ${this.nombre} (ID: ${this.ID}) ha sido actualizada.`
    );
  }
}
