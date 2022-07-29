let display = document.querySelector(".display");
let numeros = document.querySelectorAll('[id*=numero]');
let operadores = document.querySelectorAll('[id*=operador]');
let igual = document.querySelector('.igual');
let botaoLimparDisplay = document.querySelector(".limparDisplay");
let botaoLimparCalculo = document.querySelector('.limparCalculo');
let botaoBackspace = document.querySelector('.limparNumUnico');
let botaoVirgula = document.querySelector('.virgulaDecimal');

let novoNumero = true;
let operador;
let numeroAnterior;

// Se a operação é válida
const operacaoPendente = () => operador != undefined;

// Função para calcular os valores
const calcular = () => {
    // Condição para saber se tem alguma operação válida ativada  
    if (operacaoPendente()){
        // Transforma o valor do display em float e troca a virgula por um ponto
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        if (operador == '+'){
            atualizaDisplay(numeroAnterior + numeroAtual);
        }else if (operador == '-'){
            atualizaDisplay(numeroAnterior - numeroAtual);
        }else if (operador == '*'){
            atualizaDisplay(numeroAnterior * numeroAtual);
        }else if (operador == '/'){
            atualizaDisplay(numeroAnterior / numeroAtual);
        }
    }
}

// Função que atualiza o display
const atualizaDisplay = (texto) => {
    // Se for um novo numero coloca ele no display
    if (novoNumero){
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    }
    // Se não for um novo numero vai concatenando
    else{
        display.textContent += texto.toLocaleString('BR');
    }
}

// Função que determina o operador 
const selecionarOperador = (evento) => {
    // Esse evento recebido no parametro não foi passa do na chamada da função. Assim, o valor que está dentro de evento são informações que corresponde a o click do mouse, é algo padrão e são informações genericas.

    // Se verdadeiro os valores serão calculados de acordo com o operador escolhido. Isso faz com que mesmo que não seja apertado o igual, o calculo seja realizado por ter apertado em outra operação. Exemplo: (3 + 2) = 5 + 2 = 7
    console.log(evento)
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        console.log(evento.target.textContent)
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}

// Calcular expressão com o botão igual e zera o operador
const ativarIgual = () => {
    calcular();
    operador = undefined;
}

// Função para limpar o display com o botão de 'c' do teclado ou 'C' da calculadora
const limparDisplay = () => display.textContent = '';

// Limpar todo o calculo, zerando tudo com o botão 'delete' do teclado ou 'CE' da calculadora
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

// Limpa um numero por vez com o BackSpace do teclado ou da calculadora
const limpaNumUnico = () => {
    display.textContent = display.textContent.slice(0, -1);
}

// Função para ver encontrar uma virgula na sequencia de strings. Nesse caso, o indexOf retorna o indice que a virgula foi encontrada e se não existir virgula é retornado -1, com isso a logica foi fundamentada
const existeDecimal = () => display.textContent.indexOf(',') != -1;

// Verifica se a string é maior que zero, ou seja, se for maior quer dizer que existe algum valor nela
const existeValor = () => display.textContent.length > 0;

// Função para inserir a virgula do decimal, para isso é verificado se já existe um valor, se existir coloca a virgula, se não existir inicia com um zero e a virgula depois
const inserirDecimal = () => {
    if (!existeDecimal()){
        if (existeValor()){
            atualizaDisplay(',');
        }else{
            atualizaDisplay('0,');
        }
    }
}

// Mapeamento necessário para usar o teclado do pc. Um objeto contendo todas as funcionalidades da calculadora com seus respctivos botões associados
const mapaTeclado = {
    '0' : 'numero0',
    '1' : 'numero1',
    '2' : 'numero2',
    '3' : 'numero3',
    '4' : 'numero4',
    '5' : 'numero5',
    '6' : 'numero6',
    '7' : 'numero7',
    '8' : 'numero8',
    '9' : 'numero9',
    '/' : 'operadorDivisao',
    '*' : 'operadorMulti',
    '-' : 'operadorSub',
    '+' : 'operadorSoma', 
    'Enter': 'igual',
    'Backspace' : 'limparNumUnico',
    ',' : 'virgulaDecimal',
    'c' : 'limparDisplay',
    'Delete' : 'limparCalculo',
}

// Função para receber o valor do botão do teclado que foi digitado. Depois verificado se o botão que foi digitado está mapeado no objeto de funcionalidades. Por fim, se o botão clicado estiver mapeado ele terá o mesmo comportamento se tivesse sido clicado
const mapearTeclado = (evento) => {
    // o evento.key pega o valor do teclado que tá sendo passado no parametro da função e coloca em tecla
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
    if (teclaPermitida()){
        // pega o valor que veio do teclado e compara qual ID está associado a ele e da o comportamento de click
        document.getElementById(mapaTeclado[tecla]).click();
    }
}

// Captura os botões diretamente do objeto document e chama a função 
document.addEventListener('keydown', mapearTeclado);


// escuta as teclas dos numeros aplicando um forEach pra cada com o evento click passando o valor da tecla para a função atualizaDisplay
numeros.forEach(num => num.addEventListener('click', 
(evento) => {
    atualizaDisplay(evento.target.textContent);
}));

// escuta as teclas dos operadores aplicando um forEach pra cada com o evento click 
operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));

// escuta a tecla de igual e chama a função
igual.addEventListener('click', ativarIgual);

// escuta a tecla 'c' da calculadora e chama a função
botaoLimparDisplay.addEventListener('click', limparDisplay);

// escuta a tecla 'CE' da calculadora e chama a função
botaoLimparCalculo.addEventListener('click', limparCalculo);

// escuta a tecla '<<' da calculadora e chama a função
botaoBackspace.addEventListener('click', limpaNumUnico);

// escuta a tecla ',' da calculadora e chama a função
botaoVirgula.addEventListener('click', inserirDecimal);
