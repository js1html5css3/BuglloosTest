@component('layouts.adminLte.partials.content', ['title'=> ' سرویس ها '])
    @slot('breadcrumb')
    <li class="breadcrumb-item"><a href="{{route('adminlte.dashboard.index')}}">پنل مدیریت</a></li>
    <li class="breadcrumb-item active"> سرویس ها </li>
    @endslot
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
      <link rel="stylesheet" type="text/css" href="{{ asset('assets/client/css/toastr.css') }}">
      {{-- <script src="{{asset('plugins/jQueryUI/jquery-ui.min.js')}}"></script> --}}
      <script src="{{asset('assets/js/select2.min.js')}}"></script>
      <script src="{{asset('assets/js/tabulator/tabulator.min.js')}}"></script>
      <script src="{{asset('assets/js/tabulator/jquery_wrapper.js')}}"></script>
      <script src="{{asset('assets/js/underscore/underscore-umd-min.js')}}"></script>
      <script src="{{asset('assets/client/js/toastr.min.js') }}"></script>

      <script src="{{asset('moment/moment.js')}}"></script>
      <script src="{{asset('jdate/jdate.js')}}"></script>
      <script src="{{asset('flatpickr/flatpickr-jdate.js')}}"></script>
      <script src="{{asset('flatpickr/l10n/fa-jdate.js')}}"></script>
      <script>
          var url="{{route('adminlte.services.getData')}}";
          var token="{{csrf_token()}}";
          var storage="{{url('/storage')}}";
          var base_url="{{url('/')}}";
      </script>
      <script src="{{ asset('assets/js/tabulator/tabulator_app.js') }}"></script>
  @endSection
    @endcomponent