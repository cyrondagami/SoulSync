<?php

use App\Models\User;

it('allows a verified user to update core profile fields without persisting a gmail field', function () {
    $user = User::factory()->create([
        'name' => 'Old Name',
        'full_name' => 'Old Full Name',
        'email' => 'user@example.com',
        'contact_number' => '09100000000',
        'birthdate' => '1998-01-01',
        'gender' => 'male',
        'age_group' => 'under_18',
        'address' => 'Old Address',
        'gmail' => 'old@gmail.com',
    ]);

    $this->actingAs($user)
        ->patch(route('profile.update'), [
            'name' => 'Updated Name',
            'email' => 'user@example.com',
            'full_name' => 'Updated Full Name',
            'contact_number' => '09999999999',
            'birthdate' => '2000-01-01',
            'gender' => 'female',
            'age_group' => '18_above',
            'address' => 'New Address',
            'gmail' => 'new@gmail.com',
        ])
        ->assertRedirect(route('profile.edit'));

    $user->refresh();

    expect($user->name)->toBe('Updated Name')
        ->and($user->full_name)->toBe('Updated Full Name')
        ->and($user->contact_number)->toBe('09999999999')
        ->and($user->gender)->toBe('female')
        ->and($user->age_group)->toBe('18_above')
        ->and($user->address)->toBe('New Address')
        ->and($user->gmail)->toBe('old@gmail.com');
});
