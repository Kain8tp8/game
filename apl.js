function query(selector) {
    return document.querySelector(selector);
}

const balance = query(".balance");
const result = query(".result");
const bid = query(".bid");
const number = query(".number");
const submit = query("#submit");
const name = query("#name");
const letsPlay = query("#lets-play");
const title = query("#title");
const show = query("#show");

const nameModal = new bootstrap.Modal(query("#namedialog"));

let money = 100;
let maxMoney = money

let userName = '';


balance.innerText = `Balance:$${money}`;
result.innerText = "";

nameModal.show();

show.onclick =()=>{
    let users =JSON.parse(localStorage.getItem('users'))
    console.log(users);
}

letsPlay.onclick = () => {
    userName = name.value
    title.innerText = userName

    nameModal.hide()
}

submit.onclick = () => {
    let userBet = +bid.value;
    let userNumber = +number.value;

    if (userBet < 5 || userBet > money) {
        console.log("Xato");
    }
    else if (userBet < 0 || userNumber > 6) {
        console.log("Xato");
    }
    else {

        let guess = random( 0 , 6 );

        if (guess === userNumber) {
            money += userBet * 1.25;
            result.innerText = "Yutingiz!";
            balance.innerText = `Balance:$${money}`;

            if (money > maxMoney) {
                maxMoney=money
            }
        } 
        else {
            money -= userBet;
            result.innerText = `Yutingiz! Bu son ${guess}edi!`;
            balance.innerText = `Balance:$${money}`;
        }
    }
    if(money <= 0){
        result.innerText='Game Over!'
        
        let users=JSON.parse(localStorage.getItem('users'))
        
        if(users === null){
            users = []
        }

        users.push({name: userName, money: maxMoney})
        
        localStorage.setItem('users',JSON.stringify(users))
        
    }

    console.log(userBet, userNumber);
};

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
