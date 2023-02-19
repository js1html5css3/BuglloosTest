<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BookController;
use App\Http\Controllers\LogEventController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::resource('services', BookController::class);
Route::get('/', function () {
    return redirect(route("services.index"));
})->name('adminlte.dashboard.index');
Route::get('/home', function () {
    return redirect(route("services.index"));
})->name('home');
Route::post("services/getData", [BookController::class, 'getData'])->name('adminlte.services.getData');



Route::resource('logEvents', LogEventController::class);
Route::post("logEvents/getData", [LogEventController::class, 'getData'])->name('logEvents.getData');