<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Str;
use Illuminate\Database\Eloquent\Factories\Sequence;

use App\Models\Book;

class BookFactory extends Factory
{

    protected $model = Book::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name'=> $this->faker->name,
            'ISBN' => Str::random(15),
            'genre' =>new Sequence('Literary Fiction','Mystery','Thriller','Horror','Historical','Romance','Western','Bildungsroman','Fantasy','Dystopian'),
            'detail' => $this->faker->text
        ];
    }
}
