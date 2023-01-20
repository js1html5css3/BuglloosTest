var ajax;

function sendRequest(form_data, flag, urlProductDetails) {
	document.getElementById('custom-loader').classList.add('d-block')
	document.getElementById('custom-loader').classList.remove('d-none')
	var ajax_result;
	/**
	 * csrf token
	 * */
	if (flag) {
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});
		$.ajax({
			url: urlProductDetails,
			type: 'post',
			data: form_data,
			contentType: false,
			processData: false,
			success: function (data) {
				var image_path;
				if (data['response'] == 'alert-danger') {
					toastr.error(data['message'], '')
				} else if (data['response'] == 'alert-success') {
					toastr.success(data['message'], '')
				}
				if (data[0]) {
					if (data[0]['html-tag']) {
						image_path = 'http://' + window.location.host + data[0]['img-src'];
						$('#' + data[0]['html-tag'] + '-img').remove()
						$('#' + data[0]['html-tag']).after("<embed id='" + data[0]['html-tag'] + "-img' src='" + image_path + "' style='width: 200px; height: 200px;'>")
					}
				}
				if (data) {
					document.getElementById('custom-loader').classList.remove('d-block')
					document.getElementById('custom-loader').classList.add('d-none')
				}
			},
		});
	}
}

