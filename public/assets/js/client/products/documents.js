toastr.options.rtl = true
var fd = new FormData();
var form_data = {}
var product_key = document.getElementById('crop-btn').value
$("#but_upload").click(function () {
    var files = $('#property-documents')[0].files[0];

    // Check file selected or not
    if (files['size'] > 0) {
        if (files['size'] < 5000000) {
            document.getElementById('custom-loader').classList.add('d-block')
		    document.getElementById('custom-loader').classList.remove('d-none')
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            fd.append('file', files)
            fd.append('product_key', product_key)
            $.ajax({
                url: '/agent/product/add-product/add-document',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function (data) {
                   if (data['response'] == 'alert-danger') {
							toastr.error(data['message'], '')
						} else if (data['response'] == 'alert-success') {
							toastr.success(data['message'], '')
						}
									 if (data) {
                    						document.getElementById('custom-loader').classList.remove('d-block')
    				                		document.getElementById('custom-loader').classList.add('d-none')
                    					}
                    if (data['file-path']) {
                        const image_path = 'https://' + window.location.host + '/storage/products-documents/' + data['product_key'] + '/documents/' + data['file-path'];
                        $('#product-documents').append("<div id='doc_" + data['file-path'] + "' class=\"mb-4\"><div class='p-2 border'><button type='button' id='delete-doc' class='btn-outline-danger mb-1 delete-doc' style='right:16px;bottom: 0'><i class='fas fa-trash-can'></i></button><embed class='docs' src='" + image_path + "' width=\"800px\" height=\"500px\" style='object-fit: contain'/></div><div>")
                        $('.delete-doc').click(function () {

                            const delete_btn = this
                            const image_src = $(this).next('.docs').attr('src')
                            $('#delete-checking').modal('show');
                            $("#delete-confirm").click(function () {
                                form_data = {
                                    'product_key': product_key,
                                    'image-src': image_src,
                                    'mode': 'remove-doc'
                                }
                                console.log(form_data)
                                $.ajaxSetup({
                                    headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                    }
                                });
                                $.ajax({
                                    url: '/agent/product/add-product/remove-document',
                                    type: 'post',
                                    data: {'form_data': form_data},

                                    success: function (data) {
                                        if (data['response'] == 'alert-danger') {
                							toastr.error(data['message'], '')
                						} else if (data['response'] == 'alert-success') {
                							toastr.success(data['message'], '')
                						}
                						 if (data) {
                    						document.getElementById('custom-loader').classList.remove('d-block')
    				                		document.getElementById('custom-loader').classList.add('d-none')
                    					}
                                        $(this).next('.docs').remove()
                                        $(delete_btn).parents('div .mb-4').remove()
                                        $('#delete-checking').modal('hide');
                                        //  $('#delete-confirm').attr("disabled", true);

                                       
                                    },
                                });
                            })
                        })
                    }
                },
            });
        } else {
            alert("حجم فایل انتخابی بیشتر از ۵ مگابایت میباشد!");
        }
    } else {
        alert("لطفا فایل را انتخاب کنید!");
    }
})

$('.delete-doc').click(function () {

    const delete_btn = this
    const image_src = $(this).next('.docs').attr('src')
                $('#delete-checking').modal('toggle');
    $("#delete-confirm").click(function () {
                        $('#delete-checking').modal('hide');
  document.getElementById('custom-loader').classList.add('d-block')
		    document.getElementById('custom-loader').classList.remove('d-none')
        form_data = {
            'product_key': product_key,
            'image-src': image_src,
            'mode': 'remove-doc'
        }
        console.log(form_data)
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: '/agent/product/add-product/remove-document',
            type: 'post',
            data: {'form_data': form_data},
            success: function (data) {
                 if (data['response'] == 'alert-danger') {
    					toastr.error(data['message'], '')
    				} else if (data['response'] == 'alert-success') {
    					toastr.success(data['message'], '')
    				}
    				  document.getElementById('custom-loader').classList.remove('d-block')
		    document.getElementById('custom-loader').classList.add('d-none')
                $(delete_btn).next('.docs').remove()
                $(delete_btn).parents('div .mb-4').remove()
                                                        //  $('#delete-confirm').attr("disabled", true);


            },
        });
    })
})


