<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Helpers\Utility;

class BookController extends Controller
{
    public function index()
    {
        try{
            return view("adminLte.books.index");
        } catch (\Exception $ex) {
            return \App\Helpers\Utility::log($ex , false , 29);
        }
    }

     //dashboard panel filtering
     public function getData(Request $request){
        // try{
            return Utility::getModelData($request , new Book);  
        // } catch (\Exception $ex) {
        //     return \App\Helpers\Utility::log($ex , false , 29);
        // }
    }
    
    
    //api filtering 
    public function filtering(Request $request){
       $filter= Book::where('id','>','0');
       if($request->has("serviceNames") && $request->serviceNames != NUll)
            $filter->where("serviceNames", 'like', '%' . $request->serviceNames . '%');
       if($request->has("statusCode") && $request->statusCode != NUll)
            $filter->where("statusCode",  $request->statusCode );
       if($request->has("startDate") && $request->startDate != NUll)
            $filter->whereDate("created_at", '>=',  $request->startDate);
       if($request->has("endDate") && $request->endDate != NUll)
            $filter->whereDate("created_at", '<=',  $request->endDate );

        $data['count'] = $filter->count();
        return Response($data);
    }
   

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $bood
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        //
    }
}
