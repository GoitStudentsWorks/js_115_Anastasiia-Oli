const projects = [
  {
    title: 'Wallet webservice',
    technologies: ['React', 'JavaScript', 'Node JS', 'Git'],
    img1x: '/img/my-projects/projects-5@1x.webp',
    img2x: '/img/my-projects/projects-5@2x.webp',
    link: 'https://github.com/Anastasiia-Oli/fur-seal-team-js',
  },
  {
    title: 'Green harvest webservice',
    technologies: ['React', 'JavaScript', 'Node JS', 'Git'],
    img1x: '/img/my-projects/projects-4@1x.webp',
    img2x: '/img/my-projects/projects-4@2x.webp',
    link: 'https://github.com/Anastasiia-Oli/fur-seal-team-js',
  },
  {
    title: 'English Exellence webservice',
    technologies: ['React', 'JavaScript', 'Node JS', 'Git'],
    img1x: '/img/my-projects/projects-9@1x.webp',
    img2x: '/img/my-projects/projects-9@2x.webp',
    link: 'https://github.com/Anastasiia-Oli/fur-seal-team-js',
  },
  {
    title: 'starlight studio landing page',
    technologies: ['React', 'JavaScript', 'Node JS', 'Git'],
    img1x: '/img/my-projects/projects-10@1x.webp',
    img2x: '/img/my-projects/projects-10@2x.webp',
    link: 'https://github.com/Anastasiia-Oli/fur-seal-team-js',
  },
  {
    title: 'mimino website',
    technologies: ['React', 'JavaScript', 'Node JS', 'Git'],
    img1x: '/img/my-projects/projects-2@1x.webp',
    img2x: '/img/my-projects/projects-2@2x.webp',
    link: 'https://github.com/Anastasiia-Oli/fur-seal-team-js',
  },
  {
    title: 'power pulse webservice ',
    technologies: ['React', 'JavaScript', 'Node JS', 'Git'],
    img1x: '/img/my-projects/projects-1@1x.webp',
    img2x: '/img/my-projects/projects-1@2x.webp',
    link: 'https://github.com/Anastasiia-Oli/fur-seal-team-js',
  },
  {
    title: 'vyshyvanka vibes Landing Page',
    technologies: ['React', 'JavaScript', 'Node JS', 'Git'],
    img1x: '/img/my-projects/projects-3@1x.webp',
    img2x: '/img/my-projects/projects-3@2x.webp',
    link: 'https://github.com/Anastasiia-Oli/fur-seal-team-js',
  },
  {
    title: 'chego jewelry website',
    technologies: ['React', 'JavaScript', 'Node JS', 'Git'],
    img1x: '/img/my-projects/projects-6@1x.webp',
    img2x: '/img/my-projects/projects-6@2x.webp',
    link: 'https://github.com/Anastasiia-Oli/fur-seal-team-js',
  },
  {
    title: 'fruitbox online store',
    technologies: ['React', 'JavaScript', 'Node JS', 'Git'],
    img1x: '/img/my-projects/projects-8@1x.webp',
    img2x: '/img/my-projects/projects-8@2x.webp',
    link: 'https://github.com/Anastasiia-Oli/fur-seal-team-js',
  },
  {
    title: 'energy flow webservice',
    technologies: ['React', 'JavaScript', 'Node JS', 'Git'],
    img1x: '/img/my-projects/projects-7@1x.webp',
    img2x: '/img/my-projects/projects-7@2x.webp',
    link: 'https://github.com/Anastasiia-Oli/fur-seal-team-js',
  },
];

const projectList = document.getElementById('my-projects-list');
const loadMoreBtn = document.getElementById('my-projects-load-more-btn');

let currentIndex = 0;
const batchSize = 3;

function renderProjects(items) {
  const markup = items
    .map(
      ({ title, technologies, img1x, img2x, link }) => `
      <li class="my-projects-card">
        <img class="my-projects-card-img"
          src="${img1x}" 
          srcset="${img1x} 1x, ${img2x} 2x"
          alt="${title}" 
          width="1008" 
          height="580" 
          loading="lazy" 
        />
        <div class="my-projects-info">
          <p class="my-projects-tech">${technologies.join(', ')}</p>
         <div class="my-projects-title-wrapper">
          <h3 class="my-projects-card-title">${title}</h3>
          <a class="my-projects-link" href="${link}" target="_blank" rel="noopener noreferrer">
            Visit
          <svg class="my-projects-link-icon" width="20" height="20" aria-hidden="true">
          <use href="/src/img/sprite.svg#arrow-diagonal"></use>
          </svg>
          </a>
          </div>
        </div>
      </li>`
    )
    .join('');

  projectList.insertAdjacentHTML('beforeend', markup);
}

function handleLoadMore() {
  const nextBatch = projects.slice(currentIndex, currentIndex + batchSize);
  renderProjects(nextBatch);
  currentIndex += batchSize;

  if (currentIndex >= projects.length) {
    loadMoreBtn.style.display = 'none';
  }

  const cards = document.querySelectorAll('.my-projects-card');
  if (cards.length > batchSize) {
    const lastNewCard = cards[currentIndex - batchSize];
    if (lastNewCard) {
      const cardHeight = lastNewCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight,
        behavior: 'smooth',
      });
    }
  }
}

loadMoreBtn.addEventListener('click', handleLoadMore);

// Початковий рендер
handleLoadMore();
