<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{
    public function index()
    {
        return Inertia::render('Products/Index', []);
    }

    public function create()
    {
        return Inertia::render('Products/Create', []);
    }
}
