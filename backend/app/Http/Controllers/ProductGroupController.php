<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\product_group;
use Illuminate\Validation\ValidationException;

class ProductGroupController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productGroups = product_group::all();
        return response()->json([
            'product_groups' => $productGroups
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'product_group_name' => 'required|max:1000'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }

        $productGroup = product_group::create($validated);

        return response()->json([
            'product_groups' => [$productGroup]   
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(product_group $productGroup)
    {
        $productGroup->load('products');
        return response()->json([
            'product_groups' => $productGroup
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, product_group $productGroup)
    {
        try {
            $validated = $request->validate([
                'product_group_name' => 'required|max:1000'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }

        $productGroup->update($validated);

        return response()->json([
            'product_groups' => $productGroup   
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(product_group $productGroup)
    {
        $deletedProductGroupName = $productGroup->product_group_name;

        $productGroup->delete();

        return response()->json([
            "message" => "Deleted product group " . $deletedProductGroupName
        ], 200);
    }
}
