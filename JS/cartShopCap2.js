
//주병현 숖 홈페이지
let jbhcartUserShopInfor;
//장지원 숖 홈페이지
let jjwcartUserShopInfor;
//안주영 숖 홈페이지
let ajycartUserShopInfor;

//주병현 더보기 숫자 카운트
let cartCurrentListCountjbh = 0;
let cartShowListCountjbh = 20;
//장지원 더보기 숫자 카운트
let cartCurrentListCountjjw = 0;
let cartShowListCountjjw = 20;
//안주영 더보기 숫자 카운트
let cartCurrentListCountajy = 0;
let cartShowListCountajy = 20;

//새상품순에 담을 json배열
//새상품순을 눌렀을때
let cartNewProductInfor;
//쇼핑몰 목록 전체 태그 배열
let cartListCol = new Array();
let cartContainer = new Array();
let cartPicture = new Array();
let cartFirstText = new Array();
let cartPicHover = new Array();
let cartBody = new Array();
let cartName = new Array();
let cartSecondText = new Array();
let cartBtnContainer = new Array();
let cartBtnGroup = new Array();
let cartBtnGetList = new Array();
let cartBtnShowList = new Array();

//장바구니에 담은 리스트 선언
let cartBuyListRow = document.getElementById("cart-Buy-list-row");
let cartCurrentBuyListCount = 0;
//유저가 선택한 장바구니 배열선언(왜? 총합을 구할거기 때문에. 게다가 빼야할때도 있기 때문)

//유저의 돈 총합
let cartUserListPriceReal = 0;
let cartUserListPrice = new Array();
//장바구니 리스트 태그 배열
let cartBuyListCol = new Array();
let cartBuyContainer = new Array();
let cartBuyPicture = new Array();
let cartBuyFirstText = new Array();
let cartBuyPicHover = new Array();
let cartBuyBody = new Array();
let cartBuyName = new Array();
let cartBuySecondText = new Array();
let cartBuyBtnContainer = new Array();
let cartBuyBtnGroup = new Array();
let cartBuyDeleteBtn = new Array();
let cartBuyBtnShowList = new Array();
let cartListPText = new Array();

//검색을 위한 input값 넣어주기
let cartSearchText = document.getElementById("cartSearchText").value;

//가격검색 제이슨 임시 변수
let cartUserSearchPriceInfor;
//상품검색 제이슨 임시 변수
let cartUserShopInforSearch;

//최근검색어의 부모태그를 만들어줌
let cartSearchLink = new Array();
let cartSearchChild = new Array();
let cartSearchTextArr = new Array();
let cartSearchTextLast = new Array();
let cartSearchFirst = 0;

//장바구니 카운트
let cartListResult = 0;
let cartAllList = document.getElementById("cartAllList");

  //모달 변수
  let cartModal = document.querySelector('.cart-modal');
  let cartListOut = document.getElementById("cartListOut");
  let btnCartList = document.querySelector('.cart-btn-cart-list');

  //검색기능 버튼 눌렀을때 필요한 변수
  let cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
  let cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

  let cartMoreShowBtnjbh = document.createElement("input");
  cartMoreShowBtnjbh.id = "cartMoreShowBtnjbh";
  cartMoreShowBtnjbh.setAttribute("type","button");
  cartMoreShowBtnjbh.setAttribute("value","더보기");

  let cartMoreShowBtnjjw = document.createElement("input");
  cartMoreShowBtnjjw.id = "cartMoreShowBtnjjw";
  cartMoreShowBtnjjw.setAttribute("type","button");
  cartMoreShowBtnjjw.setAttribute("value","더보기");

  let cartMoreShowBtnajy = document.createElement("input");
  cartMoreShowBtnajy.id = "cartMoreShowBtnajy";
  cartMoreShowBtnajy.setAttribute("type","button");
  cartMoreShowBtnajy.setAttribute("value","더보기");

  //유저의 총 합계금액 구하기 위해 필요한 태그 생성
  let cartListSum = document.createElement("div");
  cartListSum.classList.add("cart-list-sum");
  let cartSumPrice = document.createElement("p");
  cartSumPrice.classList.add("cart-sum-price");
  cartSumPrice.innerHTML = "총 합계금액"+cartUserListPriceReal;

  //220711 추가된 부분

let cartNumberCount = 0;
document.querySelector(".wrapper").style.visibility = "hidden"


//추가부분
function shopCap(){
  return fetch("/json/cartShopCap.json")
  .then((res)=> res.json())
  .then((json)=> json.cartUserShopInfor)
  .catch((rej)=>{
    console.log("실패")
  })
}
(async function() {
  await shopCap().then((cartUserShopInfor)=>{

  jbhcartUserShopInfor =  cartUserShopInfor.filter((a)=>{
    return a.designName == "jbh"
  })
  cartInput(jbhcartUserShopInfor);
  cartListAppendJbh(jbhcartUserShopInfor);
  
  cartUserShopInfor=0;
})  

await shopCap().then((cartUserShopInfor)=>{

  jjwcartUserShopInfor =  cartUserShopInfor.filter((a)=>{
    return a.designName == "jjw"
  })
  cartInput(jjwcartUserShopInfor);
  cartListAppendJjw(jjwcartUserShopInfor);

  cartUserShopInfor=0;
})

await shopCap().then((cartUserShopInfor)=>{

  ajycartUserShopInfor =  cartUserShopInfor.filter((a)=>{
    return a.designName == "ajy"
  })
  cartInput(ajycartUserShopInfor);
  cartListAppendAjy(ajycartUserShopInfor);

  cartUserShopInfor=0;

})

  function cartInput(cartUserShopInfor){

    //배열 초기화
    cartListCol = new Array();
    cartContainer = new Array();
    cartPicture = new Array();
    cartFirstText = new Array();
    cartPicHover = new Array();
    cartBody = new Array();
    cartName = new Array();
    cartSecondText = new Array();
    cartBtnContainer = new Array();
    cartBtnGroup = new Array();
    cartBtnGetList = new Array();
    cartBtnShowList = new Array();

    for (const key in cartUserShopInfor) {
    cartListCol[key] = document.createElement("div");
    cartListCol[key].classList.add("cart-listCol");
    
    cartContainer[key] = document.createElement("div");
    cartContainer[key].classList.add("cart-container");
    
    cartPicture[key] = document.createElement("div");
    cartPicture[key].classList.add("cart-pic");
    cartPicture[key].style.backgroundImage = cartUserShopInfor[key].img;
    
    cartFirstText[key] = document.createElement("div");
    cartFirstText[key].classList.add("cart-div-text");
    
    cartPicHover[key] = document.createElement("p");
    cartPicHover[key].classList.add("cart-pic-bicHover");
    cartPicHover[key].innerHTML = "사진 크게보기";
    
    cartBody[key] = document.createElement("div");
    cartBody[key].classList.add("cart-body");
    
    cartName[key] = document.createElement("p");
    cartName[key].classList.add("cart-name");
    cartName[key].innerHTML = cartUserShopInfor[key].name;
    
    cartSecondText[key] = document.createElement("p");
    cartSecondText[key].classList.add("cart-text");
    cartSecondText[key].innerHTML = cartUserShopInfor[key].price+"원";
    
    cartBtnContainer[key] = document.createElement("div");
    cartBtnContainer[key].classList.add("cart-btn-container");

    cartBtnGroup[key] = document.createElement("div");
    cartBtnGroup[key].classList.add("cart-btn-group");

    cartBtnGetList[key] = document.createElement("input");
    cartBtnGetList[key].setAttribute("type","button");
    cartBtnGetList[key].setAttribute("value","장바구니에 담기");
    cartBtnGetList[key].style.margin = "0.3vw";
    cartBtnGetList[key].style.paddingTop = "0.1vw";
    cartBtnGetList[key].style.paddingBottom = "0.1vw";
    cartBtnGetList[key].style.paddingLeft = "0.3vw";
    cartBtnGetList[key].style.paddingRight = "0.3vw";
    cartBtnGetList[key].classList.add("cart-btn");
    cartBtnGetList[key].id = "cartBtnGetList"+[key];
    
    cartBtnShowList[key] = document.createElement("input");
    cartBtnShowList[key].setAttribute("type","button");
    cartBtnShowList[key].setAttribute("value","상품 보기");
    cartBtnShowList[key].style.margin = "0.3vw";
    cartBtnShowList[key].style.paddingTop = "0.1vw";
    cartBtnShowList[key].style.paddingBottom = "0.1vw";
    cartBtnShowList[key].style.paddingLeft = "0.3vw";
    cartBtnShowList[key].style.paddingRight = "0.3vw";
    cartBtnShowList[key].classList.add("cart-btn");
    cartBtnShowList[key].id = "cartBtnShowList"+[key];

        //각각의 장바구니 버튼을 눌렀을때
      cartBtnGetList[key].addEventListener("click",function(){ 
        
        if(cartNumberCount==0){
          document.querySelector(".wrapper").style.visibility = "";
        }
        cartNumberCount++;
        cartBuyListCol[cartListResult] = document.createElement("div");
        cartBuyListCol[cartListResult].classList.add("cart-listCol");
        
        cartBuyContainer[cartListResult] = document.createElement("div");
        cartBuyContainer[cartListResult].classList.add("cart-container");
        
        cartBuyPicture[cartListResult] = document.createElement("div");
        cartBuyPicture[cartListResult].classList.add("cart-pic");
        cartBuyPicture[cartListResult].style.backgroundImage = cartUserShopInfor[key].img;
        
        cartBuyFirstText[cartListResult] = document.createElement("div");
        cartBuyFirstText[cartListResult].classList.add("cart-div-text");
        
        cartBuyPicHover[cartListResult] = document.createElement("p");
        cartBuyPicHover[cartListResult].classList.add("cart-pic-bicHover");
        cartBuyPicHover[cartListResult].innerHTML = "사진 크게보기";
        
        cartBuyBody[cartListResult] = document.createElement("div");
        cartBuyBody[cartListResult].classList.add("cart-body");
        
        cartBuyName[cartListResult] = document.createElement("p");
        cartBuyName[cartListResult].classList.add("cart-name");
        cartBuyName[cartListResult].innerHTML = cartUserShopInfor[key].name;
        
        cartBuySecondText[cartListResult] = document.createElement("p");
        cartBuySecondText[cartListResult].classList.add("cart-text");
        cartBuySecondText[cartListResult].innerHTML = cartUserShopInfor[key].price+"원";
        
        cartBuyBtnContainer[cartListResult] = document.createElement("div");
        cartBuyBtnContainer[cartListResult].classList.add("cart-btn-container");

        cartBuyBtnGroup[cartListResult] = document.createElement("div");
        cartBuyBtnGroup[cartListResult].classList.add("cart-btn-group");

        cartBuyDeleteBtn[cartListResult] = document.createElement("input");
        cartBuyDeleteBtn[cartListResult].setAttribute("type","button");
        cartBuyDeleteBtn[cartListResult].setAttribute("value","삭제하기");
        cartBuyDeleteBtn[cartListResult].classList.add("cart-btn");
        cartBuyDeleteBtn[cartListResult].id = "cartBuyDeleteBtn"+[cartListResult];
         
        cartBuyBtnShowList[cartListResult] = document.createElement("input");
        cartBuyBtnShowList[cartListResult].setAttribute("type","button");
        cartBuyBtnShowList[cartListResult].setAttribute("value","자세한 상품 보기");
        cartBuyBtnShowList[cartListResult].classList.add("cart-btn");

        cartListPText[cartListResult] = document.createElement("p");
        cartListPText[cartListResult].classList.add("cart-list-p-text");
        cartListPText[cartListResult].innerHTML = cartUserShopInfor[key].name+",";
        cartListPText[cartListResult].id = "cartListPText"+[cartListResult];

        cartUserListPrice[cartListResult] = cartUserShopInfor[key].price;
        document.querySelector(".cart-list-text").appendChild(cartListPText[cartListResult]); 
        cartListResult++;
        document.querySelector(".circleNumber").innerHTML = cartNumberCount;

    })
  }
}
//속성과 값을 가진 태그들을 쏴주는거
function cartListAppendJbh(jbhcartUserShopInfor) {
  while (cartCurrentListCountjbh < cartListCol.length) {
    let cartListIndex = cartCurrentListCountjbh;
     document.getElementById("cartSearchListContainer").appendChild(cartListCol[cartListIndex]);
     cartListCol[cartListIndex].appendChild(cartContainer[cartListIndex]);
     cartContainer[cartListIndex].appendChild(cartPicture[cartListIndex]);
     cartPicture[cartListIndex].appendChild(cartFirstText[cartListIndex]);
     cartFirstText[cartListIndex].appendChild(cartPicHover[cartListIndex]);
     cartPicture[cartListIndex].after(cartBody[cartListIndex]);
     cartBody[cartListIndex].appendChild(cartName[cartListIndex]);
     cartName[cartListIndex].after(cartSecondText[cartListIndex]);
     cartSecondText[cartListIndex].after(cartBtnContainer[cartListIndex]);
     cartBtnContainer[cartListIndex].appendChild(cartBtnGroup[cartListIndex]);
     cartBtnGroup[cartListIndex].appendChild(cartBtnGetList[cartListIndex]);
     cartBtnGetList[cartListIndex].after(cartBtnShowList[cartListIndex]);
     cartCurrentListCountjbh++
     if(cartCurrentListCountjbh==cartShowListCountjbh){
      document.getElementById("cartSearchListContainer").after(cartMoreShowBtnjbh);
        break;
     }
     else if(cartListCol[cartListIndex]==null){
        break;
     }
  }
}
//초기 상품목록 더보기 버튼을 눌렀을때
cartMoreShowBtnjbh.addEventListener("click",function(){
  cartShowListCountjbh += 20;
  cartListAppendJbh();
if(cartShowListCountjbh==cartListCol.length){
  cartMoreShowBtnjbh.remove();
  }
})


//속성과 값을 가진 태그들을 쏴주는거
function cartListAppendJjw(jjwcartUserShopInfor) {
  while (cartCurrentListCountjjw < cartListCol.length) {
    let cartListIndex = cartCurrentListCountjjw;
     document.getElementById("jjw-search-list-container").appendChild(cartListCol[cartListIndex]);
     cartListCol[cartListIndex].appendChild(cartContainer[cartListIndex]);
     cartContainer[cartListIndex].appendChild(cartPicture[cartListIndex]);
     cartPicture[cartListIndex].appendChild(cartFirstText[cartListIndex]);
     cartFirstText[cartListIndex].appendChild(cartPicHover[cartListIndex]);
     cartPicture[cartListIndex].after(cartBody[cartListIndex]);
     cartBody[cartListIndex].appendChild(cartName[cartListIndex]);
     cartName[cartListIndex].after(cartSecondText[cartListIndex]);
     cartSecondText[cartListIndex].after(cartBtnContainer[cartListIndex]);
     cartBtnContainer[cartListIndex].appendChild(cartBtnGroup[cartListIndex]);
     cartBtnGroup[cartListIndex].appendChild(cartBtnGetList[cartListIndex]);
     cartBtnGetList[cartListIndex].after(cartBtnShowList[cartListIndex]);
     cartCurrentListCountjjw++
     if(cartCurrentListCountjjw==cartShowListCountjjw){
      document.getElementById("jjw-search-list-container").after(cartMoreShowBtnjjw);
        break;
     }
     else if(cartListCol[cartListIndex]==null){
      break;
   }
  }
}
//초기 상품목록 더보기 버튼을 눌렀을때
cartMoreShowBtnjjw.addEventListener("click",function(){
  cartShowListCountjjw += 20;
  cartListAppendJjw();
  //80개가 다 됐을때 더보기 버튼 삭제
if(cartShowListCountjjw==cartListCol.length){
  cartMoreShowBtnjjw.remove();
  }
})

//속성과 값을 가진 태그들을 쏴주는거
function cartListAppendAjy(ajycartUserShopInfor) {
  while (cartCurrentListCountajy < cartListCol.length) {
    let cartListIndex = cartCurrentListCountajy;
     document.getElementById("ajy-search-list-container").appendChild(cartListCol[cartListIndex]);
     cartListCol[cartListIndex].appendChild(cartContainer[cartListIndex]);
     cartContainer[cartListIndex].appendChild(cartPicture[cartListIndex]);
     cartPicture[cartListIndex].appendChild(cartFirstText[cartListIndex]);
     cartFirstText[cartListIndex].appendChild(cartPicHover[cartListIndex]);
     cartPicture[cartListIndex].after(cartBody[cartListIndex]);
     cartBody[cartListIndex].appendChild(cartName[cartListIndex]);
     cartName[cartListIndex].after(cartSecondText[cartListIndex]);
     cartSecondText[cartListIndex].after(cartBtnContainer[cartListIndex]);
     cartBtnContainer[cartListIndex].appendChild(cartBtnGroup[cartListIndex]);
     cartBtnGroup[cartListIndex].appendChild(cartBtnGetList[cartListIndex]);
     cartBtnGetList[cartListIndex].after(cartBtnShowList[cartListIndex]);
     cartCurrentListCountajy++
     if(cartCurrentListCountajy==cartShowListCountajy){
      document.getElementById("ajy-search-list-container").after(cartMoreShowBtnajy);
        break;
     }
     else if(cartListCol[cartListIndex]==null){
      break;
   }
  }
}

//초기 상품목록 더보기 버튼을 눌렀을때
cartMoreShowBtnajy.addEventListener("click",function(){
  cartShowListCountajy += 20;
  cartListAppendAjy();
  //80개가 다 됐을때 더보기 버튼 삭제
if(cartShowListCountajy==cartListCol.length){
  cartMoreShowBtnajy.remove();
  }
})
  //장바구니 버튼을 눌렀을때
  document.querySelector(".shopping-icon").addEventListener("click",function(){
  
  cartModal.style.display = 'block';

  cartUserListPriceReal = cartUserListPrice.filter(a => a > 0).reduce((a, b) => a + b, 0)
  //장바구니 총 합계금액
  cartSumPrice.innerHTML = "총 합계금액"+cartUserListPriceReal;
  //배열에 담긴 태그와 태그 속성값들을 쏴준다
 while (cartCurrentBuyListCount < cartBuyListCol.length) {
  let btnCartListIndex = cartCurrentBuyListCount;
   cartBuyListRow.appendChild(cartBuyListCol[btnCartListIndex]);
   cartBuyListCol[btnCartListIndex].appendChild(cartBuyContainer[btnCartListIndex]);
   cartBuyContainer[btnCartListIndex].appendChild(cartBuyPicture[btnCartListIndex]);
   cartBuyPicture[btnCartListIndex].appendChild(cartBuyFirstText[btnCartListIndex]);
   cartBuyFirstText[btnCartListIndex].appendChild(cartBuyPicHover[btnCartListIndex]);
   cartBuyPicture[btnCartListIndex].after(cartBuyBody[btnCartListIndex]);
   cartBuyBody[btnCartListIndex].appendChild(cartBuyName[btnCartListIndex]);
   cartBuyName[btnCartListIndex].after(cartBuySecondText[btnCartListIndex]);
   cartBuySecondText[btnCartListIndex].after(cartBuyBtnContainer[btnCartListIndex]);
   cartBuyBtnContainer[btnCartListIndex].appendChild(cartBuyBtnGroup[btnCartListIndex]);
   cartBuyBtnGroup[btnCartListIndex].appendChild(cartBuyDeleteBtn[btnCartListIndex]);
   cartBuyDeleteBtn[btnCartListIndex].after(cartBuyBtnShowList[btnCartListIndex]);
   cartCurrentBuyListCount++;

  //삭제하기 버튼을 눌렀을때
    cartBuyDeleteBtn[btnCartListIndex].addEventListener("click",function(){

    cartUserListPriceReal = cartUserListPriceReal - cartUserListPrice[btnCartListIndex];
    cartUserListPrice.splice(btnCartListIndex,1);

    //장바구니 총 합계금액
    cartSumPrice.innerHTML = "총 합계금액"+cartUserListPriceReal;
    cartBuyListRow.after(cartListSum)
    cartListSum.appendChild(cartSumPrice);
    document.getElementById("cart-Buy-list-row").removeChild(cartBuyListCol[btnCartListIndex]);
    cartListPText.splice(cartListPText[btnCartListIndex],1);
    document.querySelector(".cart-list-text").removeChild(document.getElementById("cartListPText"+[btnCartListIndex]));
    cartNumberCount--;
    document.querySelector(".circleNumber").innerHTML = cartNumberCount;
    if(cartNumberCount==0){
      document.querySelector(".wrapper").style.visibility = "hidden";
    }
   })
}
cartBuyListRow.after(cartListSum)
cartListSum.appendChild(cartSumPrice);
})
//모달 안에 장바구니 주문을 취소했을때
cartListOut.addEventListener("click", function () {
  cartModal.style.display = 'none';
  })


//가격검색버튼을 눌렀을때
document.getElementById("cartSearchBtn").addEventListener("click",function(){
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = 20;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = 20;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = 20;

  while (document.getElementById("cartSearchListContainer").hasChildNodes()) {
    document.getElementById("cartSearchListContainer").removeChild(document.getElementById("cartSearchListContainer").firstChild);
  }

  shopCap().then((cartUserShopInfor)=>{

    jbhcartUserShopInfor =  cartUserShopInfor.filter((a)=>{
      return a.designName == "jbh"
    })

    cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
    cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

    cartUserSearchPriceInfor = jbhcartUserShopInfor.filter(function(data){
      return cartFirstPriceSearch <= data.price && cartSecondPriceSearch >= data.price
    })
    cartUserSearchPriceInfor.sort((a,b)=>{
      return a.price - b.price;
    })
      cartInput(cartUserSearchPriceInfor);
      cartListAppendJbh(cartUserSearchPriceInfor);
  })

  cartUserSearchPriceInfor = 0;

  shopCap().then((cartUserShopInfor)=>{

  jjwcartUserShopInfor =  cartUserShopInfor.filter((a)=>{
    return a.designName == "jjw"
  })
  while (document.getElementById("jjw-search-list-container").hasChildNodes()) {
    document.getElementById("jjw-search-list-container").removeChild(document.getElementById("jjw-search-list-container").firstChild);
  }
  
    cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
    cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;

    cartUserSearchPriceInfor = jjwcartUserShopInfor.filter(function(data){
      return cartFirstPriceSearch <= data.price && cartSecondPriceSearch >= data.price
    })
    cartUserSearchPriceInfor.sort((a,b)=>{
      return a.price - b.price;
    })
      cartInput(cartUserSearchPriceInfor);
      cartListAppendJjw(cartUserSearchPriceInfor);
  })
  cartUserSearchPriceInfor = 0;


  shopCap().then((cartUserShopInfor)=>{

    ajycartUserShopInfor =  cartUserShopInfor.filter((a)=>{
      return a.designName == "ajy"
    })
    while (document.getElementById("ajy-search-list-container").hasChildNodes()) {
      document.getElementById("ajy-search-list-container").removeChild(document.getElementById("ajy-search-list-container").firstChild);
    }
    
      cartFirstPriceSearch = document.getElementById("cartFirstPriceSearch").value;
      cartSecondPriceSearch = document.getElementById("cartSecondPriceSearch").value;
  
      cartUserSearchPriceInfor = ajycartUserShopInfor.filter(function(data){
        return cartFirstPriceSearch <= data.price && cartSecondPriceSearch >= data.price
      })
      cartUserSearchPriceInfor.sort((a,b)=>{
        return a.price - b.price;
      })
        cartInput(cartUserSearchPriceInfor);
        cartListAppendAjy(cartUserSearchPriceInfor);
    })
    cartUserSearchPriceInfor = 0;
})

//낮은 가격순 눌렀을때
document.getElementById("cartRowSearchPrice").addEventListener("click",function(){
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = 20;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = 20;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = 20;
  while (document.getElementById("cartSearchListContainer").hasChildNodes()) {
    document.getElementById("cartSearchListContainer").removeChild(document.getElementById("cartSearchListContainer").firstChild);
  }
 
    shopCap().then((cartUserShopInfor)=>{

      jbhcartUserShopInfor =  cartUserShopInfor.filter((a)=>{
        return a.designName == "jbh"
      })
  
      jbhcartUserShopInfor.sort(function(a, b){
        return a.price - b.price;
      });
      cartInput(jbhcartUserShopInfor)
      cartListAppendJbh(jbhcartUserShopInfor)
  })

  while (document.getElementById("jjw-search-list-container").hasChildNodes()) {
    document.getElementById("jjw-search-list-container").removeChild(document.getElementById("jjw-search-list-container").firstChild);
  }
    shopCap().then((cartUserShopInfor)=>{

      jjwcartUserShopInfor =  cartUserShopInfor.filter((a)=>{
        return a.designName == "jjw"
      })
  
      jjwcartUserShopInfor.sort(function(a, b){
        return a.price - b.price;
      });
      cartInput(jjwcartUserShopInfor)
      cartListAppendJjw(jjwcartUserShopInfor)
  })

  while (document.getElementById("ajy-search-list-container").hasChildNodes()) {
    document.getElementById("ajy-search-list-container").removeChild(document.getElementById("ajy-search-list-container").firstChild);
  }
    shopCap().then((cartUserShopInfor)=>{

      ajycartUserShopInfor =  cartUserShopInfor.filter((a)=>{
        return a.designName == "ajy"
      })
  
      ajycartUserShopInfor.sort(function(a, b){
        return a.price - b.price;
      });
      cartInput(ajycartUserShopInfor)
      cartListAppendAjy(ajycartUserShopInfor)
  })
})

//높은 가격순 눌렀을때
document.getElementById("cartHighSearchPrice").addEventListener("click",function(){
  
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = 20;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = 20;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = 20;
  while (document.getElementById("jjw-search-list-container").hasChildNodes()) {
    document.getElementById("jjw-search-list-container").removeChild(document.getElementById("jjw-search-list-container").firstChild);
  }
    shopCap().then((cartUserShopInfor)=>{

      jbhcartUserShopInfor =  cartUserShopInfor.filter((a)=>{
        return a.designName == "jbh"
      })
  
      jbhcartUserShopInfor.sort(function(a, b){
        return b.price - a.price;
      });
      cartInput(jbhcartUserShopInfor)
      cartListAppendJbh(jbhcartUserShopInfor)
  })

  while (document.getElementById("cartSearchListContainer").hasChildNodes()) {
    document.getElementById("cartSearchListContainer").removeChild(document.getElementById("cartSearchListContainer").firstChild);
  }
    shopCap().then((cartUserShopInfor)=>{

      jbhcartUserShopInfor =  cartUserShopInfor.filter((a)=>{
        return a.designName == "jjw"
      })

      jbhcartUserShopInfor.sort(function(a, b){
        return b.price - a.price;
      });
      cartInput(jbhcartUserShopInfor)
      cartListAppendJjw(jbhcartUserShopInfor)
  })
  while (document.getElementById("ajy-search-list-container").hasChildNodes()) {
    document.getElementById("ajy-search-list-container").removeChild(document.getElementById("ajy-search-list-container").firstChild);
  }
    shopCap().then((cartUserShopInfor)=>{

      ajycartUserShopInfor =  cartUserShopInfor.filter((a)=>{
        return a.designName == "ajy"
      })

      ajycartUserShopInfor.sort(function(a, b){
        return b.price - a.price;
      });
      cartInput(ajycartUserShopInfor)
      cartListAppendAjy(ajycartUserShopInfor)
  })
})

//상품검색을 위한 태그 쏴주기
document.getElementById("cartSearchTextBtn").addEventListener("click",function(){
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = 20;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = 20;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = 20;
    cartSearchText = document.getElementById("cartSearchText").value;
    cartSearchTextArr.push(document.getElementById("cartSearchText").value);
    cartSearchTextLast.unshift(cartSearchTextArr[cartSearchTextArr.length - 1]);

  while (document.getElementById("cartSearchListContainer").hasChildNodes()) {
    document.getElementById("cartSearchListContainer").removeChild(document.getElementById("cartSearchListContainer").firstChild);
  }
  shopCap().then((cartUserShopInfor)=>{

    jbhcartUserShopInfor =  cartUserShopInfor.filter((a)=>{
      return a.designName == "jbh"
    })
      if(cartSearchText=="바지" || cartSearchText=="팬츠" || cartSearchText=="바지" || cartSearchText=="pants"){
        cartSearchText = "pants";
      }
      else if(cartSearchText=="레깅스" || cartSearchText=="leggings"){
        cartSearchText = "leggings";
      }
      else if(cartSearchText=="신발" || cartSearchText=="슈즈" || cartSearchText=="shoes"){
        cartSearchText = "shoes";
      }
      else if(cartSearchText=="세트" || cartSearchText=="set"){
        cartSearchText = "set";
      }
      else if(cartSearchText=="가방" || cartSearchText=="샤넬" || cartSearchText=="샤넬백" ||cartSearchText=="백" || cartSearchText=="bag"){
        cartSearchText = "bag";
      }
      else if(cartSearchText==""){
        cartInput(jbhcartUserShopInfor);
        cartListAppendJbh(jbhcartUserShopInfor);
        cartSearchText = alert("검색어를 입력해주세요!");
      }
      cartUserShopInforSearch = jbhcartUserShopInfor.filter(function(data) {
        return data.classification===cartSearchText;
      });
      cartInput(cartUserShopInforSearch);
      cartListAppendJbh(cartUserShopInforSearch);
  })

  cartUserShopInforSearch=0;

while (document.getElementById("jjw-search-list-container").hasChildNodes()) {
  document.getElementById("jjw-search-list-container").removeChild(document.getElementById("jjw-search-list-container").firstChild);
}

  shopCap().then((cartUserShopInfor)=>{

    jjwcartUserShopInfor =  cartUserShopInfor.filter((a)=>{
      return a.designName == "jjw"
    })
  
      if(cartSearchText=="바지" || cartSearchText=="팬츠" || cartSearchText=="바지" || cartSearchText=="pants"){
        cartSearchText = "pants";
      }
      else if(cartSearchText=="레깅스" || cartSearchText=="leggings"){
        cartSearchText = "leggings";
      }
      else if(cartSearchText=="신발" || cartSearchText=="슈즈" || cartSearchText=="shoes"){
        cartSearchText = "shoes";
      }
      else if(cartSearchText=="세트" || cartSearchText=="set"){
        cartSearchText = "set";
      }
      else if(cartSearchText=="가방" || cartSearchText=="샤넬" || cartSearchText=="샤넬백" ||cartSearchText=="백" || cartSearchText=="bag"){
        cartSearchText = "bag";
      }
      else if(cartSearchText==""){
        cartInput(jjwcartUserShopInfor);
        cartListAppendJjw(jjwcartUserShopInfor);
        cartSearchText = alert("검색어를 입력해주세요!");
      }
      cartUserShopInforSearch = jjwcartUserShopInfor.filter(function(data) {
        return data.classification===cartSearchText;
      });
      cartInput(cartUserShopInforSearch);
      cartListAppendJjw(cartUserShopInforSearch);
  })
  cartUserShopInforSearch=0;

  while (document.getElementById("ajy-search-list-container").hasChildNodes()) {
    document.getElementById("ajy-search-list-container").removeChild(document.getElementById("ajy-search-list-container").firstChild);
  }
  
    shopCap().then((cartUserShopInfor)=>{
  
      ajycartUserShopInfor =  cartUserShopInfor.filter((a)=>{
        return a.designName == "ajy"
      })
    
      if(cartSearchText=="빵" || cartSearchText=="포켓몬빵" || cartSearchText=="포켓몬" || cartSearchText=="푸키먼빵"|| cartSearchText=="돈지랄"|| cartSearchText=="bread"){
        cartSearchText = "bread";
      }
      else if(cartSearchText=="피규어" || cartSearchText=="헬창"|| cartSearchText=="포켓몬헬창" || cartSearchText=="헬창피규어"|| cartSearchText=="figure"){
        cartSearchText = "figure";
      }
        else if(cartSearchText==""){
          cartInput(ajycartUserShopInfor);
          cartListAppendAjy(ajycartUserShopInfor);
          cartSearchText = alert("검색어를 입력해주세요!");
        }
        cartUserShopInforSearch = ajycartUserShopInfor.filter(function(data) {
          return data.classification===cartSearchText;
        });
        cartInput(cartUserShopInforSearch);
        cartListAppendAjy(cartUserShopInforSearch);
    })
    cartUserShopInforSearch=0;
  while (document.querySelector(".cart-search-text-body").hasChildNodes()) {
  document.querySelector(".cart-search-text-body").removeChild(document.querySelector(".cart-search-text-body").firstChild);
  }
  
})

//상품검색 입력란을 클릭했을때
document.getElementById("cartSearchText").addEventListener("click",function(){
  document.querySelector(".cart-search-text-body").style.visibility = "visible";

  document.querySelector(".cart-search-text-body").innerHTML = "최근검색어";
  while (cartSearchFirst < cartSearchTextLast.length) {
    cartSearchLink[cartSearchFirst] = document.createElement("a");
    cartSearchLink[cartSearchFirst].classList.add("cart-search-link");
    cartSearchLink[cartSearchFirst].setAttribute("href","");
    cartSearchLink[cartSearchFirst].id = "cartSearchLink"+[cartSearchFirst];

    cartSearchChild[cartSearchFirst] = document.createElement("div");
    cartSearchChild[cartSearchFirst].classList.add("cart-search-child");
    cartSearchChild[cartSearchFirst].id = "cartSearchChild"+[cartSearchFirst];
    cartSearchChild[cartSearchFirst].innerHTML = cartSearchTextLast[cartSearchFirst];

    document.querySelector(".cart-search-text-body").appendChild(cartSearchLink[cartSearchFirst]);
    cartSearchLink[cartSearchFirst].appendChild(cartSearchChild[cartSearchFirst]);
    cartSearchFirst++
  }
  cartSearchFirst = 0;
})

document.getElementById("cartSearchText").addEventListener("focusout",function(){
  while (document.querySelector(".cart-search-text-body").hasChildNodes()) {
    document.querySelector(".cart-search-text-body").removeChild(document.querySelector(".cart-search-text-body").firstChild);
  }
})


document.getElementById("cartNewProduct").addEventListener("click",function(){
  cartCurrentListCountjbh = 0;
  cartShowListCountjbh = 20;
  cartCurrentListCountjjw = 0;
  cartShowListCountjjw = 20;
  cartCurrentListCountajy = 0;
  cartShowListCountajy = 20;
  while (document.getElementById("cartSearchListContainer").hasChildNodes()) {
    document.getElementById("cartSearchListContainer").removeChild(document.getElementById("cartSearchListContainer").firstChild);
  }
  shopCap().then((cartUserShopInfor)=>{
  jbhcartUserShopInfor =  cartUserShopInfor.filter((a)=>{
    return a.designName == "jbh"
  })
    cartNewProductInfor = jbhcartUserShopInfor.sort((a,b)=>{
      return b.index - a.index;
    })

    cartInput(cartNewProductInfor);
    cartListAppendJbh(cartNewProductInfor);
  })
  cartNewProductInfor=0;
while (document.getElementById("jjw-search-list-container").hasChildNodes()) {
  document.getElementById("jjw-search-list-container").removeChild(document.getElementById("jjw-search-list-container").firstChild);
}
  shopCap().then((cartUserShopInfor)=>{
    jjwcartUserShopInfor =  cartUserShopInfor.filter((a)=>{
      return a.designName == "jjw"
    })
    cartNewProductInfor = jjwcartUserShopInfor.sort((a,b)=>{
      return b.index - a.index;
    })
    cartInput(cartNewProductInfor);
    cartListAppendJjw(cartNewProductInfor);
  })  
  cartNewProductInfor=0;

  while (document.getElementById("ajy-search-list-container").hasChildNodes()) {
    document.getElementById("ajy-search-list-container").removeChild(document.getElementById("ajy-search-list-container").firstChild);
  }
    shopCap().then((cartUserShopInfor)=>{
      ajycartUserShopInfor =  cartUserShopInfor.filter((a)=>{
        return a.designName == "ajy"
      })
      cartNewProductInfor = ajycartUserShopInfor.sort((a,b)=>{
        return b.index - a.index;
      })
      cartInput(cartNewProductInfor);
      cartListAppendAjy(cartNewProductInfor);
    })  
    cartNewProductInfor=0;
})




if(document.documentElement.scrollTop==0){
  document.querySelector(".search").style.backgroundColor = "#ffffff00";
  document.querySelector(".search").style.visibility = "hidden";
  document.querySelector(".logo").style.backgroundColor = "ffffff00";
  document.querySelector(".Ann-shop").style.backgroundColor = "ffffff00";
  document.querySelector(".Joo-shop").style.backgroundColor = "ffffff00";
  document.querySelector(".Jang-shop").style.backgroundColor = "ffffff00";
  document.querySelector(".search-rank").style.backgroundColor = "ffffff00";
  document.querySelector(".cart-search-text-body").style.visibility = "hidden";
}
document.querySelector(".Ann-shop").addEventListener("click",function(){
  document.querySelector(".search").style.backgroundColor = "#ffffff00";
  document.querySelector(".search").style.visibility = "visible";
  document.querySelector(".logo").style.backgroundColor = "white";
  document.querySelector(".Ann-shop").style.backgroundColor = "white";
  document.querySelector(".Joo-shop").style.backgroundColor = "white";
  document.querySelector(".Jang-shop").style.backgroundColor = "white";
  document.querySelector(".search-rank").style.backgroundColor = "white";
  document.querySelector(".cart-search-text-body").style.visibility = "hidden";

})
document.querySelector(".Joo-shop").addEventListener("click",function(){
  document.querySelector(".search").style.backgroundColor = "#ffffff00";
  document.querySelector(".search").style.visibility = "visible";
  document.querySelector(".logo").style.backgroundColor = "white";
  document.querySelector(".Ann-shop").style.backgroundColor = "white";
  document.querySelector(".Joo-shop").style.backgroundColor = "white";
  document.querySelector(".Jang-shop").style.backgroundColor = "white";
  document.querySelector(".search-rank").style.backgroundColor = "white";
  document.querySelector(".cart-search-text-body").style.visibility = "hidden";

})
document.querySelector(".Jang-shop").addEventListener("click",function(){
  document.querySelector(".search").style.backgroundColor = "#ffffff00";
  document.querySelector(".search").style.visibility = "visible";
  document.querySelector(".logo").style.backgroundColor = "white";
  document.querySelector(".Ann-shop").style.backgroundColor = "white";
  document.querySelector(".Joo-shop").style.backgroundColor = "white";
  document.querySelector(".Jang-shop").style.backgroundColor = "white";
  document.querySelector(".search-rank").style.backgroundColor = "white";
  document.querySelector(".cart-search-text-body").style.visibility = "hidden";

})
document.querySelector(".top-icon").addEventListener("click",function(){
  document.querySelector(".search").style.backgroundColor = "#ffffff00";
  document.querySelector(".search").style.visibility = "hidden";
  document.querySelector(".logo").style.backgroundColor = "ffffff00";
  document.querySelector(".Ann-shop").style.backgroundColor = "ffffff00";
  document.querySelector(".Joo-shop").style.backgroundColor = "ffffff00";
  document.querySelector(".Jang-shop").style.backgroundColor = "ffffff00";
  document.querySelector(".search-rank").style.backgroundColor = "ffffff00";
  document.querySelector(".cart-search-text-body").style.visibility = "hidden";

})
document.querySelector(".logo").addEventListener("click",function(){
  document.querySelector(".search").style.backgroundColor = "#ffffff00";
  document.querySelector(".search").style.visibility = "hidden";
  document.querySelector(".logo").style.backgroundColor = "ffffff00";
  document.querySelector(".Ann-shop").style.backgroundColor = "ffffff00";
  document.querySelector(".Joo-shop").style.backgroundColor = "ffffff00";
  document.querySelector(".Jang-shop").style.backgroundColor = "ffffff00";
  document.querySelector(".search-rank").style.backgroundColor = "ffffff00";
  document.querySelector(".cart-search-text-body").style.visibility = "hidden";

})

})();