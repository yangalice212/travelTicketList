let data = [];
let searchResultNum = 0;

const areaFilter = document.querySelector(".areaFilter select");
const ticketList = document.querySelector(".ticketList");
const searchResult = document.querySelector(".searchResult");

const addTicketName = document.querySelector("#ticketName");
const addTicketUrl = document.querySelector("#ticketUrl");
const addTicketArea = document.querySelector("#ticketArea");
const addTicketPrice = document.querySelector("#ticketPrice");
const addTicketNum = document.querySelector("#ticketNum");
const addTicketStar = document.querySelector("#ticketStar");
const addTicketDescrip = document.querySelector("#ticketDescrip");
const addTicketBtn = document.querySelector(".addTicketBtn");
const addTicketInput = document.querySelectorAll(".addTicketInput");
const inputList = [...addTicketInput]; //將類陣列轉為純陣列

const checkName = document.querySelector(".checkName");
const checkUrl = document.querySelector(".checkUrl");
const checkArea = document.querySelector(".checkArea");
const checkPrice = document.querySelector(".checkPrice");
const checkNum = document.querySelector(".checkNum");
const checkStar = document.querySelector(".checkStar");
const checkDescrip = document.querySelector(".checkDescrip");

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
  inputList.forEach((i) => {
    i.value = "";
  });
  renderChart();
}

function renderChart() {
  const totalObj = {};
  data.forEach(function (item, index) {
    if (totalObj[item.area] === undefined) {
      totalObj[item.area] = 1;
    } else {
      totalObj[item.area] += 1;
    }
  });

  const areaArr = Object.keys(totalObj);
  let newData = [];
  areaArr.forEach(function (item, index) {
    let arr = [];
    arr.push(item);
    arr.push(totalObj[item]);
    newData.push(arr);
  });

  let chart = c3.generate({
    bindto: ".chart",
    data: {
      columns: newData,
      type: "donut",
      colors: {
        台北: "#26C0C7",
        台中: "#5151D3",
        高雄: "#E68618",
      },
    },
    size: {
      width: 200,
      height: 160,
    },
    donut: {
      title: "套票地區比重",
      width: 10,
      label: {
        show: false,
      },
    },
  });
}

function showData(item) {
  const str = `<li class="ticketListItem">
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
    addTicketPrice.value <= 0
  ) {
    checkArrTextIsShow();
    checkPrice.setAttribute("style", "display:block");
  } else if (
    addTicketNum.value === "" ||
    isNaN(addTicketNum.value) ||
    addTicketNum.value <= 0
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
  const checkText = [
    checkName,
    checkUrl,
    checkArea,
    checkPrice,
    checkNum,
    checkStar,
    checkDescrip,
  ];
  checkText.forEach(function (item) {
    item.setAttribute("style", "display: none");
  });
}

init();
areaFilter.addEventListener("change", filter);
addTicketBtn.addEventListener("click", checkAddTicketValue);
