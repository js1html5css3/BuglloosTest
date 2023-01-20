$(document).ready(function () {
	$('.addOption').on('change', function (e) {
		let id = e.target.value;
		$.get('/agent/listing/get-property?id=' + id, function (data) {
			if (data[0]['type'] == 'input') {
				let div_id = data[0]['id'] + '_1_property-input-number_div'
				let input_id = data[0]['id'] + '_first_property-input-number_1'
				if (!document.getElementById(div_id)) {
					data[0]['properties'].forEach(att => {
						let input_id2 = data[0]['id'] + '_second_property-input-number_1'
						if (att['attribute'] == 'type') {
							if (att['value'] == 'number') {
								$('#' + e.target.id).parent().parent().parent().parent().append("<div id='" + div_id + "' class='col-12 mt-3'><label>" + data[0]['name'] + ":</label> " + "<div class='d-flex'> <input id=" + input_id + " class='form-control'><span class='align-self-xl-center font-em-3 badge bg-secondary text-light mr-2 ml-2'>تا</span><input id=" + input_id2 + " class='form-control'>" + "<button onclick='removeField(\"" + div_id + "\")' type='button' class='ml-1 btn'><i class='text-danger fas fa-trash-can'></i></button><div><div>");
							} else if (att['value'] == 'date') {
								let div_id = data[0]['id'] + '_1_property-input-date_div'
								let input_id2 = data[0]['id'] + '_second_property-input-date_1'
								$('#' + e.target.id).parent().parent().parent().parent().append("<div id='" + div_id + "' class='col-12 mt-3'><label>" + data[0]['name'] + ":</label> " + "<div class='d-flex'> <input id=" + input_id + " class='form-control'><span class='align-self-xl-center font-em-3 badge bg-secondary text-light mr-2 ml-2'>تا</span><input id=" + input_id2 + " class='form-control'>" + "<button onclick='removeField(\"" + div_id + "\")' type='button' class='ml-1 btn'><i class='text-danger fas fa-trash-can'></i></button><div><div>");
							} else if (att['value'] == 'text') {
								let div_id = data[0]['id'] + '_1_property-input-text_div'
								let input_id = data[0]['id'] + '_1_property-input-text_1'
								$('#' + e.target.id).parent().parent().parent().parent().append("<div id='" + div_id + "' class='col-12 mt-3'><label>" + data[0]['name'] + ":</label> " + "<div class='d-flex'> <input id=" + input_id + " class='form-control'>" + "<button onclick='removeField(\"" + div_id + "\")' type='button' class='ml-1 btn'><i class='text-danger fas fa-trash-can'></i></button><div><div>");
							}
						}
					})
				}
			} else if (data[0]['type'] == 'multiselect' || data[0]['type'] == 'singleselect') {
				let div_idTop = data[0]['id'] + '_1_property-multiple_1_div'
				if (!document.getElementById(div_idTop)) {
					let div_id = data[0]['id'] + '_1_property-multiple_1'
					let baseId = data[0]['id']
					let values = []
					let cehckboxFuncId = data[0]['id'] + '_multiple'
					$('#' + e.target.id).parent().parent().parent()
						.parent().append("<div id='" + div_idTop + "'><label>" + data[0]['name'] + ":</label>" + "<select class='select2 multipleSelect' multiple=multiple id='" + div_id + "' ></select>" + "<button onclick='removeField(\"" + div_idTop + "\")' type='button' class='ml-1 btn'><i class='text-danger fas fa-trash-can'></i></button><div><div></div>")

					for (i = 0; i < data[0]['properties'].length; i++) {
						if (data[0]['properties'][i]['attribute'] == 'option') {
							values = data[0]['properties'][i]['value'].split('/')
						}
					}
					let selVal = []
					for (i = 0; i < values.length; i++) {
						selVal.push({id: values[i]}, {value: values[i]})
					}
					$('#' + div_id).select2({
						data: values, multiple: true, width: '100%', closeOnSelect: false,

					})
				}
			} else if (data[0]['type'] == 'textarea') {
				let div_id = data[0]['id'] + '_1_property-input-text_div'
				if (!document.getElementById(div_id)) {
					let input_id = data[0]['id'] + '_1_property-input-text_1'
					$('#' + e.target.id).parent().parent().parent().parent().append("<div id='" + div_id + "' class='col-12 mt-3'><label>" + data[0]['name'] + ":</label> " + "<div class='d-flex'> <input id=" + input_id + " class='form-control'>" + "<button onclick='removeField(\"" + div_id + "\")' type='button' class='ml-1 btn'><i class='text-danger fas fa-trash-can'></i></button><div><div>");
				}
			}
		})
	})

	$('.addOptionContract').on('change', function (e) {
		let id = e.target.value;
		id = id + '-contract'
		$.get('/agent/listing/get-property?id=' + id, function (data) {
			if (data[0]['type'] == 'input') {
				let base_div_id = data[0]['id'] + '_1_contract-input-number_1'
				let div_id = data[0]['id'] + '_first_contract-input-number_1'
				if (!document.getElementById(div_id)) {
					data[0]['properties'].forEach(att => {
						let div_id2 = data[0]['id'] + '_second_contract-input-number_1'
						if (att['attribute'] == 'type') {
							if (att['value'] == 'number') {
								$('#' + e.target.id).parent().parent().parent().parent().append("<div id='" + base_div_id + "' class='col-12 mt-3'><label>" + data[0]['name'] + ":</label> " + "<div class='d-flex'> <input id=" + div_id + " class='form-control'><span class='align-self-xl-center font-em-3 badge bg-secondary text-light mr-2 ml-2'>تا</span><input id=" + div_id2 + " class='form-control'>" + "<button onclick='removeField(\"" + div_id + "\")' type='button' class='ml-1 btn'><i class='text-danger fas fa-trash-can'></i></button><div><div>");
							} else if (att['value'] == 'date') {
								let base_div_id = data[0]['id'] + '_1_contract-input-date_1'
								let div_id = data[0]['id'] + '_first_contract-input-date_1'
								let div_id2 = data[0]['id'] + '_second_contract-input-date_1'
								$('#' + e.target.id).parent().parent().parent().parent().append("<div id='" + base_div_id + "' class='col-12 mt-3'><label>" + data[0]['name'] + ":</label> " + "<div class='d-flex'> <input id=" + div_id + " class='form-control'><span class='align-self-xl-center font-em-3 badge bg-secondary text-light mr-2 ml-2'>تا</span><input id=" + div_id2 + " class='form-control'>" + "<button onclick='removeField(\"" + div_id + "\")' type='button' class='ml-1 btn'><i class='text-danger fas fa-trash-can'></i></button><div><div>");
							} else if (att['value'] == 'text') {
								let base_div_id = data[0]['id'] + '_1_contract-input-text_1'
								$('#' + e.target.id).parent().parent().parent().parent().append("<div id='" + base_div_id + "' class='col-12 mt-3'><label>" + data[0]['name'] + ":</label> " + "<div class='d-flex'> <input id=" + div_id + " class='form-control'>" + "<button onclick='removeField(\"" + div_id + "\")' type='button' class='ml-1 btn'><i class='text-danger fas fa-trash-can'></i></button><div><div>");
							}
						}
					})
				}
			} else if (data[0]['type'] == 'multiselect' || data[0]['type'] == 'singleselect') {
				let div_idTop = data[0]['id'] + '_1_contract-multiple_1_div'
				if (!document.getElementById(div_idTop)) {
					let div_id = data[0]['id'] + '_1_contract-multiple_1'
					let baseId = data[0]['id']
					let values = []
					let cehckboxFuncId = data[0]['id'] + '_multiple'
					$('#' + e.target.id).parent().parent().parent()
						.parent().append("<div id='" + div_idTop + "'><label>" + data[0]['name'] + ":</label>" + "<select class='select2 multipleSelect' multiple=multiple id='" + div_id + "' ></select>" + "<button onclick='removeField(\"" + div_idTop + "\")' type='button' class='ml-1 btn'><i class='text-danger fas fa-trash-can'></i></button><div><div></div>")

					for (i = 0; i < data[0]['properties'].length; i++) {
						if (data[0]['properties'][i]['attribute'] == 'option') {
							values = data[0]['properties'][i]['value'].split('/')
						}
					}
					let selVal = []
					for (i = 0; i < values.length; i++) {
						selVal.push({id: values[i]}, {value: values[i]})
					}
					$('#' + div_id).select2({
						data: values, multiple: true, width: '100%', closeOnSelect: false,
					})

				}
			}
		});

	})

})
