<?php

namespace App\Http\Controllers;

use App\Models\BugloosService;
use Illuminate\Http\Request;
use App\Helpers\Utility;

class BugloosServiceController extends Controller
{
    public function index()
    {
        try{
            return view("adminLte.services.index");
        } catch (\Exception $ex) {
            return \App\Helpers\Utility::log($ex , false , 29);
        }
    }

    public function getData(Request $request){
        // try{
            return Utility::getModelData($request , new BugloosService);  
        // } catch (\Exception $ex) {
        //     return \App\Helpers\Utility::log($ex , false , 29);
        // }
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
     * @param  \App\Models\BugloosService  $bugloosService
     * @return \Illuminate\Http\Response
     */
    public function show(BugloosService $bugloosService)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BugloosService  $bugloosService
     * @return \Illuminate\Http\Response
     */
    public function edit(BugloosService $bugloosService)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BugloosService  $bugloosService
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BugloosService $bugloosService)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BugloosService  $bugloosService
     * @return \Illuminate\Http\Response
     */
    public function destroy(BugloosService $bugloosService)
    {
        //
    }
}
