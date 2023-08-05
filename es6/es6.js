// lam viec voi array
/* 
  kw: js array methods
  1. to string - chuyen sang chuoi,them dau ' tu dong
  2. Join -> chuyen sang chuoi voi ky tu noi dc dua vao
  3. pop - xoa sau & tra lai item do
  4. push them sau
  5. shift xoa truoc
  6. unshift them truoc
  7. splicing - splice() xoa, chen phan tu theo index dua vao
  8. concat
  9. slicing -
*/
var languages = ["js", "php", "golang", "css3"];
console.log(languages.toString());
console.log(languages.join("-"));
console.log(languages.pop());
console.log(languages.push("graphQL", "NodeJS"));
console.log(languages);
console.log(languages.unshift("html", "sass"));
console.log(languages);

// splicing: xoa, cat, chen phan tu vao mang
// xoa phan tu o vi tri nao splice(index, may phan tu xoa,so phan tu them moi vao) -> co tra ra phan tu duoc xoa o dang array
console.log(languages.splice(1, 2));

// 2. chen phan tu, splice(1,0)
console.log(languages.splice(2, 2, "Dart"));
console.log(languages);

// concat -> noi 2 arr
var languages2 = ["gurlp", "Mongoose"];
console.log(languages.concat(languages2));

// slicing - slice(tu vi tri nao, den vi tri nao); neu de tham so =0 thi se la copy cat mot vai item
console.log(languages.slice(1, 3));
