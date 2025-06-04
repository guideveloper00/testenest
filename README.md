<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# API de Transações - NestJS Clean Architecture

## Descrição

API RESTful para gerenciamento de transações financeiras e estatísticas, seguindo Clean Architecture, com segurança, testes, documentação Swagger, métricas Prometheus, WebSocket, logs estruturados e containerização.

## Requisitos

- Node.js >= 18
- pnpm (ou npm/yarn)
- Docker e Docker Compose (para Prometheus/Grafana)

## Instalação

```bash
pnpm install
# ou
npm install
```

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com o conteúdo:

```
PORT=3000
NODE_ENV=development
THROTTLE_TTL=60
THROTTLE_LIMIT=10
```

Ajuste as variáveis conforme necessário.

## Execução

- docker-compose up --build

- API/Swagger: http://localhost:3000/api/docs
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001
- WebSocket: logado no terminal do container websocket-client

- Grafana
- Login: admin
- Senha: testenest

### Testes

- Unitários e integração:
  ```bash
  pnpm test
  # ou
  npm test
  ```
- Cobertura:
  ```bash
  pnpm test:cov
  # ou
  npm run test:cov
  ```
- E2E:
  ```bash
  pnpm test:e2e
  # ou
  npm run test:e2e
  ```

## Documentação

- Swagger: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- Métricas Prometheus: [http://localhost:3000/api/metrics](http://localhost:3000/api/metrics)

## Observabilidade

- Logs estruturados: nestjs-pino
- Prometheus/Grafana: `docker-compose up -d` para subir stack de métricas
- localhost:9090 Prometheus
- localhost:3001 Grafana

## WebSocket (Estatísticas em tempo real)

- node test-socket.mjs

## CI/CD

- Workflow configurado em `.github/workflows/`

## Arquitetura

- Clean Architecture: separação em `domain`, `application`, `infrastructure`, `interfaces`
- SOLID, DI, contratos por interface

## Contato

<a href="https://wa.me/5511982684198" target="_blank">
  <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp" />
</a>

Dúvidas ou sugestões: (11) 98268-4198.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
