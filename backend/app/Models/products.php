<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\product_group;

class products extends Model
{
    /** @use HasFactory<\Database\Factories\ProductsFactory> */
    use HasFactory;

    public $fillable = ["product_name", "product_description", "product_price", "stock"];

    public function product_group() {
        return $this->belongsTo(product_group::class);
    }
}
