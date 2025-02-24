/*interface carro{
    name: string,
    age: number,
}*/


type Person = {
    email: string,
    name: string | number,
    age: number,
}
const pessoa: Person = {
    email : "mail@gmail.com",
    name : "name",
    age : 20,
};
console.log(pessoa);


interface Carro {
    marca: string,
    age?: number,
    modelo: string,
}

const carro: Carro = {
    marca: "Ford",
    age: 2000,
    modelo: "Fiesta",
}

console.log(carro);

type MetodoPagamento = card | mbway | paypal;

interface Pagamento{
    valor: number;
    metodo: MetodoPagamento;
    detalhes: string;
};

const pagamento: Pagamento = {
    valor: 20,
    metodo: "card",
    detalhes: "informacao",
    carro: carro,
};


const MetodoPagamento = (p: Pagamento):string => {
    return `O pagamento de ${p.valor} foi feito com ${p.metodo} com os detalhes ${p.detalhes}`;
}

