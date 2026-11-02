<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_and_is_authenticated(): void
    {
        $response = $this->post(route('register'), [
            'name' => 'Ana Wally',
            'email' => 'ana@example.com',
            'password' => 'UmaSenhaSegura!2026',
            'password_confirmation' => 'UmaSenhaSegura!2026',
            'professional_level' => 'Fundador(a) ou sócio(a)',
            'company_size' => '2 a 10 pessoas',
            'primary_goal' => 'Organizar a operação',
        ]);

        $response->assertRedirect(route('dashboard'));
        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'email' => 'ana@example.com',
            'professional_level' => 'Fundador(a) ou sócio(a)',
        ]);
        $this->assertTrue(Hash::check('UmaSenhaSegura!2026', User::firstOrFail()->password));
    }

    public function test_user_can_login_and_invalid_credentials_are_rejected(): void
    {
        $user = User::factory()->create(['password' => 'UmaSenhaSegura!2026']);

        $this->post(route('login'), [
            'email' => $user->email,
            'password' => 'senha-incorreta',
        ])->assertSessionHasErrors('email');

        $this->assertGuest();

        $this->post(route('login'), [
            'email' => $user->email,
            'password' => 'UmaSenhaSegura!2026',
        ])->assertRedirect(route('dashboard'));

        $this->assertAuthenticatedAs($user);
    }
}
