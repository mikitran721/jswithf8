// node properties

// var boxElement = document.querySelector(".box");

// console.log([boxElement]);

// toan tu logic & cau kieu kien if
var a = 1;
var b = 2;

// let result = a < b && a < 0;
let result = null || "a" || undefined || "c";
/* 
    toan tu tra ve gtri false:
        0, '', null, undifined, NaN, false
    toan tu logic: && chi tra kq cua 1 trong 2 ve
    o bieu thuc: let result = "a" && "b" && "c";
    se kiem tra toan tu ben trai neu != false se tra ve gia tri ben phai cua no;
    || chi can gia tri false thi lay luon va return;
*/
console.log(result);

// ss khong tra ve dk
