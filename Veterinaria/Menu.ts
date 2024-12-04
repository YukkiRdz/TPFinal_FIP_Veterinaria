import * as readline from "readline";
import { RedVeterinaria } from "./RedVeterinaria";
import { Proveedor } from "./Proveedor";
import { Veterinaria } from "./Veterinaria";
import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";

// Inicialización
const redVeterinaria = new RedVeterinaria("OlavarriaFip");

class MenuConsola {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Iniciar el menú
  iniciar(): void {
    this.mostrarMenu();
  }

  // Menú principal
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
        process.exit(0);
        break;
      default:
        console.log("Esta opción no es válida, por favor intente de nuevo.");
        this.mostrarMenu();
        break;
    }
  }

  // Registrar veterinaria
  private registrarVeterinaria(): void {
    console.log("\n===== Registrar Veterinaria =====");
    this.rl.question("Ingrese el nombre: ", (nombre) => {
      //verifica que solo se pueda ingresar letras;
      if (!/^[A-Za-z\s]+$/.test(nombre)) {
        console.log("El nombre solo debe contener letras y espacios.");
        this.volverAlMenu();
        return;
      }
      this.rl.question("Ingrese la dirección: ", (direccion) => {
        this.rl.question("Ingrese el teléfono: ", (telefono) => {
          //verifica que el teléfono solo contiene dígitos;
          const telefonoValido = /^[0-9]+$/.test(telefono);

          if (!telefonoValido) {
            console.log("El teléfono debe contener solo números.");
            this.volverAlMenu();
            return;
          }

          //Convertir el teléfono a número
          const telefonoNumero = parseInt(telefono, 10);

          const veterinaria = new Veterinaria(
            nombre,
            direccion,
            telefonoNumero
          );
          veterinaria.registrarse(redVeterinaria.listadoVeterinarias(), redVeterinaria.listadoID());
          console.log("Veterinaria registrada con éxito.");
          this.volverAlMenu();
        });
      });
    });
  }

  // Registrar proveedor
  private registrarProveedor(): void {
    console.log("\n===== Registrar Proveedor =====");
    this.rl.question("Ingrese el nombre: ", (nombre) => {
      //verifica que solo se pueda ingresar letras;
      if (!/^[A-Za-z\s]+$/.test(nombre)) {
        console.log("El nombre solo debe contener letras y espacios.");
        this.volverAlMenu();
        return;
      }
      this.rl.question("Ingrese el teléfono: ", (telefono) => {
        //verifica que el teléfono solo contiene dígitos;
        const telefonoValido = /^[0-9]+$/.test(telefono);

        if (!telefonoValido) {
          console.log("El teléfono debe contener solo números.");
          this.volverAlMenu();
          return;
        }

        //Convertir el teléfono a número
        const telefonoNumero = parseInt(telefono, 10);

        const proveedor = new Proveedor(
          nombre,
          telefonoNumero
        );
        proveedor.registrarse(redVeterinaria.listadoProveedores(), redVeterinaria.listadoID());
        console.log("Proveedor registrado con éxito.");
        this.volverAlMenu();
      });
    });
  }

  // Mostrar veterinarias
  private mostrarVeterinarias(): void {
    console.log("\n===== Lista de Veterinarias =====");
    const veterinarias = redVeterinaria.listadoVeterinarias();
    if (veterinarias.length === 0) {
      console.log("No hay veterinarias registradas.");
      this.volverAlMenu();
    } else {
      veterinarias.forEach((vet, index) => {
        console.log(`${index + 1}. ${vet["nombre"]} - ID: ${vet["ID"]}`);
      });
      this.seleccionarVeterinaria(veterinarias);
    }
  }

  private seleccionarVeterinaria(veterinarias: any[]): void {
    this.rl.question(
      "Seleccione una veterinaria para gestionar (número): ",
      (opcion) => {
        const index = parseInt(opcion) - 1;
        if (index >= 0 && index < veterinarias.length) {
          this.mostrarMenuVeterinaria(veterinarias[index]);
        } else {
          console.log("Opción no válida. Volviendo al menú principal.");
          this.volverAlMenu();
        }
      }
    );
  }

  private mostrarMenuVeterinaria(veterinaria: any): void {
    console.log(`
    ===== MENÚ VETERINARIA: ${veterinaria.nombre} =====
    1. Registrar clientes
    2. Mostrar clientes
    3. Mostrar pacientes
    4. Modificar datos de la veterinaria
    5. Dar de baja veterinaria
    6. Atrás (menú principal)
    `);

    this.rl.question("Seleccione una opción: ", (opcion) => {
      this.procesarOpcionVeterinaria(opcion, veterinaria);
    });
  }

  private procesarOpcionVeterinaria(opcion: string, veterinaria: any): void {
    switch (opcion.trim()) {
      case "1":
        this.registrarCliente(veterinaria);
        break;
      case "2":
        this.mostrarClientes(veterinaria);
        break;
      case "3":
        this.mostrarPacientes(veterinaria);
        break;
      case "4":
        this.modificarDatosVeterinaria(veterinaria);
        break;
      case "5":
        this.darDeBajaVeterinaria(veterinaria);
        break;
      case "6":
        this.volverAlMenu();
        break;
      default:
        console.log("Opción no válida. Por favor intente de nuevo.");
        this.mostrarMenuVeterinaria(veterinaria);
        break;
    }
  }

  private registrarCliente(veterinaria: any): void {
    console.log("\n===== Registrar Cliente =====");
    this.rl.question("Ingrese el nombre del cliente: ", (nombre) => {
      //verifica que solo se pueda ingresar letras;
      if (!/^[A-Za-z\s]+$/.test(nombre)) {
        console.log("El nombre solo debe contener letras y espacios.");
        this.volverAlMenu();
        return;
      }
      this.rl.question("Ingrese el teléfono del cliente: ", (telefono) => {
        //verifica que el teléfono solo contiene dígitos;
        const telefonoValido = /^[0-9]+$/.test(telefono);

        if (!telefonoValido) {
          console.log("El teléfono debe contener solo números.");
          this.volverAlMenu();
          return;
        }

        //Convertir el teléfono a número
        const telefonoNumero = parseInt(telefono, 10);

        const cliente = new Cliente(nombre, parseInt(telefono));
        cliente.registrarse(veterinaria.getClientes(), redVeterinaria.listadoID());
        console.log("Cliente registrado con éxito.");
        this.volverAlMenuVeterinaria(veterinaria);
      });
    });
  }

  private mostrarClientes(veterinaria: any): void {
    console.log("\n===== Lista de Clientes =====");
    const clientes = veterinaria.mostrarClientes();
    if (clientes.length === 0) {
      console.log("No hay clientes registrados.");
    } else {
      clientes.forEach((cli, index) => {
        console.log(`${index + 1}. ${cli["nombre"]} - ID: ${cli["ID"]}`);
      });
    }
    this.volverAlMenuVeterinaria(veterinaria);
  }

  private mostrarPacientes(veterinaria: any): void {
    console.log("\n===== Lista de Pacientes =====");
    const pacientes = veterinaria.mostrarPacientes();
    if (pacientes.length === 0) {
      console.log("No hay pacientes registrados.");
    } else {
      pacientes.forEach((pac, index) => {
        console.log(`${index + 1}. ${pac["nombre"]} - ID: ${pac["ID"]}`);
      });
    }
    this.volverAlMenuVeterinaria(veterinaria);
  }

  private modificarDatosVeterinaria(veterinaria: any): void {
    console.log("\n===== Modificar Datos de la Veterinaria =====");
    this.rl.question("Ingrese el nuevo nombre: ", (nombre) => {
      this.rl.question("Ingrese la nueva dirección: ", (direccion) => {
        this.rl.question("Ingrese el nuevo teléfono: ", (telefono) => {
          veterinaria.modificarDatos(nombre, direccion, parseInt(telefono));
          console.log("Datos de la veterinaria modificados con éxito.");
          this.volverAlMenuVeterinaria(veterinaria);
        });
      });
    });
  }

  private darDeBajaVeterinaria(veterinaria: any): void {
    console.log(`\n===== Dar de Baja Veterinaria: ${veterinaria.nombre} =====`);
    veterinaria.darDeBaja();
    console.log("Veterinaria dada de baja con éxito.");
    this.volverAlMenu();
  }

  private volverAlMenuVeterinaria(veterinaria: any): void {
    console.log("\nPresione ENTER para volver al menú de la veterinaria...");
    this.rl.question("", () => {
      this.mostrarMenuVeterinaria(veterinaria);
    });
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
    //console.log(`;
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