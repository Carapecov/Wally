# Wally em Laravel

O runtime da aplicação agora segue a estrutura padrão do Laravel. O backend TypeScript anterior foi preservado em `legacy/typescript` apenas como histórico, fora do fluxo HTTP atual.

## Estrutura principal

- `app/Http/Controllers` — entrada HTTP e autenticação.
- `app/Http/Requests` — validação de login e registro.
- `app/Models` — modelo Eloquent de usuário.
- `database/migrations` — persistência dos usuários e respostas iniciais.
- `resources/views` — telas Blade.
- `routes/web.php` — rotas com middleware `web`, `guest` e `auth`.
- `public` — ponto de entrada e assets da tela.

## Segurança aplicada

- Senhas com hash bcrypt via `Hash::make`.
- Validação de senha com confirmação, 12 caracteres, letras, maiúsculas/minúsculas, números e símbolos.
- CSRF em formulários Blade.
- Regeneração da sessão após login/registro.
- Invalidação da sessão e regeneração do token CSRF no logout.
- Limite de 5 tentativas/minuto para login por e-mail + IP.
- Limite de 3 registros/minuto por IP.
- Form Requests e mensagens de erro sem expor senha ou dados sensíveis.

## Visualizar a primeira tela

1. Instale PHP 8.3+, Composer e a extensão SQLite.
2. Na raiz do projeto, execute:

```powershell
composer install
Copy-Item .env.example .env
New-Item -ItemType File -Force database\database.sqlite
php artisan key:generate
php artisan migrate
php artisan serve
```

3. Abra `http://127.0.0.1:8000`.

A tela inicial é a rota `/`. O fluxo de perguntas continua no navegador e os valores são enviados com o registro; o dashboard confirma o login bem-sucedido.
