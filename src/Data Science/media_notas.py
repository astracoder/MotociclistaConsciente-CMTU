import matplotlib.pyplot as plt
import requests
from matplotlib.ticker import MaxNLocator

# URL da API
url_media_notas = "http://localhost:3000/apiDados/mediaNotas"

# Dados para teste do python sem o uso de node.js
#resultados = [{"PORCENTAGEM_CONCLUIDO": random.randint(0, 100)} for items in range(100)]

try:
    # Consumindo a API
    response = requests.get(url_media_notas)

    # Verificando se a resposta foi bem-sucedida
    response.raise_for_status()

    # Extraindo os dados
    data = response.json()

    # Verificando e extraindo as porcentagens concluídas
    if isinstance(data, list) and len(data) > 0:
        porcentagens = [int(item.get("NOTA_FINAL", 0)) for item in data]
    else:
        raise ValueError("Resposta inesperada da API")

    # Criando o histograma
    bins = range(0, 110, 10)  # Bins indo de 0 a 100 com intervalos de 10
    plt.figure(figsize=(8, 6))
    color = (0.2, 0.35, 0.2, 0.6)  # vermelho, verde, azul, transparência
    n, bins, patches = plt.hist(
        porcentagens,
        bins=bins,
        alpha=0.8,
        color=color,
        edgecolor="black",
        align="mid",
    )

    # Adicionando os valores de contagem nas barras e para valores maior que 0
    for i in range(len(n)):
        if n[i] > 0:
            plt.text(
                bins[i] + (bins[i + 1] - bins[i]) / 2,
                n[i],
                int(n[i]),
                ha="center",
                va="bottom",
                fontsize=12,
            )

    # Configurações do gráfico
    plt.title("Variação das Notas", fontsize=16)
    plt.xlabel("Porcentagem Concluída (%)", fontsize=14)
    plt.ylabel("Quantidade de Pessoas", fontsize=14)
    plt.xticks(range(0, 110, 10))  # Marcas no eixo X ajustadas para intervalos de 10

    # Ajustando o eixo Y para exibir valores inteiros
    plt.gca().yaxis.set_major_locator(MaxNLocator(integer=True))

    # Ajustando o gráfico
    plt.tight_layout()

    plt.savefig("src/assets/DataScience/grafico_media_notas.png");

except requests.exceptions.RequestException as e:
    print(f"Erro ao fazer requisição para a API: {e}")

except ValueError as e:
    print(f"Erro no formato dos dados: {e}")
