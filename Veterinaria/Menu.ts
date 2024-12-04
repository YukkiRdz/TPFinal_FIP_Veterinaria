import * as readline from "readline";
import { RedVeterinaria } from "./RedVeterinaria";
import { Proveedor } from "./Proveedor";
import { Veterinaria } from "./Veterinaria";
import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";

// Inicialización de la red veterinaria
// La red gestiona el registro y manejo de veterinarias y proveedores.
const redVeterinaria = new RedVeterinaria("OlavarriaFip");

// Clase para gestionar los menús en consola
class MenuConsola {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Método principal para iniciar el programa
  iniciar(): void {
    this.mostrarMenu();
  }

  // === MENÚ PRINCIPAL ===
  private mostrarMenu(): void {
    console.log(`
    ===== MENÚ PRINCIPAL =====
    1. Registrar veterinaria
    2. Registrar proveedor
    3. Mostrar veterinarias
    4. Mostrar proveedores
    5. Salir
    `);

    // Captura de la opción seleccionada por el usuario
    this.rl.question("Seleccione una opción: ", (opcion) => {
      this.procesarOpcion(opcion);
    });
  }

  // Procesa la opción seleccionada en el menú principal
  private procesarOpcion(opcion: string): void {
    switch (opcion.trim()) {
      case "1":
        this.registrarVeterinaria(); // Registrar una nueva veterinaria
        break;
      case "2":
        this.registrarProveedor(); // Registrar un proveedor
        break;
      case "3":
        this.mostrarVeterinarias(); // Listar veterinarias registradas
        break;
      case "4":
        this.mostrarProveedores(); // Listar proveedores registrados
        break;
      case "5":
        console.log("Saliendo del programa...");
        this.rl.close(); // Finaliza la aplicación
        break;
      default:
        console.log("Esta opción no es válida, por favor intente de nuevo.");
        this.mostrarMenu(); // Regresa al menú principal en caso de error
        break;
    }
  }

  // === FUNCIONES PARA REGISTRAR VETERINARIA ===
  private registrarVeterinaria(): void {
    console.log("\n===== Registrar Veterinaria =====");
    // Solicita los datos necesarios para registrar una veterinaria
    this.rl.question("Ingrese el nombre: ", (nombre) => {
      this.rl.question("Ingrese la dirección: ", (direccion) => {
        this.rl.question("Ingrese el teléfono: ", (telefono) => {
          // Crea una nueva instancia de Veterinaria y la registra en la red
          const veterinaria = new Veterinaria(
            nombre,
            direccion,
            parseInt(telefono),
            redVeterinaria
          );
          veterinaria.registrarse();
          console.log("Veterinaria registrada con éxito.");
          this.volverAlMenu(); // Vuelve al menú principal
        });
      });
    });
  }

  // === FUNCIONES PARA REGISTRAR PROVEEDOR ===
  private registrarProveedor(): void {
    console.log("\n===== Registrar Proveedor =====");
    // Solicita los datos necesarios para registrar un proveedor
    this.rl.question("Ingrese el nombre: ", (nombre) => {
      this.rl.question("Ingrese el teléfono: ", (telefono) => {
        // Crea una nueva instancia de Proveedor y lo registra en la red
        const proveedor = new Proveedor(
          nombre,
          parseInt(telefono),
          redVeterinaria
        );
        proveedor.registrarse();
        console.log("Proveedor registrado con éxito.");
        this.volverAlMenu(); // Vuelve al menú principal
      });
    });
  }

  // === FUNCIONES PARA MOSTRAR VETERINARIAS ===
private mostrarVeterinarias(): void {
  console.log("\n===== Lista de Veterinarias =====");
  const veterinarias = redVeterinaria.listadoVeterinarias();
  if (veterinarias.length === 0) {
    console.log("No hay veterinarias registradas.");
  } else {
    veterinarias.forEach((vet, index) => {
      // Muestra la lista de veterinarias registradas
      console.log(`${index + 1}. ${vet["nombre"]} - ID: ${vet["ID"]}`);
    });
    this.seleccionarVeterinaria(veterinarias); // Permite seleccionar una veterinaria para gestionar
  }

  // Opción para volver al menú
  this.rl.question("\nPresione 'M' para volver al menú principal: ", (input) => {
    if (input.trim().toUpperCase() === 'M') {
      this.volverAlMenu(); // Vuelve al menú principal
    } else {
      console.log("Opción no válida. Volviendo al menú principal.");
      this.volverAlMenu(); // Regresa al menú principal en caso de error
    }
  });
}

  // Permite seleccionar una veterinaria de la lista
  private seleccionarVeterinaria(veterinarias: any[]): void {
    this.rl.question(
      "Seleccione una veterinaria para gestionar (número): ",
      (opcion) => {
        const index = parseInt(opcion) - 1;
        if (index >= 0 && index < veterinarias.length) {
          this.mostrarMenuVeterinaria(veterinarias[index]); // Muestra el menú de opciones para la veterinaria seleccionada
        } else {
          console.log("Opción no válida. Volviendo al menú principal.");
          this.volverAlMenu(); // Regresa al menú principal en caso de error
        }
      }
    );
  }

  // === MENÚ DE OPCIONES PARA UNA VETERINARIA ===
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

    // Captura la opción seleccionada en el menú de la veterinaria
    this.rl.question("Seleccione una opción: ", (opcion) => {
      this.procesarOpcionVeterinaria(opcion, veterinaria);
    });
  }

  // Procesa las opciones del menú veterinaria
  private procesarOpcionVeterinaria(opcion: string, veterinaria: any): void {
    switch (opcion.trim()) {
      case "1":
        this.registrarCliente(veterinaria); // Registra un nuevo cliente
        break;
      case "2":
        this.mostrarClientes(veterinaria); // Lista clientes registrados
        break;
      case "3":
        this.mostrarPacientes(veterinaria); // Lista pacientes registrados
        break;
      case "4":
        this.modificarDatosVeterinaria(veterinaria); // Permite modificar los datos de la veterinaria
        break;
      case "5":
        this.darDeBajaVeterinaria(veterinaria); // Elimina la veterinaria de la red
        break;
      case "6":
        this.volverAlMenu(); // Vuelve al menú principal
        break;
      default:
        console.log("Opción no válida. Por favor intente de nuevo.");
        this.mostrarMenuVeterinaria(veterinaria); // Vuelve al menú de la veterinaria
        break;
    }
  }

  // === FUNCIONES PARA CLIENTES ===
  private registrarCliente(veterinaria: any): void {
    console.log("\n===== Registrar Cliente =====");
    // Solicita datos del cliente
    this.rl.question("Ingrese el nombre del cliente: ", (nombre) => {
      this.rl.question("Ingrese el teléfono del cliente: ", (telefono) => {
        const cliente = new Cliente(nombre, parseInt(telefono), veterinaria);
        cliente.registrarse();
        console.log("Cliente registrado con éxito.");
        this.volverAlMenuVeterinaria(veterinaria); // Vuelve al menú de la veterinaria
      });
    });
  }

  private mostrarClientes(veterinaria: any): void {
    console.log("\n===== Lista de Clientes =====");
    const clientes = veterinaria.listadoClientes();
    if (clientes.length === 0) {
      console.log("No hay clientes registrados.");
    } else {
      clientes.forEach((cli, index) => {
        console.log(`${index + 1}. ${cli["nombre"]} - ID: ${cli["ID"]}`);
      });
      this.seleccionarCliente(veterinaria, clientes); // Permite gestionar un cliente seleccionado
    }
  }

  // === Funciones para pacientes y otras gestiones omitidas por espacio ===

  // Función de utilidad para volver al menú veterinaria
  private volverAlMenuVeterinaria(veterinaria: any): void {
    this.mostrarMenuVeterinaria(veterinaria);
  }

  // Función de utilidad para volver al menú principal
  private volverAlMenu(): void {
    this.mostrarMenu();
  }
}

// Instancia del menú y ejecución del programa
const menuConsola = new MenuConsola();
menuConsola.iniciar();
