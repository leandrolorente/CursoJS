/*const paragrafos = document.querySelector('.paragrafos');
const ps = paragrafos.querySelectorAll('p');

const estilosBody = getComputedStyle(document.body);
const backGroundColorBody = estilosBody.backgroundColor;


for (let p of ps){
    p.style.color = '#fff';
    p.style.background = backGroundColorBody;
}*/

function mostraSegundo(segundos){
    const data= new Date(segundos * 1000);
    return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone:'UTC'
    });
}

const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');
let segundos = 0;
let minutos  = 0;
let hora     = 0;
let timer;

function iniciaRelogio(){
        timer  = setInterval(function(e){
        segundos++;
        relogio.innerHTML = mostraSegundo(segundos); 
    },1000);
};



iniciar.addEventListener('click', function(e){

 /*   timer = setInterval(function(){
    hora     = hora == 24 ? 0 : (minutos == 59 ? (segundos == 59 ? hora + 1 : hora) : hora);
    minutos  = minutos == 59 ? (segundos == 59 ? 0 : minutos) : (segundos == 59 ? minutos + 1 : minutos);
    segundos = segundos == 59 ? 0 : segundos + 1;
     
    relogio.innerHTML = (hora < 10 ? '0'+hora.toString() : hora.toString()) + ':'+
                        (minutos < 10 ? '0'+ minutos.toString() : minutos.toString() )+ ':'+
                         (segundos <10 ? '0'+ segundos.toString() : segundos.toString());
},1000)});*/    
    if (relogio.style.color != 'red')
    {
        relogio.innerHTML ='00:00:00'; 
        segundos = 0; 
    }

    clearInterval(timer); 
    iniciaRelogio();    relogio.style.color = 'black';
});

pausar.addEventListener('click', function(e){
    clearInterval(timer); 
    relogio.style.color = 'red';
});

zerar.addEventListener('click', function(e){
    clearInterval(timer); 
    relogio.innerHTML ='00:00:00'; 
    relogio.style.color= 'black';
});
