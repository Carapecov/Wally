<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard — Wally</title>
    <link rel="stylesheet" href="{{ asset('css/onboarding.css') }}">
</head>
<body>
    <main style="min-height:100vh;display:grid;place-items:center;padding:32px;background:#E7DEC8;color:#242B1C;font-family:Arial,sans-serif;">
        <section style="max-width:640px;padding:48px;border-radius:24px;background:#FFFDF8;box-shadow:0 24px 70px rgba(36,43,28,.12);">
            <p style="margin:0 0 12px;color:#556B2F;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Wally</p>
            <h1 style="margin:0;font-size:38px;line-height:1.05;">Boas-vindas, {{ auth()->user()->name }}.</h1>
            <p style="margin:18px 0 28px;color:#6D735F;line-height:1.6;">Seu acesso está funcionando. O próximo passo é conectar suas ferramentas de IA.</p>
            <form method="post" action="{{ route('logout') }}">
                @csrf
                <button type="submit" style="min-height:48px;padding:0 20px;border:0;border-radius:10px;background:#556B2F;color:#F4EFE4;font-weight:700;cursor:pointer;">Sair</button>
            </form>
        </section>
    </main>
</body>
</html>
