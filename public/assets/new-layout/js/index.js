const P_SelectInput = document.querySelector(".P_SelectInput");
const RadioGoroup = document.querySelector(".RadioGroup");
// const ImagesChecked = RadioGoroup.querySelectorAll(".ImgCheck");
// const ItemSelect = RadioGoroup.querySelectorAll(".ItemSelect");
const WrapperAllMelks = document.querySelector(".WrapperAllMelks");
const ArrowRight = document.querySelector(".ArrowRight");
const CloseSeach = document.querySelector("#CloseSeach");
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

    breakpoints: {
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

// SearchNavbar.addEventListener('click', () => {
//     $(P_Inputss).fadeToggle();
// })
$("#CloseSeach").click(function () {
    $(P_Inputss).fadeToggle();
})
$("#submit-refresh").click(function () {
    $("#exrtra_form")[0].reset();
    return false; // prevent submitting

})

let SwitchIconMelk = false;
$("#CategoryMelks").click(function () {

    ToggleForms();
})
$("#contract_type").click(function () {

    if($("#contract_type").val() == "اجاره"){
        $("#SellPrice-residential").addClass("DisNone");
        $("#RentPrice-residential").removeClass("DisNone");
        $('#min_price').attr('placeholder','کمینه قیمت اجاره');
        $('#max_price').attr('placeholder','بیشینه قیمت اجاره');
    }
    else if($("#contract_type").val() == "فروش"){
        $('#min_price').attr('placeholder','کمینه قیمت فروش');
        $('#max_price').attr('placeholder','بیشینه قیمت فروش');
        $("#RentPrice-residential").addClass("DisNone");
        $("#SellPrice-residential").removeClass("DisNone");
    }
    else{
        $('#min_price').attr('placeholder','کمینه قیمت ');
        $('#max_price').attr('placeholder','بیشینه قیمت ');
        $("#SellPrice-residential").addClass("DisNone");
        $("#RentPrice-residential").addClass("DisNone");
    }
})


$(document).on('click', '.FilterMelk_Active', function() {

    $(this).removeClass('FilterMelk_Active');
    $(this).addClass('FilterMelk');
    document.querySelector('input[name="category_type"]').value = '';

    document.getElementById('product_type').style.display="none";
    document.getElementById('room_quantity').style.display="none";
    document.getElementById('usage_type').style.display="inline-block";


    document.getElementById('quantity_room').style.display="none";
    document.getElementById('number_parking').style.display="none";
    document.getElementById('elevator').style.display="none";
    document.getElementById('warehouse').style.display="none";


});
$(document).on('click', '.FilterMelk', function() {


    $(".FilterMelk_Active").each(function (index, object) {
        $(object).removeClass('FilterMelk_Active')
        $(object).addClass('FilterMelk')
    })
    $(this).addClass('FilterMelk_Active')
    $(this).removeClass('FilterMelk')
    if ($(this).attr('id') == 'residential') {
        // $("#search_form_product_residential").show();
        // $("#search_form_product_common").hide();
        // $("#search_form_product_land").hide();
        // $("#search_form_product_commercial").hide();
        // $("#FormArea").hide();
        document.querySelector('input[name="category_type"]').value = 'مسکونی';
        document.getElementById('product_type').style.display="none";
        document.getElementById('usage_type').style.display="none";
        document.getElementById('room_quantity').style.display="inline-block";



        document.getElementById('quantity_room').style.display="inline-block";
        document.getElementById('number_parking').style.display="inline-block";
        document.getElementById('elevator').style.display="inline-block";
        document.getElementById('warehouse').style.display="inline-block";



    } else if ($(this).attr('id') == 'commercial') {
        // $("#search_form_product_commercial").show();
        // $("#search_form_product_residential").hide();
        // $("#search_form_product_common").hide();
        // $("#search_form_product_land").hide();
        // $("#FormArea").hide();
        document.querySelector('input[name="category_type"]').value = 'تجاری';
        document.getElementById('usage_type').style.display="none";
        document.getElementById('room_quantity').style.display="none";
        document.getElementById('product_type').style.display="inline-block";

        document.getElementById('quantity_room').style.display="inline-block";
        document.getElementById('number_parking').style.display="inline-block";
        document.getElementById('elevator').style.display="inline-block";
        document.getElementById('warehouse').style.display="inline-block";

    } else if ($(this).attr('id') == 'land') {
        // $("#search_form_product_land").show();
        // $("#search_form_product_residential").hide();
        // $("#search_form_product_common").hide();
        // $("#search_form_product_commercial").hide();
        // $("#FormArea").hide();
        document.querySelector('input[name="category_type"]').value = 'زمین';

        document.getElementById('product_type').style.display="none";
        document.getElementById('room_quantity').style.display="none";
        document.getElementById('usage_type').style.display="inline-block";


        document.getElementById('quantity_room').style.display="none";
        document.getElementById('number_parking').style.display="none";
        document.getElementById('elevator').style.display="none";
        document.getElementById('warehouse').style.display="none";


    }
    // $("#SearchMelks ").addClass("DisNone");
    // $("#CategoryMelks img").attr('src', '/assets/new-layout/images/closeMelk.svg');
})

function ToggleForms() {
    if (!$("#search_form_product").css('display') == 'block' || $("#CategoryMelks img").attr('src') == '/assets/new-layout/images/melk.svg') {
        $("#CategoryMelks img").attr('src', '/assets/new-layout/images/closeMelk.svg');
        $("#SearchMelks").addClass("DisNone");
        document.getElementById('SearchMelks').style.display="none";
        $("#search_form_product_common").hide();
        $("#search_form_product_commercial").hide();
        $("#search_form_product_residential").show();
        $("#search_form_product_land").hide();
        $("#FormArea").hide();
    } else {
        $("#CategoryMelks img").attr('src', '/assets/new-layout/images/melk.svg');
        $("#SearchMelks ").removeClass("DisNone");
        document.getElementById('SearchMelks').style.display="inline-block";
        $("#search_form_product_residential").hide();
        $("#search_form_product_common").hide();
        $("#search_form_product_land").hide();
        $("#search_form_product_commercial").hide();
        $("#FormArea").show();
        // $(".FilterMelk").each(function (index, object) {
        //     $(object).removeClass('FilterMelk_Active')
        // })
    }
}

function ChangeGharardad(id) {
    var name = document.getElementById("SelectGharadad-" + id).value;
    document.getElementById("contract_type").value = name;

    if (name == "اجاره") {
        $("#SellPrice-" + id).addClass("DisNone");
        $("#RentPrice-" + id).removeClass("DisNone");
        $('#min_price').attr('placeholder','کمینه قیمت اجاره');
        $('#max_price').attr('placeholder','بیشینه قیمت اجاره');
    } else if(name == "فروش") {
        $("#RentPrice-" + id).addClass("DisNone");
        $("#SellPrice-" + id).removeClass("DisNone");
        $('#min_price').attr('placeholder','کمینه قیمت فروش');
        $('#max_price').attr('placeholder','بیشینه قیمت فروش');
    }
    else
    {
        $('#min_price').attr('placeholder','کمینه قیمت ');
        $('#max_price').attr('placeholder','بیشینه قیمت ');
        $("#RentPrice-" + id).addClass("DisNone");
        $("#SellPrice-" + id).addClass("DisNone");
    }
}



ToggleForms()
