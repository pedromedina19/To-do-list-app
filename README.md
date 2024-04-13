# Documentação da API ToDoList
### Essa é uma aplicação de lista de tarefas que inclui uma API feita em SpringBoot que se conecta a um banco de dados PostgreSQL, e um Front-end feito em Next.js. Para rodar tudo utilizaremos Dockers.
- Primeiro deve-se rodar o docker-compose da api, nele está incluído o postgres, pgadmin4 e a api. Para rodar, basta entrar no diretório raiz da api em /toDoListApi
- execute o seguinte comando para rodar o docker-compose:
```bash
sudo docker-compose up -d
``` 
- SOMENTE após finalizar todas as instalções do Docker, entre na pasta do front-end e rode o docker-compose do front-end, a pasta é a /frontend
- Novamente rode o comando:
```bash
sudo docker-compose up -d
```
- Após finalizar, o site estaŕá acessível em: http://localhost:4200/
- Observação: Ao editar um item, ou arrastar uma lista, atualize a página manualmente para que essas informações sejam carregadas. Isso será corrigido futuramente.
### Observações:
- Caso deseje entrar no banco de dados por meio do pg-admin precisará de algumas infoormações, como:
- Primeiro entre no link do pgadmin que é: http://localhost:5431
- Faça login.
-     email: user@localhost.com
-     senha: password
- Terá um retorno como esse:
![bd](https://github.com/pedromedina19/To-do-list-app/assets/87578151/065af47a-b155-47dc-978c-f158e66d14a1)
<br>
## Rotas da api
<br><br>
## Listas

### POST /list

Cria uma nova lista.

Parâmetros do corpo da requisição:

- `title` (obrigatório): O título da lista.

Exemplo de requisição:

```json
{
    "title": "Minha nova lista"
}
```

Resposta:

Retorna a lista criada com status HTTP 201 (Created).

Exemplo de resposta:

```json
{
    "id": 1,
    "title": "Minha nova lista",
    "listOrder": 0,
    "items": []
}
```

### PUT /list/{id}

Atualiza uma lista existente pelo ID.

Parâmetros do corpo da requisição:

- `title` (obrigatório): O novo título da lista.

Exemplo de requisição:

```json
{
    "title": "Título atualizado"
}
```

Resposta:

Retorna a lista atualizada com status HTTP 200 (OK).

Exemplo de resposta:

```json
{
    "id": 1,
    "title": "Título atualizado",
    "listOrder": 0,
    "items": []
}
```

### `PUT /list/order/{id}`

Atualiza a ordem de uma lista existente pelo ID.

**Parâmetros do corpo da requisição:**

- `currentOrder` (obrigatório): Ordem atual.
- `targetOrder` (obrigatório): Ordem desejada.

**Exemplo de requisição:**

```json
{
    "currentOrder": 1,
    "targetOrder": 2
}

```

**Resposta:**

Retorna a lista atualizada com status HTTP 200 (OK).

**Exemplo de resposta:**

```json
{
    "id": 1,
    "title": "Título atualizado",
    "listOrder": 1,
    "items": []
}
```

### GET /list

Retorna todas as listas.

Resposta:

Retorna uma lista de todas as listas com status HTTP 200 (OK).

Exemplo de resposta:

```json
[
    {
        "id": 1,
        "title": "Título atualizado",
        "listOrder": 0,
        "items": []
    },
    {
        "id": 2,
        "title": "Outra lista",
        "listOrder": 1,
        "items": []
    }
]
```

### GET /list/{id}

Retorna uma lista específica pelo ID.

Resposta:

Retorna a lista solicitada com status HTTP 200 (OK).

Exemplo de resposta:

```json
{
    "id": 1,
    "title": "Título atualizado",
    "listOrder": 0,
    "items": []
}
```

### DELETE /list/{id}

Exclui uma lista específica pelo ID.

Resposta:

Retorna um status 204 (No Content) se a lista for excluída com sucesso.

## Itens

### POST /item

Cria um novo item.

Parâmetros do corpo da requisição:

- `titleItem` (obrigatório): O título do item.
- `listId` (obrigatório): O ID da lista à qual o item pertence.

Exemplo de requisição:

```json
{
    "titleItem": "Meu novo item",
    "listId": 1
}
```

Resposta:

Retorna o item criado com status HTTP 201 (Created).

Exemplo de resposta:

```json
{
    "id": 1,
    "title": "Meu novo item",
    "description": null,
    "startDate": null,
    "finalDate": null,
    "itemOrder": 0,
    "list": {
        "id": 1,
        "title": "Título atualizado",
        "listOrder": 0
    }
}
```

### PUT /item/{id}

Atualiza um item existente pelo ID.

Parâmetros do corpo da requisição:

- `titleItem` (opcional): O novo título do item.
- `description` (opcional): A nova descrição do item.
- `startDate` (opcional): A nova data de início do item.
- `finalDate` (opcional): A nova data final do item.
- `itemOrder` (opcional): A nova ordem do item.

Exemplo de requisição:

```json
{
    "titleItem": "Título atualizado",
    "itemOrder": 1
}
```

Resposta:

Retorna o item atualizado com status HTTP 200 (OK).

Exemplo de resposta:

```json
{
    "id": 1,
    "title": "Título atualizado",
    "description": null,
    "startDate": null,
    "finalDate": null,
    "itemOrder": 1,
    "list": {
        "id": 1,
        "title": "Título atualizado",
        "listOrder": 0
    }
}
```

### `PUT /items/order/{id}`

Atualiza a ordem de um item existente pelo ID.

**Parâmetros do corpo da requisição:**

- `currentOrder` (obrigatório): Ordem atual.
- `targetOrder` (obrigatório): Ordem desejada.
- `currentListId` (obrigatório): Id da lista atual.
- `targetListId` (obrigatório): Id da lista desejada.

**Exemplo de requisição:**

```json
{
    "currentOrder": 1,
    "targetOrder": 2,
    "currentListId": 1,
    "targetListId": 2
}
```

**Resposta:**

Retorna o item atualizado com status HTTP 200 (OK).

**Exemplo de resposta:**

```json
{
    "id": 1,
    "title": "Título atualizado",
    "description": null,
    "startDate": null,
    "finalDate": null,
    "itemOrder": 1,
    "list": {
        "id": 1,
        "title": "Título atualizado",
        "listOrder": 0
    }
}
```

### GET /item/{id}

Retorna um item específico pelo ID.

Resposta:

Retorna o item solicitado com status HTTP 200 (OK).

Exemplo de resposta:

```json
{
    "id": 1,
    "title": "Título atualizado",
    "description": null,
    "startDate": null,
    "finalDate": null,
    "itemOrder": 1,
    "list": {
        "id": 1,
        "title": "Título atualizado",
        "listOrder": 0
    }
}
```

### DELETE /item/{id}

Exclui um item específico pelo ID.

Resposta:

Retorna um status 204 (No Content) se o item for excluído com sucesso.

<br><br>
## Front-end

![image](https://github.com/pedromedina19/To-do-list-app/assets/87578151/fb69f5b4-3054-40dd-9df1-30e53db6c29b)

![image](https://github.com/pedromedina19/To-do-list-app/assets/87578151/d8aea1d8-3ee7-421d-a718-8115c52d7ca7)

