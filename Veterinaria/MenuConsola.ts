import * as readline from "readline";
import { RedVeterinaria } from "./RedVeterinaria";
import { Veterinaria } from "./Veterinaria";
import { Proveedor } from "./Proveedor";
// Faltaria agregar Cliente y Paciente

const redVeterinaria = new RedVeterinaria();

class MenuConsola {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  iniciar(): void {
    this.mostrarMenu();
  }

  private mostrarMenu(): void {
    console.log(`
    ===== MENÚ PRINCIPAL =====
    1. Registrar veterinaria
    2. Registrar proveedor
    3. Mostrar veterinarias
    4. Mostrar proveedores
    5. Salir
    `);

    this.rl.question("Seleccione una opción: ", (opcion) => {
      this.procesarOpcion(opcion);
    });
  }

  private procesarOpcion(opcion: string): void {
    switch (opcion.trim()) {
      case "1":
        this.registrarVeterinaria();
        break;
      case "2":
        this.registrarProveedor();
        break;
      case "3":
        this.mostrarVeterinarias();
        break;
      case "4":
        this.mostrarProveedores();
        break;
      case "5":
        console.log("Saliendo del programa...");
        this.rl.close();
        break;
      default:
        console.log("Esta opción no es válida, por favor intente de nuevo.");
        this.mostrarMenu();
        break;
    }
  }

  private registrarVeterinaria(): void {
    console.log("\n===== Registrar Veterinaria =====");
    this.rl.question("Ingrese el nombre: ", (nombre) => {
      this.rl.question("Ingrese la dirección: ", (direccion) => {
        this.rl.question("Ingrese el teléfono: ", (telefono) => {
          const veterinaria = new Veterinaria(
            nombre,
            direccion,
            parseInt(telefono),
            redVeterinaria
          );
          veterinaria.registrarse();
          console.log("Veterinaria registrada con éxito.");
          this.volverAlMenu();
        });
      });
    });
  }

  private registrarProveedor(): void {
    console.log("\n===== Registrar Proveedor =====");
    this.rl.question("Ingrese el nombre: ", (nombre) => {
      this.rl.question("Ingrese el teléfono: ", (telefono) => {
        const proveedor = new Proveedor(
          nombre,
          parseInt(telefono),
          redVeterinaria
        );
        proveedor.registrarse();
        console.log("Proveedor registrado con éxito.");
        this.volverAlMenu();
      });
    });
  }

  private mostrarVeterinarias(): void {
    console.log("\n===== Lista de Veterinarias =====");
    const veterinarias = redVeterinaria.listadoVeterinarias();
    if (veterinarias.length === 0) {
      console.log("No hay veterinarias registradas.");
    } else {
      veterinarias.forEach((vet, index) => {
        console.log(`${index + 1}. ${vet["nombre"]} - ID: ${vet["ID"]}`);
      });
    }
    this.volverAlMenu();
  }

  private mostrarProveedores(): void {
    console.log("\n===== Lista de Proveedores =====");
    const proveedores = redVeterinaria.listadoProveedores();
    if (proveedores.length === 0) {
      console.log("No hay proveedores registrados.");
    } else {
      proveedores.forEach((prov, index) => {
        console.log(`${index + 1}. ${prov["nombre"]} - ID: ${prov["ID"]}`);
      });
    }
    this.volverAlMenu();
  }

  private volverAlMenu(): void {
    console.log("\nPresione ENTER para volver al menú...");
    this.rl.question("", () => {
      this.mostrarMenu();
    });
  }
}

// Inicializar el menú
const menu = new MenuConsola();
menu.iniciar();
