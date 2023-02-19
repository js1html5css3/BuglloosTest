@component('layouts.adminLte.partials.content', ['title'=> 'جزئیات خطا'])
    @slot('breadcrumb')
        <li class="breadcrumb-item"><a href="{{route('adminlte.dashboard.index')}}">پنل مدیریت</a></li>
    @endslot
    <div class="row" style="direction: ltr;">
        <div class="col-12">
            <div class="card">
                <div class="card-body table-responsive p-0">
                    <div class="box-header ui-sortable-handle" style="cursor: move;">
                        {{-- <i class="fa fa-info"></i> --}}
                        <h5 class="box-title"> کنترلر خطا :    {{$logEvent -> controller_and_action_name}}</h5>
                        <h5 class="box-title  alert-success"> پیغام خطا :    {{$logEvent -> error_message}}</h5>
                        <hr>
                    </div>
                    @foreach ($logEvent -> trace_as_string as $line)
                        <p @if(str_contains($line , $controller_name)) class=" bold alert-warning"  style="font-size:24px;"@endif>   {{$line}} </p>
                    @endforeach  
                </div>
                <div class="d-flex card-footer"></div>
            </div>
        </div>
    </div>
@endcomponent
