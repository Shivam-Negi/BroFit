const section2 = document.querySelector('.section-2');

const section2Left1 = document.querySelector('.section-2-left-1');
const section2Left2 = document.querySelector('.section-2-left-2');
const section2Left3 = document.querySelector('.section-2-left-3');
const section2Left4 = document.querySelector('.section-2-left-4');

const section2RightImg = document.querySelector('.section-2-right-img');

const section2RightImage1 = "images/record.jpeg";
const section2RightImage2 = "images/inactive.jpeg";
const section2RightImage3 = "images/workout.jpeg";
const section2RightImage4 = "images/graph.jpeg";

//add scroll event

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const section2offsetTop = section2.offsetTop;
    const section2Height = section2.clientHeight;

    if ((scrollPosition > section2offsetTop) && (scrollPosition < section2Height + section2offsetTop)) {

        if (scrollPosition > section2offsetTop && scrollPosition < section2offsetTop + 300) {
            section2Left1.style.opacity = 1;
            section2Left1.style.transition = "opacity 1s ease-in-out";
        } else if (scrollPosition > section2offsetTop + innerHeight && scrollPosition < section2offsetTop + innerHeight + 300) {
            section2Left2.style.opacity = 1;
            section2Left2.style.transition = "opacity 1s ease-in-out";
        } else if (scrollPosition > section2offsetTop + innerHeight * 2 && scrollPosition < section2offsetTop + innerHeight * 2 + 300) {
            section2Left3.style.opacity = 1;
            section2Left3.style.transition = "opacity 1s ease-in-out";
        } else if (scrollPosition > section2offsetTop + innerHeight * 3 && scrollPosition < section2offsetTop + innerHeight * 3 + 300) {
            section2Left4.style.opacity = 1;
            section2Left4.style.transition = "opacity 1s ease-in-out";
        } else {
            section2Left1.style.opacity = 0;
            section2Left2.style.opacity = 0;
            section2Left3.style.opacity = 0;
            section2Left4.style.opacity = 0;
        }
        if (scrollPosition > section2offsetTop && scrollPosition < section2offsetTop + innerHeight) {
            section2RightImg.src = section2RightImage1;
            section2RightImg.style.transition = "opacity 1s ease-in-out";
        } else if (scrollPosition > section2offsetTop + innerHeight && scrollPosition < section2offsetTop + innerHeight * 2) {
            section2RightImg.src = section2RightImage2;
            section2RightImg.style.transition = "opacity 1s ease-in-out";
        } else if (scrollPosition > section2offsetTop + innerHeight * 2 && scrollPosition < section2offsetTop + innerHeight * 3) {
            section2RightImg.src = section2RightImage3;
            section2RightImg.style.transition = "opacity 1s ease-in-out";
        } else if (scrollPosition > section2offsetTop + innerHeight * 3 && scrollPosition < section2offsetTop + innerHeight * 4) {
            section2RightImg.src = section2RightImage4;
            section2RightImg.style.transition = "opacity 1s ease-in-out";
        } else {
            section2RightImg.src = section2RightImage1;
        }
    }
})


// mobile

const menuBtn = document.querySelector('.menu-btn')
const navlist = document.querySelector('.nav-list')

menuBtn.addEventListener('click', () => {
    navlist.classList.toggle('menu-btn')
})