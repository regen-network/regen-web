var isBuilder = $('html').hasClass('is-builder');

if (!isBuilder) {
    if(typeof window.initPopupBtnPlugin === 'undefined'){
        window.initPopupBtnPlugin = true;
        $('section.popup-btn-cards .card-wrapper').each(function(index, el) {
            $(this).addClass('popup-btn');
        });        
    }
}