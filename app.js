// ---------------------------------------------------------
// NIVEL 1 - Apenas transicionar os slides
// ---------------------------------------------------------

// Define uma variavel boolean para posterior uso no setInterval
let canScroll = true;

// Pega o slider (que receberá a transição de posição)
const slider = document.getElementById("slider");

// Define um counter (contador) (para contar o slide atual e aplicar o translate com base nele)
let counter = 0;

// Pega o conjunto de imagens contidas no slider
let imgs = document.querySelectorAll("#slider img")

// Define o max (valor maximo que o counter pode chegar [total de imagens no slider])
const max = imgs.length - 1; // A contagem começa em ZERO por isso o '- 1'
// Define o min (valor minimo para o slider [neste caso 0])
const min = 0;


// Pega o botão voltar
const prevBtn = document.getElementById("prevBtn");

// AddEventListener 'click' para pegar o evento de click no botão e chamar a função que VOLTA um slide
prevBtn.addEventListener("click", previousSlide)

function previousSlide() {
    // Evita que o setInterval mais a frente seja executado em conjunto com o click, para que não pule 2 slides de uma vez e sim tenha uma espera.
    canScroll = false;
    // Ao clicar... se counter for igual ao MIN, então o counter é atualizado para MAX
    if(counter === min) {
        counter = max;
    } else {
    // Caso contrario ele atualiza o counter subtraido um 
        counter--;
    }
    // Por fim realiza o calculo aplicando o translate ao slider
    slider.style.transform = `translateX(-${counter}00%)`;
    // Chama a função responsavel por verificar e habilitar os inputs responsaveis por indicar o slide atual
    checkIndicator();
}


// Pega o botão avançar
const nextBtn = document.getElementById("nextBtn");

// AddEventListener 'click' para pegar o evento de click no botão e chamar a função que AVANÇA um slide
nextBtn.addEventListener("click", nextSlide)

function nextSlide() {
    // Evita que o setInterval mais a frente seja executado em conjunto com o click, para que não pule 2 slides de uma vez e sim tenha uma espera.
    canScroll = false;
    // Ao clicar... se counter for igual ao MAX, então o counter é atualizado para o MIN        
    if(counter === max) {
        counter = min;
    } else {
    // Caso contrario ele atualiza o counter somado um 
        counter++;
    }
    // Por fim realiza o calculo aplicando o translate ao slider
    slider.style.transform = `translateX(-${counter}00%)`;
    // Chama a função responsavel por verificar e habilitar os inputs responsaveis por indicar o slide atual
    checkIndicator();
}


// --------------------------------------------------------------------------
// NIVEL 2 e 3 - Criação e indicação dinâmica dos indicadores para cada slide
// --------------------------------------------------------------------------

// Pega a div indicators
let indicators = document.getElementById("indicators");

// cria os elementos indicators (indicadores) [inputs do tipo checkbox]
// Define um id unico para cada indicator (indicador).
// Insere dentro da div indicators (indicadores) todos os indicators (indicatores) que foram criados dinamicamente
for (let i = 0; i < imgs.length; i++) {
    let indicator = document.createElement("input")
    indicator.type = "checkbox";
    indicator.title = "indicador do slide"
    indicator.className = "indicator";
    indicator.id = i;
    
    indicators.appendChild(indicator);
}

// Pega todos os inputs com a classe indicator (indicadores) criada no bloco anterior
let inpsIndicators = document.querySelectorAll(".indicator");

// Função responsavel por verificar e habilitar os inputs responsaveis por indicar o slide atual
function checkIndicator() {
    // Para cada inp (input) dentro do array de elementos inpsIndicators...
    inpsIndicators.forEach(inp => {
        // Se o counter for igual ao id de um indicators deixar esse indicator com o estado checked e os demais sem.
        // Senão desabilita o estado de 'checked'
        if(inp.id == counter) {
            inp.checked = true;
        } else {
            inp.checked = false;
        }

        // Ao clicar em qualquer indicator (inp - input)...
        inp.addEventListener("click", () => {
            // Evita que o setInterval mais a frente seja executado em conjunto com o click, para que não pule 2 slides de uma vez e sim tenha uma espera.
            canScroll = false;

            // Caso o input esteja com o estado 'checked'...
            if(inp.checked === true) {
                // Passa o valor do id do input como valor do counter
                counter = Number(inp.id);

                // Para cada input dentro do array inpsIndicators...
                for(var input of inpsIndicators){
                    // Desabilite o estado de 'checked' dele caso tenha
                    input.checked = false;

                    // E então caso o input tenha o id com o mesmo valor que counter hanilite seu estado para 'checked'
                    if(input.id == counter) {
                        input.checked = true;
                    }
                }

                // Por fim realiza o calculo aplicando o translate ao slider
                slider.style.transform = `translateX(-${counter}00%)`;
            }
        })
    })
}

// Chame a função para que ela seja executada a primeira vez e indique o primeiro slide como o atual
checkIndicator();

// --------------------------------------------------------------------------
// NIVEL FINAL (4) - Automatização do slider para a apresentação autonoma
// --------------------------------------------------------------------------

// Defina um intervalo para que...
setInterval(() => {
    // Caso a varivel canScroll tiver o valor de 'true' chame a função que avança os slides
    // Senão passe para a varivel o valor de true
    if(canScroll) {
        nextSlide();
    } else {
        canScroll = true;
    }
}, 2000)