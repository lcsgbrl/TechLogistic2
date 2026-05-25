# TechLogistic

# Robô Logístico Inteligente — Otimização de Rotas em Armazém

Sistema desenvolvido para calcular a menor rota possível para robôs realizarem coleta de produtos dentro de um armazém utilizando o algoritmo TSP (Problema do Caixeiro Viajante).

---

## Objetivo do Projeto

O objetivo deste projeto é otimizar o deslocamento de robôs logísticos em centros de distribuição, reduzindo:

- tempo de movimentação
- distância percorrida
- consumo de energia
- custo operacional

Além disso, o sistema busca aumentar a eficiência logística através da automação inteligente.

---

## Problema

Grandes empresas como Amazon, Mercado Livre e Shopee utilizam centros logísticos enormes para armazenar produtos.

O principal desafio é encontrar a menor rota possível para que um robô consiga coletar diversos produtos em diferentes setores do armazém sem desperdiçar tempo e recursos.

---

## Solução

Nosso sistema utiliza algoritmos de otimização de rotas para calcular automaticamente a melhor sequência de coleta de produtos dentro do armazém.

O sistema permite:

- adicionar produtos
- remover produtos
- visualizar setores
- calcular a menor rota
- exibir métricas de desempenho
- comparar algoritmos

---

## Como o Sistema Funciona

1. O usuário adiciona os produtos e seus respectivos setores.
2. O sistema identifica as posições dentro do armazém.
3. O algoritmo calcula a melhor rota possível.
4. O percurso é exibido visualmente.
5. O sistema mostra métricas da rota calculada.

---

## Exemplo de Funcionamento

Produtos para coleta:

- Produto A → Setor 2
- Produto B → Setor 7
- Produto C → Setor 4
- Produto D → Setor 1

Resultado calculado:

Base → Setor 1 → Setor 2 → Setor 4 → Setor 7 → Base

---

## Tecnologias Utilizadas

### Frontend
- HTML
- CSS
- JavaScript
- React

### Backend
- C#

### Algoritmos
- TSP (Problema do Caixeiro Viajante)
- Vizinho Mais Próximo
- Força Bruta

---

## Funcionalidades

- Cadastro de produtos
- Remoção de produtos
- Simulação do armazém
- Cálculo automático da rota
- Visualização do percurso
- Dashboard com métricas
- Comparação entre algoritmos
- Tratamento de erros

---

## Interface do Sistema

A interface simula um armazém inteligente contendo:

- mapa em grade
- setores numerados
- produtos destacados
- caminho desenhado
- robô em movimentação
- painel de métricas

---
