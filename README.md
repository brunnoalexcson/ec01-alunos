# EC01 – Alunos | DevTech Academy

**Disciplina:** Tecnologia de Construção de Software I · PUC Goiás  
**Aluno:** Brunno Alexcson de Carvalho

O sistema da DevTech Academy permite cadastrar, consultar, editar e excluir alunos. Cada registro contém nome, idade, curso e nota final. Os dados ficam na memória do navegador enquanto a página está aberta. Ao recarregar a página, a lista volta a ficar vazia.

A seção **Relatórios** mostra os alunos aprovados com nota final maior ou igual a 7, a média das notas, a média das idades, os nomes em ordem alfabética e a quantidade de alunos por curso. Os resultados são atualizados após cada cadastro, edição salva ou exclusão.

As mensagens de cadastro, edição e exclusão aparecem no console do navegador. Abra as ferramentas de desenvolvedor e selecione a aba **Console** para acompanhá-las.

Cada exercício do enunciado corresponde a um commit, de **Exercício 1: CRUD** a **Exercício 4**. O histórico mostra a evolução da mesma página.

## Executar com Docker

Use um terminal Ubuntu/WSL com Git instalado e Docker Engine em execução.

1. Na primeira vez, clone o repositório e entre na pasta do projeto.

   ```bash
   git clone https://github.com/brunnoalexcson/ec01-alunos.git
   cd ec01-alunos
   ```

2. Na raiz do repositório, onde está a pasta `src`, crie o container.

   ```bash
   sudo docker run -d --name ec01-alunos \
     -p 127.0.0.1:8080:80 \
     -v "$PWD/src:/usr/share/nginx/html:ro" \
     nginx:alpine
   ```

3. Abra [http://localhost:8080](http://localhost:8080) no navegador.

Nas próximas execuções, se o container `ec01-alunos` já estiver em execução, abra o endereço diretamente. Se estiver parado, inicie-o com o comando abaixo.

```bash
sudo docker start ec01-alunos
```

O Nginx serve os arquivos da pasta `src`. Depois de salvar uma alteração nessa pasta, atualize a página no navegador para vê-la.