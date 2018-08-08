let events =require ('events');
let util =require ('util');

let Person =function(name){
    this.name=name;
};

util.inherits(Person,events.EventEmitter);

let myEmiiter= new events.EventEmitter();

let john = new Person('John');
let mary=new Person('Mary');
let sejo = new Person('Sejo');

let people = [
    john,
    mary,
    sejo
];

people.forEach(function(person){
    person.on('speak',function(msg){
        console.log(person.name + ' said: '+ msg);

    });
});

sejo.emit('speak','What d fuck');

