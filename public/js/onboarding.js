(function () {
    const root = document.querySelector('[data-onboarding]');
    if (!root) return;

    const questions = Array.from(root.querySelectorAll('[data-question]'));
    const questionView = root.querySelector('[data-view="questions"]');
    const authView = root.querySelector('[data-view="auth"]');
    const nextButton = root.querySelector('[data-next]');
    const backButton = root.querySelector('[data-back]');
    const skipButton = root.querySelector('[data-skip]');
    const progress = root.querySelector('[data-progress]');
    const stepLabel = root.querySelector('[data-step-label]');
    const answers = {};
    const answerFields = ['professional_level', 'company_size', 'primary_goal'];
    let currentStep = 0;

    function updateStep() {
        questions.forEach((question, index) => {
            const active = index === currentStep;
            question.hidden = !active;
            question.classList.toggle('is-active', active);
        });

        const selected = questions[currentStep].querySelector('.option-card.is-selected');
        nextButton.disabled = !selected;
        backButton.hidden = currentStep === 0;
        stepLabel.textContent = `Passo ${currentStep + 1} de ${questions.length}`;
        progress.style.width = `${((currentStep + 1) / questions.length) * 100}%`;
    }

    function showAuth() {
        questionView.hidden = true;
        authView.hidden = false;
        skipButton.textContent = 'Voltar às perguntas';
        stepLabel.textContent = 'Seu cadastro';
        progress.style.width = '100%';
        authView.querySelector('#email').focus();
    }

    function showQuestions() {
        authView.hidden = true;
        questionView.hidden = false;
        skipButton.textContent = 'Já tenho uma conta';
        updateStep();
    }

    root.querySelectorAll('.option-card').forEach((option) => {
        option.addEventListener('click', () => {
            const group = option.closest('.option-list');
            group.querySelectorAll('.option-card').forEach((item) => {
                item.classList.remove('is-selected');
                item.setAttribute('aria-checked', 'false');
            });
            option.classList.add('is-selected');
            option.setAttribute('aria-checked', 'true');
            answers[currentStep] = option.dataset.option;
            const answerField = root.querySelector(`#${answerFields[currentStep]}`);
            if (answerField) answerField.value = option.dataset.option;
            nextButton.disabled = false;
        });
    });

    nextButton.addEventListener('click', () => {
        if (currentStep < questions.length - 1) {
            currentStep += 1;
            updateStep();
        } else {
            showAuth();
        }
    });

    backButton.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep -= 1;
            updateStep();
        }
    });

    skipButton.addEventListener('click', () => {
        if (questionView.hidden) showQuestions();
        else showAuth();
    });

    root.querySelectorAll('[data-auth-tab]').forEach((tab) => {
        tab.addEventListener('click', () => {
            const register = tab.dataset.authTab === 'register';
            root.querySelectorAll('[data-auth-tab]').forEach((item) => {
                const active = item === tab;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-selected', String(active));
            });
            root.querySelectorAll('.register-only').forEach((field) => { field.hidden = !register; });
            root.querySelector('#name').required = register;
            root.querySelector('#password_confirmation').required = register;
            root.querySelector('#password').autocomplete = register ? 'new-password' : 'current-password';
            root.querySelector('#password_confirmation').autocomplete = register ? 'new-password' : 'current-password';
            root.querySelector('[data-auth-form]').action = register ? root.querySelector('[data-auth-form]').dataset.registerAction : root.querySelector('[data-auth-form]').dataset.loginAction;
            root.querySelector('[data-submit]').innerHTML = register ? 'Criar minha conta <span aria-hidden="true">→</span>' : 'Entrar na minha conta <span aria-hidden="true">→</span>';
        });
    });

    root.querySelector('[data-password-toggle]').addEventListener('click', (event) => {
        const button = event.currentTarget;
        const input = root.querySelector('#password');
        const visible = input.type === 'text';
        input.type = visible ? 'password' : 'text';
        button.textContent = visible ? 'Mostrar' : 'Ocultar';
        button.setAttribute('aria-label', visible ? 'Mostrar senha' : 'Ocultar senha');
    });

    if (root.dataset.startAuth === 'true') {
        showAuth();
        if (root.dataset.startRegister === 'true') {
            root.querySelector('[data-auth-tab="register"]').click();
        }
    } else {
        updateStep();
    }
}());
