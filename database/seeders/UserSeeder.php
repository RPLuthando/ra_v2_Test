<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('users')->insert([
        'entity_id' => '1',
        'created_by_id' => '1',
        'user_name' => 'Jacques',
        'user_surname' => 'Engelbrecht',
        'user_email' => 'jacques@rapidassurance.com',
        'group_name' => '1',
        'active' => true
      ]);
    }
}
