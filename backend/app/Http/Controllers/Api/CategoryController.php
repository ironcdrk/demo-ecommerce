<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
     public function index()
    {
        return response()->json(Category::all());
    }

    public function products($id)
    {
        $category = Category::with('products')->findOrFail($id);
        return response()->json($category->products);
    }
}
