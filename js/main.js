// check if there local storage color optin
let mainColors = localStorage.getItem("color_optin");

if (mainColors !== null) {
    document.documentElement.style.setProperty('--main--color', mainColors);

    //remove active class from all colors list item
    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");

        if (element.dataset.color === mainColors) {

            element.classList.add("active")
        }
    });
}

// settings box
document.querySelector(".toggle-setting").onclick = function() {

    document.querySelector(".setting-box").classList.toggle("open");
}

//switch colors
const colorsli = document.querySelectorAll(".color-list li");

colorsli.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);

        //set color on local storage
        localStorage.setItem("color_optin", e.target.dataset.color)

        //remove active class from all childrens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");

        });

        e.target.classList.add("active");
    });
});

// random background option
let backGroundOptio = true;

// varible to control the interval
let backgroundInterval;

//switch random background option
const randomBackGroundElement = document.querySelectorAll(".random-background span");

randomBackGroundElement.forEach(span => {
    span.addEventListener("click", (e) => {
        
        //remove active class from all spans
        e.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");

        });

        e.target.classList.add("active");

        if (e.target.dataset.background === 'yes') {
            backGroundOptio = true;
            randomizeImgs();
        }else {
            backGroundOptio = false;
            clearInterval(backgroundInterval);
        }
    });
});

// change backgroundImage
let landingPage = document.querySelector(".landing-page");

// get array of imgs
let imegsArray = ["01.jpg","02.jpg","04.jpg","05.jpg",];

// function to randomize imgs
function randomizeImgs() {

    if (backGroundOptio === true) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imegsArray.length);
        
            landingPage.style.backgroundImage = 'url("imgs/' + imegsArray[randomNumber] + '")'; 
        }, 5000);
    }
}

randomizeImgs();

// scroll box
let btn = document.getElementById('toggle-scrol');

window.onscroll = function() {
    if(scrollY >= 400){
        btn.style.display = 'block';
    }else {
        btn.style.display = 'none';
    }
}
btn.onclick = function(){
    scroll({
        left:0,
        top:0,
        behavior:"smooth"
    })
}

// creat popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {
        
        // create overlay element
        let overlay = document.createElement("div");

        overlay.className = 'popup-overlay';

        document.body.appendChild(overlay);

        // create the popup box 
        let popupBox = document.createElement("div");
        
        popupBox.className = 'popup-box'

        // create the img
        let popupImage = document.createElement("img");
        
        popupImage.src = img.src;

        popupBox.appendChild(popupImage);

        document.body.appendChild(popupBox);

        // create the close button
        let closeButton = document.createElement("span");

        let closeButtontext = document.createTextNode("X");

        closeButton.appendChild(closeButtontext);

        closeButton.className = 'close-button';

        popupBox.appendChild(closeButton);
    });
});

// close poup
document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
        // remove popup
        e.target.parentNode.remove();

        document.querySelector(".popup-overlay").remove();
    }
})

// Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLink = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle("menu-active");

    tLink.classList.toggle("open");
};

// click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tLink) {
        if (tLink.classList.contains("open")) {
           
            toggleBtn.classList.toggle("menu-active");

            tLink.classList.toggle("open");
        }
    }
})

tLink.onclick = function (e) {
    e.stopPropagation();
}