$(document).ready(function () {
    try {
        var table = ``;
        var tabledata = ``;
        var dataset = [];
        var model_title = "";
        var data = {};
        var movableColumns = false;
        var columns = [];
        var obj = {};
        //Start Task#227  H.Mishani 2022.12.13
        var from = 1;
        var current_from = 1;
        //End Task#227  H.Mishani 2022.12.13
        $("#table").parent().append("<div id='delete_Zone'></div>")
        $("#delete_Zone").append(`<div class="modal " style="margin-top:120px;"  id="modal-from-dom" del_id="2" del_type="2" tabindex="-1" role="dialog" aria-labelledby="modal-from-domLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h5 class="modal-title" id="modal-from-domLabel"> حذف ${model_title.slice(0, model_title.length - 1)}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true" class="btn-close">&times;</span>
                                        </button>
                                        </div>
                                        <div class="modal-body">
                                            آیا از حذف این مورد اطمینان دارید؟
                                        </div>
                                        <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">منصرف شدم</button>
                                        <button type="button" class="btn btn-danger"  id="delete_item">بله</button>
                                        </div>
                                    </div>
                                    </div>
                                    </div>`);

        $("#table").parent().append("<div id='recursivetable'></div>")
        $("#recursivetable").append(`<div class="modal fade" id="recursiveInlineTable" tabindex="-1" aria-labelledby="recursiveInlineTable" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="btn-close"  data-dismiss="modal" aria-hidden="true" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <table>
                                                                <thead>
                                                                <tr><td>شماره موبایل </td>
                                                                    <td>تاریخ </td>
                                                                    <td>وضعیت</td>
                                                                </tr></thead>
                                                                <tbody class="log">
                                                                </tbody>
                                                            </table>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>`);

        $("#table").parent().append("<div id='confirmation_modal'></div>")
        $("#confirmation_modal").append(
            `<div class="modal fade" style="margin-top:100px;" id="confirmRequest" aria-labelledby="confirmRequest" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close"  data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="confirmRequest_body">

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">بستن</button>
                            <button type="button" class="btn btn-danger"  id="confirmRequest_button" >تایید درخواست </button>
                        </div>
                    </div>
                </div>
            </div>`);

        $(document).on("click", ".confirmation_call_route", function () {
            show_confirmation_modal({
                route: $(this).attr('route'),
                class: $(this).attr('route_class'),
                title: $(this).attr('route_title'),
                id: $(this).attr('toggle_id'),
                operation_id: $(this).attr('operation_index'),
                confirmation_message: $(this).attr('confirmation_message')
            })
        });

        $(document).on("click", ".confirmation_call_form", function () {
            var toggleid = $(this).attr('toggle_id');
            show_confirmation_modal_form({
                route: $(this).attr('route'),
                class: $(this).attr('route_class'),
                title: $(this).attr('route_title'),
                id: $(this).attr('toggle_id'),
                operation_id: $(this).attr('operation_index')
            });
        });

        $(document).on("click", "#confirmRequest_button", function () {
            try {
                let operation_id = $(this).attr('operation_id');
                let confirmation = $(this).attr('confirmation');
                let operation_data = _.last(dataset).formatterParams.items[operation_id];
                if (confirmation == "true") {
                    filtered_ajax(true, obj);
                    hide_modal('confirmRequest');
                    return 1;
                }

                if (operation_data.type == "confirmation_call_form") {

                    let formdata = [];
                    _.each(operation_data.form_params, function (e, i, l) {
                        let key = i.toString();
                        obj = {};
                        obj[key] = $("#" + i).val();
                        formdata.push([key, $("#" + i).val()]);
                    });
                    filtered_ajax(true, {
                        'route': $(this).attr('ajax_route'),
                        'type': 'call_route_form',
                        'form_data': formdata, 'id': $(this).attr('toggle_id')
                    });
                } else if (operation_data.type == "confirmation_call_route") {
                    filtered_ajax(true, { 'route': $(this).attr('ajax_route'), 'type': 'call_route', 'id': $(this).attr('toggle_id') });
                }
                hide_modal('confirmRequest');
            } catch (ex) {

            }
        });

        function hide_modal(id) {
            // $("#"+id).removeClass("in");
            // $(".modal-backdrop").remove();
            // $('body').removeClass('modal-open');
            // $('body').css('padding-right', '');
            // $("#"+id).hide();
            // $("#"+id).modal('toggle');
            // $(".modal-backdrop").remove();
            // $('body').removeClass('modal-open');
            $("#" + id).find(".btn-close").trigger('click');
        }

        function show_confirmation_modal(element) {
            (_.has(element, "confirmation_message") && element.confirmation_message) ? $("#confirmRequest_body").html(element.confirmation_message)
                : $("#confirmRequest_body").html(`آیا اطمینان کامل برای ${element.title} دارید؟`);
            $("#confirmRequest_button").html(element.title);
            $('#confirmRequest_button').removeClass();
            $('#confirmRequest_button').addClass("btn btn-" + element.class);
            $('#confirmRequest_button').attr("ajax_route", element.route);
            $('#confirmRequest_button').attr("toggle_id", element.id);
            $('#confirmRequest_button').attr("operation_id", element.operation_id);
        }

        function show_confirmation_modal_form(element) {
            show_confirmation_modal(element);

            let list = _.first(_.filter(tabledata, function (el) { return el.id == element.id }))

            _.each(_.last(dataset).formatterParams.items[element.operation_id].form_params, function (e, i, l) {
                if (e.type == 'select2') {
                    let container = $("<div class='container'></div>");
                    let div = $("<div class='row'></div>");
                    let span = $("<span class=' col-4'>ارجاع به :‌</span>");
                    let sel = $("<select class='form-control col-8'></select>").attr('name', i).attr('id', i);
                    div.append(span);
                    div.append(sel);
                    container.append(div)
                    $("#confirmRequest_body").append(container);
                    selData = [];
                    let source_segment = e.source.split('.');
                    _.each(list[source_segment[0]], function (ele, ind, lis) {
                        if (source_segment.length == 2)
                            selData.push({ id: ele.id, text: ele[source_segment[1]] });
                        else if (source_segment.length == 3)
                            selData.push({ id: ele[source_segment[1]].id, text: ele[source_segment[1]][source_segment[2]] });
                    });
                    $("#" + i).select2({
                        data: selData,
                        multiple: e.multiple == 'multiple' ? true : false
                    });
                }
            })

            $("#confirmRequest_body").find('.select2').css("width", '150');

        }

        filtered_ajax(false);



        function show_toggle_confirmation_modal(element) {
            $("#confirmRequest_body").html(`آیا اطمینان کامل برای ${element.title} دارید؟`);
            $("#confirmRequest_button").html(element.title);
            $("#confirmRequest_button").attr("confirmation", element.confirmation);
        }

        $(document).on("click", ".copyToClipboardLink", function () {
            var clipboard = $(this).attr('clipboard').toString();
            copyToClipboard(clipboard);
            toastr.success("لینک مورد نظر در کیپبورد ذخیره شد");
        });

        $(document).on("click", ".recursiveInlineTable", function () {
            var id = $(this).attr('request_id');
            var route = $(this).attr('route');
            let res = route.split("{id}");
            let url = base_url + res[0] + id + res[1];
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                data: {
                },
                success: function (response) {
                    $(".log").empty();
                    $.each(response.data, function (index, value) {
                        $(".log").append('<tr><td>' + value.username + '</td><td> ' + value.created_at + ' </td><td> ' + value.status + ' </td></tr>');
                    })
                }
            })
        });
        $(document).on("click", ".toggle_change", function () {
            obj = {};
            var id = $(this).attr('toggle_status');
            var column_name = $(this).attr('column');
            var toggle_type = $(this).attr('toggle_type');
            var confirmaion_attr = $(this).attr('confirmaion_attr');
            obj.id = id;
            obj.type = "toggle";
            obj.column = column_name;
            obj.toggle_type = toggle_type;
            if (toggle_type == "toggleStatusElse") {
                if (confirmaion_attr == "false") {
                    obj.toggle_else_value = $(this).attr('toggle_value');
                    obj.value_back = $(this).attr('value_back');
                } else {
                    obj.toggle_else_value = $(this).attr('toggle_value');
                    obj.value_back = $(this).attr('value_back');
                    show_toggle_confirmation_modal({
                        title: $(this).html(),
                        confirmation: true
                    });
                    return 0;
                }
            }
            else if (toggle_type == "toggleStatus") {

                if (confirmaion_attr == "false") {
                    obj.val1 = $(this).attr('value1');
                    obj.val2 = $(this).attr('value2');
                } else {
                    obj.val1 = $(this).attr('value1');
                    obj.val2 = $(this).attr('value2');
                    show_toggle_confirmation_modal({
                        title: $(this).html(),
                        confirmation: true
                    });
                    return 0;
                }
            }
            else if (toggle_type == "delete") {
                var id = $(this).attr('toggle_status');
                $("#modal-from-dom").attr('del_id', id);
                $("#modal-from-dom").closest('.modal-dialog').css("margin-top","100px");
                
                return 0;
            }
            filtered_ajax(true, obj);
        });
        $(document).on("click", "#delete_item", function () {
            var id = $("#modal-from-dom").attr('del_id');
            obj = {};
            obj.id = id;
            obj.type = 'toggle';
            obj.toggle_type = 'delete';
            filtered_ajax(true, obj);
            hide_modal('modal-from-dom');
            $("#modal-from-dom").closest('.modal-dialog').css("margin-top","100px");
        })

        $(document).on("click", ".toggle_dropdown", function () {

            let val = $(this).closest('.dropdown-menu-right').css("display");
            if (val == 'flex') $(this).closest('.dropdown-menu-right').css('display', 'none');
            else $(this).closest('.dropdown-menu-right').css('display', 'none');
        });

        $(document).on("click", "#delete_all_filters", function () {
            filtered_ajax(false, null);
            empty_all_headerfilters();
        });

        window.update_tabulator_with_ids = function update_tabulator_with_ids(data) {
            current_from = 1;
            table = new Tabulator("#table", {
                placeholder: "<h1 style='color:black;'>" + model_title + " پیدا نشد . . . .</h1>",
                height: 600,
                minWidth: 150,
                locale: false,
                filterMode: "remote",
                initialSort: [
                    // { column: "id", dir: "desc" },
                ],
                langs: {
                    "persian": {
                        "columns": {
                            "first_name": "نام",
                        },
                        "ajax": {
                            "loading": "لطفا منتظر بمانید",
                            "error": "خطا",
                        },
                        "groups": {
                            "item": "رکورد",
                            "items": "رکوردها",
                        },
                        "pagination": {
                            "page_size": "اندازه صفحه",
                            "first": "اولین",
                            "first_title": "صفحه اول ",
                            "last": "آخرین",
                            "last_title": "آخرین صفحه ",
                            "prev": "قبلی",
                            "prev_title": "صفحه قبلی ",
                            "next": "بعدی",
                            "next_title": "صفحه بعدی ",
                        },
                        "headerFilters": {
                            "default": "فیلتر ستون ",
                            "columns": {
                                "name": "نام فیلتر . . .",
                            }
                        }
                    }
                },
                data: data,
                layout: "fitDataFill",
                columns: columns,
            });
            $("#filters_badge").remove();
            $("#table").parent().prepend("<div id='filters_badge'></div>")
            $("#filters_badge").append(`<h4 class="m-1"  style="display:inline-block;">
                        <span class="badge rounded-pill bg-success">${data.length} مورد پیدا شد</span></h4>`);
        }

        function filtered_ajax(checkfilter = true, toggle_status = null) {
            if (table != ``)
                table.alert(`<img src='${base_url}/images/loader.gif'  style='height: 250px'><h1>لطفا منتظر بمانید . . . . </h1>`);
            var allFilters = [];
            data = {
                _token: token
            };
            if (checkfilter) {
                _.each(dataset, function (e, i, l) {
                    if (e.type == "range_number") {
                        var start_value = $(`#${e.field}_header_filter`).find('input').eq(0).val();
                        var end_value = $(`#${e.field}_header_filter`).find('input').eq(1).val();
                        if (start_value || end_value)
                            allFilters.push({ field: e.field, type: 'range_number', value: { start: start_value, end: end_value } });
                        dataset[i]['temp_vals'] = { start: start_value, end: end_value };
                    }
                    else if (e.type == "text") {
                        var text_val = $(`#${e.field}_header_filter`).find('input').eq(0).val();

                        if (text_val && _.has(e, "formatter") && e.formatter == "relation_column")
                            allFilters.push({ field: e.field, type: 'like', value: text_val, relation_column: e.formatterParams.column });
                        else if (text_val)
                            allFilters.push({ field: e.field, type: 'like', value: text_val });
                        dataset[i]['temp_vals'] = text_val;
                    }
                    else if (e.type == "select2") {
                        var selected_array = $(`#${e.field}_header_filter`).find('select').eq(0).select2().val();

                        if (_.isArray(selected_array) && selected_array.length > 0 && e.formatter == "relation_list")
                            allFilters.push({ field: e.field, type: 'whereIn', value: selected_array, relation_list: e.formatterParams.column });
                        else if (_.isArray(selected_array) && selected_array.length > 0 && e.filter_type == "OrWherInMultipleTables") {
                            selected_array = $(`#${e.field}_header_filter`).find('select').eq(0).select2('data');
                            selected_array = _.pluck(selected_array, 'text');
                            console.log(selected_array);
                            allFilters.push({ field: e.formatterParams.column, type: 'OrWherInMultipleTables', value: selected_array, relation_list: e.formatterParams.coditonal_cases });
                        }
                        else if (_.isArray(selected_array) && selected_array.length > 0 && (e.formatter == "relation_column_blong_one" || e.formatter == "relation_list_number"))
                            allFilters.push({ field: e.field, type: 'whereIn', value: selected_array, relation_list: e.formatterParams.column });
                        else if (_.isArray(selected_array) && selected_array.length > 0)
                            allFilters.push({ field: e.field, type: 'whereIn', value: selected_array });
                        dataset[i]['temp_vals'] = selected_array;
                    }
                    else if (e.type == "range_date") {
                        var range_date = $(`#${e.field}_header_filter`).find('input').eq(0).attr('value');
                        if (typeof (range_date) !== "undefined" && range_date !== null && range_date !== '') {
                            const temparr = range_date.split("تا");
                            if (temparr.length < 2)
                                temparr.push(temparr[0]);
                            allFilters.push({ field: e.field, type: 'range_date', value: { from: temparr[0], to: temparr[1] } });
                            dataset[i]['temp_vals'] = range_date;
                        }
                    }
                });
                data['allfilters'] = allFilters;
            }
            if (toggle_status != null) {
                data['toggle_status'] = toggle_status;
            }

            $.ajax({
                url: url,
                type: "POST",
                data: data
            })
                .done(function (response) {
                    //Start Task#213 H.Mishani 2022.12.08
                    if (_.has(response, "update_field") && !_.isEmpty(response.update_field) & response.update_field.id != "0") {
                        //End Task#213 H.Mishani 2022.12.08
                        toastr.success('عملیات با موفقیت انجام شد.');
                    }
                    var sort_obj = '';
                    if (!_.has(response, "models")) {
                        toastr.error('مشکلی پیش آمده کارشناسان ما در حال بررسی هستند.');
                        table.clearAlert();
                        return 0;
                    }
                    //Start Task#227  H.Mishani 2022.12.13
                    current_from = _.has(response.models, 'from') ? response.models.from : 1;
                    //End Task#227  H.Mishani 2022.12.13
                    tabledata = response.models.data;
                    dataset = response.dataset;
                    _.each(dataset, function (e, i, l) {
                        if (e.field == 'id' && _.has(e, "extra_feature")) {
                            model_title = e.extra_feature.model_title;
                        }
                        if (e.field == 'id' && _.has(e.extra_feature, "movableColumns")) {
                            movableColumns = e.extra_feature.movableColumns;
                        }
                        if (e.type == "range_number") {
                            var start_value = $(`#${e.field}_header_filter`).find('input').eq(0).val();
                            var end_value = $(`#${e.field}_header_filter`).find('input').eq(1).val();
                            dataset[i]['temp_vals'] = { start: start_value, end: end_value };
                        }
                        else if (e.type == "text") {
                            var text_val = $(`#${e.field}_header_filter`).find('input').eq(0).val();
                            if (text_val)
                                dataset[i]['temp_vals'] = text_val;
                        }
                        else if (e.type == "select2") {
                            var selected_array = $(`#${e.field}_header_filter`).find('select').eq(0).select2().val();
                            if (_.isArray(selected_array) && selected_array.length > 0)
                                dataset[i]['temp_vals'] = selected_array;
                        }
                        else if (e.type == "range_date") {
                            var range_date = $(`#${e.field}_header_filter`).find('input').eq(0).attr('value');
                            if (typeof (range_date) !== "undefined" && range_date !== null && range_date !== '') {
                                const temparr = range_date.split("تا");
                                if (temparr.length < 2)
                                    temparr.push(temparr[0]);
                                dataset[i]['temp_vals'] = range_date;
                            }
                        }
                    });
                    //در این قسمت فیلتر های یادداشت به صورت بج پاک می شود و دوباره ساخته می شود
                    $("#filters_badge").remove();
                    $("#table").parent().prepend("<div id='filters_badge'></div>")
                    if (response.filters != null && response.filters.length > 0)
                        $("#filters_badge").append(`<h4 class="m-1" id="delete_all_filters" style="display:inline-block;">
                        <span class="badge rounded-pill bg-danger"><a href="#" class="m-1" style="color:white;" > ✕</a> حذف همه فیلترها  </span></h4>`);
                    if (response.count > 0)
                        $("#filters_badge").append(`<h4 class="m-1"  style="display:inline-block;">
                        <span class="badge rounded-pill bg-success">${window.hasOwnProperty('update_tabulator') ? points.length : response.count} مورد پیدا شد</span></h4>`);
                    if (checkfilter) {
                        _.each(dataset, function (e, i, l) {
                            //در اینجا فیلتر های که توسط یوزر انجام شده در قالب یک یادداشت بالای جدول به کاربر نمایش داده می شود
                            if (e.type == "range_number" && _.has(e, "temp_vals")) {
                                if ((!_.isUndefined(e.temp_vals.start) && e.temp_vals.start != '') || (!_.isUndefined(e.temp_vals.end) && e.temp_vals.end != '')) {
                                    var message = ``;
                                    if (!_.isUndefined(e.temp_vals.start) && e.temp_vals.start != '')
                                        message += 'از ' + e.title + ` : ` + e.temp_vals.start;
                                    if (!_.isUndefined(e.temp_vals.end) && e.temp_vals.end != '')
                                        message += ' تا ' + e.title + ` : ` + e.temp_vals.end;
                                    $("#filters_badge").append(`<h4 class="m-1 p-2" style="display:inline-block;"><span class="badge rounded-pill bg-warning">
                                    ${message}</span></h4>`);
                                }
                            }
                            else if (e.type == "text" && _.has(e, "temp_vals")) {
                                var message = e.title + ` : ` + e.temp_vals;
                                $("#filters_badge").append(`<h4 class="m-1 p-2" style="display:inline-block;"><span class="badge rounded-pill bg-warning">
                                ${message}</span></h4>`);
                            }
                            else if (e.type == "select2" && _.has(e, "temp_vals")) {
                                var message = e.title + ` : `;

                                if (_.has(e.extra_feature, "distinct") && e.extra_feature.distinct)
                                    $.each(response[e.field + "_distinc"], function (index, value) {
                                        if (_.isArray(e.temp_vals) && _.contains(e.temp_vals, value[e.field]))
                                            message += value[e.field] + ` , `;
                                    });
                                else if (_.has(e.extra_feature, "distinct") && !e.extra_feature.distinct) {

                                    var options = [];
                                    _.each(response[e.field + "_choices"], function (e, i, l) {
                                        options.push({ id: e.id, text: e.title })
                                    });
                                    var values = [];
                                    $.each(options, function (index, value) {
                                        if (_.isArray(e.temp_vals) && _.contains(e.temp_vals, value.id.toString()))
                                            message += value.text + ` , `;
                                    });
                                }
                                else if (_.has(e, "formatter") && (e.formatter == "relation_list" || e.formatter == "relation_column_blong_one" || e.formatter == "relation_list_number")) {
                                    column_add = e['formatterParams']['column'];
                                    var options = [];
                                    _.each(response[e.field], function (e, i, l) {
                                        options.push({ id: e.id, text: e[column_add] })
                                    });
                                    var values = [];
                                    $.each(options, function (index, value) {
                                        if (_.isArray(e.temp_vals) && _.contains(e.temp_vals, value.id.toString()))
                                            message += value.text + ` , `;
                                    });
                                }
                                $("#filters_badge").append(`<h4 class="m-1 p-2" style="display:inline-block;"><span class="badge rounded-pill bg-warning">
                                ${message}</span></h4>`);
                            }
                            else if (e.type == "range_date" && _.has(e, "temp_vals")) {
                                var message = e.title + ` : ` + e.temp_vals;
                                $("#filters_badge").append(`<h4 class="m-1 p-2" style="display:inline-block;"><span class="badge rounded-pill bg-warning">
                                ${message}</span></h4>`);
                            }
                        });
                    }
                    //تبیولیتوز است تا به شما کمک کند فرمت های هر سلول را سفارشی سازی کنید یک امکان برای گسترش 
                    Tabulator.extendModule("format", "formatters", {
                        relation_column: function (cell, formatterParams) {
                            var test = cell.getValue()[0];

                            if (cell.getValue())
                                return cell.getValue()[0][formatterParams.column];
                            else
                                return "---";
                        },
                        relation_column_blong_one: function (cell, formatterParams) {
                            let cur_val = cell.getValue();
                            let current_Val = "";
                            let cur_Row = cell.getRow().getData();
                            if (_.has(formatterParams, "coditonal_cases")) {
                                _.each(formatterParams.coditonal_cases, function (e, i, l) {
                                    if (cur_val == e.value) current_Val = cell.getRow().getData()[e.table_name][e.column];
                                })
                            } else {
                                if (cell.getValue())
                                    return cell.getValue()[formatterParams.column];
                                else
                                    return "---";
                            }
                            return current_Val;
                            console.log(cur_val);
                        },
                        link_maker: function (cell, formatterParams) {
                            var test = cell.getValue();
                            return `<a href="${cell.getValue()}">${cell.getValue()}</a>`;
                        },
                        relation_list: function (cell, formatterParams) {
                            let roles = cell.getValue();
                            var content = ``;
                            _.each(roles, function (e, i, l) {
                                content += `<span class="badge badge-success ml-1">${e[formatterParams.column]}</span>`;
                            })
                            return content;
                        },
                        relation_list_number: function (cell, formatterParams) {
                            let roles = cell.getValue();
                            var content = ``;
                            _.each(roles, function (e, i, l) {
                                content += `<span class=" badge badge-${e.className} ml-1">${e.id} : ${e[formatterParams.column]}</span>`;
                            })
                            return content;
                        },
                        lable_status: function (cell, formatterParams) {
                            var content = ``;
                            var current_Val = cell.getRow().getData()[formatterParams.field];
                            if (current_Val == null) return "---";
                            _.each(response[formatterParams.field + '_choices'], function (e, i, l) {
                                if (current_Val.toString() == e.id.toString())
                                    //Start Task#185 H.Mishani 2022.12.06
                                    content += `<span class="badge badge-${e.className ? e.className : "success"} ml-1">${e.title}</span>`;
                                //End Task#185 H.Mishani 2022.12.06
                            });
                            return content;
                        },
                        banner: function (cell, formatterParams) {
                            var content = ``;
                            var current_Val = cell.getValue();
                            content += `<img class=" m-1" src="${base_url}/storage/products/${current_Val.product_id}/thumbnail/${current_Val.name}.${current_Val.extention}" width="100" height="100"/>`;
                            return content;
                        },
                        image: function (cell, formatterParams) {
                            //Start Task#199 H.Mishani 2022.12.07
                            var content = ``;
                            if (_.has(formatterParams, "source")) $(cell.getElement()).css({ "background-color": "black" });
                            var current_Val = cell.getValue();
                            content += `<img class=" m-1" src="${current_Val.source == "absoloute" ? base_url : ''}${current_Val}" width="100" height="100"/>`;
                            return content;
                            //End Task#199 H.Mishani 2022.12.07
                        },
                        underline_link: function (cell, formatterParams) {
                            var content = ``;
                            var current_Val = cell.getValue();
                            var newval = current_Val.replaceAll(" ", "_");
                            content += `<a target="_blank" href="${base_url}/pages/${newval}" >${current_Val}</a>`;
                            return content;
                        },
                        link: function (cell, formatterParams) {
                            var content = ``;
                            var current_Val = cell.getValue();
                            var newval = current_Val.replaceAll(" ", "_");
                            content += `<a target="_blank" href="${base_url}/pages/${newval}" >${current_Val}</a>`;
                            return content;
                        },
                        auto_increment: function (cell, formatterParams) {
                            return current_from++;
                        },
                        operations: function (cell, formatterParams) {
                            $(cell.getElement()).css({
                                "overflow": "unset"
                            });
                            content = ``;
                            var dropdown_Class = "";
                            var confiration_attr = ""
                            if (_.has(formatterParams, "view") && formatterParams.view == "dropdown") {
                                content += `<div class="dropdown">
                                <a class="btn btn-sm btn-icon-only toggle_dropdown" href="#"
                                role="button" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="true">
                                    <i class="fas fa-ellipsis-v"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow" ><div style="display:flex;flex-direction:column;">`;
                                dropdown_Class = "dropdown-item";
                            }
                            _.each(formatterParams.items, function (e, i, l) {
                                let flag = true;
                                //Start Task#238 H.Mishani 2022.12.14
                                _.each(e.conditional_column, function (element, index, listt) {
                                    let conditional_type = "";
                                    conditional_type = _.has(e, "conditional_type") ? e.conditional_type : 'equal';

                                    switch (conditional_type) {
                                        case 'equal':
                                            if (String(cell.getRow().getData()[element]) != String(e.conditional_value[index])) {
                                                flag = false;
                                            }
                                            break;
                                        case 'not_equal':
                                            if (String(cell.getRow().getData()[element]) == String(e.conditional_value[index])) {
                                                flag = false;
                                            }
                                            break;
                                        default: //optional
                                        //statements
                                    }
                                });
                                if ((_.has(e, "conditional_column") && flag) || !_.has(e, "conditional_column")) {
                                    //End Task#238 H.Mishani 2022.12.14
                                    if (e.type == "button") {
                                        let res = e.route.split("{id}");
                                        if (_.has(e, "route_param"))
                                            var parameter_selection = cell.getRow().getData()[e.route_param];
                                        else if (_.has(e, "route_combintion_param"))
                                            var parameter_selection = cell.getRow().getData()[e.route_combintion_param[0]] + "_" + cell.getRow().getData()[e.route_combintion_param[1]];
                                        else
                                            var parameter_selection = cell.getRow().getData()['id'];
                                        content += `<a class="btn btn-${e.class} m-1 ${dropdown_Class}" href="${base_url}${res[0]}${parameter_selection}${res[1]}"
                                            role="button">${e.title}</a>`;
                                    }
                                    else if (e.type == 'toggleStatus') {
                                        var test = cell.getRow().getData();
                                        if (_.has(e, "confirmation") && e.confirmation == true) {
                                            confiration_attr = "confirmaion_attr='true' data-toggle='modal' data-target='#confirmRequest'";
                                        } else
                                            confiration_attr = "confirmaion_attr='false'"
                                        if (cell.getRow().getData()[e.item] == e.values[0])
                                            content += `<button class="btn btn-${e.class[0]} m-1 toggle_change ${dropdown_Class}" ${confiration_attr} value1="${e.values[0]}"
                                            value2="${e.values[1]}" column="${e.item}" toggle_type="toggleStatus" toggle_status="${cell.getValue()}"
                                            role="button"> ${e.title[0]}</button>`;

                                        else if (cell.getRow().getData()[e.item] == e.values[1])
                                            content += `<button class="btn btn-${e.class[1]} m-1 toggle_change ${dropdown_Class}" ${confiration_attr} value1="${e.values[0]}"
                                            value2="${e.values[1]}" column="${e.item}" toggle_type="toggleStatus"  toggle_status="${cell.getValue()}"
                                            role="button"> ${e.title[1]}</button>`;
                                    }
                                    else if (e.type == 'toggleStatusElse') {
                                        if (_.has(e, "confirmation") && e.confirmation == true) {
                                            confiration_attr = "confirmaion_attr='true' data-toggle='modal' data-target='#confirmRequest'";
                                        } else
                                            confiration_attr = "confirmaion_attr='false'";
                                        if (cell.getRow().getData()[e.item] == e.value)
                                            content += `<button class="btn btn-${e.class[0]} m-1 toggle_change " ${confiration_attr} column="${e.item}"
                                            toggle_type="toggleStatusElse" toggle_value="${e.value}" value_back="${e.value_back}"
                                            toggle_status="${cell.getValue()}" role="button"> ${e.title[0]}</button>`;
                                        else
                                            content += `<button class="btn btn-${e.class[1]} m-1 toggle_change " ${confiration_attr} column="${e.item}"
                                            toggle_type="toggleStatusElse" toggle_value="${e.value}" value_back="${e.value_back}"
                                            toggle_status="${cell.getValue()}" role="button"> ${e.title[1]}</button>`;
                                    }
                                    else if (e.type == 'delete') {
                                        content += `<button class="btn btn-danger m-1 toggle_change ${dropdown_Class}" ${confiration_attr}
                                        toggle_type="delete" toggle_status="${cell.getValue()}"  data-toggle="modal" data-target="#modal-from-dom"
                                        role="button"> حذف</button>`;
                                    }
                                    else if (e.type == "recursiveInlineTable") {
                                        content += `<button class="btn btn-${e.class} m-1 recursiveInlineTable ${dropdown_Class}"
                                            request_id="${cell.getValue()}" route="${e.route}" data-toggle="modal" data-target="#recursiveInlineTable"
                                        role="button"> ${e.title}</button>`;
                                    }
                                    else if (e.type == "copy_to_clipboard_link") {
                                        let newval = cell.getRow().getData()[e.column].replaceAll(" ", "_");
                                        let res = e.route.split("{id}");
                                        let clip_val = base_url + res[0] + res[1] + newval;
                                        content += `<button class="btn btn-primary m-1 copyToClipboardLink ${dropdown_Class}" clipboard="${clip_val}"
                                            role="button" >  کپی در کلیبورد</button>`;
                                    }
                                    else if (e.type == "confirmation_call_route") {
                                        let confirm_msg = _.has(e, "confirmation_message") ? 'confirmation_message="' + e.confirmation_message + '"' : '';
                                        let res = e.route.split("{id}");
                                        let id = cell.getRow().getData()['id'];
                                        let current_route = base_url + res[0] + id + res[1];
                                        content += `<button operation_index="${i}" ${confirm_msg} class="btn btn-${e.class} m-1 confirmation_call_route" toggle_id="${id}" data-toggle="modal" data-target="#confirmRequest"
                                            role="button" route_title="${e.title}"   route="${current_route}" route_class="${e.class}">  ${e.title}</button>`;
                                    }
                                    else if (e.type == "confirmation_call_form") {
                                        formdata = cell.getRow().getData();
                                        let res = e.route.split("{id}");
                                        let id = cell.getRow().getData()['id'];
                                        let current_route = base_url + res[0] + id + res[1];
                                        let coooo=formdata.partners.length ;
                                        if(formdata.partners.length > 0 )
                                        content += `<button operation_index="${i}" class="btn btn-${e.class} m-1 confirmation_call_form" toggle_id="${id}" data-toggle="modal" data-target="#confirmRequest"
                                        role="button" route_title="${e.title}"  route="${current_route}" route_class="${e.class}">  ${e.title}</button>`;
                                    }
                                }
                            });
                            if (_.has(formatterParams, "view") && formatterParams.view == "dropdown") {
                                content += `</div></div></div>`;
                            }
                            return content;
                        }
                    });
                    columns = [];

                    // این قسمت ذکمه فیلتر را به جدول اضافه می کند
                    _.each(dataset, function (e, i, l) {
                        var column = {};
                        var fnName = "headerFilter";
                        if (e.type != "filter_button") {
                            column[fnName] = function (cell, onR, success, cancel, eP) {
                                let el = document.createElement('div');
                                el.setAttribute("id", `${e.field}_header_filter`);
                                el.setAttribute('style', 'display:none;')
                                return el;
                            }
                        } else {
                            column[fnName] = function (cell, onR, success, cancel, eP) {
                                let el = document.createElement('button');
                                el.innerHTML = 'فیلتر کردن';
                                el.className = 'btn btn-success';
                                el.setAttribute("id", "filtered");
                                el.onclick = filtered_ajax;
                                return el;
                            }
                        }
                        _.each(_.keys(e), function (e2, i2, l2) {
                            if (e2 != 'type' && e2 != "temp_vals" && e2 != "extra_feature")
                                column[e2] = l[i][e2];
                        });
                        column['headerFilterLiveFilter'] = false;
                        column['headerFilterPlaceholder'] = `جستجو در ${e.title} . . . . `;
                        column['headerClick'] = function (element, column) {
                            let tes = column.getField();
                            var sort_type = $("div[tabulator-field='" + column.getField() + "']").attr("aria-sort-custom");
                            if (!sort_type) sort_type = "ascending";
                            (e.formatter == "relation_list" || e.formatter == "relation_list_number") ? "" : filtered_ajax(true, { sortType: sort_type, type: "sorting", 'fieldSort': column.getField() });
                        },
                            columns.push(column);
                    });
                    // این قسمت آبچکت تبیولیتور را می سازد
                    table = new Tabulator("#table", {
                        placeholder: "<h1 style='color:black;'>" + model_title + " پیدا نشد . . . .</h1>",
                        movableColumns: movableColumns,
                        height: 600,
                        minWidth: 150,
                        locale: false,
                        filterMode: "remote",
                        langs: {
                            "persian": {
                                "columns": {
                                    "first_name": "نام",
                                },
                                "ajax": {
                                    "loading": "لطفا منتظر بمانید",
                                    "error": "خطا",
                                },
                                "groups": {
                                    "item": "رکورد",
                                    "items": "رکوردها",
                                },
                                "pagination": {
                                    "page_size": "اندازه صفحه",
                                    "first": "اولین",
                                    "first_title": "صفحه اول ",
                                    "last": "آخرین",
                                    "last_title": "آخرین صفحه ",
                                    "prev": "قبلی",
                                    "prev_title": "صفحه قبلی ",
                                    "next": "بعدی",
                                    "next_title": "صفحه بعدی ",
                                },
                                "headerFilters": {
                                    "default": "فیلتر ستون ",
                                    "columns": {
                                        "name": "نام فیلتر . . .",
                                    }
                                }
                            }
                        },
                        data: window.hasOwnProperty('update_tabulator') ? points : tabledata,
                        layout: "fitDataFill",
                        columns: columns,
                    });
                    //این قسمت جدول تبیولیتور را با فیلتر ها می سازد
                    setTimeout(function () {
                        _.each(dataset, function (e, i, l) {
                            if (e.type == "range_number") {
                                var container = $("<span></span>");
                                //Start Task#517 H.Mishani 2023.01.11
                                    var start = $(`<input type='text' placeholder='از ${e.title} '/>`).on('change',function(e){
                                        // filtered_ajax();
                                    });
                                    var end = $(`<input type='text' placeholder='تا ${e.title}'/>`).on('change',function(e){
                                        // filtered_ajax();
                                    });
                                //End Task#517 H.Mishani 2023.01.11
                                container.append(start).append(end);

                                var inputs = $("input", container);
                                inputs.css({
                                    "padding": "4px",
                                    "width": "50%",
                                    "box-sizing": "border-box",
                                }).val();

                                inputs.on("change blur", function (e) {
                                    window.parent.validate_range_numbers(start, end);
                                });

                                inputs.on("keydown", function (e) {
                                    if (e.keyCode == 13) {
                                    }
                                    if (e.keyCode == 27) {
                                        cancel();
                                    }
                                });
                                $(`#${e.field}_header_filter`).append(container);
                                if (checkfilter && e.temp_vals.start){
                                    $(`#${e.field}_header_filter`).find('input').eq(0).val(e.temp_vals.start);
                                    
                                }
                                if (checkfilter && e.temp_vals.end){
                                    $(`#${e.field}_header_filter`).find('input').eq(1).val(e.temp_vals.end);
                                }
                                   
                            }
                            else if (e.type == "text") {
                                var filterId='test33'+(Math.floor(Math.random() * (10000 - 1) + 1));
                                console.log(filterId);
                                $(`#${e.field}_header_filter`).append($("<input id='"+filterId+"' type='text' style='width:100%;'>"));//Start Task#517 H.Mishani 2023.01.11
                                $(`#${e.field}_header_filter`).find('input').eq(0).attr("value", e.temp_vals).on('change',function(e){
                                    // filtered_ajax();
                                    // console.log('hi hi');
                                    // console.log(filterId);
                                    // setTimeout(function(){
                                    //     document.getElementById(filterId).focus();
                                    // },1000);
                                    
                                });
                                //End Task#517 H.Mishani 2023.01.11
                            }
                            else if (e.type == "select2") {
                                var sel = $("<select></select>");
                                $(`#${e.field}_header_filter`).append(sel);
                                var selData = [
                                ];
                                var values = [];
                                if (_.has(e.extra_feature, "distinct") && e.extra_feature.distinct)
                                    $.each(response[e.field + "_distinc"], function (index, value) {
                                        if (_.isArray(e.temp_vals) && _.contains(e.temp_vals, value[e.field]))
                                            selData.push({ id: value[e.field], text: value[e.field], "selected": true });
                                        else
                                            selData.push({ id: value[e.field], text: value[e.field] });
                                    });
                                else if (_.has(e.extra_feature, "distinct") && !e.extra_feature.distinct) {

                                    var options = [];
                                    _.each(response[e.field + "_choices"], function (e, i, l) {
                                        options.push({ id: e.id, text: e.title })
                                    });
                                    var values = [];
                                    $.each(options, function (index, value) {
                                        if (_.isArray(e.temp_vals) && _.contains(e.temp_vals, value.id.toString()))
                                            selData.push({ id: value.id, text: value.text, "selected": true });
                                        else
                                            selData.push({ id: value.id, text: value.text });
                                    });
                                }
                                else if (_.has(e, "formatter") && (e.formatter == "relation_list" || e.formatter == "relation_column_blong_one" || e.formatter == "relation_list_number")) {
                                    column_add = e['formatterParams']['column'];
                                    var options = [];
                                    _.each(response[e.field], function (e, i, l) {
                                        options.push({ id: e.id, text: e[column_add] })
                                    });
                                    var values = [];
                                    $.each(options, function (index, value) {
                                        if (_.isArray(e.temp_vals) && _.contains(e.temp_vals, value.id.toString()))
                                            selData.push({ id: value.id, text: value.text, "selected": true });
                                        else
                                            selData.push({ id: value.id, text: value.text });
                                    });
                                }
                                $(`#${e.field}_header_filter`).find('select').eq(0).select2({
                                    data: selData,
                                    allowClear: true,
                                    multiple: true,
                                    closeOnSelect: false
                                    //Start Task#517 H.Mishani 2023.01.11
                                })
                                // .on('change.select2', function (e) {
                                //     filtered_ajax();
                                //   });
                                  //End Task#517 H.Mishani 2023.01.11
                            }
                            else if (e.type == "range_date") {
                                var sel = $("<input type='text'>");
                                $(`#${e.field}_header_filter`).append(sel);
                                const FLATPICKR_CUSTOM_YEAR_SELECT = 'flatpickr-range-2';
                                $(`#${e.field}_header_filter`).find('input').eq(0).attr("value", e.temp_vals);
                                $(`#${e.field}_header_filter`).find('input').eq(0).flatpickr({
                                    mode: 'range',
                                    locale: 'fa',
                                    altInput: true,
                                    altFormat: 'Y/m/d',
                                    disableMobile: true,
                                    showDropdowns: false,
                                    opens: 'right', onChange: function () {
                                        $('#flatpickr-range').blur();
                                    },
                                    onReady: function (selectedDates, dateStr, instance) {
                                        const flatpickrYearElement = instance.currentYearElement;
                                        const children = flatpickrYearElement.parentElement.children;
                                        for (let i in children) {
                                            if (children.hasOwnProperty(i)) {
                                                children[i].style.display = 'none';
                                            }
                                        }
                                        const yearSelect = document.createElement('select');
                                        const minYear = 1300;
                                        const maxYear = 1450;
                                        for (let i = minYear; i < maxYear; i++) {
                                            const option = document.createElement('option');
                                            option.value = '' + i;
                                            option.text = '' + i;
                                            yearSelect.appendChild(option);
                                        }
                                        yearSelect.addEventListener('change', function (event) {
                                            flatpickrYearElement.value = event.target['value'];
                                            instance.currentYear = parseInt(event.target['value']);
                                            instance.redraw();
                                        });
                                        yearSelect.className = 'flatpickr-monthDropdown-months';
                                        yearSelect.id = FLATPICKR_CUSTOM_YEAR_SELECT;
                                        yearSelect.value = instance.currentYearElement.value;
                                        flatpickrYearElement.parentElement.appendChild(yearSelect);
                                    },
                                    onMonthChange: function (selectedDates, dateStr, instance) {
                                        document.getElementById(FLATPICKR_CUSTOM_YEAR_SELECT).value = '' + instance.currentYear;
                                    },
                                    //Start Task#517 H.Mishani 2023.01.11
                                    // onClose: function(selectedDates, dateStr, instance){
                                    //     filtered_ajax();
                                    // },
                                    //End Task#517 H.Mishani 2023.01.11
                                });
                            }
                        });
                        $(".select2").css("width", '100%');
                        $(".select2-selection--multiple").css("height", '35px');
                        $(".select2-selection__rendered").css("display", "block");
                        //Start Task#232 H.Mishani 2022.12.14
                        window.hasOwnProperty('update_tabulator') ? '' : generate_paginate(response.models);
                        //End Task#232 H.Mishani 2022.12.14
                        if (_.has(response, "update_field") && !_.isEmpty(response.update_field) && _.has(response.update_field, "order_by")) {
                            sort_table({ column: response.update_field.order_by, dir: response.update_field.sort });
                        }
                    }, 500);
                    var testing = "hooman";
                    // var previous_element='';
                    // var previuos_val='';
                    // table.on("cellClick", function(e, cell){
                    //         //e - the click event object
                    //         //cell - cell component
                    //         $(previous_element).empty();
                    //         $(previous_element).text(previuos_val);
                    //         var cellValue = cell.getValue();
                    //         var field = cell.getField();
                    //         var data = cell.getData()[cell.getField()];
                    //         let element=cell.getElement();
                    //         console.log(element);
                    //         $(element).empty();
                    //         let inner_element=$('<div></div>');
                    //         $(element).append(inner_element);
                    //         $(element).addClass('editing_class');
                    //         selData = [];
                    //         selData.push({ id: 1, text: 1 });
                    //         inner_element.select2({
                    //             data: selData,
                    //             multiple: e.multiple == 'multiple' ? true : false
                    //         });

                    //         // cell.edit();

                    //         previous_element=element;
                    //         previuos_val=cell.getData()[cell.getField()];

                    // });
                    table.clearAlert();
                })
                .fail(function (response) {
                    toastr.options.rtl = true;
                    $.each(response.responseJSON.errors, function (index, value) {
                        toastr.error(value, 'خطا!');
                    });
                    // table.clearAlert();
                });

            $(".tabulator-cell").css({"cursor" : "default"});
            return table;
        }

        function sort_table(obj) {
            $("div[tabulator-field='" + obj.column + "']").attr('aria-sort', obj.dir);
            $("div[tabulator-field='" + obj.column + "']").attr('aria-sort-custom', obj.dir);
        }

        function copyToClipboard(text) {
            var sampleTextarea = document.createElement("textarea");
            document.body.appendChild(sampleTextarea);
            sampleTextarea.value = text; //save main text in it
            sampleTextarea.select(); //select textarea contenrs
            document.execCommand("copy");
            document.body.removeChild(sampleTextarea);
        }

        function generate_paginate(models) {
            $("#paginate").remove();
            let paginate = $("<div id='paginate'>");
            paginate.css({ "display": "flex", "flex-direction": "row-reverse" });
            $("#table").parent().append(paginate);
            let active = "active";
            let class_name = "primary";
            let page = "";
            let get_paginate = "";
            _.each(models.links, function (e, i, l) {
                page = e.url != null ? e.url.split('page=') : "";
                page = page[page.length - 1];
                active = e.url != null ? "active" : "disabled";
                class_name = models.current_page.toString() == e.label ? "bg-primary" : "bg-warning";
                get_paginate = !isNaN(page) ? "get_paginate" : "";
                $("#paginate").append(`<button page="${page}" class="btn ${class_name} ${active} ${get_paginate}" role="button"> ${e.label}</button>`)
            });
            $("#paginate .btn").css({ "margin-left": "3px" });
        }

        $(document).on("click", ".get_paginate", function () {
            filtered_ajax(true, { page: $(this).attr('page').toString(), type: "paginate" });
        });
        //End Task#201 H.Mishani 2022.12.07

        function empty_all_headerfilters() {
            _.each(dataset, function (e, i, l) {
                if (e.type == "range_number") {
                    $(`#${e.field}_header_filter`).find('input').eq(0).val('');
                    $(`#${e.field}_header_filter`).find('input').eq(1).val('');
                }
                else if (e.type == "text") {
                    $(`#${e.field}_header_filter`).find('input').eq(0).val('');
                }
                else if (e.type == "select2") {
                    $(`#${e.field}_header_filter`).find('select').eq(0).select2().val('');
                }
                else if (e.type == "range_date") {
                    $(`#${e.field}_header_filter`).find('input').eq(0).attr('value', '');
                }
            });
        }

        window.buildDateString = function buildDateString(start, end) {
            return {
                start: start.val(),
                end: end.val(),
            };
        }

        window.persianToEnglish = function persianToEnglish(input) {
            var inputstring = input;
            var persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
            var english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            for (var i = 0; i < 10; i++) {
                varregex = new RegExp(persian[i], 'g');
                inputstring = inputstring.toString().replace(varregex, english[i]);
            }
            return inputstring.trim();
        }

        window.validate_range_numbers = function validate_range_numbers(start, end) {
            let num = parseInt(window.parent.persianToEnglish(start.val()), 10);
            if (start.val() != '' && (!_.isNumber(num) || _.isNaN(num))) {
                start.val('');
                toastr.error('عدد وارد کنید');
                return false;
            } else {
                if (start.val() != '') start.val(num);
            }
            num = parseInt(window.parent.persianToEnglish(end.val()), 10);
            if (end.val() != '' && (!_.isNumber(num) || _.isNaN(num))) {
                end.val('');
                toastr.error('عدد وارد کنید');
                return false;
            } else {
                if (end.val() != '') end.val(num);
            }
        }
    } catch (error) {
        console.log(error);
        data = {
            _token: token,
            err: error,
            agent: 29,
            action: "tabulator_App js"
        };
        $.ajax({
            url: base_url + '/submitError',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (response) {
                
            }
        })
    }
});