// JSON
// let json = "null";
// let jsonArray = '["php","React"]';
// let jsonObject = '{"name":"poo","age":100}';
// let a = '"miki ngaoo"'; //day la json string
// console.log(JSON.stringify(jsonArray));
// console.log(typeof jsonArray);
// console.log(JSON.parse(jsonObject));

console.log(
  JSON.stringify({
    name: "Poo",
    age: 100,
    test() {},
  })
);

// promise

setTimeout(function () {
  console.log(1);
}, 1000);

// callback func

function myFunc(param) {
  console.log(typeof param);
  if (typeof param === "function") {
    param(2222);
  }
}

function myCallback(value) {
  console.log("value:", value);
}

// myCallback(22222);

myFunc(myCallback);

var courses = ["JS", "PHP", "Golang"];

// dinh nghia func qua prototype
Array.prototype.map2 = function (callback) {
  // toi uu hieu nang; dat this.length ra ngoai vong lap; de do duyet qua nhieu ngo ngach
  let output = [],
    arrLength = this.length;
  for (var i = 0; i < arrLength; i++) {
    let result = callback(this[i], i);
    output.push(result);
  }
  return output;
};

// callback la ham vo danh
let htmls = courses.map2(function (course, index) {
  return `<h2>${course}</h2>`;
});

console.log(htmls.join(""));

// for-in: lay index/key cua string, array, object
var myInfo = {
  name: "Poo",
  age: 200,
  add: "HCMC",
};

for (let key in myInfo) {
  console.log(key, myInfo[key]);
}

var courses = ["JS", "PHP", "Golang"];
for (let k in courses) {
  console.log(k, courses[k]);
}

// for-of: chi su dung voi array | string
var courses = ["JS", "PHP", "Golang"];
for (let v of courses) {
  console.log(v);
}

let str = "Poo";
for (let s of str) {
  console.log(s);
}

// voi object can thuc hien
var myInfo = {
  name: "Poo",
  age: 200,
  add: "HCMC",
};

// console.log(Object.values(myInfo));

for (let v of Object.values(myInfo)) {
  console.log(v);
}

// console.log(Object.keys(myInfo));
// for (let v of Object.keys(myInfo)) {
//   console.log(myInfo[v]);
// }

// Promise
/* Khai nhiem ve promise:
  var promise = new Promise(
    function(resolve, reject){}
  )
  - doi so cua no la 1 function - Executor, co 2 doi so: resolve, reject
  - khac phuc callback hell
  - xl thao tac bat dong bo
*/

var promise = new Promise(function (resolve, reject) {
  // logic
  //thanh cong: resolve
  //that bai: reject
  resolve({
    id: 1,
    name: "miki",
  });
});

promise
  .then(function (person) {
    console.log("Successfull", person);
  })
  .catch(function () {
    console.log("Co loi");
  })
  .finally(function () {
    console.log("Finally");
  });

var promise = new Promise(function (resolve, reject) {
  // logic
  //thanh cong: resolve
  //that bai: reject
  resolve({
    id: 1,
    name: "miki",
  });
});

promise
  .then(function (person) {
    console.log("Successfull", person);
    // return "then1";
    return new Promise(function (resolve) {
      setTimeout(resolve, 3000);
    });
  })
  .then(function (data) {
    console.log(data);
    return "then2";
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function () {
    console.log("Co loi");
  })
  .finally(function () {
    console.log("Finally");
  });
// empty array element
var courses = ["js", "reactjs"];
// co the thay doi dc length cua array
courses.length = 10;
console.log(courses, courses.length);

// giai phap: dung for in de lay cac phan tu thuc su
for (let index in courses) {
  console.log(courses[index]);
}

// cach khai bao khac
let courses2 = new Array(10);
for (let i2 of courses2) {
  console.log("for of", i2);
}

for (i3 in courses2) {
  console.log("for in", i3);
}
// promise: cach hoat dong
// tinh chat chuoi: chain; nhieu then().then().then(); kq cua then truoc la dau vao cua then() sau;
// 1 function ko return -> no tra ra undifined

function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
sleep(1000)
  .then(function () {
    console.log(1);
    return sleep(1000);
  })
  .then(function () {
    console.log(2);
    return new Promise(function (resolve, reject) {
      reject("Loi");
    });
  })
  .then(function () {
    console.log(3);
  })
  .catch(function (err) {
    console.log(err);
  });
// Promise: resolve, reject, all
// var promise = new Promise(function (resolve, reject) {
// resolve("success");
//   reject("co loi");
// });

//neu xac dinh ro resolve hay reject thi tao kieu khac
var promise = Promise.resolve("thanh cong");

promise
  .then(function (res) {
    console.log(res);
  })
  .catch(function (res) {
    console.log(res);
  });

// 2 promise chay //
var pro1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve([1]);
  }, 1000);
});
var pro2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve([2, 3]);
  }, 2000);
});
// hop nhat pro1 & pro2 -> dung promise.all
// Promise.all([pro1, pro2]).then(function (res) {
//   console.log(res[0].concat(res[1]));
// });
// theo es6
Promise.all([pro1, pro2]).then(function ([res1, res2]) {
  console.log(res1.concat(res2));
});
const sum = (a, b) => ({ a, b });
console.log(sum(5, 6));
// dau () de gom nhom, tra lai kq la 1 object

const course = {
  name: "JS",
  getName() {
    return this.name; //context
  },
};

console.log(course.getName());
// Module trong es6
// can them type=modules khi nhung script js
import { logger2 } from "./logger/index.js";
import * as constants from "./constants.js";
// import { TYPE_ERROR, TYPE_LOG, TYPE_WARN } from "./constants.js";
// logger("test message...", TYPE_LOG);
logger2("thu nghiem module", constants.TYPE_LOG);
