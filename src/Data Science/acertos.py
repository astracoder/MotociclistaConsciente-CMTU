# Imports
import matplotlib.pyplot as plt
import requests

# Rota provisória do Node.js
url = "http://localhost:3000/apiDados/perguntasCertas"


try:
    # Fazendo a requisição
    response = requests.get(url)
    response.raise_for_status()

    # Obtendo os dados do JSON
    top_5_acertadas = response.json()  #Converte em um objeto python

    # Extraindo os dados para o gráfico
    textos = [str(item['ID_ATIVIDADE']) for item in top_5_acertadas]
    acertos = [item['ACERTOS'] for item in top_5_acertadas]

    # Criando o gráfico
    plt.figure(figsize=(8, 5))
    color = (0.2, 0.4, 0.2, 0.6)  # vermelho, verde, azul, transparência
    plt.bar(textos, acertos, color=color)

    # Configurando o gráfico
    plt.title('Top 5 Perguntas Mais Acertadas', fontsize=16)
    plt.xlabel('Perguntas', fontsize=14)
    plt.ylabel('Quantidade de Acertos', fontsize=14)
    plt.xticks(ticks=textos, ha='center', fontsize=12)
    plt.tight_layout()

    # Salvando a imagem nesse diretório
    plt.savefig("src/assets/DataScience/grafico_acertos.png");

except requests.exceptions.RequestException as e:
    print(f"Erro ao se conectar à API: {e}")
except KeyError as e:
    print(f"Erro ao acessar dados do JSON: {e}")
except Exception as e:
    print(f"Ocorreu um erro inesperado: {e}")
