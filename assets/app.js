document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? 'Закрыть' : 'Меню';
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add('is-visible'));
  }

  const search = document.querySelector('[data-izi-search]');
  const searchNote = document.querySelector('[data-search-note]');
  const resultCards = [...document.querySelectorAll('[data-result]')];
  const runSearch = (rawValue) => {
    const query = rawValue.trim().toLowerCase();
    let shown = 0;
    resultCards.forEach((card) => {
      const searchable = `${card.textContent} ${card.dataset.searchTags || ''}`.toLowerCase();
      const matches = !query || searchable.includes(query);
      card.hidden = !matches;
      if (matches) shown += 1;
    });
    if (searchNote) {
      searchNote.textContent = query ? `По запросу «${rawValue.trim()}» найдено предложений: ${shown}.` : 'Показываем несколько примеров для старта.';
    }
  };
  if (search) {
    search.addEventListener('submit', (event) => {
      event.preventDefault();
      runSearch(search.querySelector('input').value);
      document.querySelector('#results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    search.querySelector('input')?.addEventListener('input', (event) => runSearch(event.target.value));
  }
  document.querySelectorAll('[data-search-value]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const value = event.currentTarget.dataset.searchValue;
      const input = search?.querySelector('input');
      if (input) input.value = value;
      runSearch(value);
      document.querySelector('#results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        button.click();
      }
    });
  });

  const pathButtons = document.querySelectorAll('[data-path]');
  const pathTitle = document.querySelector('[data-path-title]');
  const pathCopy = document.querySelector('[data-path-copy]');
  const pathAction = document.querySelector('[data-path-action]');
  const paths = {
    media: { title: 'Путь для медиа', copy: 'Публикации, журнал и поиск тем для совместной работы. Следующий шаг - выбрать формат материала.', action: 'Предложить материал' },
    aipi: { title: 'Путь AiPi', copy: 'Навигация по проекту, полезным инструментам и примерам. Следующий шаг - выбрать задачу.', action: 'Открыть каталог' },
    business: { title: 'Путь для бизнеса', copy: 'Партнёры, кампании и понятная заявка. Следующий шаг - описать, с кем нужно связаться.', action: 'Стать партнёром' },
    ai: { title: 'Путь к AI', copy: 'Подбор инструментов под задачу: текст, изображение, поиск или план. Следующий шаг - выбрать категорию.', action: 'Найти инструмент' }
  };
  pathButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const data = paths[button.dataset.path];
      if (!data) return;
      pathButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      if (pathTitle) pathTitle.textContent = data.title;
      if (pathCopy) pathCopy.textContent = data.copy;
      if (pathAction) pathAction.textContent = data.action;
    });
  });

  const steps = document.querySelectorAll('[data-step]');
  const stepNote = document.querySelector('[data-step-note]');
  const stepText = {
    idea: 'Опишите, для кого проект и какую задачу он решает. Это станет короткой основой для следующих действий.',
    build: 'Соберите имя, предложение, простую страницу и первый способ проверить интерес людей.',
    show: 'Покажите демо людям, соберите ответы и решите, что менять в следующем шаге.'
  };
  steps.forEach((step) => {
    step.addEventListener('click', () => {
      steps.forEach((item) => item.classList.toggle('is-active', item === step));
      if (stepNote && stepText[step.dataset.step]) stepNote.textContent = stepText[step.dataset.step];
    });
  });
});
