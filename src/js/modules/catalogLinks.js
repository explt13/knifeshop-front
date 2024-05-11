export function catalogLinks(){
    let prevLink = null;
    $("[class='menu-catalog__link']").on("click", function(event){
        // event.stopPropagation();
        if (prevLink != null){
            prevLink.removeClass("_active");
        }
        $(this).addClass("_active");
        prevLink = $(this);
    })
}