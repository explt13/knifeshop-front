
document.addEventListener("click", documentActions);


const menuBlocks = document.querySelectorAll(".sub-menu-catalog__block");
if (menuBlocks.length > 0){
    menuBlocks.forEach(block => {
        const categoryQty = block.querySelectorAll(".sub-menu-catalog__category").length;
        block.classList.add(`sub-menu-catalog__block_${categoryQty}`);
    })
}


function documentActions(e){
    const targetElement = e.target;
    if (targetElement.closest('[data-parent]')){
        e.preventDefault();
        const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
        const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
        if (subMenu){
            const activeTab = document.querySelector('._active-link');
            const activeMenu = document.querySelector('._active-sub-menu');
            if (activeTab && activeTab != targetElement){
                activeTab.classList.remove('_active-link');
                activeMenu.classList.remove('_active-sub-menu');
            }
            targetElement.classList.toggle('_active-link');
            subMenu.classList.toggle('_active-sub-menu');
            
        } else {
            console.log("Oops, there is no such submenu :(");
        }
    }
}