import { formatarMoeda } from './calculo.js';

// seletores do dom 
const Lista = document.querySelector('#div-lista-imoveis');

// Renderiza a lista de imóveis cadastrados no sistema
export const renderizarLista = (imoveisListados, callbackEditar, callbackRemover) => {
    Lista.innerHTML = '';

    // Exibe mensagem quando não tem imoveis cadastrados 
    if (imoveisListados.length === 0) {
        Lista.innerHTML = '<div class="vazio">Nenhum imóvel cadastrado</div>';
        return;
    }

    for (let i = 0; i < imoveisListados.length; i += 1) {
        const lote = imoveisListados[i];
        let adicionalTexto;

        if (lote.percentualAdicional === 0) {
            adicionalTexto = 'Isento';
        } else {
            adicionalTexto = formatarMoeda(lote.valorAdicional);
        }

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

    // Adiciona listeners para captar evento dos botões de ação e assim, executar as funcoes de update and delete do CrUd
    adicionarListenersAcoes(callbackEditar, callbackRemover);
};

// Adiciona os eventos dos botões de upd. and del.
const adicionarListenersAcoes = (callbackEditar, callbackRemover) => {
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', callbackEditar);
    });

    document.querySelectorAll('.btn-remover').forEach(btn => {
        btn.addEventListener('click', callbackRemover);
    });
};
// Funções para manipular o forms
export const preencherFormulario = (lote) => {
    document.querySelector('#descricao').value = lote.descricao;
    document.querySelector('#comprimento').value = lote.comprimento;
    document.querySelector('#largura').value = lote.largura;
};

// Altera o texto do botão de envio
export const alterarTextoBotaoSubmit = (texto) => {
    document.querySelector('.btn-enviar').textContent = texto;
};

// Limpa o formulário e volta ao estado inicial
export const resetarFormulario = () => {
    document.querySelector('#form-imovel').reset();
    alterarTextoBotaoSubmit('Adicionar Imóvel');
};

// Faz o scroll voltar ao topo da página.
export const scrollParaTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
// Solicita confirmação ao usuário.
export const solicitarConfirmacao = (mensagem) => {
    return confirm(mensagem);
};