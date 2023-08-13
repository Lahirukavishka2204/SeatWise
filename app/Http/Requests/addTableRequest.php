<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class addTableRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'restaurant_id' => 'required',
            'table_id' => 'required',
            'table_no' => 'required',
            'chairs' => 'required',
            'view_id' => 'required',
            'posX' => 'required',
            'posY' => 'required',
            
        ];
    }
}