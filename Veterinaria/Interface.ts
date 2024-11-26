export interface Registro<T> {
    //<T> es un tipo generico, se reemplaza por el necesario en cada clase;
    registrarse(lista: T[]): void;
    darBaja(lista: T[]): void;
    modRegistro(lista: T[], datosAModificar: object): void;
}
