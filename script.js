//constructor yapısı
let person= function(name,yearOfBirth,job) {
    this.name=name;
    this.yearOfBirth=yearOfBirth;
    this.job=job;
    
}
//prototype
 person.prototype.calculateAge=function() {
     return 2020-this.yearOfBirth;
 }
 person.prototype.getName=function() {
     return this.name;
 }
let cansel=new person('cansel',1997,'engineer'); //nesne
console.log(cansel);
console.log(cansel.name);
console.log(cansel.job);
console.log(cansel.calculateAge());
console.log(cansel.getName());

//Uygulama
//constructor
function Employee(name,salary) {
    if(!this instanceof Employee){
        return new Employee(name,salary);
    }
    this.name=name;
    this.salary=salary;
}
//prototype
Employee.prototype.calculateSalary=function () {
    var month=new Date().getMonth()+1;
    var tax=0;
    var total=this.salary*month;

    if(total<=20000){
        tax=total*0.2;
    }
    else if(total>20000 && total<=30000){
        tax=total*0.25;
    }
    else{
        tax=total*0.3;
    }
    return {
        tax: tax,
        paid:total-tax
    }

    console.log(month);
}

var emp1=new Employee('Can',3000);
console.log(emp1.calculateSalary());


var emp2=new Employee('Eda',4000)
console.log(emp2.calculateSalary());



//object.create

let personPhoto={
    calculateAge: function(){
        return 2020-this.yearOfBirth;
    }
}

let can=Object.create(personPhoto);
    can.name='can';
    can.yearOfBirth=1999;
    can.job='student';

let ece=Object.create(personPhoto);
    ece.name='ece';
    ece.yearOfBirth=1986;
    ece.job='teacher';


//İki farklı Constructor'dan Prototip Tabanlı Kalıtım
let Person= function (name,yearOfBirth,job) {
    this.name=name;
    this.yearOfBirth=yearOfBirth;
    this.job=job;
}
 Person.prototype.calculateAge=function () {
     return 2020-this.yearOfBirth;
 }

 let Teacher=function (name,yearofBirth,job,subject) {
     //person constructorı çağrılır.
     person.call(this,name,yearofBirth,job);
     this.subject=subject;
 }

 //Inherit the Person Prototype methods
 Teacher.prototype=Object.create(person.prototype);

 //set Teacher constructor
 Teacher.prototype.constructor=Teacher;

 Teacher.prototype.greeting=function () {
     return 'hello my name is ' +this.name;
 }


 let emel=new Teacher('emel',1986,'teacher','math');
    console.log(emel);
    console.log(emel.calculateAge());

//uygulama

//Person constructor
function PersonNew(name) {
    this.name=name;
}

PersonNew.prototype.Introduce=function () {
    console.log('hello my name is: '+this.name);
}

//Student Constructor  
function Student(name,number) {
   PersonNew.call(this,name);
   this.number=number;
}
Student.prototype=Object.create(PersonNew.prototype);
Student.prototype.constructor=Student;
Student.prototype.study=function () {
    console.log('My student number is: ' +this.number);
    
}
//Teacher Constructor
//Teacher dan bir nesne üretmek istediğim zaman constructorı kullanırım
function TeacherNew(name,branch) {
    PersonNew.call(this,name);
    this.branch=branch;
}
//Person prototype kopyalanır.
TeacherNew.prototype=Object.create(PersonNew.prototype);
TeacherNew.prototype.constructor=TeacherNew;
TeacherNew.prototype.teach=function () {
    console.log('I teach ' +this.branch);
}

//Headmaster constructor
function Headmaster(name, branch){
    TeacherNew.call(this,name,branch);
}
Headmaster.prototype=Object.create(TeacherNew.prototype);
Headmaster.prototype.constructor=Headmaster;
Headmaster.prototype.shareTask=function () {
    console.log('I have already shared all the work');

}


let p1 = new PersonNew('nil');
p1.Introduce(); 
let t1 = new TeacherNew('sezen','math');
t1.Introduce();
t1.teach();
let s1=new Student('ela','1234');
s1.Introduce();
s1.study();
let hm1=new Headmaster('ahmet','physics');
hm1.Introduce();//Person
hm1.teach();//Teacher
hm1.shareTask();//Headmaster

//Immediate Function
(function(name){
    var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var today = new Date();
    var msg ='Welcome ' +name +' Today is '+days[today.getDay()]; 
    console.log(msg);
}('Cansel'));


//getting setting
const people={
    firstName:'Cansel',
    lastName:'Tan'
}
Object.defineProperty(people, 'fullName',{
        get function () {
            return `${this.firstName} ${this.lastName}`
        },
        set function (value) {
            const parts = value.split(' ');
            this.firstName = parts[0];
            this.lastName=parts[1];
          
        }
})


Object.defineProperty(people,'age',{
    value:50,
    writable:true
})

people.age=55;
//people.firstName='Cansel';
//people.fullName='Cansel Tan';
//console.log(people.fullName);

console.log(people.age);
    
//Call, Apply, Bind
//Fonksiyon eğer bir parametre almıyorsa apply ve call metodunun kullanımı aynıdır. Ancak apply fonksiyonuna argümanlar dizi şeklinde yazılır. 
//Prototype tabanlı kalıtım yaparken kullanılır. Bir fonksiyonu hemen bir obje ile çağırmak istediğimizde kullanabiliriz.
//Bind() fonksiyonu diğerlerinden farklı olarak içine verilen objeye göre yeni bir fonksiyon kopyası yaratır.
var num={
    min:0,
    max:100,
    checkNumericRange: function (value) {
        if(typeof value!='number'){
            return false;
        }
        else{
            return value>=this.min && value<=this.max;
        }
    }
}
console.log(num.checkNumericRange(20));
console.log(num.checkNumericRange(-20));

var num1={min:50, max:70};
console.log(num.checkNumericRange.call(num1,65));
console.log(num.checkNumericRange.apply(num1,[57]));

var checkNumber=num.checkNumericRange.bind(num1);
console.log(checkNumber(54));


//error -> try-catch

document.getElementById("send").addEventListener('click',function (event) 
{
    var name=document.getElementById('name');
    var age=document.getElementById('age');
    var errors=document.getElementById('errors');
    errors.innerHTML= '';

    try{
        if(name.value.length==0){
            throw new Error('name is required');
        }
        if(name.value.length>=20){
            throw new Error('name is too long');
        }
        if(isNaN(age.value)){
            throw new Error('age is not numeric');

        }
        console.log("form is submitted");
    }

    catch(err){
        errors.innerHTML=err.message;
    }
    finally{
        name.value='';
        age.value='';
    }
   
    event.preventDefault();
});

