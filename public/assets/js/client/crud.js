toastr.options.rtl = true

function addProperty(id) {
	//get product id that is selected or created by user
	const product_key = document.getElementById('product_key').innerText.split(':')[1].replace(')', '')
	const form_data = []
	const ajax = new Ajax()
	//url that is going to call addPropertyDetails function for store data in DB
	const urlProductDetails = "/agent/product/add-product/add-details"
	var flag = true
	var required_flag = true
	var required_element
	var check_multiple = 0
	//select all HTML tags (input,select,textarea) in current window
	document.querySelectorAll("input, select, textarea").forEach(element => {
		//line 17-73 checking for required items to be filled by user and push it to the form data Array
		// 3 item is not useble to push in form_data array(addForm,but_upload,property-banner-image)
		if (element.id != 'addForm' && element.id != 'but_upload') {
			if (element.required && element.id != 'property-banner-image') {
				if (element.value && element.id && required_flag) {
					if (element.tagName == 'TEXTAREA') {
						//first we get sub_group of HTML tag in line 23
						//then we check if parameter is in plus-form or not
						var title = $(element).closest('.mt-3').find('.legendText')[0].innerText
						if (element.id.indexOf('plus-form') > -1) {
							check_multiple = 1
						} else {
							check_multiple = 0
						}
						//push html tag value,id,section(sub_group_name),product_key,check_multiple in form data
						//if user click on product-submit-btn data pass to back-end in undraft mode
						form_data.push([element.id, element.value.trim(), product_key, 'unDraft', title, check_multiple]);

					} else if (element.tagName != 'TEXTAREA') {
						var title = $(element).closest('.mt-3').find('.legendText')[0].innerText

						if (element.id.indexOf('plus-form') > -1) {
							check_multiple = 1
						} else {
							check_multiple = 0
						}
						if ($(element).hasClass('select2')) {

							form_data.push([element.id, $(element).select2().val().toString(), product_key, 'unDraft', title, check_multiple]);
						} else {

							form_data.push([element.id, element.value, product_key, 'unDraft', title, check_multiple]);
						}
						required_flag = true
						flag = true
					}
				} else {
					//if item is required and user don't fill it up we show toaster that this item needed to fill up
					if (!element.value) {
						if (element.id.split('plus-form').length != 0) {
							flag = false
							required_flag = false
							required_element = element.id + '_label_multiple'
							required_element = $('#' + required_element).text().split(':')[0]
							console.log(required_element)
							toastr.error('لطفا فیلد ' + required_element + ' را پر کنید!', '')
						} else {
							flag = false
							required_flag = false
							required_element = element.id.split('_')[0] + '_plus-form_label_multiple'
							required_element = $('#' + required_element).text().split(':')[0]
							console.log(required_element)
							toastr.error('لطفا فیلد ' + required_element + 'فیلد اضافه شده را پر کنید !', '')
						}
					}
				}
			} else {
				if (element.id) {

					if (element.tagName == 'TEXTAREA') {
						title = $(element).closest('.mt-3').find('.legendText')[0].innerText
						if (element.id.indexOf('plus-form') > -1) {
							check_multiple = 1
						} else {
							check_multiple = 0
						}
						form_data.push([element.id, element.value.trim(), product_key, 'unDraft', title, check_multiple]);
					} else if (element.tagName != 'TEXTAREA') {

						title = $(element).closest('.mt-3').find('.legendText')[0].innerText
						if (element.id.indexOf('plus-form') > -1) {
							check_multiple = 1
						} else {
							check_multiple = 0
						}
						if ($(element).hasClass('select2')) {

							form_data.push([element.id, $(element).select2().val().toString(), product_key, 'unDraft', title, check_multiple]);
						} else {

							form_data.push([element.id, element.value, product_key, 'unDraft', title, check_multiple]);
						}
					}

				}
			}
		}
	});

	if (required_flag) {
		//if banner image is not uploaded alert show to user that banner needed for store data
		if ($('#banner-img').length) {
			flag = true
			required_flag = true
			if (required_flag) {
				if (latlng !== undefined) {
					form_data.push(['lat-lng', latlng, product_key, 'unDraft'])
					let last_chunk = false;
					let chunk_counter = 0;
					const chunked_form_data = _.chunk(form_data, 70)
					//all form_data parameters will chunk in to X part to pass to back-end in multiple requests
					chunked_form_data.forEach(chunked_data => {
						chunk_counter++;
						if (chunk_counter == chunked_form_data.length) {
							last_chunk = true
						}
						chunked_data.push({'last_chunk': last_chunk})

						ajax.ajax(chunked_data, flag, urlProductDetails)
					})
				} else {
					toastr.error('لطفا مکان ملک را روی نقشه مشخص کنید!', '')
				}
			}
		} else {
			if (!$('#banner-img').length) {
				required_element = 'بنر ملک'
				if ($('#banner-img').attr('src')) {
					required_flag = true
					flag = true
				}
				toastr.error('لطفا فیلد ' + required_element + ' را پر کنید!', '')
				flag = false
			}
		}
	} else {
		if (required_element == 'property-banner-image') {
			required_element = 'بنر ملک'
			if ($('#banner-img').attr('src')) {
				required_flag = true
				flag = true
			}
			toastr.error('لطفا فیلد ' + required_element + ' را پر کنید!', '')
			flag = false
		}

	}
}

function draft(id) {

	var check_multiple = 0
	const form = document.getElementById(id);
	var product_key = document.getElementById('product_key').innerText.split(':')[1].replace(')', '')
	// var formElements = Array.from(form.elements);
	const form_data = []
	var flag = true
	const ajax = new Ajax()
	var urlProductDetails = "/agent/product/add-product/add-details"
	// formElements.shift()
	// formElements.shift()
	// formElements.shift()
	document.querySelectorAll("input, select, textarea").forEach(element => {
		if (element.id) {

			if (element.tagName == 'TEXTAREA' && element.value.trim().length !== 0) {
				let title = $(element).closest('.mt-3').find('.legendText')[0].innerText
				if ($('#' + element.id).parent().closest('label').hasClass('multiselect')) {
					check_multiple = 1
				} else {
					check_multiple = 0
				}
				form_data.push([element.id, element.value, product_key, 'draft', title, check_multiple]);
				flag = true
			} else if (element.tagName == 'INPUT' || element.tagName == 'SELECT') {

				let title = $(element).closest('.mt-3').find('.legendText')[0].innerText

				if (document.getElementById(element.id).parentElement.classList.contains('multiselect')) {
					check_multiple = 1
				} else {
					check_multiple = 0
				}
				if ($(element).hasClass('select2')) {
					let value;
					value = $(element).select2().val()
					if ($(element).select2().val() == null) {
						value == ""
					} else {
						value = $(element).select2().val()
						value = value.toString()

					}
					form_data.push([element.id, value, product_key, 'draft', title, check_multiple]);
				} else {

					form_data.push([element.id, element.value, product_key, 'draft', title, check_multiple]);
				}
				flag = true
			}
		}
		if (element.id == "addForm") form_data.splice(form_data.indexOf(element), 1)
		if (element.id.split('-')[1] == 'deleteData') form_data.splice(form_data.indexOf(element), 1)
	})
	console.log(form_data)
	if (form_data.length > 0) {
		if (latlng !== undefined) {
			form_data.push(['lat-lng', latlng, product_key, 'draft'])
		}
		let last_chunk = false;
		let chunk_counter = 0;
		const chunked_form_data = _.chunk(form_data, 100)
		chunked_form_data.forEach(chunked_data => {
			chunk_counter++;
			if (chunk_counter == chunked_form_data.length) {
				last_chunk = true
			}
			chunked_data.push({'last_chunk': last_chunk})
			ajax.ajax(chunked_data, flag, urlProductDetails)
		})
	} else {
		document.getElementById('result-status').style.display = 'block'
		if (document.getElementById('result-status').classList.contains('alert-success')) {
			document.getElementById('result-status').classList.remove('alert-success')
			document.getElementById('result-status').classList.add('alert-danger')
		} else {
			document.getElementById('result-status').classList.add('alert-danger')
		}
		document.getElementById('result-status').classList.add('alert-danger')
		document.getElementById('text-result').innerText = 'لطفا حداقل یک فیلد را پر کنید!'
		toastr.error('لطفا حداقل یک فیلد را پر کنید!', '')
		$("#result-status").delay(5000).fadeOut('fast');
		flag = false
	}
}

//end task #222 by H.Gh
function addContract() {
	var check_multiple = 0
	const product_key = document.getElementById('product_key').innerText.split(':')[1].replace(')', '')
	const urlProductDetails = "/agent/product/save-contract"
	const form_data = []
	const ajax = new Ajax()
	//url that is going to call addPropertyDetails function for store data in DB
	var flag = true
	var required_flag = true
	var required_element
	var check_multiple = 0
	//select all HTML tags (input,select,textarea) in current window
	document.querySelectorAll("input, select, textarea").forEach(element => {
		//line 17-73 checking for required items to be filled by user and push it to the form data Array
		// 3 item is not useble to push in form_data array(addForm,but_upload,property-banner-image)
		if (element.id != 'addForm' && element.id != 'but_upload') {
			if (element.required && element.id != 'property-banner-image') {
				if (element.value && element.id && required_flag) {
					if (element.tagName == 'TEXTAREA') {
						//first we get sub_group of HTML tag in line 23
						//then we check if parameter is in plus-form or not
						var title = $(element).closest('.mt-3').find('.legendText')[0].innerText
						if (element.id.indexOf('plus-form') > -1) {
							check_multiple = 1
						} else {
							check_multiple = 0
						}
						//push html tag value,id,section(sub_group_name),product_key,check_multiple in form data
						//if user click on product-submit-btn data pass to back-end in undraft mode
						form_data.push([element.id, element.value.trim(), product_key, 'unDraft', title, check_multiple]);

					} else if (element.tagName != 'TEXTAREA') {
						var title = $(element).closest('.mt-3').find('.legendText')[0].innerText

						if (element.id.indexOf('plus-form') > -1) {
							check_multiple = 1
						} else {
							check_multiple = 0
						}
						if ($(element).hasClass('select2')) {

							form_data.push([element.id, $(element).select2().val().toString(), product_key, 'unDraft', title, check_multiple]);
						} else {

							form_data.push([element.id, element.value, product_key, 'unDraft', title, check_multiple]);
						}
						required_flag = true
						flag = true
					}
				} else {
					//if item is required and user don't fill it up we show toaster that this item needed to fill up
					if (!element.value) {
						if (element.id.split('plus-form').length != 0) {
							flag = false
							required_flag = false
							required_element = element.id + '_label_multiple'
							required_element = $('#' + required_element).text().split(':')[0]
							console.log(required_element)
							toastr.error('لطفا فیلد ' + required_element + ' را پر کنید!', '')
						} else {
							flag = false
							required_flag = false
							required_element = element.id.split('_')[0] + '_plus-form_label_multiple'
							required_element = $('#' + required_element).text().split(':')[0]
							console.log(required_element)
							toastr.error('لطفا فیلد ' + required_element + 'فیلد اضافه شده را پر کنید !', '')
						}
					}
				}
			} else {
				if (element.id) {

					if (element.tagName == 'TEXTAREA') {
						title = $(element).closest('.mt-3').find('.legendText')[0].innerText
						if (element.id.indexOf('plus-form') > -1) {
							check_multiple = 1
						} else {
							check_multiple = 0
						}
						form_data.push([element.id, element.value.trim(), product_key, 'unDraft', title, check_multiple]);
					} else if (element.tagName != 'TEXTAREA') {

						title = $(element).closest('.mt-3').find('.legendText')[0].innerText
						if (element.id.indexOf('plus-form') > -1) {
							check_multiple = 1
						} else {
							check_multiple = 0
						}
						if ($(element).hasClass('select2')) {

							form_data.push([element.id, $(element).select2().val().toString(), product_key, 'unDraft', title, check_multiple]);
						} else {

							form_data.push([element.id, element.value, product_key, 'unDraft', title, check_multiple]);
						}
					}

				}
			}
		}
	});

	if (required_flag) {
		//if banner image is not uploaded alert show to user that banner needed for store data
		flag = true
		let chunk_counter = 0;
		const chunked_form_data = _.chunk(form_data, 70)
		//all form_data parameters will chunk in to X part to pass to back-end in multiple requests
		chunked_form_data.forEach(chunked_data => {
			chunk_counter++;
			if (chunk_counter == chunked_form_data.length) {
				last_chunk = true
			}
			chunked_data.push({'last_chunk': last_chunk})

			ajax.ajax(chunked_data, flag, urlProductDetails)
		})
	}
}

function addContractDraft(id) {
	const form = document.getElementById(id);
	var product_key = document.getElementById('product_key').innerText.split(':')[1].replace(')', '')
	var formElements = Array.from(form.elements);
	const form_data = []
	var flag = true
	var check_multiple = 0
	const ajax = new Ajax()
	const urlProductDetails = "/agent/product/save-contract"

	document.querySelectorAll("input, select, textarea").forEach(element => {
		if (element.id) {

			if (element.tagName == 'TEXTAREA' && element.value.trim().length !== 0) {
				let title = $(element).closest('.mt-3').find('.legendText')[0].innerText
				if ($('#' + element.id).parent().closest('label').hasClass('multiselect')) {
					check_multiple = 1
				} else {
					check_multiple = 0
				}
				form_data.push([element.id, element.value, product_key, 'draft', title, check_multiple]);
				flag = true
			} else if (element.tagName == 'INPUT' || element.tagName == 'SELECT') {

				let title = $(element).closest('.mt-3').find('.legendText')[0].innerText

				if (document.getElementById(element.id).parentElement.classList.contains('multiselect')) {
					check_multiple = 1
				} else {
					check_multiple = 0
				}
				if ($(element).hasClass('select2')) {
					let value;
					value = $(element).select2().val()
					if ($(element).select2().val() == null) {
						value == ""
					} else {
						value = $(element).select2().val()
						value = value.toString()

					}
					form_data.push([element.id, value, product_key, 'draft', title, check_multiple]);
				} else {

					form_data.push([element.id, element.value, product_key, 'draft', title, check_multiple]);
				}
				flag = true
			}
		}
		if (element.id == "addForm") form_data.splice(form_data.indexOf(element), 1)
		if (element.id.split('-')[1] == 'deleteData') form_data.splice(form_data.indexOf(element), 1)
	})
	console.log(form_data)
	if (form_data.length > 0) {

		let last_chunk = false;
		let chunk_counter = 0;
		const chunked_form_data = _.chunk(form_data, 100)
		chunked_form_data.forEach(chunked_data => {
			chunk_counter++;
			if (chunk_counter == chunked_form_data.length) {
				last_chunk = true
			}
			chunked_data.push({'last_chunk': last_chunk})
			ajax.ajax(chunked_data, flag, urlProductDetails)
		})
	} else {

		toastr.error('لطفا حداقل یک فیلد را پر کنید!', '')
		$("#result-status").delay(5000).fadeOut('fast');
		flag = false
	}
}

window.searchProduct = function searchProduct(id) {
	var serchPoints = [];
	const form = document.getElementById(id);
	var formElements = Array.from(form.elements);
	const form_data = []
	var flag = true
	const custom_ajax = new Ajax()
	const urlProductDetails = "/search-product-index";

	const bounds = window.map.getBounds();

	if (first_time) {
		product_documents = points;
		first_time = false;
	} else {
		points = product_documents;
	}
	points.forEach((marker) => {
		serchPoints.push(marker.id);
	})
	form_data.push(['products', {
		northEastLat: bounds._northEast.lat,
		northEastLng: bounds._northEast.lng,
		southWestLat: bounds._southWest.lat,
		southWestLng: bounds._southWest.lng
	}]);
	formElements.forEach(element => {
		if (element.value == '') {
			element.value = null
		}
		form_data.push([element.id, element.value]);
	})
	let result = custom_ajax.ajax(form_data, flag, urlProductDetails);
}

window.listingSearchProduct = function listingSearchProduct(id) {
	var serchPoints = [];
	// const form = document.getElementById(id);
	// var formElements = Array.from(form.elements);

	const form_data = []

	var flag = true
	const custom_ajax = new Ajax()
	const urlProductDetails = "/search-product";

	const bounds = window.map.getBounds();

	if (first_time) {
		product_documents = points;
		first_time = false;
	} else {
		points = product_documents;
	}
	points.forEach((marker) => {
		serchPoints.push(marker.id);
	})
	form_data.push(['products', {
		northEastLat: bounds._northEast.lat,
		northEastLng: bounds._northEast.lng,
		southWestLat: bounds._southWest.lat,
		southWestLng: bounds._southWest.lng
	}]);
	document.getElementById('search_form_product').querySelectorAll("input, select").forEach(element => {
		if (element.value && element.id && element.id.split('add-option').length <= 1) {
			if ($(element).hasClass('select2')) {
				form_data.push([element.id, $(element).select2().val().toString()]);
			} else {
				form_data.push([element.id, element.value]);
			}
		}
	})
	// formElements.forEach(element => {
	//     if (element.value == '') {
	//         element.value = null
	//     }
	//     form_data.push([element.id, element.value]);
	// })
    console.log(form_data);
	let result = custom_ajax.ajax(form_data, flag, urlProductDetails);
}

function saveListing(id) {
	const form_data = []
	const ajax = new Ajax()
	const urlProductDetails = "/agent/listing/save-listing"
	var flag = true
	var required_flag = true

	document.querySelectorAll("input, select, textarea").forEach(element => {
		if (element.id && element.value) {
			if ($(element).hasClass('select2')) {
				let value;
				value = $(element).select2().val()
				form_data.push([element.id, value.toString()]);
			} else {
				form_data.push([element.id, element.value]);
			}
		}
	});
	console.log(form_data);
	ajax.ajax(form_data, flag, urlProductDetails)
}

function updateListing(id) {
	const form_data = []
	const ajax = new Ajax()
	let listId = document.getElementById('list-id').innerHTML
	form_data.push(['listId', listId]);
	const urlProductDetails = "/agent/listing/update-list/" + listId
	var flag = true
	var required_flag = true

	document.querySelectorAll("input, select, textarea").forEach(element => {
		if (element.id && element.value) {
			if ($(element).hasClass('select2')) {
				form_data.push([element.id, $(element).select2().val().toString(),]);
			} else {
				form_data.push([element.id, element.value]);
			}
		}
	});
	console.log(form_data)
	ajax.ajax(form_data, flag, urlProductDetails)
}

function uploadImage(id) {
	const form_data = new FormData();
	flag = true
	let urlProductDetails = "/client/become-agent/upload-doc"
	var files = $('#' + id)[0].files[0];
	form_data.append('file', files)
	form_data.append('image-name', id)
	return sendRequest(form_data, flag, urlProductDetails)
}

function addMenu() {

}


function addSocialMedia() {

}
