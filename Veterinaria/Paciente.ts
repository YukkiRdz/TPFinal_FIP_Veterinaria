import {Cliente} from './Cliente'

export class Paciente {
    private nombre: string;
    private especie: string;
    private ID: number | null = null;

    constructor(nombre: string, especie: string) {
        this.nombre = nombre;
        this.especie = especie;
    }

    //Getters

    public getNombre(): string {
        return this.nombre;
    }

    public getEspecie(): string {
        return this.especie;
    }

    public getID(): number | null {
        return this.ID;
    }

    //Setters

    public setNombre(nombre: string): void {
        if(!nombre){
            throw new Error('Nombre invalido');
        }
        this.nombre = nombre;
    }

    public setEspecie(especie: string ): void {
        if(especie === 'gato'){
            this.especie = especie;
            console.log('Su mascota es un gato');
        } else if (especie === 'perro'){
            this.especie = especie;
            console.log('Su mascota es un perro');
        } else {
            console.log('Su mascota es un animal exotico');
        }
    }

    //Metodos

    registrarse(paciente: Paciente[], cliente: Cliente): void {
        //verifica si el paciente esta registrado o no;
        const pacienteRegistrado = paciente.find(paciente => paciente.getNombre() === this.nombre && paciente.getEspecie() === this.especie);
        //si el paciente fue encontrado;
        if(!pacienteRegistrado) {
            this.ID = cliente.getID(); //se le asigna el ID del paciente;
            paciente.push(this); //almacena los pacientes registrados;
            console.log(`El ${this.especie} ${this.nombre} ha sido registrado exitosamente. Su ID es ${this.ID}`);
        } else {
            console.warn(`${pacienteRegistrado.getNombre()} ya está registrado. El ID de su dueño es ${pacienteRegistrado.getID()}`);
        }
    }

    darBaja(paciente: Paciente[], cliente: Cliente): void {
        //verifica si el paciente esta registrado o no;
        const pacienteRegistrado = paciente.findIndex(cliente => cliente.getID() === this.ID);
        //si el paciente esta registrado, lo elimina del array;
        if (pacienteRegistrado === 1) {
            paciente.splice(pacienteRegistrado, 1);
            console.log(`El paciente ${this.nombre} con ID ${this.ID} ha sido eliminado.`);
        } else {
            console.warn(`El paciente con ID ${this.ID} no ha sido encontrado. Intente nuevamente`);
        }
    }

    modRegistro(paciente: Paciente[], ID: number, datosAModificar: { nombre?: string; especie?: string}): void {
        //verifica si el paciente esta registrado o no;
        const indexPacienteRegistrado = paciente.findIndex(cliente => cliente.getID() === ID);
        //si el paciente esta registrado, lo elimina del array;
        if (indexPacienteRegistrado === 1) {
            if (datosAModificar.nombre) paciente[indexPacienteRegistrado].setNombre(datosAModificar.nombre);
            if (datosAModificar.especie) paciente[indexPacienteRegistrado].setEspecie(datosAModificar.especie);
            console.log(`El paciente ${this.nombre} con ID ${this.ID} ha sido modificado exitosamente. Sus nuevos datos son ${this}`);
        } else {
            console.warn(`El paciente con ID ${this} no ha sido encontrado. Intente nuevamente`);
        }
    }
}