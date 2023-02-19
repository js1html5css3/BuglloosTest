<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Book;
use App\Models\Media;

class MediaFactory extends Factory
{

    protected $model = Media::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'book_id'=> Book::factory(),
            'address' => $this->faker->imageUrl()
        ];
    }
}
