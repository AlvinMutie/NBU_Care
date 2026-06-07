<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scenario extends Model
{
    protected $fillable = ['title', 'description', 'problem', 'solution', 'maths_data', 'difficulty'];

    protected $casts = [
        'maths_data' => 'json',
    ];
}
