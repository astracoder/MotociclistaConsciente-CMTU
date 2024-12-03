import matplotlib.pyplot as plt
import requests

# URLs para as APIs
url_modulos_iniciados = "http://localhost:3000/apiDados/moduloIniciado"
url_modulos_totais = "http://localhost:3000/apiDados/totalModulos"

# Dados para teste do python sem o uso de node.js
#modulos_iniciados = 60
#total_modulos = 100
#modulos_nao_iniciados = total_modulos - modulos_iniciados

try:
    # Consumindo as APIs
    response_iniciados = requests.get(url_modulos_iniciados)
    response_totais = requests.get(url_modulos_totais)

    # Verificando se as respostas foram bem-sucedidas
    response_iniciados.raise_for_status()
    response_totais.raise_for_status()

    # Extraindo os dados das respostas JSON
    data_iniciados = response_iniciados.json()
    data_totais = response_totais.json()

    # Tratando os dados
    if isinstance(data_iniciados, list) and len(data_iniciados) > 0:
        modulos_iniciados = int(data_iniciados[0].get('Iniciado_modulos', 0))
    else:
        raise ValueError("Resposta inesperada da API 'moduloIniciado'")

    if isinstance(data_totais, list) and len(data_totais) > 0:
        total_modulos = int(data_totais[0].get('Total_modulos', 0))
    else:
        raise ValueError("Resposta inesperada da API 'totalModulos'")

    if total_modulos <= 0:
        raise ValueError("O total de módulos deve ser maior que zero para criar o gráfico.")

    # Calculando o número de módulos não iniciados
    modulos_nao_iniciados = total_modulos - modulos_iniciados

    # Dados para o gráfico de pizza
    if modulos_nao_iniciados == 0:
        labels = ['Modulos iniciados']
        sizes = [modulos_iniciados]
        cores = [(0.2, 0.4, 0.2, 0.6)]  # vermelho, verde, azul, transparência
        explode = [0]

    elif modulos_iniciados == 0:
        labels = ['Modulos não iniciados']
        sizes = [modulos_nao_iniciados]
        cores = [(0.6, 0.2, 0.2, 0.6)]  # vermelho, verde, azul, transparência
        explode = [0]

    else:
        labels = ['Módulos Iniciados', 'Módulos Não Iniciados']
        sizes = [modulos_iniciados, modulos_nao_iniciados]
        cores = [(0.2, 0.4, 0.2, 0.6), (0.6, 0.2, 0.2, 0.6)] # vermelho, verde, azul, transparência
        explode = (0.1, 0)

    # Criando o gráfico de pizza
    plt.figure(figsize=(8, 6))
    plt.pie(
        sizes,
        explode=explode,
        labels=labels,
        colors=cores,
        autopct='%1.1f%%',
        startangle=90,
        wedgeprops={'edgecolor': 'black'}
    )

    # Adicionando título
    plt.title('Gráfico de Módulos Iniciados e Não Iniciados', fontsize=16)

    # Ajustando o gráfico
    plt.tight_layout()

    # Salvando a imagem nesse diretório
    plt.savefig("src/assets/DataScience/grafico_modulos_iniciados.png");

except requests.exceptions.RequestException as e:
    print(f"Erro ao fazer requisição para as APIs: {e}")

except ValueError as e:
    print(f"Erro no formato dos dados: {e}")
