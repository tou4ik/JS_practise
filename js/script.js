window.addEventListener('DOMContentLoaded', () => {
    const loadContent = async (url, callback) => {
        await fetch(url) // Promise
            .then(response => response.json())
            .then(json => createElement(json.goods));
            // callback для того чтобы выполнение скрипта происходило асинхронно!!
            // когда закончит работу fetch продолжит работать другой скрипт JS!!
            callback();
    }
    
    function createElement(arr){
        // Берем обертку куда мы будем помещать наши карточки
        const goodsWrapper = document.querySelector('.goods__wrapper');
        arr.forEach(function(item) {
            // Перебираем наш масив базы данных по каждому объекту
            let card = document.createElement('div');
            card.classList.add('goods__item');
            card.innerHTML = `
                <img class="goods__img" src="${item.url}" alt="phone">
                <div class="goods__colors">Доступно цветов: 4</div>
                <div class="goods__title">
                    ${item.title} 
                </div>
                <div class="goods__price">
                    <span>${item.price}</span> руб/шт
                </div>
                <button class="goods__btn">Добавить в корзину</button>
            `;
            goodsWrapper.appendChild(card);
        });
    }
    
    loadContent('/js/db.json', () => {
            // что JS начал работать только после того как построиться DOM-дерево!!!
            const cartWrapper = document.querySelector('.cart__wrapper'),
            cart = document.querySelector('.cart'),
            close = document.querySelector('.cart__close'),
            open = document.querySelector('#cart'),
            goodsBtn = document.querySelectorAll('.goods__btn'),
            products = document.querySelectorAll('.goods__item'),
            confirm = document.querySelector('.confirm'),
            badge = document.querySelector('.nav__badge'),
            totalCost = document.querySelector('.cart__total > span'),
            titles = document.querySelectorAll('.goods__title');
    
        function openCart(){
            cart.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
    
        function closeCart(){
            cart.style.display = 'none';
            document.body.style.overflow = '';
        };
    
        open.addEventListener('click', openCart);
        close.addEventListener('click', closeCart);
    
        goodsBtn.forEach(function(btn, i){ // перебираем все кнопки "добавить в корзину"
            btn.addEventListener('click', () => {
                let item = products[i].cloneNode(true) // копируем карточку товара
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div'), // делаем блок под крестик
                
                trigger.remove(); // удаляем кнопку "добавить в корзину"
                showConfirm(); // запускаем анимацию корзины!
                calcGoods(1); // запускаем подсчет товара в корзине!
                removeBtn.classList.add('goods__item-remove'); // добавляем кнопку
                                                            // удаление с крестиком
                removeBtn.innerHTML = '&times'; //сам крестик
                item.appendChild(removeBtn); //добавляем кнопку к карточке
                cartWrapper.appendChild(item); //добавляем карточку в корзину!!!
                // вызываем тут, когда уже все карточки ушли в корзину!
                calcTotal(); // подсчитываем сумму покупок в корзине!
                removeFromCart(); // удаление товара из корзины!
            });
        });
    // Домашнее задание: Запушить данный код на GitHub!!! И отправить ссылку на него
    // в комментариях в группе вк!!!
        function sliceTitle(){
            titles.forEach(function(item){
            // перебираем заголовки
                if(item.textContent.length < 70){
                    // символы в строке загаловка (описания товара)
                    return;
                } else {
                    // обрезаем загаловок и добавляем ... в конец
                    const str = item.textContent.slice(0, 71) + '...';
                    // 71 так как .slice не включает последнее число!!!
                    item.textContent = str;
                    // подставляем наш обрезанный текст обратно
                }
            });
        }
        sliceTitle();
    
        function showConfirm(){
            // добавляем корзину на страницу
            confirm.style.display = 'block';
            let counter = 100;
            const id = setInterval(frame, 10);
            // анимируем корзину при прокрутки страницы
            function frame(){
                if (counter == 10){
                    clearInterval(id);
                    confirm.style.display = 'none';
                    // останавливаем анимацию если счетчик равен 10
                } else {
                    counter--;
                    // сдвигаем корзину
                    confirm.style.transform = `translateY(-${counter}px)`;
                    confirm.style.opacity = '.' + counter;
                }
            }
        }
        
        function calcGoods(i){
            // подсчитываем кол-во товаров в корзине
            const items = cartWrapper.querySelectorAll('.goods__item');
            // добавляем число на баджик
            badge.textContent = items.length + i;
            // i добавляем для универсальности!
            let empty = cartWrapper.querySelector('.empty');
            if(items.length == 0){
                // проверяем, если баджик равен 0, то показываем блок "Ваша корзина пока пуста"
                empty.style.display = 'block';
            } else {
                // если баджик не равен 0, то убираем блок "Ваша корзина пока пуста"
                empty.style.display = 'none';
            }
        }
    
        function calcTotal(){
            // подсчитываем стоимость товаров в корзине
            const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
            let total = 0; // изначальная стоимость
            prices.forEach(function(item){
                // +item - преобразует строку в число!!!
                total += +item.textContent;
            });
            // записываем наше значение в корзину
            totalCost.textContent = total;
        }
    
        function removeFromCart(){
            // удаляем товар из корзины
            const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
            removeBtn.forEach(function(btn){
                // перебираем кнопки с крестиком в корзине
                btn.addEventListener('click', () => {
                    // удаляем родительский элемент иконки с крестиком
                    btn.parentElement.remove();
                    // пересчитываем количество товаров на корзине
                    calcGoods(0);
                    // пересчитываем сумму товаров в корзине
                    calcTotal();
                });
            });
        }
        // Домашнее задание: вернуть надписть что корзина пуста, когда все товары удалениы
        // из корзины с помощью креcтика!!!!
    });
});