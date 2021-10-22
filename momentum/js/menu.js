const menu = document.getElementById('menu');
const menuToggle = document.getElementById('settings-toggle');

const openMenu = () => {
  menuToggle.setAttribute('aria-expanded', true);
  menu.classList.remove('menu-closed');
  menu.classList.add('menu-opened');
};

const closeMenu = () => {
  menuToggle.setAttribute('aria-expanded', false);
  menu.classList.add('menu-closed');
  menu.classList.remove('menu-opened');
}

document.addEventListener('click', (e) => { 
  if (e.target.closest('.settings')) return;
  if (menuToggle !== e.target) closeMenu();
});

menuToggle.addEventListener('click', () => { 
  menu.classList.contains('menu-closed') 
    ? openMenu()
    : closeMenu();
});