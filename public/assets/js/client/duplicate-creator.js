function duplicateForm(parent, child) {
    let $child_id = `#${child}`
    let $form_id = `#${parent}`
    $($child_id).find('#addForm').css('display', 'none')
    $('.multipleSelect').select2('destroy');
    $('.multipleSelect')
        .removeAttr('data-live-search')
        .removeAttr('data-select2-id')
        .removeAttr('aria-hidden')
        .removeAttr('tabindex');

    $('.singleSelect').select2('destroy');
    $('.singleSelect')
        .removeAttr('data-live-search')
        .removeAttr('data-select2-id')
        .removeAttr('aria-hidden')
        .removeAttr('tabindex');

    var elmnt = $($child_id).clone();
    var counter = child.split('_')[2]
    let counterField = 1
    let fieldset_len = $('#' + parent + ' fieldset')
    for (let i = 0; i < fieldset_len.length; i++) {
        counterField = counterField + 1
        fieldset_len[i].id = 'child_' + fieldset_len[i].id.split('_')[1] + '_' + counterField
    }
    counter++;
    elmnt.find('[id]').each(function () {
        if (this.classList == 'btn btn-outline-danger float-md-right') {
            this.remove()
        } else {
            var baseIdBox = this.id.split('_')
            if (this.id.split('_').length == 2) {
                this.id = this.id.split('_')[0] + `_${counter}` + '_' + 'plus-form'
                this.name = this.id.split('_')[0] + `_${counter}` + '_' + 'plus-form'
            } else {
                this.id += `_${counter}` + '_plus-form'
                this.name += `_${counter}` + '_plus-form'
            }


            if (this.tagName == 'INPUT' && $(this).attr("onClick") != undefined) {
                const boxId = this.id.split('_')
                const selectBoxId = baseIdBox[2] + '_' + 1 + '_multiple' + `_${counter}_` + 'plus-form'
                $(this).attr('onClick', "checkboxValue('" + this.id + "')")
            }
            this.value = null
        }
    })
    let id = child.split('_')
    let nextId = id[0]
    nextId += '_'
    nextId += id[1]
    nextId += '_'
    nextId += counter
    elmnt.append("<input id='delete_" + counter + "-deleteData' onclick=\"removeForm('delete_" + counter + "-deleteData')\" class='btn btn-outline-danger float-md-right' value='-'>  <input id='addForm' onclick=\"duplicateForm('" + parent + "','" + nextId + "')\" class='btn btn-outline-warning' value='+'>")
    elmnt.appendTo($form_id);
    $(".persianDate").pDatepicker({
        initialValueType: 'persian',
        format: 'YYYY-MM-DD',
        defaultDate: "",
        autoClose: true,
        initialValue: false
    });
    $('.multipleSelect').select2({
        allowClear: true,
        multiple: true,
        closeOnSelect: false
    });
    $('.singleSelect').select2({
            width: '100%',
        }
    )
}

function removeForm(id) {
    if (id.split('-')[1] == 'deleteData') {
        const formData = []
        let urlProductDetails = "/agent/product/remove-details"
        let $parent_id = $('#' + id).closest('fieldset').attr('id')
        const product_key = document.getElementById('product_key').innerText.split(':')[1].replace(')', '')
        document.getElementById($parent_id).querySelectorAll("input, select, textarea").forEach(element => {
            if (element.value != null) {
                var title = $(element).closest('.mt-3').find('.legendText')[0].innerText
                formData.push([element.id, element.value, product_key, title]);
                flag = true
            } else {
                flag = false
            }
        })
        if (flag = true)
            ajax.ajax(formData, flag, urlProductDetails)
        let parentChild
        let f = false
        let split_id
        document.getElementById($parent_id).parentElement.querySelectorAll("input, select, textarea").forEach(element => {
            if ($(element).closest('fieldset').attr('id') == $parent_id) {
                parentChild = element.id
                f = true
            }
            if (f == true) {
                split_id = element.id.split('_')
                if (split_id[1] > parentChild.split('_')[1]) {
                    element.id = split_id[0]
                    element.id += '_'
                    element.id += split_id[1] - 1
                }
            }
        })
        let fieldset_parent_id = $('#' + id).parent().parent().parent().find('.clonedInput').attr('id')
        let fieldset_len = $('#' + fieldset_parent_id + ' fieldset')
        if (fieldset_len.length == 2) {
            let next_id = fieldset_len[0].id.split('_')[0] + '_' + fieldset_len[0].id.split('_')[1] + '_' + 2
            let first_id = fieldset_len[0].id.split('_')[0] + '_' + fieldset_len[0].id.split('_')[1] + '_' + 1
            document.getElementById(next_id).id = first_id
            $('#' + first_id).find('#addForm').css('display', 'block')
        }
        $('#' + id).closest("fieldset").remove()
    }
}
