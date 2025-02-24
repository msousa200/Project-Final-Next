class Veiculo {
    marca:string;
    modelo:string;
    ano:number;

    constructor(marca:string, modelo:string,ano:number){
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }

    description():string{
        return `O carro é ${this.marca} do modelo ${this.modelo} do ano ${this.ano}`;
    }
}

class Carro extends Veiculo {
    portas:number;
    constructor(marca:string, modelo:string,ano:number,portas:number){
        super(marca,modelo,ano);
        this.portas = portas;
    }

    description():string{
        return `${super.description()} e tem ${this.portas} número de portas`;
    }
    
}


console.log(carro.marca);
console.log(carro.modelo);
console.log(carro.ano);
console.log(carro.portas);
console.log(carro.description());



type Player = {
    name:string,
    age:number,
    game:string,
}


const playerPartial:Partial<Player> = {name:"Miguel"};
const playerReadonly:Readonly<Player> = {name:"Miguel",age:25,game:"Football"};
const playerPick:Pick<Player,"name"|"age"> = {name:"Miguel",age:25};
const playerOmit:Omit<Player,"game"> = {name:"Miguel",age:25};

console.log(playerPartial);
console.log(playerReadonly);
console.log(playerPick);
console.log(playerOmit);


class ListHandler<T>{
    items:T[] = [];

    add(item:T):void{
        this.items.push(item);
    }

    remove(item:T):void{
        this.items = this.items.filter(i => i !== item);
    }

    getAll():T[]{
        return this.items;
    }
}


const list = new ListHandler<Number>();

list.add(1);
list.add(2);
list.add(3);

console.log("Lista após adicionar itens:", list.getAll());

list.remove(2);

console.log("Lista após excluir itens:", list.getAll());



