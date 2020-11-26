# GIFTCARD-WEB: https://giftcard.cluberotagourmet.com.br/

Repositório dashboard de gerenciamento de informações 

Nesse repositório você encontrará o código fonte de todo o dashboard administrativo do Clube Rota Gourmet. Lembrando que a infraestrutura atual está toda dentro do Github do Rota Gourmet e assim é:

- Painel Administrativo - ReactJs v.16.9.0 - Repo ADMIN-WEB
- Aplicativo para usuários - React-native | EXPO SDK 38 - Repo mobile-rota
- Servidor de API - NodeJs - Repo api-rota
- Landing Page - HTML, CSS E JAVASCRIPT - Repo landingpage-rota
- Cupom Page - ReactJs - Repo cupom-web-rota
- Gift Page - ReactJs - Repo giftcard-web-rota

Para inicializar o projeto primeiramente execute o comando: `npm install`.

Para fazer build do projeto execute o comando: `npm run build`.

Para fazer deploy certifique que seu computador está conectado com as credenciais da conta da AWS do Clube Rota Gourmet. Para atualizar as credenciais da AWS, basta instalar o aws cli e executar o comando: `aws configure`.
Depois de configurado as informações da aws, execute o comando: `npm run deploy`.
A aplicação irá realizar o upload dos arquivos que estão na pasta /build com o seguinte comando:
`aws s3 sync build/ s3://giftcard.cluberotagourmet.com.br --acl public-read` -- ATENÇÃO: não é necessário executar esse comando, o npm run deploy faz isso para você.