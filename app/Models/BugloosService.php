<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugloosService extends Model
{
    use HasFactory;

    protected $fillable = ['id','serviceNames' , 'statusCode','description', 'created_at'];

    protected $data=
    [
        ['field' =>'id', 'title'=>"شماره", "formatter" => "auto_increment",  "extra_feature" => ["model_title"  =>  "سرویسی"  ]],
        ['field'=>'serviceNames','width'=>'500', 'title'=>"نام سرویس" , 'type'=>"select2", "extra_feature" => ["distinct" => true]],
        ["field"=>'statusCode','width'=>'300', "title"=>"شماره کد " , "type"=>"range_number", "extra_feature" => ["distinct" => true]],
        ["field" => 'created_at', "title" => "تاریخ ایجاد" , "type" => "range_date",],
        ["field" => 'id',"width" => "280", "title" => "عملیات" , "type" => "filter_button","formatter" => "operations",
            "formatterParams" => [
                "items" => [
                    
                ]
            ]
        ],
    ];

    public function getData(){
        return $this->data;
    }

    public function getCreatedAtAttribute($date)
    {
        $date = \Morilog\Jalali\CalendarUtils::strftime('Y/m/d H:i:s', strtotime($date));
        $date=\Morilog\Jalali\CalendarUtils::convertNumbers($date);
        return $date;
    }
}
