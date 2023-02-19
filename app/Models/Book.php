<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Media;

class Book extends Model
{
    use HasFactory;
    
    protected $fillable = ['id','name' , 'ISBN','genre','detail' , 'created_at'];

    protected $data=
    [
        ['field' =>'id', 'title'=>"شماره", "formatter" => "auto_increment",  "extra_feature" => ["model_title"  =>  "کتابی"  ]],
        ['field'=>'name','width'=>'500', 'title'=>"نام کتاب" , 'type'=>"select2", "extra_feature" => ["distinct" => true]],
        ["field"=>'ISBN','width'=>'300', "title"=>"شماره آی ای بی ان " , "type"=>"range_number", "extra_feature" => ["distinct" => true]],
        ["field"=>'genre','width'=>'300', "title"=>"ژانر کتاب" , "type"=>"range_number", "extra_feature" => ["distinct" => true]],
        ["field" => 'created_at', "title" => "تاریخ ایجاد" , "type" => "range_date",],
        ["field" => 'id',"width" => "280", "title" => "عملیات" , "type" => "filter_button","formatter" => "operations",
            "formatterParams" => [
                "items" => [
                    ["type" => "button", "title" => "ویرایش" ,"route" =>  "/products/{id}/edit" , "class" => "success"],
                    ["type" => "button", "title" => "گالری" ,"route" =>  "/products/createmedia/{id}" , "class" => "primary"],
                    ["type" => "toggleStatus", "title" => ["انتشار","عدم انتشار"],"class" => ['success','danger'] ,"values" => ["2","1"],"item" => "status"],
                    ["type" => "delete",]
                ]
            ]
        ],
    ];

    public function mediaes(){
        return $this->hasMany(Media::class);
    }

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
