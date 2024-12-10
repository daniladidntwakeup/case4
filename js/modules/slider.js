const track = $('.track'); //Прокручиваемый элемент
const progressLine = $('.progress-line'); //Линия, показывающая прогресс
const items = $('.item'); //Массив слайдов
const slideWitdh = $('.item').eq(1).outerWidth(true); //Ширина слайдов
let progressBarWidth = $('.progress-bar').outerWidth(); //Ширина прогресс бара
let pages = Math.ceil(items.length - 4); //Количество доступных перемещений до упора

let currentPage = 0; // Текущая страница
let progressLineWidth = progressBarWidth/(pages+1) // Ширина линии прогресса
let x1 = null; // Первая точка нажатия
let swipeRange = 0; //Пройденый путь свайпом
let swipePosition = 0; //Последняя остановка свайпа

//Адаптив для показа x слайдов
export function move(e){
	let windowWidth = e
	if (windowWidth < 767){
		pages =Math.ceil(items.length - 1);
	}else if (windowWidth < 900){
		pages = Math.ceil(items.length - 2);
	}else if (windowWidth < 1200) {
		pages = Math.ceil(items.length - 3);
	}else {
		pages = Math.ceil(items.length - 4);
	}
	progressBarWidth = $('.progress-bar').outerWidth();
	progressLineWidth = progressBarWidth/(pages+1) // Ширина линии прогресса
	setProgressLine()
}

//Отрисовка анимации
function renderSlide(page) {
	let position = slideWitdh * page; //Вычисление позиции страницы
	let positionProgressLine = progressLineWidth * page; //Вычисление позиции линии прогресса
	track.css({
		transform: `translateX(${position *= -1}px)`,
		transition: `1s`
	})
	progressLine.css({
		transform: `translateX(${positionProgressLine}px)`,
		transition: `1s`
	})
}

//Переключение слайдов
export function nextSlide() {
	currentPage	++;
	if (currentPage	> pages){
		currentPage	= 0;
	}
	renderSlide(currentPage);
}

export function prevSlide() {
	currentPage	--;
	if (currentPage	< 0){
		currentPage	= pages;
	}
	renderSlide(currentPage);
}

//Обработка свайпов
export function mousedown(event) {
	x1 = event.clientX;
	swipePosition = currentPage * slideWitdh;
}
export function mousemove(event){
	if(!x1){
		return 0;
	}
	let x2 = event.clientX;
	let difX = x1-x2;
	swipeRange=difX;
	track.css({
		transform: `translateX(-${swipePosition + difX}px)`,
		transition: `0s`
	})
}
export function mouseup(){
	x1 = null; // Перестаем отслеживать координаты
	let passedPages = swipeRange > 0 ? Math.ceil(swipeRange / slideWitdh) : Math.floor(swipeRange / slideWitdh); // Пройденные страницы, округляем
	currentPage += passedPages; //Вычисляем текущую страницу
	if (currentPage > pages) {
		currentPage = pages;	
	}
	if (currentPage < 0) {
		currentPage = 0;	
	}
	swipePosition += slideWitdh * currentPage;
	swipeRange = 0;
	renderSlide(currentPage);	
}

//постановка линии на старте
export function setProgressLine() {
	progressLine.css({
		width: `${progressLineWidth}px`
	})
}