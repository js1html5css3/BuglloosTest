





var CurrentSelectBox = '';
function ShowSelectBox( Name ){
  CurrentSelectBox = Name;
    if(Name=="TypeGharadad"){
      $("#TypeGharadad").removeClass("DisNone");
    }
    else if(Name=="Warehouse"){
      $("#Warehouse").removeClass("DisNone");
    }
    else if(Name=="TypeUse"){
      $("#TypeUse").removeClass("DisNone");
    }
    else if(Name=="Elevator"){
      $("#Elevator").removeClass("DisNone");
    }
    else if(Name=="Parking"){
      $("#Parking").removeClass("DisNone");
    }
    else if(Name=="TypeHouse"){
      $("#TypeHouse").removeClass("DisNone");
    }
}
function RadioButton(Name){
  if(CurrentSelectBox =="TypeGharadad"){
    if(Name == "Ejareh"){
      $('#Sell img').attr('src','../assets/images/check.svg');
      $('#Ejareh img').attr('src','../assets/images/checked.svg');
    }
    else if(Name == "Forush"){
      $('#Sell img').attr('src','../assets/images/checked.svg');
      $('#Ejareh img').attr('src','../assets/images/check.svg');
    }
  }
  else if (CurrentSelectBox =="Warehouse"){
    if(Name == "WarehouseDarad"){
      $('#WarehouseDarad img').attr('src','../assets/images/checked.svg');
      $('#WarehouseNadarad img').attr('src','../assets/images/check.svg');
    }
    else if(Name = 'WarehouseNadarad'){
      $('#WarehouseDarad img').attr('src','../assets/images/check.svg');
      $('#WarehouseNadarad img').attr('src','../assets/images/checked.svg');
    }
  }
  else if (CurrentSelectBox =="TypeUse"){
    if(Name == "Maskoni"){
      $('#Maskoni img').attr('src','../assets/images/checked.svg');
      $('#Tejary img').attr('src','../assets/images/check.svg');
      $('#Amozeshi img').attr('src','../assets/images/check.svg');
      $('#Varzeshi img').attr('src','../assets/images/check.svg');
      $('#ProfesinalTeach img').attr('src','../assets/images/check.svg');
    }
    else if(Name == 'Tejary'){
      $('#Maskoni img').attr('src','../assets/images/check.svg');
      $('#Tejary img').attr('src','../assets/images/checked.svg');
      $('#Amozeshi img').attr('src','../assets/images/check.svg');
      $('#Varzeshi img').attr('src','../assets/images/check.svg');
      $('#ProfesinalTeach img').attr('src','../assets/images/check.svg');
    }
    else if(Name == 'Amozeshi'){
      $('#Maskoni img').attr('src','../assets/images/check.svg');
      $('#Tejary img').attr('src','../assets/images/check.svg');
      $('#Amozeshi img').attr('src','../assets/images/checked.svg');
      $('#Varzeshi img').attr('src','../assets/images/check.svg');
      $('#ProfesinalTeach img').attr('src','../assets/images/check.svg');
    }
    else if(Name == 'Varzeshi'){
      $('#Maskoni img').attr('src','../assets/images/check.svg');
      $('#Tejary img').attr('src','../assets/images/check.svg');
      $('#Amozeshi img').attr('src','../assets/images/check.svg');
      $('#Varzeshi img').attr('src','../assets/images/checked.svg');
      $('#ProfesinalTeach img').attr('src','../assets/images/check.svg');
    }
    else if(Name == 'ProfesinalTeach'){
      $('#Maskoni img').attr('src','../assets/images/check.svg');
      $('#Tejary img').attr('src','../assets/images/check.svg');
      $('#Amozeshi img').attr('src','../assets/images/check.svg');
      $('#Varzeshi img').attr('src','../assets/images/check.svg');
      $('#ProfesinalTeach img').attr('src','../assets/images/checked.svg');
    }
  }
  else if (CurrentSelectBox =="Parking"){
    if(Name == "ParkingDarad"){
      $('#ParkingDarad img').attr('src','../assets/images/checked.svg');
      $('#ParkingNadarad img').attr('src','../assets/images/check.svg');
    }
    else if(Name = 'ParkingNadarad'){
      $('#ParkingDarad img').attr('src','../assets/images/check.svg');
      $('#ParkingNadarad img').attr('src','../assets/images/checked.svg');
    }
  }
  else if (CurrentSelectBox =="Elevator"){
    if(Name == "Darad"){
      $('#Darad img').attr('src','../assets/images/checked.svg');
      $('#Nadarad img').attr('src','../assets/images/check.svg');
    }
    else if(Name = 'Nadarad'){
      $('#Darad img').attr('src','../assets/images/check.svg');
      $('#Nadarad img').attr('src','../assets/images/checked.svg');
    }
  }
  else if (CurrentSelectBox =="TypeHouse"){
    if(Name == "Zamin"){
      $('#Zamin img').attr('src','../assets/images/checked.svg');
      $('#Aparteman img').attr('src','../assets/images/check.svg');
      $('#Kolangi img').attr('src','../assets/images/check.svg');
      $('#VilaeeHouse img').attr('src','../assets/images/check.svg');
      $('#Vilaee img').attr('src','../assets/images/check.svg');
    }
    else if(Name == 'Aparteman'){
      $('#Zamin img').attr('src','../assets/images/check.svg');
      $('#Aparteman img').attr('src','../assets/images/checked.svg');
      $('#Kolangi img').attr('src','../assets/images/check.svg');
      $('#VilaeeHouse img').attr('src','../assets/images/check.svg');
      $('#Vilaee img').attr('src','../assets/images/check.svg');
    }
    else if(Name == 'Kolangi'){
      $('#Zamin img').attr('src','../assets/images/check.svg');
      $('#Aparteman img').attr('src','../assets/images/check.svg');
      $('#Kolangi img').attr('src','../assets/images/checked.svg');
      $('#VilaeeHouse img').attr('src','../assets/images/check.svg');
      $('#Vilaee img').attr('src','../assets/images/check.svg');
    }
    else if(Name == 'VilaeeHouse'){
      $('#Zamin img').attr('src','../assets/images/check.svg');
      $('#Aparteman img').attr('src','../assets/images/check.svg');
      $('#Kolangi img').attr('src','../assets/images/check.svg');
      $('#VilaeeHouse img').attr('src','../assets/images/checked.svg');
      $('#Vilaee img').attr('src','../assets/images/check.svg');
    }
    else if(Name == 'Vilaee'){
      $('#Zamin img').attr('src','../assets/images/check.svg');
      $('#Aparteman img').attr('src','../assets/images/check.svg');
      $('#Kolangi img').attr('src','../assets/images/check.svg');
      $('#VilaeeHouse img').attr('src','../assets/images/check.svg');
      $('#Vilaee img').attr('src','../assets/images/checked.svg');
    }
  }

}

// Select element with box class, assign to box variable
const box = document.querySelector("#TypeGharadad")
// Detect all clicks on the document
document.addEventListener("click", function(event) {
  // If user clicks inside the element, do nothing
  if (event.target.closest("#P_TypeGharadad")) return
  // If user clicks outside the element, hide it!
  box.classList.add("DisNone")
})


// Select element with box class, assign to box variable
const Warehouse = document.querySelector("#Warehouse")
// Detect all clicks on the document
document.addEventListener("click", function(event) {
  // If user clicks inside the element, do nothing
  if (event.target.closest("#P_Warehouse")) return
  // If user clicks outside the element, hide it!
  Warehouse.classList.add("DisNone")
})

// Select element with box class, assign to box variable
const TypeUse = document.querySelector("#TypeUse")
// Detect all clicks on the document
document.addEventListener("click", function(event) {
  // If user clicks inside the element, do nothing
  if (event.target.closest("#P_TypeUse")) return
  // If user clicks outside the element, hide it!
  TypeUse.classList.add("DisNone")
})


// Select element with box class, assign to box variable
const Elevator = document.querySelector("#Elevator")
// Detect all clicks on the document
document.addEventListener("click", function(event) {
  // If user clicks inside the element, do nothing
  if (event.target.closest("#P_Elevator")) return
  // If user clicks outside the element, hide it!
  Elevator.classList.add("DisNone")
})

// Select element with box class, assign to box variable
const Parking = document.querySelector("#Parking")
// Detect all clicks on the document
document.addEventListener("click", function(event) {
  // If user clicks inside the element, do nothing
  if (event.target.closest("#P_Parking")) return
  // If user clicks outside the element, hide it!
  Parking.classList.add("DisNone")
})


// Select element with box class, assign to box variable
const TypeHouse = document.querySelector("#TypeHouse")
// Detect all clicks on the document
document.addEventListener("click", function(event) {
  // If user clicks inside the element, do nothing
  if (event.target.closest("#P_TypeHouse")) return
  // If user clicks outside the element, hide it!
  TypeHouse.classList.add("DisNone")
})

let SwitchIconMelk = false;
$("#CategoryMelks").click(function(){
 
  ToggleForms();
})
$("#FormArea").click(function(){
  ToggleForms();
})

function ToggleForms (){
  $("#SelectArea").fadeToggle();
  SwitchIconMelk = !SwitchIconMelk;
  if(SwitchIconMelk){
    $("#CategoryMelks img").attr('src','../assets/images/closeMelk.svg');
    $("#SearchMelks ").addClass("DisNone");
  }
  else{
    $("#CategoryMelks img").attr('src','../assets/images/melk.svg');
    $("#SearchMelks ").removeClass("DisNone");
  }
}

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

