import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";

//clientes

const cliente1 = new Cliente ('Thiago', 2284607563);
const paciente1 = new Paciente('Perci', 'Gato');

cliente1.visitarVeterinaria();
cliente1.getVisitas();
console.log(cliente1);

cliente1.visitarVeterinaria();
cliente1.visitarVeterinaria();
cliente1.visitarVeterinaria();
console.log(cliente1);
cliente1.visitarVeterinaria();
console.log(cliente1);
