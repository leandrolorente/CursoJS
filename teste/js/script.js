
/*import sqlite3 from "sqlite3";
    

 sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database('banco.db');


  
db.each("SELECT COALESCE(max(ven_cod),0)+1 AS cod FROM vendas;", function(err,row){
 
    let label = document.getElementById('lb_numped');
    this.cliente.ven_cod =  row.cod;
    label.innerText = "Numero do Pedido: "+ row.cod.toString();  
});*/
//var db = window.openDatabase("banco","2.0","banco",2*1024*1024);


/*
db.transaction(function(tx){
    tx.executeSql("CREATE TABLE  vendas"+
                  "  ("+
                  "  ven_cod integer NOT NULL,"+
                  "  ven_cliente varchar(150),"+
                  "  CONSTRAINT pkvendas PRIMARY KEY (ven_cod)"+
                  "  );"
    );
    tx.executeSql("CREATE TABLE  produtos_vendas"+
                  "  ("+
                  "  prod_cod integer NOT NULL,"+
                  " prod_nome varchar(150),"+
                  "   prod_qtde integer,"+
                  "   prod_vl_unit integer,"+
                  "   prod_vl_total integer,"+
                  "  CONSTRAINT pkprodvendas PRIMARY KEY (prod_cod, ven_cod),"+
                  "  CONSTRAINT fk_vendas FOREIGN KEY (ven_cod) REFERENCES vendas (ven_cod)"+
                  "  );"
    );
  
});*/




class Produto{

    constructor(){
        this.cliente = new Cliente();
        this.nomeProduto = '';
        this.quantidade = 0;
        this.valor_unit = 0;
        this.valor_total = 0.0;
        this.arrayProdutos = [];
    }

    //metodos
    adicionar(){
      let produto =  this.lerDados();
      if(this.validaCampos(produto)){
        this.adicionarElemento(produto);
        
      }
      this.listaTabela();
    }

    listaTabela(){
        let tbody = document.getElementById('tbody'); 
        tbody.innerText = ''; 
        for(let i = 0; i< this.arrayProdutos.length; i++ ){
            let tr = tbody.insertRow();

            let td_nome = tr.insertCell();
            let td_qtde = tr.insertCell();
            let td_vlunit = tr.insertCell();
            let td_vltotal = tr.insertCell();
          //  let td_acoes = tr.insertCell();

            td_nome.innerText = this.arrayProdutos[i].nomeProduto;
            td_qtde.innerText = this.arrayProdutos[i].quantidade;
            td_vlunit.innerText = this.arrayProdutos[i].valor_unit;
            td_vltotal.innerText = this.arrayProdutos[i].valor_total;

          //  let imgEdit = document.createElement('img');
          //  imgEdit.src= 'img/editar.png';

          //  td_acoes.appendChild(imgEdit);

           // let imgDeletar = document.createElement('img');
          //  imgDeletar.src= 'img/excluir.png';
           // td_acoes.appendChild(imgDeletar);
        }
    }

    adicionarElemento(produto){
        this.arrayProdutos.push(produto);
        this.id ++;
    }

    lerDados(){
        let produto = {}
        let v1 = document.getElementById('vlunit').value
        let v2 = document.getElementById('qtd').value;

        produto.nomeProduto = document.getElementById('nome').value;
        produto.quantidade = document.getElementById('qtd').value;
        produto.valor_unit = document.getElementById('vlunit').value;
        produto.valor_total = v1*v2;
        produto.id = document.getElementById('cliente').value;



        return produto;
    }

    validaCampos(produto){
        let msg = '';
        if(produto.nomeProduto===''){
            msg +=' - Informe o Nome do Produto \n';
        }
  
        if(produto.valor_unit===''){
            msg +=' - Informe o Valor Unit. do Produto \n';
        }

        if (msg !=''){
            alert(msg);
            return false;
        }

        return true;
    }

    cancelar(){
        window.location.href ='inicio.html';
    }

    salvar(){
        let nome_cliente = document.getElementById('cliente').value;
        db.transaction(function(tx) {            
            tx.executeSql("insert into vendas (ven_cod,ven_cliente) values(?, ?)",[this.cliente.ven_cod,nome_cliente]);
           });
        for(let i = 0; i< this.arrayProdutos.length; i++ ){
            let nome;
            let qtde ;
            let vlunit;
            let vltotal;
          //  let td_acoes = tr.insertCell();
            nome_cliente = document.getElementById('cliente').value;
            nome = this.arrayProdutos[i].nomeProduto;
            qtde = this.arrayProdutos[i].quantidade;
            vlunit = this.arrayProdutos[i].valor_unit;
            vltotal = this.arrayProdutos[i].valor_total; 

            db.transaction(function(armazenar){
            
             armazenar.executeSql("insert into produtos_vendas (prod_cod,prod_nome,prod_qtde,prod_vl_unit,prod_vl_total) "+
             "values(?, ?, ?, ?, ?);",[i,nome,qtde,vlunit,vltotal],null);
            });
        }
        const tarefasJSON = JSON.stringify(this.arrayProdutos);
        localStorage.setItem(nome_cliente,tarefasJSON);
        window.location.href ='inicio.html';

    }

    valorTotalItem(){
        let lbl_total_item = document.getElementById('lbl_total_item');
        let vl1, vl2;
        vl1 = document.getElementById('qtd').value;
        vl2 = document.getElementById('vlunit').value;
        vl1 = vl1*vl2;
        lbl_total_item.innerText = 'Valor Total do Item R$ ' + vl1;
    }

     somarValores(){
        const values = Object.keys(localStorage);
            let soma = 0;
            for (let p of values){
                let lista = JSON.parse(localStorage.getItem(p));
                for (let vl of lista ){
                    soma += vl.valor_total ;
                }
                
            }
            let lb = document.getElementById('total_vendas');
            lb.innerText = 'Total de Vendas : ' +soma.toString();
        }
}

class Cliente {
    constructor(){
        this.nome_cliente = 0;
        this.ven_cod = '';
    } 

    
}



//db.get();
//var sqlite3 = require("sqlite3").verbose();
//let db = new sqlite3.Database('banco.db');
var produto = new Produto();
var cliente = new Cliente();



var db = openDatabase("banco","2.0","mybankl",2*1024*1024);
db.transaction(function(tx){
    tx.executeSql("CREATE TABLE  vendas"+
                  "  ("+
                  "  ven_cod integer NOT NULL,"+
                  "  ven_cliente varchar(150),"+
                  "  CONSTRAINT pkvendas PRIMARY KEY (ven_cod)"+
                  "  );"
    );
    tx.executeSql("CREATE TABLE  produtos_vendas"+
                  "  ("+
                  "  prod_cod integer NOT NULL,"+
                  " prod_nome varchar(150),"+
                  "   prod_qtde integer,"+
                  "   prod_vl_unit integer,"+
                  "   prod_vl_total integer,"+
                  "  CONSTRAINT pkprodvendas PRIMARY KEY (prod_cod, ven_cod),"+
                  "  CONSTRAINT fk_vendas FOREIGN KEY (ven_cod) REFERENCES vendas (ven_cod)"+
                  "  );"
    );
  
});

db.transaction(function(tx){
        
    tx.executeSql("SELECT COALESCE(max(ven_cod),0)+1 AS cod FROM vendas; ",[],function(tx,resultado){
        let rows = resultado.rows.item(i);
        let label = document.getElementById('lb_numped');
        this.cliente.ven_cod =  rows.cod;
        label.innerText = "Numero do Pedido: "+ rows.cod.toString(); 

    },[],null,function (t, e) { console.error(e); });
    });

    
 
    
     

   // somarValores();



