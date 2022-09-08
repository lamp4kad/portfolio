// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

//Скрытие/отображение бургера 
const burger = document.querySelector('.menu__icon');
const stikyBlock = document.querySelector('.menu__stiky-block');
const translate = document.querySelector('.main-block__translate');
burger.addEventListener('click', OpenMenu);

function OpenMenu() {
  //menu.classList.toggle('menu-open');
  //burger.classList.toggle('menu-open');
  translate.classList.toggle('menu-open');
  //stikyBlock.classList.toggle('menu-open');
  document.querySelector('body').classList.toggle('lock');
  document.querySelector('header').classList.toggle('menu-open');
}

//Отображение скрывающейся планки сверху 
window.addEventListener('scroll', function () {
  if (this.scrollY >= 50 && !stikyBlock.classList.contains('not-transparent')) {
    stikyBlock.classList.add('not-transparent');
  }
  else if (this.scrollY < 50 && stikyBlock.classList.contains('not-transparent')) {
    stikyBlock.classList.remove('not-transparent');
  }
})

//Переключение активности навбара
const menuLinks = Array.from(document.querySelectorAll('.menu__link'))
console.log(menuLinks)
menuLinks.reverse().forEach(menuLink => menuLink.addEventListener('click', ActivateBlock(menuLink, menuLinks)))

//Переключение активности перевода
const languages = document.querySelectorAll('.main-block__language');
const blockLanguages = document.querySelector('.main-block__translate');
languages.forEach(language => language.addEventListener('click', () => {
  ActivateBlock(language, languages)
}))

function ActivateBlock(ActiveBlock, BlockMassive) {
  BlockMassive.forEach(DellActive => DellClassAcive(DellActive))
  ActiveBlock.classList.add('active');
  if (document.querySelector('header').classList.contains('menu-open')) {
    OpenMenu();
  }
}

function DellClassAcive(DellActive) {
  if (DellActive.classList.contains('active')) {
    DellActive.classList.remove('active');
  }
}


//Получение элементов для скролла
menuLinks.forEach(link => {
  ScrollTo(link);
})

function ScrollTo(Element) {
  Element.addEventListener("click", function () {
    event.preventDefault();
    const some = document.querySelector(`.${Element.dataset.scroll}`);
    some.scrollIntoView();
  });
}

//window.addEventListener('scroll', () =>{
//  const some = document.querySelector('.skills')
//  console.log(some.offset());
//})

const targetBlocks = document.querySelectorAll('._target-block');
let visibleBlock = document.querySelector('.visible')
const menuLinksDataScrols = [];
menuLinks.forEach(menuLink => {
  menuLinksDataScrols.unshift(menuLink.dataset.scroll)
})

function BlockIsVisible(target) {
  let targetPosition = {
    top: window.screenY + target.getBoundingClientRect().top,
    bottom: window.screenY + target.getBoundingClientRect().bottom
  }
  let windowPosition = {
    top: window.screenY,
    bottom: window.screenY + document.documentElement.clientHeight,
    middle: window.screenY + document.documentElement.clientHeight / 2
  }
  if (targetPosition.top <= windowPosition.middle &&
    targetPosition.bottom >= windowPosition.middle && target!=visibleBlock) {
    visibleBlock=target
    target.classList.forEach(targetclass => {
      if (menuLinksDataScrols.indexOf(targetclass) != -1) {
        console.log('errgerge')
        ActivateBlock(document.querySelector(`[data-scroll=${targetclass}]`), menuLinks)
      }
    })
  }
}

window.addEventListener('scroll', () => {
  targetBlocks.forEach(targetBlock => {
    BlockIsVisible(targetBlock);
  })
})