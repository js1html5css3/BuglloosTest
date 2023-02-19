<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Log;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use DB;

class LogEvent extends Model
{
    use Notifiable;
    use HasFactory, SoftDeletes;

    protected $table = 'log_events';
    protected $dates = ['deleted_at', 'updated_at', 'created_at'];

    protected $fillable = [
        'id','user_id', 'controller_and_action_name','error_message', 'trace_as_string','count', 'updated_at', 'created_at'
    ];

    protected $data=
    [
        ['field' =>'id', 'title'=>"شماره" , 'type' => "range_number", "extra_feature" => ["model_title"  =>  "خطایی"  , "with"=> ["user"]]],
        ["field"=>'user','width'=>120, "title"=>"کاربر" , "type" => "select2",'formatter'=>"relation_column_blong_one" , 'formatterParams' => ['column'=>"mobile", "table_name" => "users"]],
        
        ['field'=>'controller_and_action_name','width'=>540, 'title'=>" کنترلر و تابع مربوطه ", 'type'=>"text"],
        ["field" => 'error_message','width'=>300, "title" => "  پیغام خطا", "type" => "text"],
        ["field" => 'count', "title" => "تعداد دفعات پیش آمده", "type" => "range_number"],
        ["field" => 'created_at', "title" => "تاریخ ایجاد" , "type" => "range_date",],
        ["field" => 'updated_at','width'=>200, "title" => "تاریخ آپدیت" , "type" => "range_date",],
        ["field" => 'id',"width" => "190", "title" => "عملیات" , "type" => "filter_button","formatter" => "operations",
            "formatterParams" => [
                "items" => [
                    ["type" => "button", "title" => "نمایش" ,"route" =>  "/logEvents/{id}" , "class" => "success"],
                    ["type" => "delete" ],
                ]   
            ]
        ],
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id' , 'id');
    }

    public function getData(){
        return $this->data;
    }

    public function getCreatedAtAttribute($date)
    {
        $date = \Morilog\Jalali\CalendarUtils::strftime('Y/m/d', strtotime($date));
        $date=\Morilog\Jalali\CalendarUtils::convertNumbers($date);
        return $date;
    }

    public function getUpdatedAtAttribute($date)
    {
        $date = \Morilog\Jalali\CalendarUtils::strftime('Y/m/d h:i:s', strtotime($date));
        $date=\Morilog\Jalali\CalendarUtils::convertNumbers($date);
        return $date;
    }
}
