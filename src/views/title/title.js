// audio player
const audio = new Audio("Ryuichi Sakamoto - Koko.mp3");
const playButton = document.getElementById("play_button");

playButton.addEventListener("click", function () {
  audio.play();
});

// scroll event

let div = document.querySelectorAll('.scroll_container')

let observer = new IntersectionObserver((e)=>{
  e.forEach((박스) =>{
    if(박스.isIntersecting){
    박스.target.style.opacity = 1;
    }else{
      박스.target.style.opacity = 0;
    }
  })
})

observer.observe(div[0])
observer.observe(div[1])
observer.observe(div[2])
observer.observe(div[3])


window.onload = function () {
};