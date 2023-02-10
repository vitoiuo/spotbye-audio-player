<!-- // lembrar de falar do player -->

[Botando o projeto no ar](#)

# Spotbye Audio Player
#### Feito com uma derivação do template [d-jávue](https://github.com/huogerac/djavue)
<br />

## Motivação

Ser uma aplicação web que permita que o usuário final faça o upload de arquivos mp3, à moda dos players de músicas do passado, e curta as músicas que mais gosta, como bem desejar.

Embora existam alternativas menos pedantes nos streamings de músicas, que não requerem o upload de arquivos, a aplicação ainda tem existência justificável para quem não é assinante de nenhum desses serviços e quer fugir dos anúncios.

<br />

## Video demo

<br />

## Setup do projeto

<br />

### Ambiente de desenvolvimento mockado

Verifique se a variável de ambiente **DEVELOPMENT_MODE** está presente no arquivo *.env*, localizado na raiz do projeto. e setada como *mock*.

Para rodar a aplicação conectada ao backend, basta omitir essa variável.

<br />

### Botando o projeto no ar

```bash
docker compose build 

docker compose up -d
```

Feito isso, no seu navegador acesse http://localhost/
