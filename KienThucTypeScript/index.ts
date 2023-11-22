//* Generic
type User = {
  name: string;
  age: number;
};

// type Identity = { <Input>(value: Input): Input };

interface Identity<Input> {
  (value: Input): Input;
}

//* generic with arrow function
const identify = <Type>(value: Type) => value;

//* generic with normal function
// function identify<Type>(value:Type){
//     return value
// }

// const myIdentity:<Input>(value: Input) => Input = identify

// const myIdentity:{<Input>(value: Input) : Input} = identify

const myIdentity: Identity<number> = identify;
myIdentity(123);

const result = identify<User>({
  name: "Chi",
  age: 21,
});

interface lengthObj {
  length: number;
}

const logIdentity = <Type extends lengthObj>(value: Type) => {
  console.log(value.length);
  return value;
};
logIdentity({
  length: 200,
});

const getValue = <Obj, Key extends keyof Obj>(obj: Obj, key: Key) => {
  return obj[key];
};

getValue(
  {
    name: "chi",
    age: 20,
  },
  "age"
);

//* default generic

interface Box<Type = string> {
  value: Type;
}
const box: Box = {
  value: "chi",
};
const box2: Box<number> = {
  value: 123,
};
