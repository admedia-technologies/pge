<?php

use Illuminate\Support\Facades\Route;

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
    return redirect(route('login'));
});

Route::get('/adm/login',[App\Http\Controllers\Admin::class, 'adminloginview'])->name('adminlogin');

Route::get('/users/list',[App\Http\Controllers\HomeController::class, 'userlistingview']);

Route::get('/users/datatable',[App\Http\Controllers\HomeController::class,'userlistdatatable'])->name('userdatatable');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
