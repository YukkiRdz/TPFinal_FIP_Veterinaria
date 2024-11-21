import { Paciente } from "./Paciente";
import { Veterinaria } from "./Veterinaria";

export class Cliente {
    private nombre: string;
    private telefono: number;
    private VIP: boolean = false;
    private ID: number | null = null; //mientras el cliente no se registre su ID es null;
    private visitas: number = 0;
    private mascotas: Paciente[] = [];

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
        return this.mascotas;
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

    registrarse(registroClientes: Cliente[], veterinaria: Veterinaria): void {
        //verifica si el cliente esta registrado o no;
        const clienteRegistrado = registroClientes.find(cliente => cliente.getNombre() === this.nombre && cliente.getTelefono() === this.telefono);
        //si el cliente fue encontrado;
        if(!clienteRegistrado) {
            this.ID = this.generarID(); //llamo al metodo para crear el ID random propio de la clase;
            registroClientes.push(this); //almacena los clientes registrados;
            console.log(`El cliente ${this.nombre} ha sido registrado exitosamente. Su ID es ${this.ID}`);
        } else {
            console.warn(`${clienteRegistrado.getNombre()} ya está registrado. Su ID es ${clienteRegistrado.getID()}`);
        }
    }

    generarID(): number {
        return Math.floor(Math.random() * 100000); //Genera un ID random;
    }

    darBaja(registroClientes: Cliente[]): void {
        //verifica si el cliente esta registrado o no;
        const clienteRegistrado = registroClientes.findIndex(cliente => cliente.getID() === this.ID);
        //si el cliente esta registrado, lo elimina del array;
        if (clienteRegistrado === 1) {
            registroClientes.splice(clienteRegistrado, 1);
            console.log(`El cliente ${this.nombre} con ID ${this.ID} ha sido eliminado.`);
        } else {
            console.warn(`El cliente con ID ${this.ID} no ha sido encontrado. Intente nuevamente`);
        }
    }

    modRegistro(registroClientes: Cliente[], ID: number, datosAModificar: { nombre?: string; telefono?: number}): void {
        //verifica si el cliente esta registrado o no;
        const indexClienteRegistrado = registroClientes.findIndex(cliente => cliente.getID() === ID);
        //si el cliente esta registrado, lo elimina del array;
        if (indexClienteRegistrado === 1) {
            if (datosAModificar.nombre) registroClientes[indexClienteRegistrado].setNombre(datosAModificar.nombre);
            if (datosAModificar.telefono) registroClientes[indexClienteRegistrado].setTelefono(datosAModificar.telefono);
            console.log(`El cliente ${this.nombre} con ID ${this.ID} ha sido modificado exitosamente. Sus nuevos datos son ${this}`);
        } else {
            console.warn(`El cliente con ID ${this} no ha sido encontrado. Intente nuevamente`);
        }
    }
}