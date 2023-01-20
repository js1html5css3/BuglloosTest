toastr.options.rtl = true

class Ajax {
	ajax(form_data, flag, route) {
		document.getElementById('custom-loader').classList.add('d-block')
		document.getElementById('custom-loader').classList.remove('d-none')
		if (flag) {
			$.ajaxSetup({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				}
			});
			$.ajax({
				type: 'POST', url: route, data: {'form_data': form_data}, success: function (data) {
					if (data['response']) {
						if (data['response'] == 'alert-danger') {
							toastr.error(data['message'], '')
						} else if (data['response'] == 'alert-success') {
							toastr.success(data['message'], '')
						}
					}
					if (data[0] !== undefined) {
						if (data[0]['html-tag'] !== undefined) {
							const image_path = 'http://' + window.location.host + data[0]['img-src'];
							$('#' + data[0]['html-tag'] + '-img').attr('src', image_path)
						}
					}
					if (data['product_documments']) {
						window.update_map(data)
					}
					if (data) {
						document.getElementById('custom-loader').classList.remove('d-block')
						document.getElementById('custom-loader').classList.add('d-none')
					}
					if (data['attempt'] !== undefined) {
						if (data['publish_popup'] == 'show') {
							$('#publish-check-form').modal('show')
						}
					}
					if (data['attempt'] == 'show-publish-form') {
						console.log(data)
						if (data['publish_popup'] == 'show') {
							$('#publish-check-form').modal('show')
						}
					}
					$("#result-status").delay(5000).fadeOut('fast');
					if (form_data['image']) {
						if (form_data['image'] != null) {
							if (form_data['image-type'] == 'banner') {
								const image_path = 'http://' + window.location.host + '/storage/products-documents/' + form_data['product_key'] + '/banner/' + data['file-path'];
								$('.banner-img').remove();
								$('#delete-banner-pic').remove();
								$('#preview-banner').append("<button type='button' id='delete-banner-pic' class='btn-outline-danger btn position-absolute'  style='right: 16px'><i class='fas fa-trash-can'></i> </button>" + "<img id='banner-img'  alt='" + data['file-path'] + "' class='mb-3 banner-img' src='" + image_path + "' style='box-shadow: 0px 0px 20px 0px #acacac;" + "border-radius: 8px;'  >");
								$('#delete-banner-pic').click(function () {
									var delete_btn = this
									var image_name = data['file-path']
									$('#delete-checking').modal('show');
									$("#delete-confirm").click(function () {
										flag = true
										urlProductDetails = "/agent/product/add-product/remove-document"
										form_data = {
											'image-name': image_name,
											'product_key': product_key,
											'image-type': 'banner',
											'mode': 'remove-image'
										}
										ajax.ajax(form_data, flag, urlProductDetails)
										$('#delete-checking').modal('hide');
										$('.banner-img').remove();
										$(delete_btn).remove();
										$('#property-banner-image').val('')
									})
								})
							} else {
								const image_path = 'http://' + window.location.host + '/storage/products-documents/' + form_data['product_key'] + '/album/' + data['file-path'];
								$('#product-album').append("<div id='album-pic-preview' class='col-6 m-1 align-self-md-center'> <button type='button' class='btn-outline-danger ajax-added-image album btn position-absolute' style='right: 16px'><i class='fas fa-trash-can'></i></button><img  id='banner-img' alt='" + data['file-path'] + "' class='mb-3 album-img ' src='" + image_path + "' style='box-shadow: 0px 0px 20px 0px #acacac;" + "border-radius: 8px;' ></div>");
								var image_name
								var delete_btn
								$(".album").click(function () {
									if ($(this).hasClass('ajax-added-image')) {

										var delete_btn = this
										// var image_name = $(this).next('.album-img').attr('alt')

										$('#delete-checking').modal('show');
										$("#delete-confirm").click(function () {
											var image_name = $(delete_btn).next('.album-img').attr('alt')
											if (image_name) {
												flag = true
												urlProductDetails = "/agent/product/add-product/remove-document"
												form_data = {
													'image-name': image_name,
													'product_key': product_key,
													'image-type': 'album',
													'mode': 'remove-image'
												}
												ajax.ajax(form_data, flag, urlProductDetails)
												$('#delete-checking').modal('hide');
												$(delete_btn).parent('#album-pic-preview').remove()
												$(delete_btn).next('.album-img').remove();
												$(delete_btn).remove();
											}
										})
									}

								})

							}
						}
					}
					return data.product_documments;
				}
			});
		}
	}
}
