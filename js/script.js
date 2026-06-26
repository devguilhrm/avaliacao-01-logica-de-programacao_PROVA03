import { calcularLote, formatarMoeda } from './calculo.js';

const Crud = document.querySelector('#form-imovel');
const Lista = document.querySelector('#div-lista-imoveis');
const btnLimpar = document.querySelector('#btn-limpar-lista');

const imoveisListados = [];
let editandoIndex = null;

const renderizarLista = () => {
    Lista.innerHTML = '';

    if (imoveisListados.length === 0) {
        Lista.innerHTML = '<div class="vazio">Nenhum imóvel cadastrado</div>';
        return;
    }

    for (let i = 0; i < imoveisListados.length; i += 1) {
        const lote = imoveisListados[i];
        const adicionalTexto = lote.percentualAdicional === 0
            ? 'Isento'
            : formatarMoeda(lote.valorAdicional);

        Lista.innerHTML += `
            <div class="imovel-item" data-index="${i}">
                <h3>${lote.descricao}</h3>
                <div class="imovel-info">
                    <p>Comprimento: ${lote.comprimento} m</p>
                    <p>Largura: ${lote.largura} m</p>
                    <p>Área: ${lote.area} m²</p>
                    <p>Valor do lote: ${formatarMoeda(lote.valorLote)}</p>
                    <p>Valor adicional: ${adicionalTexto}</p>
                </div>
                <div class="imovel-actions">
                    <button type="button" class="btn-editar" data-index="${i}">Editar</button>
                    <button type="button" class="btn-remover" data-index="${i}">Remover</button>
                </div>
            </div>
        `;
    }

    // Adicionar event listeners aos botões
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', editarImovel);
    });

    document.querySelectorAll('.btn-remover').forEach(btn => {
        btn.addEventListener('click', removerImovel);
    });
};

const editarImovel = (event) => {
    const index = parseInt(event.target.getAttribute('data-index'));
    const lote = imoveisListados[index];

    document.querySelector('#descricao').value = lote.descricao;
    document.querySelector('#comprimento').value = lote.comprimento;
    document.querySelector('#largura').value = lote.largura;

    editandoIndex = index;
    const btnEnviar = document.querySelector('.btn-enviar');
    btnEnviar.textContent = 'Atualizar Imóvel';

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const removerImovel = (event) => {
    const index = parseInt(event.target.getAttribute('data-index'));
    
    if (confirm(`Tem certeza que deseja remover "${imoveisListados[index].descricao}"?`)) {
        imoveisListados.splice(index, 1);
        renderizarLista();
    }
};

Crud.addEventListener('submit', (event) => {
    event.preventDefault();

    const dados = new FormData(Crud);
    const descricao = dados.get('descricao').trim();
    const comprimento = parseFloat(dados.get('comprimento'));
    const largura = parseFloat(dados.get('largura'));

    if (!descricao || Number.isNaN(comprimento) || Number.isNaN(largura) || comprimento <= 0 || largura <= 0) {
        alert('Preencha a descrição e informe valores válidos para comprimento e largura.');
        return;
    }

    const loteCalculado = calcularLote({ descricao, comprimento, largura });

    if (editandoIndex !== null) {
        imoveisListados[editandoIndex] = loteCalculado;
        editandoIndex = null;
        document.querySelector('.btn-enviar').textContent = 'Adicionar Imóvel';
    } else {
        imoveisListados.push(loteCalculado);
    }

    renderizarLista();
    Crud.reset();
});

btnLimpar.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar toda a lista?')) {
        imoveisListados.length = 0;
        editandoIndex = null;
        document.querySelector('.btn-enviar').textContent = 'Adicionar Imóvel';
        renderizarLista();
    }
});