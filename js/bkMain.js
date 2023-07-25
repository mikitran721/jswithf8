// prototype
function User(firstName, lastName, avatar) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.avatar = avatar;
  this.getName = function () {
    return `${this.firstName} ${this.lastName1}`;
  };
}

// dinh nghia bien o ngoai bi loi
User.className = "Poo";

// sd prototype
User.prototype.cityName = "HCMC";
// add funtion with prototype
User.prototype.getCityName = function () {
  return this.cityName;
};

let user = new User("an", "nguyen van", "av1");
let user2 = new User("bong", "bui", "ava2");

// user & user2 deu ke thua tu User;

console.log(user.className);
console.log(user.cityName);
console.log(user2);
console.log(user2.getCityName());

// reduce array
//tra ve tong cua 1 properties, vd: tong[coin]
var cources = [
  {
    id: 1,
    name: "Javascript",
    coin: 100,
  },
  {
    id: 2,
    name: "PHP",
    coin: 50,
  },
  {
    id: 3,
    name: "ReactJS",
    coin: 200,
  },
  {
    id: 4,
    name: "GraphQL",
    coin: 300,
  },
];

// c1
let totalCoin = 0;
for (var c of cources) {
  totalCoin += c.coin;
}

console.log("total with for: ", totalCoin);

// cach 2: dung reduce -> cach viet ngan toi uu hon
// reduce: ds1 la function; doi so 2 la gia tri khoi tao
// trong ds1 co tham so: 1.accumulator; ds2: currentValue; ds3: currentIndex; ds3: originArray (arraygoc)
// reduce return cai gi thi no luu tru cai do;

let i = 0;
var totalWithReduce = cources.reduce(function (
  accumulator,
  currentValue,
  currentIndex
) {
  i++;
  console.table({
    "Luot chay : ": i,
    "Bien tich chu: ": accumulator,
  });
  return accumulator + currentValue.coin;
},
0);

console.log(totalWithReduce);

// innerHTML,
var boxElement = document.querySelector(".box");

console.log(boxElement);

// innerText -> them ca cum text
// boxElement.innerText = "<h1>Heading</h1>";

// them element = innerHTML, outerHTML
// innerHTML: them text/element/attribute vao 1 item#
// boxElement.innerHTML = "<h1 title='miki'>InnerHTML Heading</h1>";

// console.log(document.querySelector("h1").innerText);
// lay phan tu innerHTML cua 1 item -> tra ve chuoi
console.log(boxElement.outerHTML);
boxElement.outerHTML = "<span>New span outerHTML</span>";
/* outerHTML se thay the toan bo noi dung HTML tu item duoc chon; <<>> ghi de
  - luc nay phan tu bi thay the van ton tai trong bo nho
  - it khi sd outerHTML
*/

console.log(boxElement);

//
