import { RedVeterinaria } from "./RedVeterinaria";
import { Veterinaria } from "./Veterinaria";
import { Proveedor } from "./Proveedor";
import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";
import { log } from "console";

//creacion de la red de veterinarias;
const RedVets = new RedVeterinaria('OlavarriaFip');

//creacion de sucursales;
const vet1 = new Veterinaria('Sucursal 1', 'Calle123', 22845066260);
const vet2 = new Veterinaria('Sucursal 2', 'Calle456', 22845065324860);

//Creacion de proveedores;
const prov1 = new Proveedor('Arcuri', 2139867219837129);
const prov2 = new Proveedor('Amico', 123123890);

//Creacion de clientes;
const cliente1 = new Cliente ('Thiago', 2284607563);
const cliente2 = new Cliente ('Juliana', 22846796834);

//creacion de pacientes;
const paciente1 = new Paciente('Perci', 'Gato');
const pac2 = new Paciente('India', 'Perro');

//registros de la Red;
let registroVeterinarias: Veterinaria[] = RedVets.listadoVeterinarias();
console.log(`Veterinarias registradas: ${registroVeterinarias}`);

let registroProveedores: Proveedor[] = RedVets.listadoProveedores();
console.log(`Proveedores registrados: ${registroProveedores}`);

let registroID: number[] = RedVets.listadoID();
console.log(`IDs registrados: ${registroID}`);

//Registro de sucursales;
vet1.registrarse(registroVeterinarias, registroID);
vet2.registrarse(registroVeterinarias, registroID);

//Registro de proveedores;
prov1.registrarse(registroProveedores, registroID);

//registros de la veterinaria;
let registroClientes1: Cliente[] = vet1.getClientes();
let registroClientes2: Cliente[] = vet2.getClientes();

//Registro de clientes;
cliente1.registrarse(registroClientes1, registroID);
cliente2.registrarse(registroClientes2, registroID);

//Registro de paciente;
cliente1.registrarPaciente(paciente1);

//Modificacion de registros
cliente1.modRegistro(registroClientes1, {nombre: 'sadsa'});
cliente1.modPaciente(paciente1, {especie: 'perro'});
vet2.modRegistro(registroVeterinarias, {direccion: 'otra calle'});
prov2.modRegistro(registroProveedores, {telefono: 123612932180937});
prov1.modRegistro(registroProveedores, {telefono: 2180937});

//Dada de baja
cliente1.darBajaPaciente(paciente1);
cliente2.darBaja(registroClientes2);
vet2.darBaja(registroVeterinarias);

//Listas
RedVets.mostrarVeterinarias();
RedVets.mostrarProveedores();
console.log('SUCURSAL 1');
vet1.mostrarClientes();
vet1.mostrarPacientes();
console.log('SUCURSAL 2:');
vet2.mostrarClientes();
vet2.mostrarPacientes();
console.log(`IDs registrados: ${registroID}`);

// cliente1.visitarVeterinaria();
// cliente1.getVisitas();
// console.log(cliente1);

// cliente1.visitarVeterinaria();
// cliente1.visitarVeterinaria();
// cliente1.visitarVeterinaria();
// console.log(cliente1);
// cliente1.visitarVeterinaria();
// console.log(cliente1);
