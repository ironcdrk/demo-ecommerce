<?php

namespace Database\Seeders;

use App\Infraestructure\Catalog\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Phones', 'slug' => 'phones'],
            ['name' => 'Laptops', 'slug' => 'laptops'],
            ['name' => 'Monitors', 'slug' => 'monitors'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
