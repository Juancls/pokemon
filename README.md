# Pokémon Guesser - Game Boy Edition 🎮

Um mini jogo web focado em adivinhação baseado no clássico meme "Who's That Pokémon?". O projeto foi desenvolvido em React utilizando a PokéAPI e estilizado com a identidade visual retrô e nostálgica dos consoles Game Boy clássicos.

## 🚀 Funcionalidades

- **Sorteio Aleatório:** O algoritmo seleciona dinamicamente IDs de uma base de 1025 Pokémons diretamente da API.
- **Sistema de Vidas e Pontuação:** O jogador inicia com 3 vidas e acumula pontos a cada acerto. O jogo exibe uma tela de fim de jogo caso as vidas acabem.
- **Áudio Nostálgico:** Efeito sonoro clássico "Who's That Pokémon?" disparado ao iniciar o jogo e ao avançar as rodadas.
- **Estética Retrô:** Interface baseada em pixel art, fontes bitmap e paleta de cores monocromática inspirada no display do Game Boy.
- **Responsividade:** Layout adaptado para rodar perfeitamente em dispositivos móveis e desktops.

## 🛠️ Tecnologias e Bibliotecas

O projeto foi construído utilizando o ecossistema moderno do React com foco em performance e estilização limpa:

- **React (v18+)** - Biblioteca base para construção da interface e gerenciamento de estados (`useState`, `useEffect`).
- **PokeAPI** - API pública e gratuita utilizada para consumir os dados e artes oficiais dos Pokémons.
- **Google Fonts (Press Start 2P)** - Fonte utilizada via CSS para aplicar o estilo pixelado de videogame antigo.
- **HTML5 Audio API** - Recurso nativo do JavaScript utilizado para manipulação e reprodução dos efeitos sonoros.

## 📦 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente em sua máquina:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/pokemon-guesser.git](https://github.com/seu-usuario/pokemon-guesser.git)