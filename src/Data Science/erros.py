# Imports
import requests
import matplotlib.pyplot as plt

# Rota da API Node.js
url = "http://localhost:3000/apiDados/perguntasErradas"

# Dados para teste do python sem o uso de node.js
#top_5_erradas_json = """
#[
#    {"ID_ALTERNATIVA": 1, "TEXTO": "Alternativa A", "ERRO": 50},
#    {"ID_ALTERNATIVA": 2, "TEXTO": "Alternativa B", "ERRO": 45},
#    {"ID_ALTERNATIVA": 3, "TEXTO": "Alternativa C", "ERRO": 40},
#    {"ID_ALTERNATIVA": 4, "TEXTO": "Alternativa D", "ERRO": 35},
#    {"ID_ALTERNATIVA": 5, "TEXTO": "Alternativa E", "ERRO": 30}
#]
#"""

try:
    # Fazendo a requisição
    response = requests.get(url)
    response.raise_for_status()

    # Obtendo os dados do JSON
    top_5_erradas = response.json()  #Converte em um objeto python

    # Extraindo os dados para o gráfico
    textos = [str(item['ID_ATIVIDADE']) for item in top_5_erradas]
    erros = [item['ERROS'] for item in top_5_erradas]

    # Criando o gráfico
    plt.figure(figsize=(10, 6))
    color = (0.5, 0.1, 0.1, 0.6)  # vermelho, verde, azul, transparência
    plt.bar(textos, erros, color=color)
    print(erros)
    print(textos)

    # Configurando o gráfico
    plt.title('Top 5 Perguntas Mais Erradas', fontsize=16)
    plt.xlabel('Perguntas', fontsize=14)
    plt.ylabel('Quantidade de Erros', fontsize=14)
    plt.xticks(ticks=textos, ha='center', fontsize=12)
    plt.tight_layout()

    plt.savefig("src/assets/DataScience/grafico_erros.png");

except requests.exceptions.RequestException as e:
    print(f"Erro ao se conectar à API: {e}")
except KeyError as e:
    print(f"Erro ao acessar dados do JSON: {e}")
except Exception as e:
    print(f"Ocorreu um erro inesperado: {e}")
