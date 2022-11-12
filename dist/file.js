"use strict";
let nameOfProduct = document.getElementById("nameOfProduct");
let priceChildern = document.querySelector(".price");
let originalPrice =
  priceChildern === null || priceChildern === void 0
    ? void 0
    : priceChildern.children[0];
let sellPrice =
  priceChildern === null || priceChildern === void 0
    ? void 0
    : priceChildern.children[1];
let discount =
  priceChildern === null || priceChildern === void 0
    ? void 0
    : priceChildern.children[2];
let spanPirce = document.querySelector(".totalprice");
let total =
  priceChildern === null || priceChildern === void 0
    ? void 0
    : priceChildern.children[3];
let count = document.getElementById("count");
let gender = document.getElementById("Gender");
let createButton = document.getElementById("CreateElement");
let table = document.querySelector("table");
let allInputs = document.querySelectorAll("input");
let mood = "create";
let tmp;
let searchButton = document.getElementById("search");
let searchIcon = document.getElementById("searchingIcon");
let ulChildern = document.querySelectorAll("ul li");
createButton.addEventListener("click", getDate);
function getTotal() {
  spanPirce.innerHTML =
    +sellPrice.value - +originalPrice.value - +discount.value;
}
let storageArray = [];
if (localStorage.product) {
  storageArray = JSON.parse(localStorage.product);
}
function getDate() {
  if (nameOfProduct.value !== "") {
    allInputs.forEach(function (e) {
      if (e.value !== "") {
        let object = {
          title: nameOfProduct.value,
          originalPrice: originalPrice.value || "-",
          sellPrice: sellPrice.value || "-",
          count: count.value || 1,
          gender: gender.value || "-",
          discount: discount.value || "-",
          spanPirce: spanPirce.innerHTML || "-",
          totalGain: spanPirce.innerHTML * count.value || "-",
        };
        if (mood === "create") {
          storageArray.push(object);
        } else {
          createButton.innerHTML = " انشاء العنصر";
          storageArray[tmp] = object;
          mood = "create";
          count.style.display = "block";
        }
        localStorage.setItem("product", JSON.stringify(storageArray));
        clearDate();
        readDate();
        deleteButton();
      }
    });
  } else {
    alert("من فضلك أدخل اسم المنتج");
  }
}
deleteButton();
function deleteButton() {
  if (storageArray.length > 0) {
    let button = document.getElementById("DeleteButton");
    button.innerHTML = ` <button onclick ="deleteAll()">حذف الكل (${storageArray.length})  </button>`;
  } else {
    let button = document.getElementById("DeleteButton");
    button.innerHTML = ``;
  }
}
function clearDate() {
  allInputs.forEach(function (e) {
    e.value = "";
  });
  spanPirce.innerHTML = "";
}
function readDate() {
  let table = "";
  for (let i = 0; i < storageArray.length; i++) {
    table += ` 
    <tr>
    <td>${i + 1}</td>
    <td>${storageArray[i].title}</td>
    <td>${storageArray[i].originalPrice}</td>
    <td>${storageArray[i].sellPrice}</td>
    <td>${storageArray[i].discount}</td>
    <td>${storageArray[i].gender}</td>
    <td>${storageArray[i].count}</td>
    <td>${storageArray[i].spanPirce}</td>
    <td>${storageArray[i].totalGain}</td>
    <td><button onclick="deleteDate(${i})" >حذف</button></td>
    <td><button onclick="updateDate(${i})">تعديل</button></td>
    <td><button onclick="decrement(${i})">-</button></td>
    </tr>
    `;
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = table;
  }
}
function decrement(i) {
  if (storageArray[i].count > 0) {
    storageArray[i].count = +storageArray[i].count - 1;
    localStorage.setItem("product", JSON.stringify(storageArray));
    readDate();
  } else {
    let obj = {
      name: storageArray[i].title,
      number: storageArray[i].count,
    };
    boxArray.push(obj);
    localStorage.setItem("Needed", JSON.stringify(boxArray));
    readingDate();
  }
}
function deleteDate(i) {
  if (storageArray.length === 0) {
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
  } else {
    storageArray.splice(i, 1);
    localStorage.product = JSON.stringify(storageArray);
    deleteButton();
    if (searchButton.value === "") {
      readDate();
    }
  }
}
function deleteAll() {
  storageArray.splice(0);
  localStorage.product = JSON.stringify(storageArray);
  readDate();
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  let button = document.getElementById("DeleteButton");
  button.innerHTML = ` `;
}
function updateDate(i) {
  nameOfProduct.value = storageArray[i].title;
  originalPrice.value = storageArray[i].originalPrice;
  sellPrice.value = storageArray[i].sellPrice;
  discount.value = storageArray[i].discount;
  spanPirce.innerHTML = storageArray[i].spanPirce;
  total.value = storageArray[i].totalGain;
  createButton.innerHTML = "تعديل العنصر";
  gender.value = storageArray[i].gender;
  count.style.display = "none";
  mood = "update";
  tmp = i;
}
readDate();
function search(value) {
  let table = "";
  for (let i = 0; i < storageArray.length; i++) {
    if (storageArray[i].title.includes(value)) {
      table += ` 
      <tr>
      <td>${i + 1}</td>
      <td>${storageArray[i].title}</td>
      <td>${storageArray[i].originalPrice}</td>
      <td>${storageArray[i].sellPrice}</td>
      <td>${storageArray[i].discount}</td>
      <td>${storageArray[i].gender}</td>
      <td>${storageArray[i].count}</td>
      <td>${storageArray[i].spanPirce}</td>
      <td>${storageArray[i].totalGain}</td>
      <td><button onclick="deleteDate(${i})" >حذف</button></td>
      <td><button onclick="updateDate(${i})">تعديل</button></td>
      </tr>
      `;
    }
  }
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = table;
}
if (searchButton.value !== "") {
  for (let i = 0; i < storageArray.length; i++) {
    if (storageArray[i].title.includes(searchButton.value)) {
      table += ` 
      <tr>
      <td>${i + 1}</td>
      <td>${storageArray[i].title}</td>
      <td>${storageArray[i].originalPrice}</td>
      <td>${storageArray[i].sellPrice}</td>
      <td>${storageArray[i].discount}</td>
      <td>${storageArray[i].gender}</td>
      <td>${storageArray[i].count}</td>
      <td>${storageArray[i].spanPirce}</td>
      <td>${storageArray[i].totalGain}</td>
      <td><button onclick="deleteDate(${i})" >حذف</button></td>
      <td><button onclick="updateDate(${i})">تعديل</button></td>
    
      </tr>
      `;
    }
  }
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = table;
}
ulChildern.forEach(function (e) {
  for (let i = 0; i < ulChildern.length; i++) {
    ulChildern[i].addEventListener("click", function () {
      e.classList.remove("active");
      ulChildern[i].classList.add("active");
    });
  }
});
let nameOfNeededElements = document.getElementById("nameOfNeeded");
let numberOfNeededElements = document.getElementById("numberOfNeeded");
let buttonCreated = document.getElementById("neededproductsButtons");
let boxArray = [];
if (localStorage.Needed) {
  boxArray = JSON.parse(localStorage.Needed);
}
buttonCreated.addEventListener("click", function () {
  if (nameOfNeededElements.value !== "") {
    let obj = {
      name: nameOfNeededElements.value,
      number: numberOfNeededElements.value,
    };
    boxArray.push(obj);
    localStorage.setItem("Needed", JSON.stringify(boxArray));
    readingDate();
  } else {
    alert("من فضلك ادخل اسم المنتج");
  }
});
function readingDate() {
  let table = "";
  for (let i = 0; i < boxArray.length; i++) {
    table += ` 
    <tr>
    <td>${i + 1}</td>
    <td>${boxArray[i].name}</td>
    <td>${boxArray[i].number}</td>
    <td><button onclick="deleteOne(${i})">حذف</button></td>
</tr>
    `;
    let tbody2 = document.getElementById("tbody2");
    tbody2.innerHTML = table;
  }
}
function deleteOne(i) {
  if (boxArray.length === 0) {
    let tbody2 = document.getElementById("tbody2");
    tbody2.innerHTML = "";
  } else {
    boxArray.splice(i, 1);
    localStorage.setItem("Needed", JSON.stringify(boxArray));
    readingDate();
  }
}
function Deleteall() {
  if (boxArray.length > 0) {
  }
}
readingDate();
//# sourceMappingURL=file.js.map
