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
            this.especie = 'exótico'
            console.log('Su mascota es un animal exotico');
        }
    }

    setID(clienteID: number): void {
        this.ID = clienteID; // Asignar el ID del cliente al paciente
    }
}