const SearchNavbar = document.querySelector("#SearchNavbar");
const P_Inputss = document.querySelector(".P_Inputss");

SearchNavbar.addEventListener('click', ()=>{
  $(P_Inputss).fadeToggle();

})
$( "#CloseSeach" ).click(function() {
  $(P_Inputss).fadeToggle();
})