$(document).ready(function () {
    $(".divs form").each(function (e) {
        if (e != 0){
            $(this).hide();
        }
    });

    $("#next").click(function () {
        if ($(".divs form:visible").next().length != 0)
            $(".divs form:visible").next().show().prev().hide();
        else {
            $(".divs form:visible").hide();
            $(".divs form:first").show();
        }
        return false;
    });

    $("#prev").click(function () {
        if ($(".divs form:visible").prev().length != 0)
            $(".divs form:visible").prev().show().next().hide();
        else {
            $(".divs form:visible").hide();
            $(".divs form:last").show();
        }
        return false;
    });
});
