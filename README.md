# Desafio 3 - Programa de Bolsas Frontend (React.js) 🚀

Este repositório contém a solução para o **Desafio 3** do Programa de Bolsas Frontend, focado em React.js. O objetivo do desafio é avaliar a capacidade de resolução de problemas, utilização de ferramentas e assertividade frente às demandas solicitadas.

**Status do Projeto**: ✅ **CONCLUÍDO** ✅

O projeto foi desenvolvido seguindo as especificações fornecidas, implementando autenticação, navegação, gerenciamento de estado e funcionalidades interativas.

## 📋 Descrição do Projeto

A aplicação é um e-commerce desenvolvido com **React e TypeScript**, adotando um design **mobile-first**. Inclui funcionalidades como autenticação de usuário, busca e filtragem de produtos, carrosséis dinâmicos, exibição detalhada de produtos, gerenciamento de carrinho de compras e mais.

## 🚀 Funcionalidades Implementadas

### 🔐 **Autenticação de Usuário** 
- Implementada com **Firebase**.
- Login com **Google**.
- Registros e login por e-mail/senha.

### 🛒 **Gerenciamento de Carrinho** 
- Implementado com **Context API**.
- Exibição da quantidade de itens no ícone do carrinho.
- Adição e remoção de produtos.
- Limpeza total do carrinho.
- Cálculo dinâmico do valor total dos produtos.

### 📌 **Páginas Principais**
- **Home**:
  - Redireciona o usuário para a busca ao clicar no campo de pesquisa.
  - Possui carrosséis dinâmicos para produtos.
- **Search**:
  - Campo de busca funcional para filtrar produtos por nome.
  - Exibição dos 3 produtos mais populares.
- **Explore Products**:
  - Exibição de todos os produtos.
  - Filtro acionado via **Bottom Sheet** (React Navigation).
  - Implementação de filtros funcionais baseados na API.
- **Product Detail**:
  - Exibição de detalhes completos do produto.
  - Renderização de **reviews**.
  - Carrossel de produtos relacionados.
  - Botão **"Add to Cart"** totalmente funcional.
- **Shopping Cart**:
  - Gerenciamento completo do carrinho.
  - Atualização de quantidades.
  - Remoção individual ou total dos itens.

## 🛠️ Tecnologias Utilizadas
- **React.js**
- **TypeScript**
- **Firebase Authentication**
- **React Navigation** (para navegação e Bottom Sheet)
- **Axios** (para requisições de API)
- **Run Mocky** (para API mockada)
- **React Multi Carousel** (para carrosséis dinâmicos)
- **React Modal Sheet** (para modais dinâmicos de filtros)

## 🔧 Requisitos Atendidos
✅ **Autenticação com Firebase e login com Google**.
✅ **Gerenciamento de estado do carrinho com Context API**.
✅ **Uso de uma API mockada com Run Mocky**.
✅ **Implementação completa das páginas principais**.
✅ **Design responsivo e mobile-first**.
✅ **Utilização de Bottom Sheet para filtros**.
✅ **Exibição de reviews de produtos**.

## 📂 Estrutura do Projeto
```
Desafio-3---React.js
│── node_modules/          # Dependências do projeto
│── public/                # Arquivos estáticos
│── src/
│   ├── assets/            # Recursos como imagens e ícones
│   ├── context/           # Context API (gerenciamento de estado)
│   ├── pages/             # Páginas principais (Home, Search, Cart, etc.)
│   ├── styles/            # Estilos globais
│   ├── firebase.ts        # Configuração do Firebase
│   ├── App.tsx            # Componente principal
│   ├── App.test.tsx       # Testes do App
│   ├── index.tsx          # Ponto de entrada do React
│   ├── index.css          # Estilos globais
│   ├── reportWebVitals.ts # Métricas de performance
│   ├── setupTests.ts      # Configuração de testes
│── .env                   # Variáveis de ambiente (chaves sensíveis)
│── .gitignore             # Arquivos ignorados pelo Git
│── package.json           # Dependências e scripts
│── package-lock.json      # Lockfile do npm
│── tsconfig.json          # Configuração do TypeScript
│── README.md              # Documentação
```

## 🚀 Como Rodar o Projeto
1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Crie um arquivo `.env` e adicione suas credenciais do Firebase.
4. Inicie o projeto:
   ```sh
   npm start
   ```

## 📌 Considerações Finais
O projeto atende aos requisitos do desafio, implementando autenticação, navegação, filtragem, carrosséis dinâmicos e gerenciamento completo de carrinho.

Sinta-se à vontade para contribuir ou sugerir melhorias! 🚀

