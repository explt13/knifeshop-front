export function header(){
    const mq = window.matchMedia("(max-width: 1260px)");
    let information;
    mq.addEventListener("change", () => {
        if (mq.matches){
            information = $('.information').detach();
            // $("<li class='call'></li>").insertBefore($('.menu-last'))
        }
        else{
            console.log(1);
            $(".row-body .container").append(information);
        } 
    })
}