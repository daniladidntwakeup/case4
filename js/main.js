//Установка высоты всех превью в зависимости от количества строк самого длинного заголовка
	let itemMaxHeight = 0;
   	$(".item .title").each(function(){
       let hBlock = parseInt($(this).height());
       if(hBlock > itemMaxHeight) {
          itemMaxHeight = hBlock;
       };
   	});
   	$(".item .title").height(itemMaxHeight);
   	setProgressLine()
import {prevSlide, nextSlide, setProgressLine, mousedown, mousemove, mouseup, move} from './modules/slider.js' //код слайдера
//Выполнение кода после прогрузки страницы
$(document).ready(function(){
	
	//Адаптив для слайдера
	move(window.innerWidth);
	window.addEventListener('resize', function(){
		move(window.innerWidth);
	})

	$('.btn-right').on('click',nextSlide)
	$('.btn-left').on('click',prevSlide)
	let timer = setInterval(nextSlide, 3000)
	$('.track').on('mousedown', mousedown)
	$('.track').on('mousemove', mousemove)
	$('.track').on('mouseup', mouseup)
})
