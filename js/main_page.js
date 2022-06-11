import catalogPets from './catalogPets.js';

const sliderLeft_btn = document.querySelector('.friends__slider__button-left');
const sliderRight_btn = document.querySelector('.friends__slider__button-right');
const Carousel = document.querySelector('.friends__slider__items');
const itemsLeft = Carousel.querySelector('.friends__slider__items__left');
const itemsCurrent = Carousel.querySelector('.friends__slider__items__current');
const itemsRight = Carousel.querySelector('.friends__slider__items__right');
const popupWrapper = document.querySelector('.popup__wrapper');
const popupClose = document.querySelector('.popup__close');
const popupContainer = document.querySelector('.popup__container');
let popupTitle = document.querySelector('.popup__title');
let popupSubtitle = document.querySelector('.popup__subtitle');
let popupInfo = document.querySelector('.popup__info');
let popupAge = document.querySelector('.popup__age');
let popupInoculations = document.querySelector('.popup__inoculations');
let popupDiseases = document.querySelector('.popup__diseases');
let popupParasites = document.querySelector('.popup__parasites');
let popupImgContainer = document.querySelector('.popup__img');
let popupImg = popupImgContainer.querySelector('.img');

sliderLeft_btn.addEventListener('click', sliderToLeft);
sliderRight_btn.addEventListener('click', sliderToRight);

function sliderToLeft() {
    Carousel.classList.add('transition-left');
    sliderLeft_btn.removeEventListener('click', sliderToLeft);
    sliderRight_btn.removeEventListener('click', sliderToRight);
    console.log('sliderToLeft');
}

function sliderToRight() {
    Carousel.classList.add('transition-right');
    sliderLeft_btn.removeEventListener('click', sliderToLeft);
    sliderRight_btn.removeEventListener('click', sliderToRight);
    console.log('sliderToRight');
}

const catalogSlider = [];
for (let i in catalogPets) {
    catalogSlider.push(i);
}
let catalogRandomSlider = catalogSlider.sort(() => Math.random() - 0.5);

let n;
if (document.documentElement.clientWidth > 1280) {
    n = 3;
} else if (document.documentElement.clientWidth <= 1279 && document.documentElement.clientWidth > 767) {
    n = 2;
} else {
    n = 1;
}

let indexLeft = catalogRandomSlider.slice(0, n);
let indexActive = catalogRandomSlider.slice(n, n + n);
let indexRight = catalogRandomSlider.slice(n + n, 3 * n);
n === 3 && indexRight.push(catalogRandomSlider[0]);

function createNewItems(index, items) {
    for (let i = 0; i < index.length; i++) {
        let item = document.createElement('div');
        item.classList.add('friends__slider__item');

        let itemImgBlock = document.createElement('div');
        itemImgBlock.classList.add('friends__slider__item-img');
        item.append(itemImgBlock);
        let itemImg = document.createElement('img');
        itemImg.src = catalogPets[index[i]].img;
        itemImg.alt = `pets-${catalogPets[index[i]].name.toLocaleLowerCase()}`;
        itemImgBlock.append(itemImg);

        let itemName = document.createElement('div');
        itemName.classList.add('friends__slider__item-name');
        itemName.innerHTML = catalogPets[index[i]].name;
        item.append(itemName);

        let itemButton = document.createElement('div');
        itemButton.classList.add('friends__slider__item-button');
        itemButton.innerHTML = 'Learn more';
        item.append(itemButton);
        items.append(item);
    }
}

Carousel.addEventListener('animationend', (AnimationEvent) => {
    console.log(AnimationEvent);

    if (AnimationEvent.animationName === 'move-left') {
        Carousel.classList.remove('transition-left');
        itemsCurrent.innerHTML = itemsRight.innerHTML;
        let catalogRandomSliderRight = [];
        catalogSlider.sort(() => Math.random() - 0.5);
        for (let i = 0; i < catalogSlider.length; i++) {
            if (indexRight.indexOf(catalogSlider[i]) == -1) {
                catalogRandomSliderRight.push(catalogSlider[i]);
            }
        }
        indexRight = catalogRandomSliderRight.slice(0, n);
        itemsRight.innerHTML = '';
        createNewItems(indexRight, itemsRight);
    } else {
        Carousel.classList.remove('transition-right');
        itemsCurrent.innerHTML = itemsLeft.innerHTML;
        let catalogRandomSliderLeft = [];
        catalogSlider.sort(() => Math.random() - 0.5);
        for (let i = 0; i < catalogSlider.length; i++) {
            if (indexLeft.indexOf(catalogSlider[i]) == -1) {
                catalogRandomSliderLeft.push(catalogSlider[i]);
            }
        }
        indexLeft = catalogRandomSliderLeft.slice(0, n);
        itemsLeft.innerHTML = '';
        createNewItems(indexLeft, itemsLeft);
    }
    console.log(catalogSlider);
    sliderRight_btn.addEventListener('click', sliderToRight);
    sliderLeft_btn.addEventListener('click', sliderToLeft);
});

Carousel.addEventListener('click', activePopup);
Carousel.addEventListener('click', closePopup);

function activePopup(e) {
    popupWrapper.classList.add('active');
    let targetItem = e.target.closest('.friends__slider__item');
    document.body.classList.add('lock');
    let targetItemName = targetItem.querySelector('.friends__slider__item-name').innerHTML;
    console.log(targetItemName);
    console.log(catalogPets);
    for (let i of catalogPets) {
        console.log(popupTitle.innerHTML);
        if (targetItemName == i.name) {
            popupTitle.innerHTML = i.name;
            popupSubtitle.innerHTML = i.type;
            popupInfo.innerHTML = i.description;
            popupAge.innerHTML += i.age;
            popupInoculations.innerHTML = i.inoculations;
            popupDiseases.innerHTML = i.diseases;
            popupParasites.innerHTML = i.parasites;
            popupImg.src = i.img;
        }
    }
}
function closePopup() {
    popupWrapper.addEventListener('click', (e) => {
        console.log(e.target);
        if (!e.target.closest('.popup__container')) {
            popupWrapper.classList.remove('active');
            document.body.classList.remove('lock');
        }
    });
}

createNewItems(indexActive, itemsCurrent);
createNewItems(indexLeft, itemsLeft);
createNewItems(indexRight, itemsRight);
