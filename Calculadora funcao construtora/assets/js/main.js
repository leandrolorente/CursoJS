function Calculadora() {
    this.display = document.querySelector('.display');

    this.inicia = () => {
        this.capturaCliques();
        this.capturaEnter();
    };

    this.capturaCliques = () => {
        document.addEventListener('click', e => {
            const el = e.target;

            if (el.classList.contains('btn-num'))
                this.addNumDisplay(el);
            if (el.classList.contains('btn-clear'))
                this.clearDisplay();
            if (el.classList.contains('btn-del'))
                this.delNumDisplay();
            if (el.classList.contains('btn-eq'))
                this.realizaConta(el);
        });
    };

    this.addNumDisplay = el => {
        this.display.value += el.innerText; //arrow function
        this.display.focus();
    }
    this.clearDisplay = () => this.display.value = '';

    this.delNumDisplay = () => this.display.value = this.display.value.slice(0, -1);

    this.realizaConta = () => {
        try{
            let conta = eval(this.display.value);

            if(!conta){
                alert('Conta invalida');
                return;
            }
            this.display.value = conta;
        }catch(e){       
        alert('Conta invalida');
        return;}
    };

    this.capturaEnter = () =>{
        document.addEventListener('keypress',e =>{
            if(e.keyCode === 13)this.realizaConta();
            
            
        });
    };
}


const calculadora = new Calculadora();
calculadora.inicia();