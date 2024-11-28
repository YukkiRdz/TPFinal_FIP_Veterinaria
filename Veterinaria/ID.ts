export class ID {
    private ID: number;

    constructor(ID: number) {
        this.ID = this.generarID();
    }

    //Metodo;
    
    generarID(): number {
        return Math.floor(Math.random() * 100000); //Genera un ID random;
    }
}