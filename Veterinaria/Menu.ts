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

          // Crea una nueva instancia de Veterinaria y la registra en la red
          const veterinaria = new Veterinaria(nombre, direccion, telefonoNumero);
          veterinaria.registrarse(redVeterinaria.listadoVeterinarias(), redVeterinaria.listadoID());
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

        // Crea una nueva instancia de Proveedor y lo registra en la red
        const proveedor = new Proveedor(nombre, telefonoNumero);
        proveedor.registrarse(redVeterinaria.listadoProveedores(), redVeterinaria.listadoID());
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
      this.volverAlMenu();
    } else {
      veterinarias.forEach((vet, index) => {
        // Muestra la lista de veterinarias registradas
        console.log(`${index + 1}. ${vet["nombre"]} - Direccion: ${vet['direccion']} - Telefono: ${vet['telefono']} - ID: ${vet["ID"]}`);
      });
      console.log(`${veterinarias.length + 1}. Volver atrás`);
      this.seleccionarVeterinaria(veterinarias); // Permite seleccionar una veterinaria para gestionar
      this.rl.question("Seleccione una veterinaria o 'Volver atrás': ", (opcion) => {
        const index = parseInt(opcion) - 1;
        if (index >= 0 && index < veterinarias.length) {
          console.log('Debe seleccionar una opcion valida.');
        } else if (index === veterinarias.length) {
          this.mostrarMenuVeterinaria(veterinarias[index]); // Vuelve al menú de la veterinaria
        } else {
          console.log("Opción no válida.");
          this.volverAlMenu();
        }
    });
  }
}

  // Permite seleccionar una veterinaria de la lista
  private seleccionarVeterinaria(veterinarias: Veterinaria[]): void {
    this.rl.question(
      "Seleccione una veterinaria para gestionar (número): ",
      (opcion) => {
        const index = parseInt(opcion) - 1;
        if (index >= 0 && index < veterinarias.length) {
          this.mostrarMenuVeterinaria(veterinarias[index]);
          // Muestra el menú de opciones para la veterinaria seleccionada
        } else {
          console.log("Opción no válida. Volviendo al menú principal.");
          this.volverAlMenu(); // Regresa al menú principal en caso de error
        }
      }
    );
  }

  // === MENÚ DE OPCIONES PARA UNA VETERINARIA ===
  private mostrarMenuVeterinaria(veterinaria: Veterinaria): void {
    console.log(`
    ===== MENÚ VETERINARIA: ${veterinaria.getNombre()} =====
    1. Registrar clientes
    2. Mostrar clientes
    3. Mostrar pacientes
    4. Modificar datos de la veterinaria
    5. Dar de baja veterinaria
    6. Atrás (volver a la lista de veterinarias)
    `);

    this.rl.question("Seleccione una opción: ", (opcion) => {
      this.procesarOpcionVeterinaria(opcion, veterinaria);
    });
  }

  // Procesa las opciones del menú veterinaria
  private procesarOpcionVeterinaria(opcion: string, veterinaria: Veterinaria): void {
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
        this.mostrarVeterinarias(); // Volver a la lista de veterinarias
        break;
      default:
        console.log("Opción no válida. Por favor intente de nuevo.");
        this.mostrarMenuVeterinaria(veterinaria);
        break;
    }
  }

  // === FUNCIONES PARA CLIENTES ===
  private registrarCliente(veterinaria: Veterinaria): void {
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

        const cliente = new Cliente(nombre, telefonoNumero);
        cliente.registrarse(veterinaria.getClientes(), redVeterinaria.listadoID());
        console.log("Cliente registrado con éxito.");
        this.volverAlMenuVeterinaria(veterinaria); // Vuelve al menú de veterinaria
      });
    });
  }

  private mostrarClientes(veterinaria: Veterinaria): void {
    console.log("\n===== Lista de Clientes =====");
    const clientes = veterinaria.getClientes();
    const pacientes = veterinaria.mostrarPacientes();
    if (clientes.length === 0) {
      console.log("No hay clientes registrados.");
      this.mostrarMenuVeterinaria(veterinaria);
    } else {
      clientes.forEach((cli, index) => {
        console.log(`${index + 1}. ${cli["nombre"]} - ID: ${cli["ID"]}`);
      });
  
      console.log(`${clientes.length + 1}. Volver atrás`);
      this.rl.question("Seleccione un cliente o 'Volver atrás': ", (opcion) => {
        const index = parseInt(opcion) - 1;
        if (index >= 0 && index < clientes.length) {
          const pacientes = new Paciente('', '')
          this.mostrarMenuCliente(pacientes, clientes[index], veterinaria); // Menú del cliente seleccionado
        } else if (index === clientes.length) {
          this.mostrarMenuVeterinaria(veterinaria); // Vuelve al menú de la veterinaria
        } else {
          console.log("Opción no válida.");
          this.mostrarClientes(veterinaria);
        }
      });
    }
  }

  // === MENÚ INDIVIDUAL DEL CLIENTE ===
  private mostrarMenuCliente(paciente: Paciente, cliente: Cliente, veterinaria: Veterinaria): void {
    console.log(`
    ===== MENÚ CLIENTE: ${cliente.getNombre()} =====
    1. Mostrar información
    2. Modificar datos
    3. Dar de baja cliente
    4. Registrar paciente
    5. Modificar datos del paciente
    6. Dar de baja al paciente
    7. Atrás (volver a lista de clientes)
    `);

    this.rl.question("Seleccione una opción: ", (opcion) => {
      switch (opcion.trim()) {
        case "1":
          console.log(`Nombre: ${cliente.getNombre()}, Teléfono: ${cliente.getTelefono()}`);
          this.mostrarMenuCliente(paciente, cliente, veterinaria);
          break;
        case "2":
          this.modificarDatosCliente(cliente, veterinaria);
          break;
        case "3":
          this.darDeBajaCliente(cliente, veterinaria);
          break;
        case "4":
          this.registrarPaciente(cliente, veterinaria);
        case "5":
          this.modificarDatosPaciente(paciente, cliente)
        case "6":
          this.darDeBajaPaciente(paciente, cliente, veterinaria)
        case "7":
          this.mostrarClientes(veterinaria); // Vuelve a la lista de clientes
          break;
        default:
          console.log("Opción no válida.");
          this.mostrarMenuCliente(paciente, cliente, veterinaria);
          break;
      }
    });
  }

  // === MODIFICAR Y DAR DE BAJA CLIENTES ===
  private modificarDatosCliente(cliente: Cliente, veterinaria: Veterinaria): void {
    this.rl.question("Nuevo nombre del cliente: ", (nombre) => {
      //verifica que solo se pueda ingresar letras;
      if (!/^[A-Za-z\s]+$/.test(nombre)) {
        console.log("El nombre solo debe contener letras y espacios.");
        this.volverAlMenu();
        return;
      }
      this.rl.question("Nuevo teléfono del cliente: ", (telefono) => {
        //verifica que el teléfono solo contiene dígitos;
        const telefonoValido = /^[0-9]+$/.test(telefono);

        if (!telefonoValido) {
          console.log("El teléfono debe contener solo números.");
          this.volverAlMenu();
          return;
        }

        //Convertir el teléfono a número
        const paciente = new Paciente('', '')
        const telefonoNumero = parseInt(telefono, 10);
        cliente.modRegistro(veterinaria.getClientes(), {nombre: nombre, telefono: telefonoNumero});
        console.log("Datos del cliente actualizados con éxito.");
        this.mostrarMenuCliente(paciente, cliente, veterinaria);
      });
    });
  }

  private darDeBajaCliente(cliente: Cliente, veterinaria: Veterinaria): void {
    cliente.darBaja(veterinaria.getClientes());
    console.log(`Cliente ${cliente.getNombre()} eliminado con éxito.`);
    this.mostrarClientes(veterinaria); // Vuelve a la lista de clientes
  }

  // === FUNCIONES PARA PACIENTES ===
  private registrarPaciente(cliente: Cliente, veterinaria: Veterinaria): void {
    console.log("\n===== Registrar Paciente=====");
    this.rl.question("Ingrese el nombre del paciente: ", (nombre) => {
      //verifica que solo se pueda ingresar letras;
      if (!/^[A-Za-z\s]+$/.test(nombre)) {
        console.log("El nombre solo debe contener letras y espacios.");
        this.volverAlMenu();
        return;
      }
      this.rl.question("Ingrese la especie del paciente: ", (especie) => {
        //verifica que solo se pueda ingresar letras;
      if (!/^[A-Za-z\s]+$/.test(especie)) {
        console.log("La especie solo debe contener letras.");
        this.volverAlMenu();
        return;
      }

        const paciente = new Paciente(nombre, especie);
        cliente.registrarPaciente(paciente);
        console.log("Paciente registrado con éxito.");
        this.mostrarMenuCliente(paciente, cliente, veterinaria); // Vuelve al menú del pacientes
      });
    });
  }

  private modificarDatosPaciente(paciente: Paciente, cliente: Cliente): void {
    this.rl.question("Nuevo nombre del paciente: ", (nombre) => {
      //verifica que solo se pueda ingresar letras;
      if (!/^[A-Za-z\s]+$/.test(nombre)) {
        console.log("El nombre solo debe contener letras y espacios.");
        this.volverAlMenu();
        return;
      }
      this.rl.question("Especie modificada del paciente: ", (especie) => {
      //verifica que solo se pueda ingresar letras;
      if (!/^[A-Za-z\s]+$/.test(especie)) {
        console.log("El nombre solo debe contener letras y espacios.");
        this.volverAlMenu();
        return;
      }
        cliente.modPaciente(paciente, {nombre: nombre, especie: especie});
        console.log("Datos del paciente actualizados con éxito.");
        // this.mostrarMenuCliente(cliente, veterinaria);
      });
    });
  }

  private darDeBajaPaciente(paciente: Paciente, cliente: Cliente, veterinaria: Veterinaria): void {
    cliente.darBajaPaciente(paciente);
    console.log(`Paciente ${paciente.getNombre()} eliminado con éxito.`);
    this.mostrarPacientes(veterinaria); // Vuelve a la lista de pacientes
  }

  private mostrarPacientes(veterinaria: Veterinaria): void {
    console.log("\n===== Lista de Pacientes =====");
    const pacientes = veterinaria.getPacientes();
    if (pacientes.length === 0) {
      console.log("No hay pacientes registrados.");
    } else {
      pacientes.forEach((pac, index) => {
        console.log(`${index + 1}. ${pac["nombre"]} - ID: ${pac["ID"]}`);
      });
    }
    this.mostrarMenuVeterinaria(veterinaria);
  }

  private modificarDatosVeterinaria(veterinaria: Veterinaria): void {
    console.log("\n===== Modificar Datos de la Veterinaria =====");
    this.rl.question("Ingrese el nuevo nombre: ", (nombre) => {
      //verifica que solo se pueda ingresar letras;
      if (!/^[A-Za-z\s]+$/.test(nombre)) {
        console.log("El nombre solo debe contener letras y espacios.");
        this.volverAlMenu();
        return;
      }
      this.rl.question("Ingrese la nueva dirección: ", (direccion) => {
        this.rl.question("Ingrese el nuevo teléfono: ", (telefono) => {
          //verifica que el teléfono solo contiene dígitos;
        const telefonoValido = /^[0-9]+$/.test(telefono);

        if (!telefonoValido) {
          console.log("El teléfono debe contener solo números.");
          this.volverAlMenu();
          return;
        }

        //Convertir el teléfono a número
        const telefonoNumero = parseInt(telefono, 10);
        veterinaria.modRegistro(redVeterinaria.listadoVeterinarias(), {nombre: nombre, direccion: direccion, telefono: telefonoNumero});
        console.log("Datos de la veterinaria modificados con éxito.");
        this.volverAlMenuVeterinaria(veterinaria);
        });
      });
    });
  }

  private darDeBajaVeterinaria(veterinaria: Veterinaria): void {
    console.log(`\n===== Dar de Baja Veterinaria: ${veterinaria.getNombre()} =====`);
    veterinaria.darBaja(redVeterinaria.listadoVeterinarias());
    console.log("Veterinaria dada de baja con éxito.");
    this.volverAlMenu();
  }

  private volverAlMenuVeterinaria(veterinaria: Veterinaria): void {
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

// Función de utilidad para volver al menú principal
private volverAlMenu(): void {
  this.mostrarMenu();
}
}

// Instancia del menú y ejecución del programa
const menu = new MenuConsola();
menu.iniciar();