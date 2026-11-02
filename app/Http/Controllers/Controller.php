<?php

namespace App\Http\Controllers;

abstract class Controller
{
    // O controller base permanece neutro; regras de autorização e validação
    // ficam nos controllers e Form Requests que realmente precisam delas.
}
