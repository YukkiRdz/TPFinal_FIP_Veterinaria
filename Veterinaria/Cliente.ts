import { Paciente } from "./Paciente";
import { Registro } from './Interface';
import { RedVeterinaria } from "./RedVeterinaria";
import { ID } from "./ID";
export class Cliente implements Registro<Cliente, ID>  {
    private nombre: string;
    private telefono: number;
    private VIP: boolean = false;
    private ID: number | null = null; //mientras el cliente no se registre su ID es null;
    private visitas: number = 0;
    private pacientes: Paciente[] = [];

    constructor(nombre: string, telefono: number) {
        this.nombre = nombre;
        this.telefono = telefono;
    }

    //Getters

    public getNombre(): string {
        return this.nombre;
    }

    public getTelefono(): number{
        return this.telefono;
    }

    public getVIP(): boolean {
        return this.VIP;
    }

    public getID(): number | null {
        return this.ID;
    }

    public getVisitas(): number {
        return this.visitas;
    }

    public getPacientes(): Paciente[] {
        return this.pacientes;
    }

    //Setters

    public setNombre(nombre: string): void {
        if(!nombre){
            throw new Error('Nombre invalido');
        }
        this.nombre = nombre;
    }

    public setTelefono(telefono: number): void {
        if(telefono <= 0){
            throw new Error('Numero de telefono invalido');
        }
        this.telefono = telefono;
    }

    //Metodos

    //VIP
    esVIP(): boolean {
        return this.visitas >= 5;
    }

    //contador de visitas
    visitarVeterinaria(): void {
        this.visitas++;
        this.VIP = this.esVIP();
        console.log(`El cliente ${this.nombre} ha visitado ${this.visitas} vez/veces. Es VIP?: ${this.VIP}`);
    }

    //agregar a cada vet su propio arreglo de clientes;
    registrarse(registroClientes: Cliente[], registroID: ID[]): void {
        //verifica si el cliente esta registrado o no;
        const clienteRegistrado = registroClientes.find(cliente => cliente.getNombre() === this.nombre && cliente.getTelefono() === this.telefono);
        //si el cliente no fue encontrado;
        if(!clienteRegistrado) {
            this.ID = this.generarID(); //llamo al metodo para crear el ID random propio de la clase;
            //verifica si el ID se repite;
            const IDRegistrado = registroID.find(id => id.getID() === this.ID);

            if (IDRegistrado) {
                this.ID = this.generarID();
            } else {
            registroClientes.push(this); //almacena los clientes registrados;
            console.log(`El cliente ${this.nombre} ha sido registrado exitosamente. Su ID es ${this.ID}`);
            }

        if(clienteRegistrado) {
            console.error(`${clienteRegistrado.getNombre()} ya está registrado. Su ID es ${clienteRegistrado.getID()}`);
            }
        }
    }

    generarID(): number {
        return Math.floor(Math.random() * 100000); //Genera un ID random;
    }

    darBaja(registroClientes: Cliente[]): void {
        //verifica si el cliente esta registrado o no;
        const clienteRegistrado = registroClientes.findIndex(cliente => cliente.getID() === this.ID);
        //si el cliente esta registrado, lo elimina del array;
        if (clienteRegistrado >= 0) {
            registroClientes.splice(clienteRegistrado, 1);
            console.log(`El cliente ${this.nombre} con ID ${this.ID} ha sido eliminado.`);
        } else {
            console.error(`El cliente con ID ${this.ID} no ha sido encontrado. Intente nuevamente`);
        }
    }

    modRegistro(registroClientes: Cliente[], datosAModificar: { nombre?: string; telefono?: number}): void {
        //verifica si el cliente esta registrado o no;
        const indexClienteRegistrado = registroClientes.findIndex(cliente => cliente.getID() === this.ID);
        //si el cliente esta registrado, modifica los datos ingresados;
        if (indexClienteRegistrado >= 0) {
            const clienteMod = registroClientes[indexClienteRegistrado];
            if (datosAModificar.nombre) clienteMod.setNombre(datosAModificar.nombre);
            if (datosAModificar.telefono) clienteMod.setTelefono(datosAModificar.telefono);
            console.log(`El cliente ${this.nombre} con ID ${this.ID} ha sido modificado exitosamente. Sus nuevos datos son ${this}`);
        } else {
            console.error(`El cliente con ID ${this} no ha sido encontrado. Intente nuevamente`);
        }
    }

    //Metodos de registro de PACIENTES;

    registrarPaciente(paciente: Paciente): void {
        //verifica si el paciente esta registrado o no;
        const pacienteRegistrado = this.pacientes.find(paciente => paciente.getNombre() === paciente.getNombre() && paciente.getEspecie() === paciente.getEspecie());
        //si el paciente fue encontrado;
        if (!pacienteRegistrado) {
            paciente.setID(this.ID); // Asignamos el ID del cliente al paciente
            this.pacientes.push(paciente);
            console.log(`El paciente ${paciente.getNombre()} ha sido registrado bajo el cliente ${this.nombre}.`);
        } else {
            console.error(`El paciente ${paciente.getNombre()} ya está registrado bajo el cliente ${this.nombre}.`);
        }
    }

    darBajaPaciente(paciente: Paciente): void {
        //verifica si el paciente esta registrado o no;
        const pacienteRegistrado = this.pacientes.findIndex(paciente => paciente.getID() === paciente.getID());
        //si el paciente esta registrado, lo elimina del array;
        if (pacienteRegistrado >= 0) {
            this.pacientes.splice(pacienteRegistrado, 1);
            console.log(`El paciente ${paciente.getNombre()} con ID ${paciente.getID()} ha sido eliminado.`);
        } else {
            console.error(`El paciente con ID ${paciente.getID()} no ha sido encontrado. Intente nuevamente`);
        }
    }

    modPaciente(paciente: Paciente, datosAModificar: { nombre?: string; especie?: string}): void {
        //verifica si el paciente esta registrado o no;
        const indexPacienteRegistrado = this.pacientes.findIndex(paciente => paciente.getID() === paciente.getID());
        //si el paciente esta registrado, lo elimina del array;
        if (indexPacienteRegistrado >= 0) {
            const pacienteMod = paciente[indexPacienteRegistrado];
            if (datosAModificar.nombre) pacienteMod.setNombre(datosAModificar.nombre);
            if (datosAModificar.especie) pacienteMod.setEspecie(datosAModificar.especie);
            console.log(`El paciente ${pacienteMod.getNombre()} con ID ${paciente.getID()} ha sido modificado exitosamente. Sus nuevos datos son ${pacienteMod}}`);
        } else {
            console.error(`El paciente con ID ${paciente.getID()} no ha sido encontrado.`);
        }
    }
}