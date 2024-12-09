import * as readlineSync from 'readline-sync';

import { RedVeterinaria } from './RedVeterinaria'; 
import { Veterinaria } from './Veterinaria'; 
import { Proveedor } from './Proveedor';
import { Cliente } from './Cliente';
import { Paciente } from './Paciente';


let red = new RedVeterinaria('OLAFIP')

function mainMenu() {
    let opcion: number;
    do {
        console.log(`
            ===== MENÚ PRINCIPAL =====
            1. Registrar veterinaria
            2. Registrar proveedor
            3. Mostrar veterinarias
            4. Mostrar proveedores
            5. Salir
            `);
        opcion = parseInt(readlineSync.question('Seleccione una opcion: '));

    switch (opcion) {
        case 1:
            let registroDeVeterinarias = red.listadoVeterinarias()
            let registroDeID = red.listadoID()
            let vetNombre = readlineSync.question('Ingrese el nombre: ');
            let vetDireccion = readlineSync.question('Ingrese la direccion: ');
            let vetTelefono = readlineSync.questionInt('Ingrese el telefono: ');
            const vet = new Veterinaria(vetNombre, vetDireccion, vetTelefono);
            vet.registrarse(registroDeVeterinarias, registroDeID);
        break;
        case 2:
            let registroDeProveedores = red.listadoProveedores()
            let provNombre = readlineSync.question('Ingrese el nombre: ');
            let provTelefono = readlineSync.questionInt('Ingrese el telefono: ');
            const prov = new Proveedor(provNombre, provTelefono);
            prov.registrarse(registroDeProveedores, red.listadoID());
        break
        case 3:
            menuGestionDeVeterinarias();
        break;
        case 4:
            menuGestionDeProveedores();
        break;
        case 5:
        console.log('Saliendo del programa...');
        return;
        default:
        console.error('Opción inválida. Vuelva a intentarlo.');
    }3
    } while (opcion !== 5);
}

function menuGestionDeVeterinarias() {
    let opcion: number;
    do {
        let veterinarias = red.listadoVeterinarias();

        //si NO hay veterinarias registradas;
        if (veterinarias.length === 0) {
            console.error("No hay veterinarias registradas.Volviendo al menú principal...");
            return; // vuelve al menu principal;
        }

        console.log('===== GESTIÓN DE VETERINARIAS ====');
        veterinarias.forEach((veterinaria, index) => {
            console.log(`${index + 1}. ${veterinaria.getNombre().toUpperCase()}, Dirección: ${veterinaria.getDireccion()}, Teléfono: ${veterinaria.getTelefono()}, ID: ${veterinaria.getID()}`);
        });
        console.log(`${veterinarias.length + 1}. Volver al menú principal`);
        
        opcion = parseInt(readlineSync.question('Seleccione una veterinaria para gestionar: '));

        if (opcion > 0 && opcion <= veterinarias.length) {
            // gestiona la veterinaria seleccionada
            let veterinariaSeleccionada = veterinarias[opcion - 1];
            menuVeterinaria(veterinariaSeleccionada);
        } else if (opcion === veterinarias.length + 1) {
            console.log("Volviendo al menú principal...");
            mainMenu();
        } else {
            console.log("Opción inválida. Inténtelo de nuevo.");
        }
    } while (opcion !== red.listadoVeterinarias().length + 1);
}

function menuVeterinaria(veterinariaSeleccionada: Veterinaria) {
    let opcion: number;
    do {
        console.log(`
            ===== VETERINARIA '${veterinariaSeleccionada.getNombre().toUpperCase()}' =====
                1. Registrar clientes
                2. Mostrar clientes
                3. Mostrar pacientes
                4. Modificar datos de la veterinaria
                5. Dar de baja veterinaria
                6. Atrás (volver a la lista de veterinarias)
            `);
        opcion = parseInt(readlineSync.question('Seleccione una opcion: '));

    switch (opcion) {
        case 1:
            let registroDeClientes = veterinariaSeleccionada.getClientes();
            let registroDeID = red.listadoID()
            let clienteNombre = readlineSync.question('Ingrese el nombre: ');;
            let clienteTelefono = readlineSync.questionInt('Ingrese el telefono: ');
            const nuevoCliente = new Cliente(clienteNombre, clienteTelefono);
            nuevoCliente.registrarse(registroDeClientes, registroDeID);
        break;
        case 2:
            menuGestionDeClientes(veterinariaSeleccionada);
        break;
        case 3:
            veterinariaSeleccionada.mostrarPacientes();
        break;
        case 4:
            let registroDeVeterinarias = red.listadoVeterinarias()

            const decisionNombre = readlineSync.question("Desea modificar el nombre? (y/n): ");
            let nombreMod: string | undefined;
            if (decisionNombre.toLowerCase() === 'y') {
                nombreMod = readlineSync.question('Ingrese el nuevo nombre: ');
            }
            
            const decisionDireccion = readlineSync.question("Desea modificar la direccion? (y/n): ");
            let direccionMod: string | undefined;
            if(decisionDireccion.toLowerCase() === 'y') {
                direccionMod = readlineSync.question('Ingrese la nueva direccion: ');
            }

            const decisionTelefono = readlineSync.question("Desea modificar el telefono? (y/n): ");
            let telefonoMod: number | undefined;
            if(decisionTelefono.toLowerCase() === 'y') {
                telefonoMod = readlineSync.questionInt('Ingrese el nuevo telefono: ');
            }
            veterinariaSeleccionada.modRegistro(registroDeVeterinarias, {nombre: nombreMod, direccion: direccionMod, telefono: telefonoMod})
        break;
        case 5:
            veterinariaSeleccionada.darBaja(red.listadoVeterinarias());
            mainMenu();
        break;
        case 6:
        console.log('Volviendo a la gestion de veterinarias...');
        return;
        default:
        console.error('Opción inválida. Vuelva a intentarlo.');
    }
    } while (opcion !== 6);
}

function menuGestionDeProveedores(){
    let opcion: number;
    do {
        let proveedores = red.listadoProveedores();

        //si NO hay proveedores registrados;
        if (proveedores.length === 0) {
            console.error("Volviendo al menú principal...");
            return; // vuelve al menu principal;
        }

        console.log('===== GESTIÓN DE PROVEEDORES ====');
        proveedores.forEach((proveedor, index) => {
            console.log(`${index + 1}. ${proveedor.getNombre()}`);
        });
        console.log(`${proveedores.length + 1}. Volver al menú principal`);
        
        opcion = parseInt(readlineSync.question('Seleccione un proveedor para gestionar: '));

        if (opcion > 0 && opcion <= proveedores.length) {
            // gestiona la proveedor seleccionado
            let proveedorSeleccionado = proveedores[opcion - 1];
            menuProveedor(proveedorSeleccionado);
        } else if (opcion === proveedores.length + 1) {
            console.log("Volviendo al menú principal...");
            mainMenu();
        } else {
            console.log("Opción inválida. Inténtelo de nuevo.");
        }
    } while (opcion !== red.listadoProveedores().length + 1);
}

function menuProveedor(proveedorSeleccionado: Proveedor) {
    let opcion: number;
    do {
        console.log(`
            ===== PROVEEDOR '${proveedorSeleccionado.getNombre().toUpperCase()}' =====
                1. Modificar datos del proveedor
                2. Dar de baja proveedor
                3. Atrás (volver a la lista de proveedores)
            `);
        opcion = parseInt(readlineSync.question('Seleccione una opcion: '));

    switch (opcion) {
        case 1:
            let registroDeProveedores = red.listadoProveedores()

            const decisionNombre = readlineSync.question("Desea modificar el nombre? (y/n): ");
            let nombreMod: string | undefined;
            if (decisionNombre.toLowerCase() === 'y') {
                nombreMod = readlineSync.question('Ingrese el nuevo nombre: ');
            }

            const decisionTelefono = readlineSync.question("Desea modificar el telefono? (y/n): ");
            let telefonoMod: number | undefined;
            if(decisionTelefono.toLowerCase() === 'y') {
                telefonoMod = readlineSync.questionInt('Ingrese el nuevo telefono: ');
            }
            proveedorSeleccionado.modRegistro(registroDeProveedores, {nombre: nombreMod, telefono: telefonoMod})
        break;
        case 2:
            proveedorSeleccionado.darBaja(red.listadoProveedores());
            mainMenu();
        break;
        case 3:
        console.log('Volviendo a la gestion de proveedores...');
        return;
        default:
        console.error('Opción inválida. Vuelva a intentarlo.');
    };
    } while (opcion !== 3);
}

function menuGestionDeClientes(veterinariaSeleccionada: Veterinaria) {
    let opcion: number;
    do {
        let clientes = veterinariaSeleccionada.getClientes();

        //si NO hay clientes registrados;
        if (clientes.length === 0) {
            console.error("Volviendo al menú principal...");
            return; // vuelve al menu principal;
        }

        console.log('===== GESTIÓN DE CLIENTES ====');
        clientes.forEach((clientes, index) => {
            console.log(`${index + 1}. ${clientes.getNombre()}`);
        });
        console.log(`${clientes.length + 1}. Volver al menú principal`);
        
        opcion = parseInt(readlineSync.question('Seleccione un cliente para gestionar: '));

        if (opcion > 0 && opcion <= clientes.length) {
            // gestiona el cliente seleccionado
            let clienteSeleccionado = clientes[opcion - 1];
            menuCliente(clienteSeleccionado, veterinariaSeleccionada);
        } else if (opcion === clientes.length + 1) {
            console.log("Volviendo al menú principal...");
            mainMenu();
        } else {
            console.log("Opción inválida. Inténtelo de nuevo.");
        }
    } while (opcion !== veterinariaSeleccionada.getClientes().length + 1);
}

function menuCliente(clienteSeleccionado: Cliente, veterinariaSeleccionada: Veterinaria) {
    let opcion: number;
    do {
        console.log(`
            ===== CLIENTE '${clienteSeleccionado.getNombre().toUpperCase()}' =====
                1. Mostrar información
                2. Modificar datos
                3. Dar de baja cliente
                4. Registrar paciente
                5. Mostrar pacientes
                6. Atrás (volver a lista de clientes)
            `);
        opcion = parseInt(readlineSync.question('Seleccione una opcion: '));

    switch (opcion) {
        case 1:
            console.log(clienteSeleccionado.toString());
        break;
        case 2:
            let registroDeClientes = veterinariaSeleccionada.getClientes();

            const decisionNombre = readlineSync.question("Desea modificar el nombre? (y/n): ");
            let nombreMod: string | undefined;
            if (decisionNombre.toLowerCase() === 'y') {
                nombreMod = readlineSync.question('Ingrese el nuevo nombre: ');
            }

            const decisionTelefono = readlineSync.question("Desea modificar el telefono? (y/n): ");
            let telefonoMod: number | undefined;
            if(decisionTelefono.toLowerCase() === 'y') {
                telefonoMod = readlineSync.questionInt('Ingrese el nuevo telefono: ');
            }
            clienteSeleccionado.modRegistro(registroDeClientes, {nombre: nombreMod, telefono: telefonoMod})
        break;
        case 3:
            clienteSeleccionado.darBaja(veterinariaSeleccionada.getClientes());
        break;
        case 4:
            let pacienteNombre = readlineSync.question('Ingrese el nombre del paciente: ');;
            let pacienteEspecie = readlineSync.question('Ingrese la especie del paciente: ');
            const nuevoPaciente = new Paciente(pacienteNombre, pacienteEspecie);
            clienteSeleccionado.registrarPaciente(nuevoPaciente);
        break;
        case 5:
            menuGestionDePacientes(clienteSeleccionado, veterinariaSeleccionada);
        break;
        case 6:
        console.log('Volviendo a la gestion de clientes...');
        return;
        default:
        console.error('Opción inválida. Vuelva a intentarlo.');
    };
    } while (opcion !== 6);
}

function menuGestionDePacientes(clienteSeleccionado: Cliente ,veterinariaSeleccionada: Veterinaria): void {
    let opcion: number;
    do {
        let pacientes = veterinariaSeleccionada.getPacientes();

        //si NO hay pacientes registrados;
        if (pacientes.length === 0) {
            console.error("Volviendo al menú principal...");
            return; // vuelve al menu principal;
        }

        console.log('===== GESTIÓN DE PACIENTES ====');
        pacientes.forEach((pacientes, index) => {
            console.log(`${index + 1}. ${pacientes.getNombre().toUpperCase()}`);
        });
        console.log(`${pacientes.length + 1}. Volver al menú principal`);
        
        opcion = parseInt(readlineSync.question('Seleccione un cliente para gestionar: '));

        if (opcion > 0 && opcion <= pacientes.length) {
            // gestiona el paciente seleccionado
            let pacienteSeleccionado = pacientes[opcion - 1];
            menuPaciente(pacienteSeleccionado, veterinariaSeleccionada, clienteSeleccionado);
        } else if (opcion === pacientes.length + 1) {
            console.log("Volviendo al menú principal...");
            mainMenu();
        } else {
            console.log("Opción inválida. Inténtelo de nuevo.");
        }
    } while (opcion !== veterinariaSeleccionada.getPacientes().length + 1);
}

function menuPaciente(pacienteSeleccionado: Paciente, veterinariaSeleccionada: Veterinaria, clienteSeleccionado: Cliente) {
    let opcion: number;
    do {
        console.log(`
            ===== PACIENTE '${pacienteSeleccionado.getNombre().toUpperCase()}' =====
                1. Mostrar información
                2. Modificar datos del paciente
                3. Dar de baja al paciente
                4. Atrás (volver a lista de clientes)
            `);
        opcion = parseInt(readlineSync.question('Seleccione una opcion: '));

    switch (opcion) {
        case 1:
            console.log(pacienteSeleccionado);
        break;
        case 2:
            const cambiarNombre = readlineSync.question("Desea modificar el nombre? (y/n): ");
            let nombrePacienteMod: string | undefined;
            if (cambiarNombre.toLowerCase() === 'y') {
                nombrePacienteMod = readlineSync.question('Ingrese el nuevo nombre: ');
            }

            const cambiarEspecie = readlineSync.question("Desea modificar la especie de su mascota? (y/n): ");
            let especieMod: string | undefined;
            if(cambiarEspecie.toLowerCase() === 'y') {
                especieMod = readlineSync.question('Ingrese la especie: ');
            }
            clienteSeleccionado.modPaciente(pacienteSeleccionado, {nombre: nombrePacienteMod, especie: especieMod})
        break;
        case 3:
            clienteSeleccionado.darBajaPaciente(pacienteSeleccionado);
            menuCliente(clienteSeleccionado, veterinariaSeleccionada);
        break;
        case 4:
        console.log('Volviendo a la gestion de pacientes...');
        return;
        default:
        console.error('Opción inválida. Vuelva a intentarlo.');
    };
    } while (opcion !== 4);
}
mainMenu();