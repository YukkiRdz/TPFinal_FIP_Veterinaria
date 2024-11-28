export interface Registro<T, ID> {
    //<T> es un tipo generico, se reemplaza por el necesario en cada clase;
    registrarse(lista: T[], ID: ID[]): void;
    darBaja(lista: T[]): void;
    modRegistro(lista: T[], datosAModificar: object): void;
    generarID(): number;
}
