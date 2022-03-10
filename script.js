var stages = [...document.querySelectorAll('[form-stage]')];
var currentOffset = 0;

var nextbtns = [...document.querySelectorAll('[form-next]')];
nextbtns.map(next => {
    next.addEventListener('click', () => {
        var isFormValid = true;
        var inputs = [...next.closest('[form-stage]').querySelectorAll('input')];
        inputs.map(input => {
            if(!input.reportValidity()) isFormValid = false;
        })

        if(!isFormValid) return;

        currentOffset -= (next.closest('[form-stage]').offsetWidth+50);
        render();
    })
})

var prevbtns = [...document.querySelectorAll('[form-prev]')];
prevbtns.map(prev => {
    prev.addEventListener('click', () => {
        if(currentOffset + prev.closest('[form-stage]').offsetWidth+50 > 0) return;
        currentOffset += (prev.closest('[form-stage]').offsetWidth+50);
        render();
    })
})

var render = () => {
    var height = 0, width=0;
    stages.map((stage,i)=>{
        stage.style.transform = `translate(${width+currentOffset}px, ${-height}px)`
        height += stage.offsetHeight;
        width += (50+stage.offsetWidth);
    })
}

render();
stages.map(stage => {
    stage.style.transition = 'all 0.5s ease-in-out';
});