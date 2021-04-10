let data = [];
let searchResultNum = 0;

const areaFilter = document.querySelector(".areaFilter select");
const ticketList = document.querySelector(".ticketList");
const searchResult = document.querySelector(".searchResult");

const addTicketName = document.querySelector(".ticketName");
const addTicketUrl = document.querySelector(".ticketUrl");
const addTicketArea = document.querySelector(".ticketArea");
const addTicketPrice = document.querySelector(".ticketPrice");
const addTicketNum = document.querySelector(".ticketNum");
const addTicketRate = document.querySelector(".ticketRate");
const addTicketDescrip = document.querySelector(".ticketDescrip");
const addTicketBtn = document.querySelector(".addTicketBtn");
// const addTicketInput = document.querySelectorAll(".addTicketInput");
// const inputList = [...addTicketInput]; //將類陣列轉為純陣列
const ticketForm = document.querySelector(".addTicketForm");
const inputs = document.querySelectorAll(
  ".addTicketForm input[type=text],input[type=url],input[type=number],select.ticketArea,textarea"
);
//驗證條件&警示訊息
const constraints = {
  ticketName: {
    presence: {
      message: "必填",
    },
  },
  ticketUrl: {
    presence: {
      message: "必填",
    },
    url: {
      schemes: ["http", "https"],
      message: "必須是正確的網址",
    },
  },
  ticketArea: {
    presence: {
      message: "必填",
    },
  },
  ticketPrice: {
    presence: {
      message: "必填",
    },
    numericality: {
      greaterThan: 0,
      message: "必須大於 0",
    },
  },
  ticketNum: {
    presence: {
      message: "必填",
    },
    numericality: {
      greaterThan: 0,
      message: "必須大於 0",
    },
  },
  ticketRate: {
    presence: {
      message: "必填",
    },
    numericality: {
      greaterThanOrEqualTo: 1,
      lessThanOrEqualTo: 10,
      message: "必須在 1-10 的區間",
    },
  },
  ticketDescrip: {
    presence: {
      message: "必填",
    },
  },
};

//初始化
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
//渲染資料
function renderData() {
  let str = "";
  searchResultNum = 0;
  data.forEach(function (item) {
    str += showData(item);
    searchResultNum++;
  });
  ticketList.innerHTML = str;
  searchResult.textContent = searchResultNum;
  //清空input
  inputs.forEach((i) => {
    i.value = "";
  });
  renderChart();
}
//chart.js
function renderChart() {
  //各地區資料數存入物件
  const totalObj = {};
  //{高熊:2,台北:1,台中:1}
  data.forEach(function (item) {
    //當地區名不存在於物件則指派為1
    if (totalObj[item.area] === undefined) {
      totalObj[item.area] = 1;
    } else {
      //存在的話就+1
      totalObj[item.area] += 1;
    }
  });
  //將所有屬性撈出變為一個陣列
  const areaArr = Object.keys(totalObj);
  //areaArr = ["高雄","台北","台中"]
  let newData = [];
  //newData = [["高雄",2],["台北",1],["台中",1]]
  areaArr.forEach(function (item) {
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
                <div class="ticketRate bg-primary">${item.rate}</div>
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
//篩選地區
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
//將新增套票資訊加入物件中，並加到 data 陣列
function addTicket() {
  let obj = {};
  obj.id = data.length;
  obj.name = ticketName.value;
  obj.imgUrl = ticketUrl.value;
  obj.area = ticketArea.value;
  obj.price = Number(ticketPrice.value);
  obj.group = Number(ticketNum.value);
  obj.rate = Number(ticketRate.value);
  obj.description = ticketDescrip.value;
  data.push(obj);
  renderData();
}
//change驗證表單
function checkInputValue() {
  inputs.forEach(function (item) {
    item.addEventListener("change", function () {
      item.nextElementSibling.textContent = "";
      let errors = validate(ticketForm, constraints);
      if (errors) {
        let arr = Object.keys(errors);
        arr.forEach(function (key) {
          document.querySelector(`p.${key}`).textContent = errors[key];
        });
      }
    });
  });
}

function btnCheck() {
  let check = false;
  inputs.forEach((i) => {
    let errors = validate(ticketForm, constraints);
    if (errors) {
      Object.keys(errors).forEach(function (keys) {
        document.querySelector(`p.${keys}`).textContent = errors[keys];
      });
      check = false;
    } else {
      check = true;
    }
    checkInputValue();
  });
  if (check) {
    addTicket();
  }
}

init();
areaFilter.addEventListener("change", filter);
addTicketBtn.addEventListener("click", btnCheck);
