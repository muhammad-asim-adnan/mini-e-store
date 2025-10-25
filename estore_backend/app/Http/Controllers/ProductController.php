<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function getProducts() {
        return Product::orderBy('created_at', 'desc')->get();
    }

    public function storeProducts(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'category' => 'nullable|string',
            'stock_status' => 'required|string'
        ]);

        $product = Product::create($request->all());
        return response()->json($product, 201);
    }
}