<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'id_number',
        'profile_image',
        'hospital_id',
        'role',
        'status',
        'is_verified',
        'verified_by',
        'verification_date',
        'learning_stats'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the verification queue record for the user.
     */
    public function verificationQueue(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(VerificationQueue::class);
    }

    /**
     * Determine if the user has been verified.
     */
    public function isVerified(): bool
    {
        return $this->is_verified && $this->status === 'Approved';
    }
}
