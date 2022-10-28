const paragrafos = document.querySelector('.paragrafos');
const ps = paragrafos.querySelectorAll('p');

const estilosBody = getComputedStyle(document.body);
const backGroundColorBody = estilosBody.backgroundColor;


for (let p of ps){
    p.style.color = '#fff';
    p.style.background = backGroundColorBody;
}
    