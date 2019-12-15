/**
 * usage example 
 */
$(function(){
	let objMoreOrCallapse = new moreOrCallapse('#buttonContent', '.content-hide');
	$('#buttonContent').on('click', function(){
		objMoreOrCallapse.handler();
	});
});


class moreOrCallapse {			
	constructor(buttonSelector, contentItemSelector, nameCollapseButton = 'Свернуть') {
		//элемент кнопка
		this.elButton = document.querySelector(buttonSelector);
		//резервирование изначального имени кноки
		this.buttonNameFirst = this.elButton.innerHTML;
		//хранение имени кнопки для сворачивания контента
		this.nameCollapseButton = nameCollapseButton;
		//создание массива контентов
		this.arItemsOfContent = document.querySelectorAll(contentItemSelector);
		//сразу скрываем контент начиная со второго селектора
		this.arItemsOfContent.forEach(function(item, i) {//i - index of array items
			if (i>=1) {
				item.classList.toggle('d-n', true);//.d-n in css
			}
		});
	}//constructor()
	
	handler() {		
		if (this.elButton.classList.contains('collapse')) {
			//скрыть весь контент
			this.arItemsOfContent.forEach(function(item, i) {//i - index of array items
				if (i>=1) {//кроме первого
					item.classList.toggle('d-n', true);
				}
			});
			// this.elButton.classList.toggle('close', false);
			this.elButton.removeAttribute('class');//убрать класс с свойством collapse
			this.elButton.innerHTML = this.buttonNameFirst;
		} else {
			for ( let i = 0; i<this.arItemsOfContent.length; i++ ) {				
				//showing more
				if (this.arItemsOfContent[i].classList.contains('d-n')) {
					this.arItemsOfContent[i].classList.toggle('d-n', false);
					//если следующего элемента нет
					if ( typeof(this.arItemsOfContent[++i]) === 'undefined' ) {
						//переименовать кнопку
						this.elButton.innerHTML = this.nameCollapseButton;
						this.elButton.classList.toggle('collapse', true);
					}
					break;//при первом открытии контента перестать открывать следующие
				}
			}				
		}
	}//openNextContent() 
}//class moreOrCallapse