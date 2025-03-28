document.addEventListener('DOMContentLoaded', () => {
  // Detectar preferência de tema do sistema do usuário
  function detectPreferredTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('light-theme', !prefersDarkScheme);
  }
  detectPreferredTheme();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectPreferredTheme);

  // Inicialização da funcionalidade de busca de projetos
  const projectSearchInput = document.getElementById('project-search');
  if (projectSearchInput) {
    projectSearchInput.addEventListener('input', filterProjects);
  }

  function filterProjects() {
    const searchTerm = projectSearchInput.value.toLowerCase().trim();
    const projectCards = document.querySelectorAll('#project-section .project-card');
    
    projectCards.forEach(card => {
      const title = card.querySelector('.project-title').textContent.toLowerCase();
      const description = card.querySelector('.project-description').textContent.toLowerCase();
      
      card.style.display = (title.includes(searchTerm) || description.includes(searchTerm)) ? 'flex' : 'none';
    });
  }

  // Configuração das animações iniciais
  const animateElement = (selector, delay = 0) => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.animation = `fadeInUp 0.8s ease-out ${delay}s backwards`;
    }
  };

  animateElement('.title');
  animateElement('.subtitle', 0.2);
  animateElement('.social-icons', 0.4);
  animateElement('.nav-links', 0.6);
  
  const activeSection = document.querySelector('.content-section.active');
  if (activeSection) {
    activeSection.style.animation = 'fadeInRight 0.25s ease-out 0.8s forwards';
  }

  // Seletores de elementos da interface
  const navLinks = document.querySelectorAll('.nav-link');
  const contentSections = document.querySelectorAll('.content-section');
  const currentPath = window.location.pathname;
  
  // Mapeamento de rotas para seções
  const routeMap = {
    '/': 'home-section',
    '/project': 'project-section',
    '/contact': 'contact-section',
  };
  
  // Exibe a seção correspondente com animação
  function showSection(sectionId) {
    // Esconde seções ativas com fade out
    contentSections.forEach(section => {
      if (section.classList.contains('active')) {
        section.style.opacity = '0';
        section.style.transform = 'translateX(10px)';
        
        setTimeout(() => section.classList.remove('active'), 100);
      }
    });
    
    // Mostra a seção alvo com fade in
    setTimeout(() => {
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    }, 120);
  }
  
  // Manipula cliques nos links de navegação
  function handleNavClick(e) {
    e.preventDefault();
    
    navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');
    
    const href = this.getAttribute('href');
    const sectionId = routeMap[href] || 'home-section';
    
    showSection(sectionId);
  }
  
  // Configura event listeners para navegação
  navLinks.forEach(link => link.addEventListener('click', handleNavClick));
  
  // Inicializa a seção baseada na URL atual
  setTimeout(() => {
    const sectionId = routeMap[currentPath] || 'home-section';
    
    // Verifica se estamos na página inicial (rota raiz ou '/')
    const isHomePage = currentPath === '/' || currentPath === '' || currentPath === '/index.html';
    
    navLinks.forEach(link => {
      // Marca o link como ativo se corresponder à rota atual ou se for o link 'Início' e estivermos na página inicial
      const linkHref = link.getAttribute('href');
      const shouldBeActive = linkHref === currentPath || (isHomePage && linkHref === '/');
      link.classList.toggle('active', shouldBeActive);
    });
    
    showSection(sectionId);
  }, 100);
});