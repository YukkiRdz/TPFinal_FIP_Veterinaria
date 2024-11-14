import {Metodos} from './Interface'
export class Cliente implements Metodos{
    private nombre: string;
    private telefono: number;
    private VIP: boolean = false;
    private ID: number;

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

    public getID(): number {
        return this.ID;
    }

    //Setters

    public setNombre(nombre: string): void {
        if(!nombre){
            throw new Error('Nombre invalido');
        }
        this.nombre = nombre;
    }

    public setTelefono(telefono: number): void {
        if(!telefono){
            throw new Error('Numero de telefono invalido');
        }
        this.telefono = telefono;
    }

    //Metodos

    registrarse(): void{
    };

    darBaja(): void {

    }

    modRegistro(): void {

    }
}