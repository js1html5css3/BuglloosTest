@component('layouts.adminLte.partials.content', ['title'=> 'لیست خطاها '])
    @slot('breadcrumb')
        <li class="breadcrumb-item"><a href="{{route('adminlte.dashboard.index')}}">پنل مدیریت</a></li>
        <li class="breadcrumb-item active">لیست خطا ها</li>
    @endslot
    @section('styles')
        <style>
            .modal-dialog {
                margin-top: 6% !important;
            }
            table tr td {
                border: 1px solid #0000003b;
                margin: 1px;
            }
            table {
                border: 1px solid #0000003b;
                width: 100%;
            }
            .filter {
                border: 1px solid #cccc;
                padding: 1%;
            }
            td {
                text-align: center !important;
            }
        </style>


    @endsection
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body table-responsive p-0">
                    <div id="table"></div>
                </div>
                <div class="d-flex card-footer"></div>
            </div>
        </div>
    </div> 
    @section('extrajavascript')
        {{-- tabulator "required  + jquery" that defined in layout blade --}}
        <link rel="stylesheet" href="{{asset('assets/css/tabulator/tabulator.min.css')}}">
        <link rel="stylesheet" href="{{asset('assets/css/tabulator/tabulator_bootstrap4.min.css')}}">
        <link rel="stylesheet" href="{{asset('assets/css/select2.min.css')}}">
        <link rel="stylesheet" href="{{asset('flatpickr/flatpickr.css')}}">
        <link rel="stylesheet" type="text/css" href="{{ asset('toastr/toastr.css') }}">
        {{-- <script src="{{asset('plugins/jQueryUI/jquery-ui.min.js')}}"></script> --}}
        <script src="{{asset('assets/js/select2.min.js')}}"></script>
        <script src="{{asset('assets/js/tabulator/tabulator.min.js')}}"></script>
        <script src="{{asset('assets/js/tabulator/jquery_wrapper.js')}}"></script>
        <script src="{{asset('assets/js/underscore/underscore-umd-min.js')}}"></script>
        <script src="{{asset('toastr/toastr.min.js') }}"></script>
  
        <script src="{{asset('moment/moment.js')}}"></script>
        <script src="{{asset('jdate/jdate.js')}}"></script>
        <script src="{{asset('flatpickr/flatpickr-jdate.js')}}"></script>
        <script src="{{asset('flatpickr/l10n/fa-jdate.js')}}"></script>
        <script>
            var url="{{route('logEvents.getData')}}";
            var token="{{csrf_token()}}";
            var storage="{{url('/storage')}}";
            var base_url="{{url('/')}}";
        </script>
        <script src="{{ asset('assets/js/tabulator/tabulator_app.js') }}"></script>
    @endSection  
@endcomponent
