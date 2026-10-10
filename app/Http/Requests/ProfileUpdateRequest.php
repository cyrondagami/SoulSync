<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'gmail' => [
                'nullable',
                'string',
                'lowercase',
                'email',
                'max:255',
                'regex:/^[A-Za-z0-9._%+-]+@gmail\.com$/i',
            ],
            'contact_number' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^[0-9+\-\s()]{7,20}$/',
            ],

            // Bagong personal information
            'full_name' => ['nullable', 'string', 'max:255'],
            'birthdate' => ['nullable', 'date', 'before_or_equal:today'],
            'gender' => ['nullable', Rule::in(['male', 'female'])],
            'address' => ['nullable', 'string', 'max:255'],

            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'remove_photo' => ['nullable', 'boolean'],
        ];
    }

    /**
     * Custom error messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'gmail.regex' => 'Please enter a valid Gmail address (example: yourname@gmail.com).',
            'contact_number.regex' => 'Please enter a valid contact number (example: 09123456789).',
            'birthdate.before_or_equal' => 'Birthdate cannot be in the future.',
            'gender.in' => 'Please choose Male or Female.',
        ];
    }
}