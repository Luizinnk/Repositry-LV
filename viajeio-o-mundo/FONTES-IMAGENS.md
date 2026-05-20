# Fontes Web De Imagens

O site usa uma estrategia em duas camadas para preencher imagens coerentes com cada pais e secao:

1. **Wikimedia Commons API**: busca imagens reais por tema, como `Rio de Janeiro Brazil Christ Redeemer`, `Tokyo Japan neon street` ou `Marrakech Morocco`.
2. **Wikipedia PageImages API**: fallback quando o Commons nao retorna uma imagem adequada.
3. **Unsplash**: imagens estaticas de fallback para manter o layout preenchido caso a consulta web falhe ou o usuario esteja offline.
4. **FlagCDN**: bandeiras oficiais em PNG via codigos ISO 3166-1 alpha-2, usadas nos cards e na secao de identidade dos paises.

Arquivos principais:

- `js/script.js`: resolve e aplica imagens web em cards, galerias e fundos cinematograficos.
- `js/country-data.js`: guarda os temas de busca de cada pais, ponto turistico e galeria.
- `index.html`: recebe os 48 cards da Copa 2026 renderizados via JavaScript.
- `js/home-groups.js`: renderiza os grupos da Copa 2026 com bandeiras, paletas e assinatura cultural de cada selecao.

Para trocar uma imagem especifica, edite o texto de busca em `country-data.js` ou o atributo `data-web-image` no card desejado. Para alterar identidade visual, edite `countryIdentities` em `country-data.js`.
