let data = [
  {
    id: 0,
    name: "肥宅心碎賞櫻3日",
    imgUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    area: "高雄",
    description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: "貓空纜車雙程票",
    imgUrl:
      "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台北",
    description:
      "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: "台中谷關溫泉會1日",
    imgUrl:
      "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台中",
    description:
      "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    group: 20,
    price: 1765,
    rate: 7,
  },
];

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
let checkInput = document.querySelectorAll(".check");
let searchResultNum = 0;

function showData(item) {
  let str = "";
  str += `<li class="ticketListItem">
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

function init() {
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
init();

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
  init();
}

function checkAddTicketValue() {
  if (addTicketName.value === "") {
    checkInput.setAttribute("display", "block");
  }
}

areaFilter.addEventListener("change", filter);
addTicketBtn.addEventListener("click", addTicket);
addTicketBtn.addEventListener("click", checkAddTicketValue);
