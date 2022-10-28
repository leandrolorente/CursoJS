/* fetch('pessoas.json')
  .then(resposta => resposta.json())
  .then(json => carregaElementosPagina(json));
 */

axios('pessoas.json')
  .then(resposta => carregaElementosPagina(resposta.data));

function carregaElementosPagina(json){
  const table = document.createElement('table');
  for(let pessoa of json){
    const tr = document.createElement('tr');

    for(let item in pessoa){
      let td = document.createElement('td');
      td.innerHTML = pessoa[item];
      tr.appendChild(td); 
    }
    

   /*  td = document.createElement('td');
    td.innerHTML = pessoa.idade;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = pessoa.salario;
    tr.appendChild(td); */

    table.appendChild(tr);
  }

  const resultado = document.querySelector('.resultado');
  resultado.appendChild(table);
}