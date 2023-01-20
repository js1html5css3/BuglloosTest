let Kargozar = false;
let PrivacyPolicy = false;
$("#Kargozar").click(function(){
  if(Kargozar){
    $("#Kargozar img").attr('src','../assets/images/check.svg'); 
  }
  else{
    $("#Kargozar img").attr('src','../assets/images/checked.svg'); 
  }
  Kargozar = !Kargozar;
})

$("#PrivacyPolicy").click(function(){
    if(PrivacyPolicy){
      $("#PrivacyPolicy img").attr('src','../assets/images/check.svg'); 
    }
    else{
      $("#PrivacyPolicy img").attr('src','../assets/images/checked.svg'); 
    }
    PrivacyPolicy = !PrivacyPolicy;
  })
