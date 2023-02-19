<?php

namespace Tests\Feature\Models;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Book;
use App\Models\Media;

class BookTest extends TestCase
{
    // use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testInsertData()
    {
        $data= Book::factory()->count(50)->make()->toArray();
        Book::create($data);

        // $this->assertDatabaseHas('books',$data[0]);
    }

    public function testBookRelationshipWithMedia(){
        $count=rand(40,50);

        $book=Book::factory()->hasMediaes($count)->create();

        $this->assertCount($count, $book->mediaes);
    }
}
