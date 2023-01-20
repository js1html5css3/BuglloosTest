function ShowSelectBox() {
  $("#SortBy").fadeToggle();
}
// Detect all clicks on the document
document.addEventListener("click", function(event) {
  // If user clicks inside the element, do nothing
  if (event.target.closest("#P_SortBy")) return
  // If user clicks outside the element, hide it!
  $("#SortBy").css('display','none');
})


function RadioButton(Name) {
  if (Name == "Maskoni") {
    $("#Tejary img").attr("src", "../assets/images/check.svg");
    $("#Maskoni img").attr("src", "../assets/images/checked.svg");
    $("#Amozeshi img").attr("src", "../assets/images/check.svg");
    $("#Varzeshi img").attr("src", "../assets/images/check.svg");
    $("#AmozeshiHerfeii img").attr("src", "../assets/images/check.svg");
  } else if (Name == "Tejary") {
    $("#Tejary img").attr("src", "../assets/images/checked.svg");
    $("#Maskoni img").attr("src", "../assets/images/check.svg");
    $("#Amozeshi img").attr("src", "../assets/images/check.svg");
    $("#Varzeshi img").attr("src", "../assets/images/check.svg");
    $("#AmozeshiHerfeii img").attr("src", "../assets/images/check.svg");
  } else if (Name == "Amozeshi") {
    $("#Tejary img").attr("src", "../assets/images/check.svg");
    $("#Maskoni img").attr("src", "../assets/images/check.svg");
    $("#Amozeshi img").attr("src", "../assets/images/checked.svg");
    $("#Varzeshi img").attr("src", "../assets/images/check.svg");
    $("#AmozeshiHerfeii img").attr("src", "../assets/images/check.svg");
  } else if (Name == "Varzeshi") {
    $("#Tejary img").attr("src", "../assets/images/check.svg");
    $("#Maskoni img").attr("src", "../assets/images/check.svg");
    $("#Amozeshi img").attr("src", "../assets/images/check.svg");
    $("#Varzeshi img").attr("src", "../assets/images/checked.svg");
    $("#AmozeshiHerfeii img").attr("src", "../assets/images/check.svg");
  } else if (Name == "AmozeshiHerfeii") {
    $("#Tejary img").attr("src", "../assets/images/check.svg");
    $("#Maskoni img").attr("src", "../assets/images/check.svg");
    $("#Amozeshi img").attr("src", "../assets/images/check.svg");
    $("#Varzeshi img").attr("src", "../assets/images/check.svg");
    $("#AmozeshiHerfeii img").attr("src", "../assets/images/checked.svg");
  }
}
