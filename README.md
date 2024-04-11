# Documentação da API ToDoList

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

- `listOrder` (obrigatório): A nova ordem da lista.

**Exemplo de requisição:**

```json
{
    "listOrder": 1
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

- `itemOrder` (obrigatório): A nova ordem do item.

**Exemplo de requisição:**

```json
{
    "itemOrder": 1
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
