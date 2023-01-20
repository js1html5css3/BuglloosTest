const Alltabs = document.querySelectorAll(".InfoMelk");
const AllSec = document.querySelectorAll(".Tab");


var LeftSlider = 300;


 
var swiper = new Swiper(".slide-content", {
  slidesPerView: 4,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints:{
      0: {
          slidesPerView: 1,
      },
      520: {
          slidesPerView: 2,
      },
      950: {
          slidesPerView: 3,
      },
      1950: {
        slidesPerView: 4,
    },
  },
});

let Hearth = false;
$("#Hearth").click(function(){
  if(Hearth){
    $("#Hearth").attr('src', '../assets/images/Hearth.svg')
  }
  else{
    $("#Hearth").attr('src', '../assets/images/hearthfull.svg')
  }
  Hearth = !Hearth;
})

let AllHearth = false;
$(".HearthOnClick").click(function(){
  if(AllHearth){
    $(this).attr('src', '../assets/images/Hearth.svg')
  }
  else{
    $(this).attr('src', '../assets/images/hearthfull.svg')
  }

  AllHearth = !AllHearth;
})


function ShowPannel(PanelIndex) {
    Alltabs.forEach((button) => {
      button.classList.remove("FilterMelk_Active");
    });
    Alltabs[PanelIndex].classList.add("FilterMelk_Active");
  
    let i = 0;
    AllSec.forEach((Tab) => {
      if (PanelIndex != i) {
        Tab.style.display = "none";
      } else {
        Tab.style.display = "block";
      }
      i++;
    });
  }
  ShowPannel(0);