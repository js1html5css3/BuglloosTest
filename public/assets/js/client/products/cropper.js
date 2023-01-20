var $modal = $('#cropper-div');
var image = document.getElementById('image');
var cropper;
var ajax = new Ajax()
var flag = false
var urlProductDetails = ""
var product_key = document.getElementById('crop-btn').value

$("#property-banner-image").click(function () {
	$("#crop-album-btn").hide();
})
$("#property-album-image").click(function () {
	$("#crop-btn").hide();
})
// if ($('.album').length > 0) {
$(".album").click(function () {
	if (!$(this).hasClass('ajax-added-image')) {

		var delete_btn = this
		// var image_name = $(this).next('.album-img').attr('alt')

		$('#delete-checking').modal('show');
		$("#delete-confirm").click(function () {
			var image_name = $(delete_btn).next('.album-img').attr('alt')
			if (image_name) {
				flag = true
				urlProductDetails = "/agent/product/add-product/remove-document"
				form_data = {
					'image-name': image_name, 'product_key': product_key, 'image-type': 'album', 'mode': 'remove-image'
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
// }
if ($('#delete-banner-pic').length > 0) {
	$('#delete-banner-pic').click(function () {
		var delete_btn = this
		var image_name = $(this).next('.banner-img').attr('alt')
		$('#delete-checking').modal('show');
		$("#delete-confirm").click(function () {
			flag = true
			urlProductDetails = "/agent/product/add-product/remove-document"
			form_data = {
				'image-name': image_name, 'product_key': product_key, 'image-type': 'banner', 'mode': 'remove-image'
			}
			ajax.ajax(form_data, flag, urlProductDetails)
			$('#delete-checking').modal('hide');
			$('.banner-img').remove();
			$(delete_btn).remove();
		})
	})
}


$("div #crop").on("change", ".image", function (e) {
	var files = e.target.files;
	var done = function (url) {
		image.src = url;
		$modal.modal('show');
	};
	var reader;
	var file;
	var url;
	if (files && files.length > 0) {
		file = files[0];
		var validImageTypes = ["image/jpeg", "image/png","image/jpg"];
        if ($.inArray(file['type'], validImageTypes) > 0) {
            $("#property-banner-image").click(function () {
	            $("#crop-btn").show();
            })
            $("#property-album-image").click(function () {
	            $("#crop-album-btn").show();
            })
    		if (URL) {
    			done(URL.createObjectURL(file));
    		} else if (FileReader) {
    			reader = new FileReader();
    			reader.onload = function (e) {
    				done(reader.result);
    			};
    			reader.readAsDataURL(file);
    		}
        }else{
        	toastr.error('نوع عکس مورد نظر باید یکی از موارد زیر باشد'+validImageTypes.toString())
        }
	}
});
$modal.on('shown.bs.modal', function () {
	cropper = new Cropper(image, {
		dragMode: 'move',
		autoCropArea: 0.9,
		restore: false,
		guides: false,
		center: false,
		highlight: false,
		cropBoxMovable: false,
		cropBoxResizable: false,
		toggleDragModeOnDblclick: false,
		preview: '.preview'
	});
}).on('hidden.bs.modal', function () {
	cropper.destroy();
	cropper = null;
});

$("#crop-btn").click(function () {
	canvas = cropper.getCroppedCanvas({
		minWidth: 900, height: 600,
	});
	canvas.toBlob(function (blob) {
		urlProductDetails = "/agent/product/add-product/add-image"

		url = URL.createObjectURL(blob);
		var reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = function () {
			var base64data = reader.result;
			flag = true
			form_data = {
				'image': base64data, 'product_key': product_key, 'image-type': 'banner', 'mode': 'add'
			}
			ajax.ajax(form_data, flag, urlProductDetails)
			$("#crop-album-btn").show();
			$modal.modal('hide');
		}
	});

})
$("#crop-album-btn").click(function () {
	canvas = cropper.getCroppedCanvas({
		minWidth: 900, height: 600,
	});
	canvas.toBlob(function (blob) {
		urlProductDetails = "/agent/product/add-product/add-image"

		url = URL.createObjectURL(blob);
		var reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = function () {
			var base64data = reader.result;
			flag = true
			form_data = {
				'image': base64data, 'product_key': product_key, 'image-type': 'album'
			}
			ajax.ajax(form_data, flag, urlProductDetails)
			$("#crop-btn").show();
			$modal.modal('hide');
		}
	});

})
