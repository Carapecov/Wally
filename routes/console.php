<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('wally:health', function (): void {
    $this->comment('Wally está pronto para receber requisições.');
})->purpose('Verifica a disponibilidade básica da aplicação.');
