import React, { useState, useEffect } from 'react';

const MAX_POKEMON = 1025;
const AUDIO_URL = 'https://www.myinstants.com/media/sounds/whos-that-pokemon_.mp3';

export default function PokemonGame() {
    const [jogoIniciado, setJogoIniciado] = useState(false);
    const [pokemon, setPokemon] = useState(null);
    const [opcoes, setOpcoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [revelado, setRevelado] = useState(false);
    const [palpite, setPalpite] = useState(null);
    const [vidas, setVidas] = useState(3);
    const [pontos, setPontos] = useState(0);
    const [fimDeJogo, setFimDeJogo] = useState(false);

    const sortearId = () => {
        return Math.floor(Math.random() * MAX_POKEMON) + 1;
    };

    const tocarAudio = () => {
        const audio = new Audio(AUDIO_URL);
        audio.volume = 0.5;
        audio.play().catch(err => console.log("Erro ao tocar áudio:", err));
    };

    const iniciarJogo = () => {
        tocarAudio();
        setJogoIniciado(true);
        novaRodada();
    };

    const novaRodada = async () => {
        setLoading(true);
        setRevelado(false);
        setPalpite(null);

        const ids = new Set();
        while (ids.size < 4) {
            ids.add(sortearId());
        }
        const arrayIds = Array.from(ids);

        try {
            const respostas = await Promise.all(
                arrayIds.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()))
            );

            const certo = {
                nome: respostas[0].name,
                imagem: respostas[0].sprites.other['official-artwork'].front_default
            };

            const misturarOpcoes = respostas
                .map(p => p.name)
                .sort(() => Math.random() - 0.5);

            setPokemon(certo);
            setOpcoes(misturarOpcoes);
        } catch (err) {
            console.error("Erro na API:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (jogoIniciado) {
            novaRodada();
        }
    }, [jogoIniciado]);

    const clicarOpcao = (nomeClicado) => {
        if (revelado || fimDeJogo) return;

        setPalpite(nomeClicado);
        setRevelado(true);

        if (nomeClicado === pokemon.nome) {
            setPontos(pontos + 1);
        } else {
            const restoVidas = vidas - 1;
            setVidas(restoVidas);
            if (restoVidas === 0) {
                setFimDeJogo(true);
            }
        }
    };

    const reiniciar = () => {
        setVidas(3);
        setPontos(0);
        setFimDeJogo(false);
        tocarAudio();
        novaRodada();
    };

    if (!jogoIniciado) {
        return (
            <div className="jogo-container">
                <div className="tela-inicial">
                    <h1>POKÉMON</h1>
                    <h2>GUESSER</h2>
                    <button onClick={iniciarJogo} className="btn-proximo">
                        PRESS START
                    </button>
                </div>
            </div>
        );
    }

    if (loading && !pokemon) {
        return <div className="jogo-container"><div className="loading">Carregando...</div></div>;
    }

    return (
        <div className="jogo-container">
            <header className="placar">
                <div>Pontos: {pontos}</div>
                <div>Vidas: {vidas}</div>
            </header>

            {fimDeJogo ? (
                <div className="fim-jogo">
                    <h2>Fim de Jogo!</h2>
                    <p>Você acertou {pontos} pokémons.</p>
                    <button onClick={reiniciar} className="btn-reiniciar">Jogar de novo</button>
                </div>
            ) : (
                <div className="tabuleiro">
                    <h2>Quem é esse Pokémon?</h2>

                    <div className="container-img">
                        {loading ? (
                            <div>Carregando...</div>
                        ) : (
                            <img
                                src={pokemon?.imagem}
                                alt="Pokemon"
                                className={`sprite ${revelado ? 'revelado' : 'escondido'}`}
                            />
                        )}
                    </div>

                    {revelado && (
                        <h3 className={palpite === pokemon.nome ? 'acertou' : 'errou'}>
                            {palpite === pokemon.nome ? 'Acertou!' : `Errou! Era o ${pokemon.nome}`}
                        </h3>
                    )}

                    <div className="opcoes">
                        {opcoes.map((opcao, index) => {
                            let classeStatus = '';
                            if (revelado) {
                                if (opcao === pokemon.nome) classeStatus = 'correta';
                                else if (opcao === palpite) classeStatus = 'errada';
                            }

                            return (
                                <button
                                    key={index}
                                    disabled={revelado}
                                    onClick={() => clicarOpcao(opcao)}
                                    className={`btn-opcao ${classeStatus}`}
                                >
                                    {opcao}
                                </button>
                            );
                        })}
                    </div>

                    {revelado && !loading && (
                        <button onClick={() => { tocarAudio(); novaRodada(); }} className="btn-proximo">
                            Próximo
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}