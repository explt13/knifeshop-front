export const burgerMenu = () =>{
    const TABLET = 991 / 16
    const mql = matchMedia(`(max-width: ${TABLET}rem)`)
    const handleBM = () => {
        document.documentElement.classList.add('menu-hidden');
        $('.icon-menu').on('click', function(event){
            document.documentElement.classList.remove('menu-hidden');
            $(this).toggleClass('active');
            if ($('html').hasClass("catalog-open")){
                $('html').removeClass("catalog-open");
            }
            if ($('html').hasClass("sub-menu-open")){
                $('html').removeClass("sub-menu-open");
                $('.menu-catalog__link').removeClass('_active-link');
                $('.sub-menu-catalog__block').removeClass('_active-sub-menu');
            }
            $('html').toggleClass('menu-open lock');   
        });
    }

    if (mql.matches){
        handleBM();
    }
    mql.addEventListener('change', function(){
        if (mql.matches){
            handleBM();
        } else {
            $('.icon-menu').off('click').removeClass('active');
            $('html').removeClass('menu-open lock catalog-open sub-menu-open');
        }
    })
}



export const dropDown = () => {  
    $('._trigger').on('click', function(event){
        event.stopPropagation();
        if (!($(this).hasClass('_active'))){
            $(this).addClass('_active');
            $(this).next().addClass('_active');
            $(this).next().css('max-height', $(this).next().get(0).scrollHeight + 20 + "px");
            console.log($(this).next().get(0));
            
        } else if ($(this).hasClass('_active')) {
            $(this).removeClass('_active')
            $(this).next().css('max-height', '0px');
            $(this).next().removeClass('_active');
        }
    })
    $(document).on('click', function(event){
        if ($(event.target).closest('.number__numbers').length > 0) {
            return;
        }
        $("._trigger").removeClass("_active");
        $("._content").removeClass("_active");
        $("._content").css('max-height', '0px');
    
        
    })
}


export const ibg = () => {
    $.each($('.ibg'), function(index, val) {
        if ($(this).find('img').length > 0){
            if ($('html').hasClass('webp')){ // for dev purpuses 1
                $(this).css('background-image', 'url("' + $(this).find('source').attr('srcset') + '")')
            } else {
                $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")')
            }
            $(this).find('img').hide()
        }
    })
}

const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
	initRatings();
}
// Основная функция
function initRatings() {
	let ratingActive, ratingValue;
	// "Бегаем" по всем рейтингам на странице
	for (let index = 0; index < ratings.length; index++) {
		const rating = ratings[index];
		initRating(rating);
	}

	// Инициализируем конкретный рейтинг
	function initRating(rating) {
		initRatingVars(rating);

		setRatingActiveWidth();

		if (rating.classList.contains('rating_set')) {
			setRating(rating);
		}
	}

	// Инициализайция переменных
	function initRatingVars(rating) {
		ratingActive = rating.querySelector('.rating__active');
		ratingValue = rating.querySelector('.rating__value');
	}
	// Изменяем ширину активных звезд
	function setRatingActiveWidth(index = ratingValue.innerHTML) {
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}
	// Возможность указать оценку 
	function setRating(rating) {
		const ratingItems = rating.querySelectorAll('.rating__item');
		for (let index = 0; index < ratingItems.length; index++) {
			const ratingItem = ratingItems[index];
			ratingItem.addEventListener("mouseenter", function (e) {
				// Обновление переменных
				initRatingVars(rating);
				// Обновление активных звезд
				setRatingActiveWidth(ratingItem.value);
			});
			ratingItem.addEventListener("mouseleave", function (e) {
				// Обновление активных звезд
				setRatingActiveWidth();
			});
			ratingItem.addEventListener("click", function (e) {
				// Обновление переменных
				initRatingVars(rating);

				if (rating.dataset.ajax) {
					// "Отправить" на сервер
					setRatingValue(ratingItem.value, rating);
				} else {
					// Отобразить указанную оцнку
					ratingValue.innerHTML = index + 1;
					setRatingActiveWidth();
				}
			});
		}
	}

	async function setRatingValue(value, rating) {
		if (!rating.classList.contains('rating_sending')) {
			rating.classList.add('rating_sending');

			// Отправика данных (value) на сервер
			let response = await fetch('', {
				method: 'POST',
				body: JSON.stringify({
					userRating: value
				}),
				headers: {
					'content-type': 'application/json'
				}

			});
			if (response.ok) {
				const result = await response.json();

				// Получаем новый рейтинг
				const newRating = result.newRating;

				// Вывод нового среднего результата
				ratingValue.innerHTML = newRating;

				// Обновление активных звезд
				setRatingActiveWidth();

				rating.classList.remove('rating_sending');
			} else {
				alert("Ошибка");

				rating.classList.remove('rating_sending');
			}
		}
	}
}