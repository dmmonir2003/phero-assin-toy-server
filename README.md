Interview Questions:
1. ANSWER:  
TypeScript offers a range of benefits over JavaScript, including improved type safety, tooling, and integration.
Early error detection during development.TypeScript has a rich ecosystem of tools that can make your development experience much more efficient.
TypeScript's type annotations make it easier to refactor your code. Overall, TypeScript is a powerful tool that can help you to write more reliable, maintainable, and efficient code.



2. ANSWER: 
Optional Chaining: Optional chaining was introduced in ES2020. Optional chaining is particularly useful when working with API data. If you're not sure whether an optional property exists, you can use  optional chaining.
Example:
const city = user?.add?.city;

Nullish Coalescing: The nullish coalescing operator is used to provide a default value for an expression if it evaluates to null or undefined. The nullish coalescing ( ?? ) operator is a logical operator that returns a default value when dealing with null or undefined.

Example:
const profileName = user?.name ?? 'unknown name';



4. ANSWER:
An enum is a special "class" that represents a group of constants (unchangeable variables). Enums come in two flavors string and numeric. Enums are just one useful way to organize code in TypeScript. With enums, you can create constants that you can easily relate to, making constants more legible.





5. ANSWER: 
A type guard is a TypeScript technique used to get information about the type of a variable, usually within a conditional block. Type guards are regular functions that return a boolean, taking a type and telling TypeScript if it can be narrowed down to something more specific. Type guards have the unique property of assuring that the value tested is of a set type depending on the returned boolean.

Example:

class Cat {
    name: string;
    constructor(name: string) {
        this.name = name
    }
}

const isCat = (cat: Cat): cat is Cat => {
    return cat instanceof Cat;
}



// check result -->>>>>>>>>optional
const animal = new Cat("pispis");
const animal2 = {name:'dog'};

if (isCat(animal)) {
   // console.log("yes, it's a cat.");
}
else {
   // console.log("no, it's not a cat.");
}

6. ANSWER: 



