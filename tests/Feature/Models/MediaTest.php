<?php

namespace Tests\Feature\Models;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Media;
use App\Models\Book;

class MediaTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testInsertData()
    {
        $data= Media::factory()->make()->toArray();
        Media::create($data);
        $this->assertDatabaseHas('mediaes',$data);
    }

    public function testMediaRelationshipWithBook(){
        // $count=rand(1,5);

        // $media=Media->factory()->hasBooks($count)->create();


        $media=Media::factory()->for(Book::factory())->create(); 

        $this->assertTrue(isset($media->book->id));
        $this->assertTrue($media->book instanceof Book);
    }
}
