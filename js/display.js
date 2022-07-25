let display = document.querySelector(".display");
let zero = document.querySelector(".zero");
let um = document.querySelector(".um");
let soma = document.querySelector(".soma");


soma.addEventListener("click", function(){
    
})



zero.addEventListener("click", function(){
    

    display.innerHTML = display.innerHTML + zero.innerHTML
    console.log(zero)

 


})

um.addEventListener("click", function(){
    display.innerHTML = display.innerHTML + um.innerHTML
    console.log(zero)
})



console.log(display)