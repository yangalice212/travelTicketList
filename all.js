let data = [];
let searchResultNum = 0;

let areaFilter = document.querySelector(".areaFilter select");
let ticketList = document.querySelector(".ticketList");
let searchResult = document.querySelector(".searchResult");

let addTicketName = document.querySelector("#ticketName");
let addTicketUrl = document.querySelector("#ticketUrl");
let addTicketArea = document.querySelector("#ticketArea");
let addTicketPrice = document.querySelector("#ticketPrice");
let addTicketNum = document.querySelector("#ticketNum");
let addTicketStar = document.querySelector("#ticketStar");
let addTicketDescrip = document.querySelector("#ticketDescrip");
let addTicketBtn = document.querySelector(".addTicketBtn");
// let addTicketInput = document.querySelectorAll(".addTicketInput");

let checkName = document.querySelector(".checkName");
let checkUrl = document.querySelector(".checkUrl");
let checkArea = document.querySelector(".checkArea");
let checkPrice = document.querySelector(".checkPrice");
let checkNum = document.querySelector(".checkNum");
let checkStar = document.querySelector(".checkStar");
let checkDescrip = document.querySelector(".checkDescrip");

function init() {
  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json"
    )
    .then(function (response) {
      data = response.data.data;
      renderData();
    });
}

function renderData() {
  let str = "";
  searchResultNum = 0;
  data.forEach(function (item, index) {
    str += showData(item);
    searchResultNum++;
  });

  ticketList.innerHTML = str;
  searchResult.textContent = searchResultNum;

  //addTicketInput.value = "";
  addTicketName.value = "";
  addTicketUrl.value = "";
  addTicketArea.value = "";
  addTicketDescrip.value = "";
  addTicketNum.value = "";
  addTicketPrice.value = "";
  addTicketStar.value = "";
}

function showData(item) {
  let str = `<li class="ticketListItem">
              <div class="ticketArea bg-secondary">${item.area}</div>
              <div class="ticketImg">
                <a href=""><img src="${item.imgUrl}" alt=""></a>
              </div>
              <div class="ticketInfo">
                <div class="ticketStar bg-primary">${item.rate}</div>
                <h3 class="fz-lg mb-3"><a href="#" class="text-primary">${item.name}</a></h3>
                <p class="ticketDescrip text-dGray mb-5">
                  ${item.description}
                </p>
                <div class="d-flex jc-between ai-center text-primary">
                  <p class="ticketLeft"><span class="tipsIcon"><i class="fas fa-exclamation-circle"></i></span>剩下最後 ${item.group} 組</p>
                  <p class="ticketPrice fz-xl d-flex ai-center"><span>TWD</span>$${item.price}</p>
                </div>
              </div>
            </li>`;
  return str;
}

function filter() {
  let str = "";
  let arr = [];
  data.forEach(function (item, index) {
    if (item.area === areaFilter.value) {
      str += showData(item);
      arr.push(item);
      searchResultNum = arr.length;
    } else if (areaFilter.value === "全部地區") {
      str += showData(item);
      arr.push(item);
      searchResultNum = arr.length;
    }
  });
  ticketList.innerHTML = str;
  searchResult.textContent = searchResultNum;
}

function addTicket() {
  let obj = {};
  obj.id = data.length;
  obj.name = addTicketName.value;
  obj.imgUrl = addTicketUrl.value;
  obj.area = addTicketArea.value;
  obj.description = addTicketDescrip.value;
  obj.group = addTicketNum.value;
  obj.price = addTicketPrice.value;
  obj.rate = addTicketStar.value;
  data.push(obj);
  renderData();
}

function checkAddTicketValue() {
  if (addTicketName.value === "") {
    checkArrTextIsShow();
    checkName.setAttribute("style", "display:block");
  } else if (addTicketUrl.value === "") {
    checkArrTextIsShow();
    checkUrl.setAttribute("style", "display:block");
  } else if (addTicketArea.value === "") {
    checkArrTextIsShow();
    checkArea.setAttribute("style", "display:block");
  } else if (
    addTicketPrice.value === "" ||
    isNaN(addTicketPrice.value) ||
    addTicketStar.value <= 0
  ) {
    checkArrTextIsShow();
    checkPrice.setAttribute("style", "display:block");
  } else if (
    addTicketNum.value === "" ||
    isNaN(addTicketNum.value) ||
    addTicketStar.value <= 0
  ) {
    checkArrTextIsShow();
    checkNum.setAttribute("style", "display:block");
  } else if (
    addTicketStar.value === "" ||
    isNaN(addTicketStar.value) ||
    addTicketStar.value <= 0 ||
    addTicketStar.value > 10
  ) {
    checkArrTextIsShow();
    checkStar.setAttribute("style", "display:block");
  } else if (addTicketDescrip.value === "") {
    checkArrTextIsShow();
    checkDescrip.setAttribute("style", "display:block");
  } else {
    addTicket();
    checkArrTextIsShow();
  }
}

function checkArrTextIsShow() {
  let checkText = [
    checkName,
    checkUrl,
    checkArea,
    checkPrice,
    checkNum,
    checkStar,
    checkDescrip,
  ];
  let checkArr = [];
  checkText.forEach(function (item) {
    checkArr.push(item);
  });
  checkArr.forEach(function (item) {
    item.setAttribute("style", "display: none");
  });
}

init();
areaFilter.addEventListener("change", filter);
addTicketBtn.addEventListener("click", checkAddTicketValue);
