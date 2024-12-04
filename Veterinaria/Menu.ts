import * as readline from "readline";
import { RedVeterinaria } from "./RedVeterinaria";
import { Proveedor } from "./Proveedor";
import { Veterinaria } from "./Veterinaria";
import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";


const redVeterinaria = new RedVeterinaria('OlavarriaFip');

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

//-------------MENU MOSTRAR VETERINARIA------------------------

//private mostrarMenuSuc(): void {
    //console.log(`
        //===== MENÚ SUCURSALES =====
        // 1. Veterinaria 1
        // 2. Veterinaria 2
        // 3. Veterinaria 3
        // 4. Veterinaria 4
        // 5. Salir
        // `);

    //this.rl.question("Seleccione una opción: ", (opcion) => {
       //this.procesarOpcion(opcion);
    //});
//}

//private mostrarMenuVet(): void {
    //console.log(`
            //===== MENÚ VETERINARIA =====
            // 1. Registrar cliente
            // 2. Mostrar clientes
            // 3. Mostrar pacientes
            // 4. Modificar datos de la veterinaria
            // 5. Dar de baja veterinaria
            // 6. Atras (vuelve al menu anterior)
            // 7. Salir (vuelve al menu principal)
            // `);

        //this.rl.question("Seleccione una opción: ", (opcion) => {
        //this.procesarOpcion(opcion);
        //});
//}

//private mostrarMenuCliente(): void {
    //console.log(`
            //===== MENÚ CLIENTE =====
            // 1. Modificar cliente
            // 2. Dar de baja cliente
            // 3. Registrar paciente
            // 4. Mostrar pacientes
            // 5. Modificar paciente
            // 6. Dar de baja paciente
            // 7. Atras (vuelve al menu anterior)
            // 8. Salir (vuelve al menu principal)
            // `);

        //this.rl.question("Seleccione una opción: ", (opcion) => {
        //this.procesarOpcion(opcion);
        //});
//}

//1-VET 1
    //1-Registrar cliente
    //2-Mostrar clientes
        //1-Cliente 1
            //1-Registrar paciente
            //2-Mostrar pacientes
        //2-Cliente 2
            //1-Registrar paciente
            //2-Mostrar pacientes
//2-VET 2
    //1-Registrar cliente
    //2-Mostrar clientes
        //1-Cliente 1
            //1-Registrar paciente
            //2-Mostrar pacientes
        //2-Cliente 2
            //1-Registrar paciente
            //2-Mostrar pacientes
