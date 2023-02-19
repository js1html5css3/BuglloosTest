<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LogEvent;
use App\Helpers\Utility;

class LogEventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            return view("adminLte.logEvent.index");  
        } catch (\Exception $ex) {
            return \App\Helpers\Utility::log($ex);
        }
        
    }

    public function getData(Request $request){
        try{
            return Utility::getModelData($request , new LogEvent);              
        } catch (\Exception $ex) {
            return Utility::log($ex);
        } 
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(LogEvent $logEvent)
    {
        try{
            $controller_name=explode("@", $logEvent->controller_and_action_name);
            if(isset($controller_name[0])){
                $controller_name=explode("\\", $controller_name[0]);
            }
            $controller_name= $controller_name[count($controller_name) -1];
            $logEvent->trace_as_string = explode("\n", $logEvent->trace_as_string);
            return view("adminLte.logEvent.show" , compact(['logEvent',"controller_name"]));      
        } catch (\Exception $ex) {
            return \App\Helpers\Utility::log($ex);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
