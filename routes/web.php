<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

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

Route::get('/', [HomeController::class,'index'])->middleware(['verify.shop','verify.shopify'])->name('home');
Route::get('/{path?}', [HomeController::class, 'common'])
    ->where('path', '^(?!uploads).')
    ->where('path', '..(?!jpg|jpeg|png|gif|bmp|ico|webp).')
    ->where('path', '.*')
    ->fallback();