/*audio*/
const audio = new Audio("1974 way home - Mondo Grosso.mp3");
const playButton = document.getElementsByClassName("play_button");

/*css*/
const chapter1 = document.querySelector(".chapter1");
const chapter2 = document.querySelector(".chapter2");
const chapter3 = document.querySelector(".chapter3");
const chapter4 = document.querySelector(".chapter4");
const mainPageBtn = document.querySelector(".mainPage_btn");
const main = document.querySelector(".main_container");
const logo = document.querySelector(".logo");


/*scroll*/
const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 140;
const currentFrame = index => (
  `bookScroll/11zon_${index}.jpeg`
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
  audio.play();
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  requestAnimationFrame(() => updateImage(frameIndex + 1))
  if(window.scrollY === maxScrollTop){
    canvas.style.opacity = 0;
    chapter1.style.opacity = 1;
    chapter2.style.opacity = 1;
    chapter3.style.opacity = 1;
    chapter4.style.opacity = 1;
    mainPageBtn.style.opacity = 1;
    main.style.opacity = 1;
    logo.style.opacity = 1;
  }else {
    canvas.style.opacity = 1;
    chapter1.style.opacity = 0;
    chapter2.style.opacity = 0;
    chapter3.style.opacity = 0;
    chapter4.style.opacity = 0;
    mainPageBtn.style.opacity = 0;
    main.style.opacity = 0;
    logo.style.opacity = 0;
  }
});

preloadImages()

