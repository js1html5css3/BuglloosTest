<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BugloosServiceController;

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



Route::get('/', function () {
    return redirect(route("services.index"));
})->name('adminlte.dashboard.index');
Route::get('/home', function () {
    return redirect(route("services.index"));
})->name('home');
Route::resource('services', BugloosServiceController::class);
Route::post("services/getData", [BugloosServiceController::class, 'getData'])->name('adminlte.services.getData');
