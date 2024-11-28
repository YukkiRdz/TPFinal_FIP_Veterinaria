export class ID {
    private ID: number;
    private arrayID: ID[] = [];

    constructor(ID: number) {
        this.ID = this.generarID();
    }

    //getters
    public getID(): number{
        return this.ID;
    }

    //Metodo;
    
    generarID(): number {
        return Math.floor(Math.random() * 100000); //Genera un ID random;
    }
}