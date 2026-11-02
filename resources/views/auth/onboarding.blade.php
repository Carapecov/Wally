<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Cadastro personalizado do Wally">
    <title>Comece com o Wally</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/onboarding.css') }}">
</head>
<body>
    <main class="onboarding-shell" data-onboarding data-start-auth="{{ $errors->any() ? 'true' : 'false' }}" data-start-register="{{ old('name') !== null || old('password_confirmation') !== null ? 'true' : 'false' }}">
        <section class="welcome-panel" aria-labelledby="brand-title">
            <div class="brand-lockup">
                <span class="brand-mark" aria-hidden="true">W</span>
                <span class="brand-name">wally</span>
            </div>

            <div class="welcome-copy">
                <p class="eyebrow">Seu próximo passo começa aqui</p>
                <h1 id="brand-title">Um jeito mais simples de fazer sua empresa avançar.</h1>
                <p>Conte um pouco sobre você. O Wally prepara uma jornada mais útil para o momento do seu negócio.</p>
            </div>

            <div class="mascot-frame">
                <img src="{{ asset('images/Wally.jpeg') }}" alt="Wally, mascote leão em verde oliva" class="mascot-image">
                <span class="mascot-note">Vamos juntos.</span>
            </div>

            <p class="welcome-footer">Feito para quem constrói com intenção.</p>
        </section>

        <section class="form-panel" aria-live="polite">
            <div class="form-panel-inner">
                <div class="topbar">
                    <span class="step-label" data-step-label>Passo 1 de 3</span>
                    <button type="button" class="text-button" data-skip>Já tenho uma conta</button>
                </div>

                <div class="progress-track" aria-label="Progresso do cadastro">
                    <span class="progress-value" data-progress></span>
                </div>

                <div class="flow-view is-active" data-view="questions">
                    <div class="question-step is-active" data-question="0">
                        <span class="question-kicker">Para começar</span>
                        <h2>Qual é o seu nível profissional?</h2>
                        <p class="question-help">Assim ajustamos a linguagem e as sugestões para o seu momento.</p>
                        <div class="option-list" role="radiogroup" aria-label="Nível profissional">
                            <button type="button" class="option-card" data-option="Fundador(a) ou sócio(a)" role="radio" aria-checked="false">
                                <span class="option-icon" aria-hidden="true">✦</span>
                                <span><strong>Fundador(a) ou sócio(a)</strong><small>Construo e tomo decisões pelo negócio.</small></span>
                                <span class="radio-dot" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="option-card" data-option="Liderança ou gestão" role="radio" aria-checked="false">
                                <span class="option-icon" aria-hidden="true">↗</span>
                                <span><strong>Liderança ou gestão</strong><small>Coordeno pessoas, projetos ou resultados.</small></span>
                                <span class="radio-dot" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="option-card" data-option="Profissional ou especialista" role="radio" aria-checked="false">
                                <span class="option-icon" aria-hidden="true">◎</span>
                                <span><strong>Profissional ou especialista</strong><small>Faço parte de uma equipe e entrego valor.</small></span>
                                <span class="radio-dot" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>

                    <div class="question-step" data-question="1" hidden>
                        <span class="question-kicker">Sobre sua empresa</span>
                        <h2>Quantas pessoas fazem parte do time?</h2>
                        <p class="question-help">Não precisa ser exato. Uma estimativa já nos ajuda bastante.</p>
                        <div class="option-list" role="radiogroup" aria-label="Tamanho da empresa">
                            <button type="button" class="option-card" data-option="Só eu" role="radio" aria-checked="false"><span class="option-icon" aria-hidden="true">01</span><span><strong>Só eu</strong><small>Estou começando ou trabalho por conta própria.</small></span><span class="radio-dot" aria-hidden="true"></span></button>
                            <button type="button" class="option-card" data-option="2 a 10 pessoas" role="radio" aria-checked="false"><span class="option-icon" aria-hidden="true">02</span><span><strong>2 a 10 pessoas</strong><small>Um time pequeno, próximo e em movimento.</small></span><span class="radio-dot" aria-hidden="true"></span></button>
                            <button type="button" class="option-card" data-option="11 a 50 pessoas" role="radio" aria-checked="false"><span class="option-icon" aria-hidden="true">11</span><span><strong>11 a 50 pessoas</strong><small>Uma operação que já está ganhando escala.</small></span><span class="radio-dot" aria-hidden="true"></span></button>
                            <button type="button" class="option-card" data-option="Mais de 50 pessoas" role="radio" aria-checked="false"><span class="option-icon" aria-hidden="true">50+</span><span><strong>Mais de 50 pessoas</strong><small>Uma estrutura com várias frentes e desafios.</small></span><span class="radio-dot" aria-hidden="true"></span></button>
                        </div>
                    </div>

                    <div class="question-step" data-question="2" hidden>
                        <span class="question-kicker">Uma última pergunta</span>
                        <h2>O que você quer destravar primeiro?</h2>
                        <p class="question-help">Escolha o tema que mais combina com seu próximo passo.</p>
                        <div class="option-list" role="radiogroup" aria-label="Objetivo principal">
                            <button type="button" class="option-card" data-option="Organizar a operação" role="radio" aria-checked="false"><span class="option-icon" aria-hidden="true">≡</span><span><strong>Organizar a operação</strong><small>Clareza para executar melhor todos os dias.</small></span><span class="radio-dot" aria-hidden="true"></span></button>
                            <button type="button" class="option-card" data-option="Crescer com estratégia" role="radio" aria-checked="false"><span class="option-icon" aria-hidden="true">↗</span><span><strong>Crescer com estratégia</strong><small>Decisões melhores para ganhar consistência.</small></span><span class="radio-dot" aria-hidden="true"></span></button>
                            <button type="button" class="option-card" data-option="Conectar o time" role="radio" aria-checked="false"><span class="option-icon" aria-hidden="true">◌</span><span><strong>Conectar o time</strong><small>Alinhar pessoas em torno do que importa.</small></span><span class="radio-dot" aria-hidden="true"></span></button>
                        </div>
                    </div>

                    <div class="action-row">
                        <button type="button" class="back-button" data-back hidden>Voltar</button>
                        <button type="button" class="primary-button" data-next disabled>Continuar <span aria-hidden="true">→</span></button>
                    </div>
                </div>

                <div class="flow-view" data-view="auth" hidden>
                    <div class="auth-heading">
                        <span class="question-kicker">Tudo pronto para você</span>
                        <h2>Entre ou crie sua conta</h2>
                        <p>Salve seu progresso e continue de onde parou.</p>
                    </div>

                    @if ($errors->any())
                        <div class="auth-alert" role="alert">
                            <strong>Confira os dados informados.</strong>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <div class="auth-tabs" role="tablist" aria-label="Autenticação">
                        <button type="button" class="auth-tab is-active" data-auth-tab="login" role="tab" aria-selected="true">Entrar</button>
                        <button type="button" class="auth-tab" data-auth-tab="register" role="tab" aria-selected="false">Criar conta</button>
                    </div>

                    <form class="auth-form" action="{{ route('login') }}" method="post" data-auth-form data-login-action="{{ route('login') }}" data-register-action="{{ route('register') }}">
                        @csrf
                        <div class="field-group register-only" hidden>
                            <label for="name">Como podemos chamar você?</label>
                            <input id="name" name="name" type="text" placeholder="Seu nome" autocomplete="name" value="{{ old('name') }}">
                        </div>
                        <input type="hidden" name="professional_level" id="professional_level" value="{{ old('professional_level') }}">
                        <input type="hidden" name="company_size" id="company_size" value="{{ old('company_size') }}">
                        <input type="hidden" name="primary_goal" id="primary_goal" value="{{ old('primary_goal') }}">
                        <div class="field-group">
                            <label for="email">E-mail</label>
                            <input id="email" name="email" type="email" placeholder="voce@empresa.com" autocomplete="email" value="{{ old('email') }}" required>
                        </div>
                        <div class="field-group">
                            <label for="password">Senha</label>
                            <div class="password-field">
                                <input id="password" name="password" type="password" placeholder="Mínimo de 12 caracteres" autocomplete="current-password" required>
                                <button type="button" class="password-toggle" data-password-toggle aria-label="Mostrar senha">Mostrar</button>
                            </div>
                        </div>
                        <div class="field-group register-only" hidden>
                            <label for="password_confirmation">Confirme sua senha</label>
                            <input id="password_confirmation" name="password_confirmation" type="password" placeholder="Repita sua senha" autocomplete="new-password">
                        </div>
                        <div class="form-meta">
                            <label class="check-label"><input type="checkbox" name="remember"><span>Manter conectado</span></label>
                            <a href="#" class="subtle-link">Esqueci minha senha</a>
                        </div>
                        <button type="submit" class="primary-button auth-submit" data-submit>Entrar na minha conta <span aria-hidden="true">→</span></button>
                    </form>

                    <p class="privacy-note"><span aria-hidden="true">⌁</span> Seus dados ficam protegidos e não serão compartilhados.</p>
                </div>
            </div>
        </section>
    </main>
    <script src="{{ asset('js/onboarding.js') }}" defer></script>
</body>
</html>
