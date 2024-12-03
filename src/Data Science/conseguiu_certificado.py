import requests
import matplotlib.pyplot as plt

# URLs da API Node.js
url_quantidade_usuarios = "http://localhost:3000/apiDados/pessoasCertificado"
url_quantidade_certificado = "http://localhost:3000/apiDados/quantidadeCertificado"

# Dados para teste do python sem o uso de node.js
#usuarios_com_certificado = 120
#total_usuarios = 150
#usuarios_sem_certificado = total_usuarios - usuarios_com_certificado

try:
    # Requisição para a primeira URL
    response_pessoas = requests.get(url_quantidade_usuarios)
    response_pessoas.raise_for_status()
    total_pessoas = response_pessoas.json()

    # Requisição para a segunda URL
    response_quantidade = requests.get(url_quantidade_certificado)
    response_quantidade.raise_for_status()
    total_cetificados = response_quantidade.json()

    # Tratando os dados recebidos como listas e acessando as chaves corretas
    if isinstance(total_pessoas, list) and len(total_pessoas) > 0:
        total_usuarios = int(total_pessoas[0].get('Quantidade_de_usuarios', 0))
    else:
        raise ValueError("Resposta inesperada da API 'pessoasCertificado'")

    if isinstance(total_cetificados, list) and len(total_cetificados) > 0:
        usuarios_com_certificado = int(total_cetificados[0].get('Quantidade_de_certificados', 0))
    else:
        raise ValueError("Resposta inesperada da API 'quantidadeCertificado'")

    # Calculando usuários sem certificado
    usuarios_sem_certificado = total_usuarios - usuarios_com_certificado
    # Dados para o gráfico de pizza
    if usuarios_sem_certificado == 0:
        labels = ['Usuários com Certificado']
        sizes = [usuarios_com_certificado]
        colors = [(0.2, 0.4, 0.2, 0.6)]  # vermelho, verde, azul, transparência
        explode = None

    elif usuarios_com_certificado == 0:
        labels = ['Usuários sem Certificado']
        sizes = [usuarios_sem_certificado]
        colors = [(0.6, 0.2, 0.2, 0.6)]  # vermelho, verde, azul, transparência
        explode = None

    else:
        labels = ['Usuários com Certificado', 'Usuários sem Certificado']
        sizes = [usuarios_com_certificado, usuarios_sem_certificado]
        colors = [(0.2, 0.4, 0.2, 0.6),(0.6, 0.2, 0.2, 0.6)] # vermelho, verde, azul, transparência
        explode = (0.1, 0)  # Destacar a primeira fatia

    # Criando o gráfico de pizza
    plt.figure(figsize=(8, 6))
    plt.pie(
        sizes,
        labels=labels,
        colors=colors,
        autopct='%1.1f%%',
        startangle=90,
        wedgeprops={'edgecolor': 'black'},
        explode=explode
    )

    # Adicionando título
    plt.title('Gráfico de Usuários com e sem Certificado', fontsize=16)

    # Exibindo o gráfico
    plt.savefig("src/assets/DataScience/grafico_conseguiu_certificado.png");

except requests.exceptions.RequestException as e:
    print(f"Erro ao se conectar à API: {e}")
except ValueError as e:
    print(f"Erro no formato dos dados: {e}")
except Exception as e:
    print(f"Ocorreu um erro inesperado: {e}")
