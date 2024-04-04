const cep = document.getElementById("cep");
const btnCEP = document.getElementById("btn-cep");
const resultado = document.getElementById("box-endereco");

const validarCEP = (cep) => {
  //Realiza a validação do CEP

  if (cep.length === 0) {
    //Verifica se o valor passado é vazio
    console.log("Campo Vazio");
    return null;
  }

  cep = cep.replace(/\D+/g, ""); //Remove todos os caracteres que não seja numerico

  if (cep.length !== 8) {
    //Verifica a quantidade de caracteres
    console.log("CEP Invalido");
    return false;
  }

  return cep;
};

btnCEP.addEventListener("click", () => {
  const cepURL = validarCEP(cep.value);

  if (cepURL) {
    const url = `https://viacep.com.br/ws/${cepURL}/json/`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //Cep
        let cepData = data.cep;
        //Logradouro
        let logradouroData = data.logradouro;
        if (logradouroData === "") {
          logradouroData = "Não Identificado";
        }
        //Bairro
        let bairroData = data.bairro;
        if (bairroData === "") {
          bairroData = "Não Identificado";
        }
        //Localidade
        let cidadeData = data.localidade;
        //UF
        let ufData = data.uf;
        //DDD
        let dddData = data.ddd;

        resultado.innerHTML = `<section class="data-box">
        <h4>CEP:</h4>
        <span>${cepData}</span>
        </section>
        <section class="data-box">
            <h4>Logradouro:</h4>
            <span>${logradouroData}</span>
        </section>
        <section class="data-box">
            <h4>Bairro:</h4>
            <span>${bairroData}</span>
        </section>
        <section class="data-box">
            <h4>Cidade:</h4>
            <span>${cidadeData}</span>
        </section>
        <section class="data-box">
            <h4>Estado:</h4>
            <span>${ufData}</span>
        </section>
        <section class="data-box">
            <h4>DDD:</h4>
            <span>${dddData}</span>
        </section>`;
      })
      .catch((error) => {
        resultado.innerHTML = `<h3>Erro: ${error}</h3>`;
      });
  } else if (cepURL === null) {
    resultado.innerHTML = `<h3>O campo de entrada não pode ficar vazio!</h3>`;
  } else if (cepURL === false) {
    resultado.innerHTML = `<h3>Insira um CEP válido.</h3>`;
  }
});
