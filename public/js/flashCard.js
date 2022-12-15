
const url = window.location.href;
const origin = window.location.origin
const subject = url.split('?')[1].split('=')[1];
// const origin = "http://localhost:3000"
// const subject = "dbms"
function newCard(cardData){
    console.log(cardData)
    res = `<div class="swiper-slide">`
    res += `<div class = 'heading'>${cardData.heading}</div><br>`
    res += `<div class = 'body-content'>${cardData.mainContent}</div>`

    for(let itr in cardData.points){
        point = cardData.points[itr]
        res += `<br><div class = 'card-point'>${point}</div>`
    }
    res += `</div>`

    return res
}

async function loadCards(){
    wrapper = document.querySelector('.swiper-wrapper');
    let newBody = ''

    //Get Data from backend
    //data = someApiCall()
    const data = await axios.post(origin + '/home/get-flash',{subject});
    data.data.forEach(data=>{

        newBody += newCard(data)
    });
    wrapper.innerHTML = newBody
}

loadCards();