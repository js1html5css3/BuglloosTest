/**
 * show select box of checkbox
 */
var expanded = false
var checkboxes

function showCheckboxes(id) {

    checkboxes = document.getElementById(id);
    if (checkboxes.classList.contains('d-none')) {
        checkboxes.classList.remove('d-none')
        checkboxes.classList.add('d-block')
        expanded = true;
    } else {
        checkboxes.classList.remove('d-block')
        checkboxes.classList.add('d-none')
        expanded = false;
    }
}

$(document).mouseup(function () {
    if ($('.multiSelect-custom').target) {
        let input = event.target
        if (input.checked) {
            if (document.getElementById(input.id).parentElement.parentElement.classList.contains('multiSelect-custom')) {
                $(this).addClass('d-block')
            }
        }
    } else {

        $('.multiSelect-custom').removeClass('d-block')
        $('.multiSelect-custom').addClass('d-none')
    }
});

/**
 * get clue of selected checkbox in select box
 */

function checkboxValue(id) {
    let check_title = document.getElementById(id).parentElement.innerText + ', '
    let element = document.getElementById(id)
    let checkbox_id_label = element.id.split('_')[0] + '_' + element.id.split('_')[1] + "_lable_text"
    if (element.checked == true) {
        element.value = id.split('_')[2]
        let selected_div
        if(id.split('plus-form').length == 2){

            selected_div = element.id.split('_')[0] + "_lable_text" + "_selected"+'_'+id.split('_')[3]+'_'+'plus-form'
        }else{

            selected_div = element.id.split('_')[0] + "_lable_text" + "_selected"
        }
        if (!document.getElementById(selected_div)) {
            $(checkboxes.parentElement.parentElement.parentElement).append("<div id='" + selected_div + "' class='d-flex text-primary text-nowrap' style='max-width: 230px;overflow-x: scroll'>انتخاب شده:  </div>")
        }
        $('#' + selected_div).append("<div id='" + checkbox_id_label + "' class='text-dark' >" + check_title + "</div>")
    } else {
        element.value = 0
        $('#' + checkbox_id_label).remove()
    }
}

function checkboxValueIndexSearch(id) {
    let check_title = document.getElementById(id).parentElement.innerText + ', '
    let element = document.getElementById(id)
    let checkbox_id_label = element.id.split('_')[0] + '_' + element.id.split('_')[1] + "_lable_text"
    if (element.checked == true) {
        element.value = id.split('_')[2]
        if (element.value.split('-')) {
            element.value = element.value.split('-')[0]
        }
        // element.value = select_value.split('-')[0]
        let selected_div = element.id.split('_')[0] + "_lable_text" + "_selected"
        if (!document.getElementById(selected_div)) {
            $(checkboxes.parentElement.parentElement.parentElement).append("<div id='" + selected_div + "' class='d-flex text-primary text-nowrap' style='max-width: 230px;overflow-x: scroll'>انتخاب شده:  </div>")
        }
        $('#' + selected_div).append("<div id='" + checkbox_id_label + "' class='text-dark' >" + check_title + "</div>")
    } else {
        element.value = null
        $('#' + checkbox_id_label).remove()
    }
}

function removeField(id) {
    const ajax = new Ajax()
    const inputId = id.split('_')
    Array.prototype.pop(inputId)
    const form_data = []
    let input;
    let inputValue;
    if (inputId[2] == "property-multiple" || inputId[2] == "contract-multiple") {
        inputValue = 'multiple'
        form_data.push(['detail', inputId[0] + '_' + inputValue]);

    } else {
        input = document.getElementById(id)
        input.querySelectorAll('input').forEach(element => {
            form_data.push(['detail', inputId[0] + '_' + element.value]);
        })
    }
    if($('#'+id).hasClass('multipleSelect')){
        $('#'+id).select2('destroy')
    }
    document.getElementById(id).remove()
    const urlProductDetails = "/agent/listing/remove-detail/" + id
    var flag = true

    ajax.ajax(form_data, flag, urlProductDetails)
}