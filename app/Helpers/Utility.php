<?php


namespace App\Helpers;

use App\Http\Controllers\Controller;
use \Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Log;
use DB;
use App\Models\LogEvent;
use App\Models\ProductsDocument;
use App\Models\RequestProductDocument;
use App\Models\ProductContractDetails;

use Illuminate\Support\Facades\Auth;
use Illuminate\Pagination\Paginator;
use function PHPUnit\Framework\isEmpty;
use function PHPUnit\Framework\isNull;


class Utility extends Controller
{
    public static function getModelData(Request $request, $modelName, $get_data = "getData")
    {
        // try {
            $page=1;
            $size=10;
            //Start Task#214 H.Mishani 2022.12.08

            $order_by="id";
            $sort_type= "desc";

            // ascending
            // descending
            // none
            // sortType:type:"sorting",'fieldSort':column.getField()
            //End Task#214 H.Mishani 2022.12.08
            $dataset = $modelName->$get_data();

            $update_field = [];
            if ($request->has('toggle_status') && isset($request->toggle_status["sortType"])) {

                $order_by= $request->toggle_status["fieldSort"];
                if($request->toggle_status["sortType"] == "none" || $request->toggle_status["sortType"] == "ascending" )
                    $sort_type= "desc";
                else
                    $sort_type= "asc";
                    $update_field['sort'] =  $request->toggle_status["sortType"] == "ascending" ? "descending":"ascending";
                    $update_field['order_by'] =  $order_by;
            }
            if ($request->has('toggle_status')) {
                $update_field['id'] =isset($request->toggle_status["id"]) ? $request->toggle_status["id"] : "0";
                switch ($request->toggle_status["type"]) {
                    //Start Task#201 H.Mishani 2022.12.07
                    case('paginate'):
                        $page=$request->toggle_status["page"];
                        break;
                    //End Task#201 H.Mishani 2022.12.07
                    case('toggle'):
                        $model_toggle = $modelName::find($request->toggle_status["id"]);
                        if ($model_toggle) {
                            if ($request->toggle_status["toggle_type"] == "toggleStatus") {
                                if ($model_toggle[$request->toggle_status["column"]] == $request->toggle_status["val1"])
                                    $model_toggle[$request->toggle_status["column"]] = $request->toggle_status["val2"];
                                else
                                    $model_toggle[$request->toggle_status["column"]] = $request->toggle_status["val1"];
                                $model_toggle->save();
                            } elseif ($request->toggle_status["toggle_type"] == "toggleStatusElse") {
                                if ($model_toggle[$request->toggle_status["column"]] != $request->toggle_status["toggle_else_value"])
                                    $model_toggle[$request->toggle_status["column"]] = $request->toggle_status["toggle_else_value"];
                                else
                                    $model_toggle[$request->toggle_status["column"]] = $request->toggle_status["value_back"];
                                $model_toggle->save();
                            } elseif ($request->toggle_status["toggle_type"] == "delete") {
                                DB::statement('SET FOREIGN_KEY_CHECKS=0;');
                                $model_toggle->delete();
                                Log::info("how to delete this column");
                                DB::statement('SET FOREIGN_KEY_CHECKS=1;');
                            }
                        }
                        break;
                    case('call_route'):
                        $url = $request->toggle_status["route"];
                        Log::info($url);
                        $route = collect(\Route::getRoutes())->first(function ($route) use ($url) {
                            return $route->matches(request()->create($url));
                        });
                        $routeArray = $route->getAction();
                        $controllerAction = $routeArray['controller'];
                        list($controller, $action) = explode('@', $controllerAction);
                        Log::info($request);
                        $test = app($controller)->$action($modelName::find($request->toggle_status["id"]));
                        break;
                    case('call_route_form'):
                        $url = $request->toggle_status["route"];
                        $route = collect(\Route::getRoutes())->first(function ($route) use ($url) {
                            return $route->matches(request()->create($url));
                        });
                        $routeArray = $route->getAction();
                        $controllerAction = $routeArray['controller'];
                        list($controller, $action) = explode('@', $controllerAction);
                        $myRequest = new \Illuminate\Http\Request();
                        $myRequest->setMethod('POST');
                        foreach ($request->toggle_status["form_data"] as $item) {
                            $myRequest->request->add([$item[0] => $item[1]]);
                        }
                        $test = app($controller)->$action($modelName::find($request->toggle_status["id"]), $myRequest);
                        break;
                    default:
                }

            }
            $models = $modelName::where('id', '>', 0);
            foreach ($dataset as $column) {
                if ($column['field'] == 'id' && array_key_exists("extra_feature", $column) && array_key_exists("sort", $column['extra_feature'])) {
                    $order_by=$column['extra_feature']['sort'];
                    $sort_type= $column['extra_feature']['sort_type'];
                }

                if ($column['field'] == 'id') {
                    if (array_key_exists("extra_feature", $column) && array_key_exists("with", $column['extra_feature'])) {
                        $models = $modelName::with($column['extra_feature']['with'])->where('id', '>=', '0');
                    }
                    if (array_key_exists("extra_feature", $column) && array_key_exists("initial_filter", $column['extra_feature'])) {
                        foreach ($column['extra_feature']['initial_filter'] as $init_filter) {
                            $models = Utility::switch_filter($init_filter, $models, $request);
                        }
                    }
                    break;
                }
                if ($column['field'] == 'id' && array_key_exists("extra_feature", $column) && array_key_exists("with", $column['extra_feature'])) {
                    $models = $modelName::with($column['extra_feature']['with'])->where('id', '>=', '0');
                    break;
                }

            }

            if ($request->has('allfilters')) {
                foreach ($request->allfilters as $filter) {
                    $models = Utility::switch_filter($filter, $models, $request);
                }
            }
            $ct = $models;

            // return $models->get()->unique('contract_type')->pluck(['id','contract_type']);
            $count = $ct->count();

            $fillable= $modelName->getFillable();


            if(!in_array($order_by , $fillable))$order_by="id";
            //Start Task#201 H.Mishani 2022.12.07
            //Start Task#214 H.Mishani 2022.12.08
            // in_array()
            $models = $models ->orderBy($order_by, $sort_type)->paginate($size, ['*'], 'page', $page);
            //End Task#214 H.Mishani 2022.12.08
            //End Task#201 H.Mishani 2022.12.07

            $array_data = [
                'dataset' => $dataset,
                "status" => 200,
                "models" => $models,
                "filters" => $request->allfilters,
                'update_field' => $update_field,
                'count' => $count
            ];
            foreach ($dataset as $column) {
                if (array_key_exists("extra_feature", $column) && array_key_exists("distinct", $column['extra_feature'])) {
                    if ($column['extra_feature']['distinct']) {
                        $array_data[$column['field'] . '_distinc'] = DB::table($modelName->getTable())->select($column['field'])->distinct()->get();
                    } else {
                        $array_data[$column['field'] . '_choices'] = DB::table('status_sub_groups')->where('Status_group_id', $column["extra_feature"]["Status_group_id"])->get();
                    }
                } elseif (array_key_exists("formatter", $column) && ($column['formatter'] == "relation_list" || $column['formatter'] == "relation_column_blong_one" || $column['formatter'] == "relation_list_number")) {
                    $array_data[$column['field']] = DB::table($column['formatterParams']['table_name'])->get()->toArray();
                    if(array_key_exists("merge_table", $column["formatterParams"])){
                        for($index=0; $index < count($column["formatterParams"]['merge_table']) ; $index++){

                            $temparray=DB::table($column['formatterParams']['merge_table'][$index])->get()->toArray();
                            // if($column['formatterParams']['merge_table'][$index] == 'static_property'){
                            //     for($j=0;$j<count($temparray);$j++){
                            //         $temparray[$j]->id= 1;
                            //     }
                            // }
                            $counter_temp=count( $array_data[$column['field']]) +  1;
                            for($j=0;$j<count($temparray);$j++){
                                $temparray[$j]->id= $counter_temp++;
                                array_push( $array_data[$column['field']],$temparray[$j]);
                            }
                            // array_push( $array_data[$column['field']],$temparray);
                        }
                    }
                }
            }
            return response()->json($array_data);
        // } catch (\Exception $ex) {
        //     return \App\Helpers\Utility::log($ex, true);
        // }
    }


    public static function switch_filter($filter, $models, $request)
    {
        try {
            switch ($filter['type']) {
                case('range_number'):
                    $start = $filter['value']['start'];
                    $end = $filter['value']['end'];
                    if ($start)
                        $models->where($filter['field'], ">=", $start);
                    if ($end)
                        $models->where($filter['field'], "<=", $end);
                    break;
                case('like'):
                    $value = $filter['value'];
                    if (array_key_exists("relation_column", $filter)) {
                        $relation_column = $filter['relation_column'];
                        $models->whereHas($filter['field'], function ($q) use ($value, $relation_column) {
                            $q->where($relation_column, 'like', '%' . $value . '%');
                        });
                    } else {
                        $models->where($filter['field'], 'like', '%' . $filter['value'] . '%');
                    }
                    break;
                case('whereIn'):
                    $value = $filter['value'];
                    if (array_key_exists("relation_list", $filter)) {
                        $relation_list = $filter['relation_list'];
                        $models->whereHas($filter['field'], function ($q) use ($value, $relation_list) {
                            $q->whereIn('id', $value);
                        });
                    } else {
                        $models->whereIn($filter['field'], $filter['value']);
                    }
                    break;
                case('where'):
                    $value = $filter['value'];
                    if (array_key_exists("relation_list", $filter)) {
                        $relation_list = $filter['relation_list'];
                        $models->whereHas($filter['field'], function ($q) use ($value, $relation_list) {
                            if ($value == "current_user")
                                $q->where($relation_list, Auth::user()->id);
                            else
                                $q->where($relation_list, $value);
                        });
                    }
                    else {
                        Log::info($request);
                        if ($value == "current_user")
                            $models->where($filter['field'], Auth::user()->id);
                        else if ($value == "id")
                            $models->where($filter['field'], $request->id);
                        else
                            $models->where($filter['field'], $value);
                    }
                    break;
                case('range_date'):
                    $dateFrom = \Morilog\Jalali\CalendarUtils::convertNumbers($filter['value']['from'], true);
                    $dateFrom = \Morilog\Jalali\CalendarUtils::createCarbonFromFormat('Y-m-d', $dateFrom)->format('Y-m-d');
                    $dateTo = \Morilog\Jalali\CalendarUtils::convertNumbers($filter['value']['to'], true);
                    $dateTo = \Morilog\Jalali\CalendarUtils::createCarbonFromFormat('Y-m-d', $dateTo)->format('Y-m-d');
                    $models->whereDate($filter['field'], '>=', $dateFrom);
                    $models->whereDate($filter['field'], '<=', $dateTo);
                    break;
                case('whereInLike'):
                    $valus = $filter['value'];
                    $models->Where(function ($query) use ($filter) {
                        for ($i = 0; $i < count($filter['value']); $i++) {
                            $query->orwhere($filter['field'], 'like', '%' . $filter['value'][$i] . '%');
                        }
                    });
                    break;
                case('OrWherInMultipleTables'):
                    $valus = $filter['value'];
                    $models->Where(function ($query) use ($filter) {
                        for ($i = 0; $i < count($filter['relation_list']); $i++) {
                            $query->orwhere(function ($secondQuery) use ($filter , $i) {
                                $atrr_id=$filter['relation_list'][$i]['model']::where("name",$filter['value'][0])->get()->pluck(['id']);
                                if(count($atrr_id)>0)
                                    $secondQuery->where('attribute_id',$atrr_id[0])->where('type',$filter['relation_list'][$i]['value']);
                            });
                        }
                    });
                    break;
                case('sortByRaw'):
                    foreach ($filter['filters'] as $el) $models = Utility::switch_filter($el, $models, $request);
                    $models = $models->orderByRaw($filter['sort_by'] . ' = ? desc', [$filter['value'] == "current_user" ? Auth::user()->id : $filter['value']]);
                    break;
                default:
            }
            return $models;
        } catch (\Exception $ex) {
            return \App\Helpers\Utility::log($ex, true , 29);
        }
    }

    public static function log(\Exception $ex, $request_type = false, $undertaking_code=30)
    {
        $user = Auth::user();
        if ($user != null) $user = $user->id;
        $log = LogEvent::where('trace_as_string', $ex->getTraceAsString())
            ->where('controller_and_action_name', \Route::getCurrentRoute()->getActionName())
            ->get();
        if ($log->count() == 0) {
            $logEvent = new LogEvent();
            $logEvent->user_id = $user;
            $logEvent->controller_and_action_name = \Route::getCurrentRoute()->getActionName();
            $logEvent->error_message = $ex->getMessage();
            $logEvent->trace_as_string = $ex->getTraceAsString();
            $logEvent->undertaking = $undertaking_code;
            $logEvent->save();
        } else {
            logEvent::whereId($log[0]->id)->update(['count' => $log[0]->count + 1]);
        }

        if ($request_type == false) {
            alert()->error('کارشناسان ما این مشکل را بررسی خواهند کرد.', 'مشکلی پیش آمده');
            return abort(500);
        } else
            return "500";
    }

    public static function jsLog(Request $request)
    {
        $user = Auth::user();
        if ($user != null) $user = $user->id;
        $log = LogEvent::where('trace_as_string', $request->err)
            ->get();
        if ($log->count() == 0) {
            $logEvent = new LogEvent();
            $logEvent->user_id = $user;
            $logEvent->controller_and_action_name =$request->action;
            $logEvent->error_message = "Javascript Error !!!";
            $logEvent->trace_as_string = $request->err;
            $logEvent->undertaking = $request->agent;
            $logEvent->save();
        } else {
            logEvent::whereId($log[0]->id)->update(['count' => $log[0]->count + 1]);
        }

    }

    public static function randomFileName($length = 20, $path = '', $prefix = '', $postfix = '', $ext = '', $returnExt = true, $fullPath = false, $maxTry = 5000)
    {
        $characters1 = '0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ-';
        $characters2 = 'abcdefghijklmnopqrstuvwxyz';
        $charactersLength = strlen($characters1);
        $randomString = $characters2[rand(0, 25)];
        $try = 1;
        if (substr($path, strlen($path) - 1, 1) != '/') {
            $path .= '/';
        }
        if (!empty($ext)) {
            $ext = '.' . $ext;
        }
        while ($try <= $maxTry) {
            for ($i = 0; $i < $length - 2; $i++) {
                $randomString .= $characters1[rand(0, $charactersLength - 1)];
            }

            $randomString .= $characters2[rand(0, 25)];

            $result = $prefix . $randomString . $postfix;

            $checkName = $path . $result;

            $checkName = $checkName . $ext;

            if (!file_exists($checkName)) {
                if ($returnExt == true and !empty($ext)) {
                    $result = $prefix . $randomString . $postfix . $ext;
                } else {
                    $result = $prefix . $randomString . $postfix;
                }
                if ($fullPath) {
                    $result = $path . $result;
                }
                break;
            }
            $try++;
        }

        return $result;
    }

    public static function makeDir($path, $permission = 0755, $recursive = true)
    {
        $directory = false;
        if (!is_dir($path)) {
            $directory = mkdir($path, $permission, $recursive);
        }

        return $directory;
    }


    public static function fileUploader($file, $path)
    {

        $response = [
            'message' => 'عملیات موفقیت آمیز نبود.',
            'response' => 'alert-danger',
            'data' => null
        ];
        try {
            \App\Helpers\Utility::makeDir(public_path($path), 0755, true);
            $upload_file = $file->move(public_path($path), \App\Helpers\Utility::randomFileName(10, $path, true) . '.' . $file->extension());
            $response = [
                        'message' => 'عملیات موفقیت آمیز بود.',
                        'response' => 'alert-success',
                        'data' => explode('public', $upload_file->getPathname())[1]
            ];
            return $response;


        } catch (\Exception $ex) {
            return \App\Helpers\Utility::log($ex);
        }
    }
}
