# Spotbye Audio Player

#### Feito com uma derivação do template 

[d-jávue](https://github.com/huogerac/djavue)

* [Motivação](#motivação)
* [Gif demo](#gif-demo)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Setup do projeto](#setup-do-projeto)

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

![Live demo](./readme_assets/spotbye.gif)

<br />

## Tecnologias utilizadas

* [VueJs 3](https://vuejs.org/)
* [Vite](https://vitejs.dev/)
* [Vuetify 3](https://next.vuetifyjs.com/en/getting-started/installation/)
* [MirageJs](https://miragejs.com/)
* [Docker](https://www.docker.com/)
* [Nginx](https://www.nginx.com/)
* [Django](https://www.djangoproject.com/)

<br />

## Setup do projeto


### Botando o projeto no ar

```bash
docker compose build 

docker compose up -d
```

Feito isso, no seu navegador acesse o [loopback da sua máquina](http://localhost/)

<br />

### Ambiente de desenvolvimento mockado

Verifique se a variável de ambiente **VITE_API_MOCK** setada como *true* em *frontend/.env*.

Para rodar a aplicação conectada ao backend, basta setar o valor dessa variável para *false*.
