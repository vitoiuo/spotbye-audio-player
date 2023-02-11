# Spotbye Audio Player

1. [Motivação](#motivação)
2. [Gif demo](#gif-demo)
3. [Setup do projeto](#setup-do-projeto)

#### Feito com uma derivação do template 

[d-jávue](https://github.com/huogerac/djavue)

<br />

## **Vídeo de apresentação**
[*Link para o drive*](https://drive.google.com/file/d/1byikT5JzlZO2e8R4kS55_3fAnnEdFGqo/view?usp=sharing)

<br />

## Motivação

Ser uma aplicação web que permita que o usuário final faça o upload de arquivos mp3, à moda dos players de músicas do passado, e curta as músicas que mais gosta, como bem desejar.

Embora existam alternativas menos pedantes nos streamings de músicas, que não requerem o upload de arquivos, a aplicação ainda tem existência justificável para quem não é assinante de nenhum desses serviços e quer fugir dos anúncios.

<br />

## Gif demo

***ALERTA: o slider do player em alguns momentos apresenta mal funcionamento, mas é completamente randômico. Preciso entender melhor se é culpa do slider do vuetify ou da API de áudio do HTML5***

<br />

## Setup do projeto

<br />

### Ambiente de desenvolvimento mockado

Verifique se a variável de ambiente **VITE_API_MOCK** setada como *true* em *frontend/.env*.

Para rodar a aplicação conectada ao backend, basta setar o valor dessa variável para *false*.

<br />

### Botando o projeto no ar

```bash
docker compose build 

docker compose up -d
```

Feito isso, no seu navegador acesse http://localhost/
