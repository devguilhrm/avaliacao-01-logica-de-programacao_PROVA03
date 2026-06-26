const VALOR_POR_METRO = 550;

export const calcularArea = (comprimento, largura) => {
    return Number((comprimento * largura).toFixed(2));
};

export const calcularValorDoLote = (area) => {
    return Number((area * VALOR_POR_METRO).toFixed(2));
};


export const calcularPercentualAdicional = (valorLote) => {
    if (valorLote <= 20000) {
        return 0;
    }
    if (valorLote <= 100000) {
        return 0.05;
    }
    if (valorLote <= 500000) {
        return 0.10;
    }
    if (valorLote <= 1000000) {
        return 0.15;
    }
    return 0.20;
};

export const calcularValorAdicional = (valorLote) => {
    const percentual = calcularPercentualAdicional(valorLote);
    return Number((valorLote * percentual).toFixed(2));
};

export const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};