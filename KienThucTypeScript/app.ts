let car = "Porscher";
let bike: string;
bike = "Winner";

let num: number;

let isLoading: boolean = false;

// undefined

let body: undefined = undefined;

// null

let footer: null;

// any
let person: any;
person = 10;
person = "something";
person = false;

//* object

// let house = {}

// house.address = 'Da nang'

let house: {
  address: string;
  color?: string;
} = {
  address: "",
  // color:''
};
house.address = "Ha Noi";

//* array
let product: any[] = [];
product.push(1);
product.push("Hanoi");

// string[]
let names = ["chi", "michael"];
let address: string[] = [];
address.push("Ha noi");

// number[]
let numbers: number[] = [];
numbers = [1, 2, 3];

// object array
let people: {
  name: string;
  age: number;
}[] = [];
people.push({
  name: "minh chi",
  age: 27,
});

// function
const sum = (num1: number, num2: number): number => {
  return num1 + num2;
};
sum(1, 2);
const sub: (num1: number, num2: number) => number = (
  num1: number,
  num2: number
) => num1 - num2;
const handle = (): void => {
  console.log(123);
};

// union
let price: string | number | boolean;
price = "10";
price = 20;
price = false;

let bodys: { name: string | number } | { firstName: string } = {
  firstName: "Michael",
};

// enum
enum Sizes {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
}
let size = Sizes.S;

//* interface will merge state

// interface State{
//     name:string
//     isLoading:boolean
// }
// interface State{
//     age:number
// }
// let state : State ={
//     name:'chi',
//     isLoading:true,
//     age:21
// }

//* Type

// type State = {
//     name:string
//     isLoading:boolean
// }
// let state : State ={
//     name:'chi',
//     isLoading:true
// }

// type Name = {
//     name:string
// }
// type Age = {
//     age:number
// }
// type Person = Name | Age

const handleClick = <Type>(value: Type) => value;

let value = 100;
handleClick<string>("100");

//* Class
class Person1 {
  private name: string;
  age: number;
  readonly money: number = 40;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  handle() {
    this.name;
    // this.money = 100
  }
}

const alex = new Person1("alex", 27);
// alex.name
alex.age;
// alex.money = 200

class Person2 {
  constructor(public name: string, public age: number) {}
}
