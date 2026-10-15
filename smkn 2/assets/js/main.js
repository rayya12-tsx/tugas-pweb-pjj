/**
 * SMKN 2 Padang - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Counter Animation for Home Page
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length > 0) {
    const animateCounters = () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/[^0-9]/g, '');
        const increment = Math.ceil(target / 40);

        if (count < target) {
          counter.innerText = (count + increment > target ? target : count + increment).toLocaleString() + (counter.getAttribute('data-suffix') || '');
          setTimeout(animateCounters, 30);
        } else {
          counter.innerText = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
        }
      });
    };

    // Trigger when scrolled into view
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const statSection = document.querySelector('.stat-bar');
    if (statSection) {
      observer.observe(statSection);
    }
  }

  // 2. Department (Jurusan) Category Filter
  const jurusanFilters = document.querySelectorAll('.jurusan-filter-btn');
  const jurusanItems = document.querySelectorAll('.jurusan-item');

  if (jurusanFilters.length > 0 && jurusanItems.length > 0) {
    jurusanFilters.forEach(button => {
      button.addEventListener('click', function () {
        jurusanFilters.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        jurusanItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // 3. News (Berita) Search and Category Filter
  const newsCategoryBtns = document.querySelectorAll('.news-category-btn');
  const newsCards = document.querySelectorAll('.news-item-card');
  const newsSearchInput = document.getElementById('newsSearchInput');
  const noNewsFound = document.getElementById('noNewsAlert');

  function filterNews() {
    const activeCategoryBtn = document.querySelector('.news-category-btn.active');
    const selectedCategory = activeCategoryBtn ? activeCategoryBtn.getAttribute('data-category') : 'all';
    const searchQuery = newsSearchInput ? newsSearchInput.value.toLowerCase().trim() : '';

    let visibleCount = 0;

    newsCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const title = card.querySelector('.news-title')?.innerText.toLowerCase() || '';
      const snippet = card.querySelector('.news-snippet')?.innerText.toLowerCase() || '';

      const matchesCategory = (selectedCategory === 'all' || cardCategory === selectedCategory);
      const matchesSearch = title.includes(searchQuery) || snippet.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noNewsFound) {
      noNewsFound.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (newsCategoryBtns.length > 0) {
    newsCategoryBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        newsCategoryBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterNews();
      });
    });
  }

  if (newsSearchInput) {
    newsSearchInput.addEventListener('input', filterNews);
  }

  // 4. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
