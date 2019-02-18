window.addEventListener('DOMContentLoaded', () => {
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
            let item = products[i].cloneNode(true), // копируем карточку товара
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div'), // делаем блок под крестик
                empty = cartWrapper.querySelector('.empty');
            
            trigger.remove(); // удаляем кнопку "добавить в корзину"
            removeBtn.classList.add('goods__item-remove'); // добавляем кнопку
                                                        // удаление с крестиком
            removeBtn.innerHTML = '&times'; //сам крестик
            item.appendChild(removeBtn); //добавляем кнопку к карточке
            cartWrapper.appendChild(item); //добавляем карточку в корзину!!!
            
            if(empty){
                empty.remove(); //удаляем блок с надписью "корзина пустая"
            }
        });
    });
});

// Домашнее задание: Запушить данный код на GitHub!!! И отправить ссылку на него
// в комментариях в группе вк!!!