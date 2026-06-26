const Crud = document.querySelector("#form-imovel");
const Lista = document.querySelector("#div-lista-imoveis");

const imoveisListados = [];

Crud.addEventListener("submit", (funcao) => {
    funcao.preventDefault();

    const dados = new FormData(Crud);

    const imovel = {
        descricao: dados.get("descricao"),
        comprimento: parseFloat(dados.get("comprimento")),
        largura: parseFloat(dados.get("largura"))
    }

    Lista.innerHTML += `
        <div class="imovel-item">
            <h3>${imovel.descricao}</h3>
            <p>Comprimento: ${imovel.comprimento} m</p>
            <p>Largura: ${imovel.largura} m</p>
        </div>
    `;

})