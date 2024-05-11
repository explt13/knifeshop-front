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

// ._content{
//     max-height: 0;
//     overflow: hidden;
//     transition: max-height 0.2s ease-in-out;
// }

