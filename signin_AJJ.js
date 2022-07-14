
const modal = document.querySelector('.modal');
const personIcon = document.querySelector('.person-icon');

const modalOut = document.getElementById("modalOut").addEventListener("click", function () {
modal.style.display = 'none';
})

personIcon.addEventListener("click", function () {
modal.style.display = 'block';



function loadJson() {
return fetch("/json/loginMain.json")
    .then((res) => res.json())
    .then((json) => json.user)
    .catch((rej) => {
        console.log("연결이 안됐음");
    })
}

let userInfor = {
    userInputEmail: document.getElementById("inputEmail").value,
    userInputPw: document.getElementById("inputPw").value
}
document.getElementById("modalIn").addEventListener("click", function () {

userInfor = {
    userInputEmail: document.getElementById("inputEmail").value,
    userInputPw: document.getElementById("inputPw").value
} 
    {
        loadJson().then((user) => {
            for (const key in user) {
                if(userSignInInfor.email!="" && userSignInInfor.pw!=""){
                    modal.style.display = "none";
                    alert(userSignInInfor.name+" 님은 이미 로그인 하셨습니다")
                    break;
                }
                else if (userInfor.userInputEmail == "" && userInfor.userInputPw == "") {
                    alert("이메일과 비밀번호를 입력해주세요!");
                    break;
                } else if (userInfor.userInputEmail == "" && userInfor.userInputPw != "") {
                    alert("이메일을 입력해주세요!");
                    break;
                } else if (userInfor.userInputEmail != "" && userInfor.userInputPw == "") {
                    alert("패스워드를 입력해주세요!");
                    break;
                } else if (userInfor.userInputEmail != "" && userInfor.userInputPw != "") {
                    if (user[key].email != userInfor.userInputEmail && user[key].pw != userInfor.userInputPw) {
                        alert("정보가 확인되지 않습니다!")
                        break;
                    } else if (user[key].email != userInfor.userInputEmail && user[key].pw == userInfor.userInputPw) {
                        alert("이메일이 확인되지 않습니다!")
                        break;
                    } else if (user[key].email == userInfor.userInputEmail && user[key].pw != userInfor.userInputPw) {
                        alert("패스워드가 맞지 않습니다!")
                        break;
                    } else if (user[key].email == userInfor.userInputEmail && user[key].pw == userInfor.userInputPw) { 
                        alert(user[key].name + " 환영합니다!");
                        modal.style.display = 'none';
                        signInText = document.createElement("p");
                        signInText.classList.add("sign-in-text")
                        signInText.innerHTML = user[key].name +" 님 환영합니다!";
                        userSignInInfor = user[key]
                        document.querySelector(".search").appendChild(signInText);
                        break;
                    }
                }
            }
        })
    }
})
})     