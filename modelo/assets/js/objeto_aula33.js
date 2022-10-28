const pessoa = {
    nome: 'Lele',
    sobrenome: 'Lorente',
    idade: 24,
    endereco: {
       rua: 'Gentil de Oliveira',
       numero: 260 
    }
}


pessoa.nome = 'Alterado'
const {nome, sobrenome ,endereco: {rua, numero} } = pessoa;///desestruturação [a,b,c] = [1,2,3] 3 variaveis, a ,b e c, recebendo os respectivos valroes
console.log(nome, sobrenome,rua, numero);