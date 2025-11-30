<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $phones = Category::where('slug', 'phones')->first();
        $laptops = Category::where('slug', 'laptops')->first();
        $monitors = Category::where('slug', 'monitors')->first();

        $products = [
            [
                'category_id' => $phones?->id,
                'name'        => 'Samsung Galaxy S10',
                'slug'        => 'samsung-galaxy-s10',
                'description' => 'Powerful smartphone with AMOLED display.',
                'price'       => 500,
                'image_url'   => '/storage/images/products/samsung-s10.jpg',
                'stock'       => 10,
            ],
            [
                'category_id' => $phones?->id,
                'name'        => 'Nokia lumia 1520',
                'slug'        => 'mokia-lumia-1520',
                'description' => 'The Nokia Lumia 1520 is powered by 2.2GHz quad-core Qualcomm Snapdragon 800.',
                'price'       => 800,
                'image_url'   => '/storage/images/products/nokia-lumia-1520.jpg',
                'stock'       => 8,
            ],
            [
                'category_id' => $laptops?->id,
                'name'        => 'MacBook Pro 13',
                'slug'        => 'macbook-pro-13',
                'description' => 'Apple laptop for professionals.',
                'price'       => 1200,
                'image_url'   => '/storage/images/products/macbook-pro-13.jpg',
                'stock'       => 5,
            ],
            [
                'category_id' => $monitors?->id,
                'name'        => 'ASUS 24" Monitor',
                'slug'        => 'asus-24-monitor',
                'description' => 'Full HD monitor for work and gaming.',
                'price'       => 200,
                'image_url'   => '/storage/images/products/asus-24-monitor.jpg',
                'stock'       => 15,
            ],

        ];

        foreach ($products as $product) {
            if ($product['category_id']) {
                Product::firstOrCreate(['slug' => $product['slug']], $product);
            }
        }
    }
}
