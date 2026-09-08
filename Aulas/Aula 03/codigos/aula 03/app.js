// Simula o tempo que a internet levaria para responder (em milissegundos)
const simularRede = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms)

const elCarregando = document.getElementById("carregando");
const elErro = document.getElementById("erro");
const corpoTabela = document.getElementById("corpo-tabela");
 
async function consultarEncomendas() {
  elCarregando.style.display = "block";
  elErro.style.display = "none";
  try {
  // Simula uma resposta rápida de rede
  await simularRede(300);
  // 1. Tenta pegar os dados salvos na memória do navegador
  let dadosSalvos = localStorage.getItem("banco_encomendas");
  // 2. Se a memória estiver vazia, busca do encomendas.json pela primeira vez
  if (!dadosSalvos) {
  const resposta = await fetch("encomendas.json");
  if (!resposta.ok) throw new Error("Erro ao ler o arquivo JSON");
  const dadosIniciais = await resposta.json();
  // Guarda no navegador em formato de texto JSON
  localStorage.setItem("banco_encomendas", JSON.stringify(dadosIniciais));
  dadosSalvos = JSON.stringify(dadosIniciais);
  }
  // 3. Converte o texto JSON de volta para uma lista de objetos no JavaScript
  const encomendas = JSON.parse(dadosSalvos);
  renderizarTabela(encomendas);
  } catch (erro) {
  elErro.textContent = "Não foi possível carregar as encomendas.";
  elErro.style.display = "block";
  console.error(erro);
  } finally {
  elCarregando.style.display = "none";
  }
  }
  
function renderizarTabela(encomendas) {
  corpoTabela.innerHTML = ""; // limpa a tabela antes de preencher de novo
 
  const fragmento = document.createDocumentFragment();
 
  encomendas.forEach(encomenda => {
    const linha = document.createElement("tr");
 
    const tdCodigo = document.createElement("td");
    tdCodigo.textContent = encomenda.codigoRastreio;
 
    const tdCliente = document.createElement("td");
    tdCliente.textContent = encomenda.clienteNome;
 
    const tdStatus = document.createElement("td");
    tdStatus.textContent = encomenda.status;
 
    linha.appendChild(tdCodigo);
    linha.appendChild(tdCliente);
    linha.appendChild(tdStatus);
 
    fragmento.appendChild(linha);
  });
 
  corpoTabela.appendChild(fragmento);
}
 
consultarEncomendas(); // chama a função assim que a página carrega
