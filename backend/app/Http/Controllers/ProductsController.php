<?php

namespace App\Http\Controllers;

use App\Models\product_group;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\products;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Products::all();
        return response()->json([
            'products' => $products
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, product_group $productGroup)
    {
        try {
            $validated = $request->validate([
                'product_name' => 'required|max:255',
                'product_description' => 'max:1250|nullable',
                'product_price' => 'required|numeric',
                'stock' => 'numeric|nullable'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }

        $product = $productGroup->products()->create($validated);

        return response()->json([
            'product' => $product,
            'product_group' => $productGroup
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(products $products)
    {
        return resposne()->json([

        ])
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, products $products)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(products $products)
    {
        //
    }
}
