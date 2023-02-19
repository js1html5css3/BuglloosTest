<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book;

class Media extends Model
{
    use HasFactory;

    protected $fillable = ['id','book_id' , 'address', 'created_at'];
    protected $table = 'mediaes';

    public function book(){
        return $this->belongsTo(Book::class);
    }
}
