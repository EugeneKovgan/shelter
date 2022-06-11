import catalogPets from './catalogPets.js';
const mainButtons = document.querySelector('.main__buttons');
const privious_btn_1 = document.querySelector('.main__buttons__privious_1');
const privious_btn_2 = document.querySelector('.main__buttons__privious_2');
const current_btn = document.querySelector('.main__buttons__current');
const next_btn_1 = document.querySelector('.main__buttons__next_1');
const next_btn_2 = document.querySelector('.main__buttons__next_2');
const Carousel = document.querySelector('.main__items');
const popupWrapper = document.querySelector('.popup__wrapper');
const popupClose = document.querySelector('.popup__close');
let popupTitle = document.querySelector('.popup__title');
let popupSubtitle = document.querySelector('.popup__subtitle');
let popupInfo = document.querySelector('.popup__info');
let popupAge = document.querySelector('.popup__age');
let popupInoculations = document.querySelector('.popup__inoculations');
let popupDiseases = document.querySelector('.popup__diseases');
let popupParasites = document.querySelector('.popup__parasites');
let popupImgContainer = document.querySelector('.popup__img');
let popupImg = popupImgContainer.querySelector('.img');
const numberPages = [1, 2, 3, 4, 5, 6, 7, 8];
let currentPageNumber;

Carousel.addEventListener('click', activePopup);
Carousel.addEventListener('click', closePopup);

const catalogSlider = [];
for (let i in catalogPets) {
    catalogSlider.push(i);
}
let catalogRandomSlider = catalogSlider.sort(() => Math.random() - 0.5);
console.log(catalogRandomSlider);

function activePopup(e) {
    popupWrapper.classList.add('active');
    let targetItem = e.target.closest('.main__item');
    document.body.classList.add('lock');
    console.log(targetItem);
    let targetItemName = targetItem.querySelector('.main__item-title').innerHTML;
    console.log(targetItemName);
    console.log(catalogPets);
    for (let i of catalogPets) {
        console.log(popupTitle.innerHTML);
        if (targetItemName == i.name) {
            console.log('yep');
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

function counterPages(number) {
    console.log(number);
}
counterPages(numberPages);

// mainButtons.addEventListener('click', (e) => {
//     currentPageNumber = numberPages[0];
//     console.log(currentPageNumber);
//     e.target;
//     // console.log(e.target);
//     if (e.target.closest('.main__buttons__next_1')) {
//         console.log('.main__buttons__next_1');
//         currentPageNumber++;
//     }
//     console.log(currentPageNumber);
// });
