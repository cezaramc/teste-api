# teste-api

Importe usuários e posts de uma API e guarde em um banco de dados MySQL

- **Os dados são importados ao fazer o primeiro acesso a tela de usuários**

Possua uma tela para listar os usuários, com ações de adicionar, editar e excluir
- **<diretório-projeto>/index.html --- Na barra superior possui um botão para adicionar novo usuário e na linha de cada usuário possui o ícone para edição e exclusão**

Também é necessário ter uma tela de detalhes de usuário, para listar os posts de cada um deles
- **Na exibição dos usuários tem uma coluna chamada "Posts", ao clicar no ícone abrirá um diálogo com os posts**

Tenha APIs que retornem os dados do banco de dados no formato JSON
Todos os usuários: /users
- **<diretório-projeto>/api/users**

Usuário específico: /users/{id}
- **<diretório-projeto>/api/users/{id}**

Posts de um usuário: /users/{id}/posts
- **<diretório-projeto>/api/users/{id}/posts**

A aplicação pode ser feita utilizando qualquer framework atual.
- **Utilizei o Slim para criação da API**

# Arquivo de edição (<diretório-projeto>/config/config.php)
- Necessita de um usuário que possua permissão para CREATE, DELETE, SELECT, UPDATE, INDEX e INSERT;
- A criação da base de dados e a importação dos usuário é feita automaticamente ao acessar a tela de usuários pela primeira vez;
