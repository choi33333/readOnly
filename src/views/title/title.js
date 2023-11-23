// // audio player
// const audio = new Audio("Ryuichi Sakamoto - Koko.mp3");
// const playButton = document.getElementById("play_button");

// playButton.addEventListener("click", function () {
//   audio.play();
// });

// // scroll event

// let div = document.querySelectorAll('.scroll_container')

// let observer = new IntersectionObserver((e)=>{
//   e.forEach((박스) =>{
//     if(박스.isIntersecting){
//     박스.target.style.opacity = 1;
//     }else{
//       박스.target.style.opacity = 0;
//     }
//   })
// })

// observer.observe(div[0])
// observer.observe(div[1])
// observer.observe(div[2])
// observer.observe(div[3])


// window.onload = function () {
// };

const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 148;
const currentFrame = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=1158;
canvas.height=770;
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()