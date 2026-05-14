const fallback="paises/img/viajeio.png";
const COUNTRIES=[
["A","México","mexico","Cidade do México","Espanhol","CONCACAF","#006847","paises/img/viajeio.png","País-sede, cultura mexicana vibrante e torcida forte no Estádio Azteca.","Mariachi, Dia dos Mortos, culinária de rua e artes populares.","Anfitrião acostumado a Copas, quer transformar casa cheia em vantagem."],
["A","África do Sul","africa-do-sul","Pretória","Inglês, zulu e outras","CAF","#007a4d",fallback,"Diversidade, memória de 2010 e retorno ao palco mundial.","Onze línguas oficiais, música, dança, braai e legado de Nelson Mandela.","Volta buscando competir em um grupo aberto e simbólico."],
["A","Coreia do Sul","coreia-do-sul","Seul","Coreano","AFC","#c60c30",fallback,"Tradição asiática, velocidade e tecnologia dentro e fora de campo.","K-pop, cinema, templos, hanbok, kimchi e inovação urbana.","Participante constante, joga em ritmo alto e transições rápidas."],
["A","Tchéquia","tchequia","Praga","Tcheco","UEFA","#11457e",fallback,"Arquitetura histórica e futebol europeu técnico no Grupo A.","Castelos, cafés, música clássica, cristais e cervejarias tradicionais.","Classificada via playoff, chega como candidata a surpreender."],
["B","Canadá","canada","Ottawa","Inglês e francês","CONCACAF","#d52b1e",fallback,"Sede da Copa, multicultural e com geração de futebol em crescimento.","Cultura indígena, natureza grandiosa e convivência entre francês e inglês.","Joga em casa com velocidade, juventude e muita expectativa."],
["B","Bósnia e Herzegovina","bosnia","Sarajevo","Bósnio, croata e sérvio","UEFA","#002f6c",fallback,"História de resistência, pontes culturais e classificação emocionante.","Sarajevo e Mostar unem influências otomanas, balcânicas e europeias.","Classificada pelo playoff, entra com emoção e competitividade."],
["B","Qatar","qatar","Doha","Árabe","AFC","#8a1538",fallback,"Retorna após sediar 2022 com tradição do Golfo e modernidade.","Souqs, deserto, arquitetura futurista e hospitalidade árabe.","Busca transformar a experiência de 2022 em evolução competitiva."],
["B","Suíça","suica","Berna","Alemão, francês, italiano e romanche","UEFA","#d52b1e",fallback,"Seleção organizada, experiente e regular em fases eliminatórias.","Alpes, chocolates, relógios e quatro idiomas oficiais.","Equipe disciplinada e perigosa em jogos equilibrados."],
["C","Brasil","brasil","Brasília","Português","CONMEBOL","#009739","paises/img/brasil.png","Camisa mais vitoriosa da história e expectativa de jogar bonito.","Samba, carnaval, festas regionais, Amazônia e diversidade culinária.","Cinco vezes campeão mundial, chega sempre como protagonista."],
["C","Marrocos","marrocos","Rabat","Árabe e amazigue","CAF","#c1272d",fallback,"Força africana embalada pela campanha histórica de 2022.","Medinas, souks, chá de hortelã, Atlas e culinária aromática.","Semifinalista em 2022, entra como rival muito respeitado."],
["C","Haiti","haiti","Porto Príncipe","Crioulo haitiano e francês","CONCACAF","#00209f",fallback,"Orgulho caribenho e retorno mundial de enorme significado.","Arte colorida, música rara, culinária crioula e identidade popular forte.","Volta depois de décadas com uma campanha de esperança."],
["C","Escócia","escocia","Edimburgo","Inglês, escocês e gaélico","UEFA","#005eb8",fallback,"Retorno com torcida apaixonada e orgulho nacional muito presente.","Castelos, Highlands, tartãs, literatura e gaitas de fole.","Joga com intensidade física e apoio vocal marcante."],
["D","Estados Unidos","estados-unidos","Washington, D.C.","Inglês","CONCACAF","#3c3b6e",fallback,"País-sede com grandes arenas, escala gigante e elenco jovem.","Cinema, música, esportes, diversidade urbana e influência global.","Quer amadurecer em casa e ir longe diante da própria torcida."],
["D","Paraguai","paraguai","Assunção","Espanhol e guarani","CONMEBOL","#d52b1e",fallback,"Garra sul-americana, tradição defensiva e identidade bilíngue.","Guarani, harpa paraguaia, tereré e artesanato nacional.","Retorna buscando recuperar força nas Copas."],
["D","Austrália","australia","Camberra","Inglês","AFC","#00843d",fallback,"Força física, mentalidade competitiva e cultura esportiva.","Povos aborígenes, praias, natureza única e vida ao ar livre.","Os Socceroos costumam crescer como azarões competitivos."],
["D","Türkiye","turquia","Ancara","Turco","UEFA","#e30a17",fallback,"Ponte entre Europa e Ásia, torcida intensa e futebol emocional.","Istambul, bazares, mesquitas, café turco e culinária rica.","Classificada via playoff, promete agitar o Grupo D."],
["E","Alemanha","alemanha","Berlim","Alemão","UEFA","#ffce00",fallback,"Tradição vencedora e busca por recuperação em Copas.","História, engenharia, música clássica, museus e Oktoberfest.","Tetracampeã mundial, chega com cobrança máxima."],
["E","Curaçao","curacao","Willemstad","Papiamento, neerlandês e inglês","CONCACAF","#002b7f",fallback,"Estreia histórica com cor caribenha e orgulho nacional.","Arquitetura colorida, música caribenha e idioma papiamento.","Primeira Copa, chance de se apresentar ao mundo."],
["E","Côte d’Ivoire","costa-do-marfim","Yamoussoukro","Francês","CAF","#f77f00",fallback,"Talento físico, tradição africana recente e torcida vibrante.","Máscaras, danças, música, cacau e diversidade étnica.","Volta querendo marcar presença no Grupo E."],
["E","Equador","equador","Quito","Espanhol","CONMEBOL","#fcd116",fallback,"Altitude, juventude e intensidade sul-americana.","Andes, Galápagos, povos indígenas e mercados tradicionais.","Seleção atlética e rápida, perigosa para favoritos."],
["F","Países Baixos","paises-baixos","Amsterdã","Neerlandês","UEFA","#ff7f00",fallback,"Tradição ofensiva e escola tática famosa.","Canais, bicicletas, museus, tulipas e design urbano.","Busca o título que ainda falta à Laranja."],
["F","Japão","japao","Tóquio","Japonês","AFC","#bc002d",fallback,"Disciplina, velocidade e precisão técnica.","Templos, anime, gastronomia, chá e tecnologia.","Chega com ambição real de avançar e surpreender."],
["F","Suécia","suecia","Estocolmo","Sueco","UEFA","#006aa7",fallback,"Organização nórdica e força coletiva no grupo mais duro.","Design, música pop, lagos, florestas e inovação social.","Retorna com talento ofensivo e disciplina tática."],
["F","Tunísia","tunisia","Túnis","Árabe","CAF","#e70013",fallback,"Experiência mundialista e cultura mediterrânea africana.","Medinas, Cartago, praias e culinária com especiarias.","Seleção competitiva e difícil de bater."],
["G","Bélgica","belgica","Bruxelas","Neerlandês, francês e alemão","UEFA","#ef3340",fallback,"Talento europeu buscando uma campanha profunda.","Chocolates, quadrinhos, cervejas e cidades medievais.","Equipe técnica, experiente e perigosa ofensivamente."],
["G","Egito","egito","Cairo","Árabe","CAF","#ce1126","paises/img/egito.png","Peso histórico, pirâmides, Nilo e torcida apaixonada.","Faraós, templos, escrita antiga e monumentalidade.","Retorna buscando competir em alto nível na África."],
["G","IR Irã","ira","Teerã","Persa","AFC","#239f40",fallback,"Regular em Copas e dono de cultura persa profunda.","Poesia, tapetes, arquitetura islâmica e história imperial.","Equipe física e experiente, costuma dificultar favoritos."],
["G","Nova Zelândia","nova-zelandia","Wellington","Inglês e maori","OFC","#111111",fallback,"Representante da Oceania com paisagens cinematográficas.","Haka, arte maori, montanhas, fiordes e natureza.","Entra como desafiante e símbolo da região."],
["H","Espanha","espanha","Madrid","Espanhol","UEFA","#c60b1e","paises/img/espanha.png","Potência técnica e escola de posse de bola.","Flamenco, tapas, festas populares e arquitetura de Gaudí.","Campeã em 2010, segue entre as mais técnicas."],
["H","Cabo Verde","cabo-verde","Praia","Português e crioulo cabo-verdiano","CAF","#003893",fallback,"Estreia histórica com orgulho lusófono e música marcante.","Morna, coladeira, ilhas atlânticas e diáspora forte.","Primeira Copa, impacto enorme para o país."],
["H","Arábia Saudita","arabia-saudita","Riade","Árabe","AFC","#006c35",fallback,"Experiência recente e confiança para surpreender.","Deserto, hospitalidade árabe e locais sagrados do Islã.","Quer repetir grandes momentos em Copas."],
["H","Uruguai","uruguai","Montevidéu","Espanhol","CONMEBOL","#0038a8",fallback,"Bicampeão mundial, intenso e orgulhoso de sua tradição.","Mate, tango, candombe, praias e vida tranquila.","Seleção de identidade forte, respeitada por todos."],
["I","França","franca","Paris","Francês","UEFA","#0055a4","paises/img/franca.png","Elenco profundo, tradição recente de finais e cultura global.","Arte, moda, gastronomia, museus e Torre Eiffel.","Campeã em 1998 e 2018, entra como favorita."],
["I","Senegal","senegal","Dacar","Francês","CAF","#00853f",fallback,"Força africana com talento, físico e cultura musical.","Teranga, sabar, mercados, arte e thieboudienne.","Campeão africano recente, enfrenta favoritos sem medo."],
["I","Iraque","iraque","Bagdá","Árabe e curdo","AFC","#ce1126",fallback,"Retorno emocional com herança da Mesopotâmia.","Poesia, culinária, diversidade e berço de civilizações.","Volta após longa ausência querendo competir."],
["I","Noruega","noruega","Oslo","Norueguês","UEFA","#ba0c2f",fallback,"Força nórdica, fiordes e geração ofensiva perigosa.","Aurora boreal, design escandinavo e natureza extrema.","Retorna depois de décadas com grandes expectativas."],
["J","Argentina","argentina","Buenos Aires","Espanhol","CONMEBOL","#75aadb",fallback,"Atual campeã mundial e torcida intensamente apaixonada.","Tango, churrasco, literatura e cafés portenhos.","Tricampeã, chega para defender o título."],
["J","Argélia","argelia","Argel","Árabe e amazigue","CAF","#006233",fallback,"Talento, intensidade africana e cultura do Magrebe.","Casbah, música raï, Saara e culinária mediterrânea.","Retorna querendo recuperar impacto em Copas."],
["J","Áustria","austria","Viena","Alemão","UEFA","#ed2939",fallback,"Futebol intenso e tradição europeia clássica.","Viena, cafés, música clássica, Alpes e arquitetura imperial.","Organizada e agressiva na pressão alta."],
["J","Jordânia","jordania","Amã","Árabe","AFC","#007a3d",fallback,"Estreia mundial com história milenar e deserto.","Petra, Wadi Rum, hospitalidade árabe e cozinha levantina.","Primeira participação, enorme valor simbólico."],
["K","Portugal","portugal","Lisboa","Português","UEFA","#006600",fallback,"Talento técnico e ligação forte com o mundo lusófono.","Fado, azulejos, navegações e culinária atlântica.","Campeão europeu de 2016, mira fases altas."],
["K","Congo DR","congo-dr","Kinshasa","Francês","CAF","#007fff",fallback,"Retorno após décadas com música e energia popular.","Rumba congolesa, arte, florestas e diversidade étnica.","Volta à Copa para viver capítulo histórico."],
["K","Uzbequistão","uzbequistao","Tashkent","Uzbeque","AFC","#1eb53a",fallback,"Estreia com Rota da Seda e cidades azuis.","Samarkand, Bukhara, mosaicos e mercados da Ásia Central.","Primeira Copa, nova página para o futebol asiático."],
["K","Colômbia","colombia","Bogotá","Espanhol","CONMEBOL","#fcd116",fallback,"Alegria, técnica, música, café e cores fortes.","Cumbia, vallenato, Caribe, Andes e literatura.","Seleção técnica que volta querendo avançar."],
["L","Inglaterra","inglaterra","Londres","Inglês","UEFA","#cf142b","paises/img/inglaterra.png","Elenco forte, berço moderno do futebol e pressão por título.","Monarquia, literatura, música, pubs e tradição esportiva.","Campeã em 1966, busca transformar talento em conquista."],
["L","Croácia","croacia","Zagreb","Croata","UEFA","#f00000",fallback,"Reputação enorme em Copas recentes e meio-campo técnico.","Adriático, Dubrovnik, ilhas e culinária mediterrânea.","Finalista em 2018, segue adversário respeitado."],
["L","Gana","gana","Acra","Inglês","CAF","#fcd116",fallback,"Tradição africana, juventude e torcida intensa.","Kente, highlife, história ashanti e jollof.","Quer voltar a incomodar favoritos no Mundial."],
["L","Panamá","panama","Cidade do Panamá","Espanhol","CONCACAF","#005293",fallback,"Segunda Copa com orgulho centro-americano e canal histórico.","Canal do Panamá, música, carnaval, Caribe e Pacífico.","Busca evoluir após a estreia mundial." ]
].map(([group,name,slug,capital,language,confed,accent,image,summary,culture,football])=>({group,name,slug,capital,language,confed,accent,image,summary,culture,football,highlights:[capital,confed,"Copa 2026"]}));
const GROUPS=[...new Set(COUNTRIES.map(c=>c.group))];
const findCountry=slug=>COUNTRIES.find(c=>c.slug===slug);
const FLAG_CODES={mexico:"mx","africa-do-sul":"za","coreia-do-sul":"kr",tchequia:"cz",canada:"ca",bosnia:"ba",qatar:"qa",suica:"ch",brasil:"br",marrocos:"ma",haiti:"ht",escocia:"gb-sct","estados-unidos":"us",paraguai:"py",australia:"au",turquia:"tr",alemanha:"de",curacao:"cw","costa-do-marfim":"ci",equador:"ec","paises-baixos":"nl",japao:"jp",suecia:"se",tunisia:"tn",belgica:"be",egito:"eg",ira:"ir","nova-zelandia":"nz",espanha:"es","cabo-verde":"cv","arabia-saudita":"sa",uruguai:"uy",franca:"fr",senegal:"sn",iraque:"iq",noruega:"no",argentina:"ar",argelia:"dz",austria:"at",jordania:"jo",portugal:"pt","congo-dr":"cd",uzbequistao:"uz",colombia:"co",inglaterra:"gb-eng",croacia:"hr",gana:"gh",panama:"pa"};
const FOOTBALL_INFO={
  mexico:["Liga MX",0,"Javier Hernández","El Tri costuma competir com muita intensidade e tem uma das torcidas mais barulhentas do mundo."],
  "africa-do-sul":["Premier Soccer League",0,"Benni McCarthy","A seleção carrega a memória da Copa de 2010 e uma identidade muito física."],
  "coreia-do-sul":["K League 1",0,"Cha Bum-kun","A força coreana aparece em pressão, disciplina e transições rápidas."],
  tchequia:["Czech First League",0,"Jan Koller","A escola tcheca valoriza técnica, organização e bons meias."],
  canada:["Canadian Premier League",0,"Cyle Larin","O Canadá vive uma fase de crescimento, com jogadores mais presentes em grandes ligas."],
  bosnia:["Premier League da Bósnia e Herzegovina",0,"Edin Džeko","A Bósnia costuma jogar com emoção, força técnica e grande peso de seus ídolos."],
  qatar:["Qatar Stars League",0,"Almoez Ali","O Qatar tenta converter investimento e experiência recente em competitividade."],
  suica:["Swiss Super League",0,"Alexander Frei","A Suíça é conhecida por equilíbrio tático e regularidade em torneios."],
  brasil:["Brasileirão Série A",5,"Neymar","O Brasil tem a camisa mais vencedora da Copa e uma tradição ofensiva única."],
  marrocos:["Botola Pro",0,"Ahmed Faras","Marrocos elevou o patamar africano com a semifinal histórica de 2022."],
  haiti:["Ligue Haïtienne",0,"Emmanuel Sanon","O Haiti retorna com uma história de orgulho caribenho e memória mundialista."],
  escocia:["Scottish Premiership",0,"Kenny Dalglish e Denis Law","A Escócia leva tradição britânica, jogo físico e torcida marcante."],
  "estados-unidos":["Major League Soccer",0,"Clint Dempsey e Landon Donovan","Os Estados Unidos tentam transformar estrutura e geração jovem em protagonismo."],
  paraguai:["División Profesional",0,"Roque Santa Cruz","O Paraguai é lembrado pela competitividade, defesa forte e garra sul-americana."],
  australia:["A-League Men",0,"Tim Cahill","A Austrália compete com força física, jogo direto e mentalidade de torneio."],
  turquia:["Süper Lig",0,"Hakan Şükür","Türkiye une pressão de torcida, intensidade e futebol emocional."],
  alemanha:["Bundesliga",4,"Miroslav Klose","A Alemanha representa eficiência, tradição vencedora e cultura de decisão."],
  curacao:["Curaçao Promé Divishon",0,"Rangelo Janga","Curaçao entra como história emergente do Caribe."],
  "costa-do-marfim":["Ligue 1 da Costa do Marfim",0,"Didier Drogba","Os Elefantes combinam força, velocidade e tradição africana recente."],
  equador:["LigaPro Serie A",0,"Enner Valencia","O Equador é intenso, atlético e muito acostumado a jogos de altitude."],
  "paises-baixos":["Eredivisie",0,"Robin van Persie","Os Países Baixos carregam uma das escolas táticas mais influentes do futebol."],
  japao:["J1 League",0,"Kunishige Kamamoto","O Japão mistura organização, técnica e evolução constante."],
  suecia:["Allsvenskan",0,"Zlatan Ibrahimović","A Suécia une força coletiva, disciplina e tradição nórdica."],
  tunisia:["Tunisian Ligue Professionnelle 1",0,"Issam Jemâa","A Tunísia costuma ser compacta, competitiva e difícil de quebrar."],
  belgica:["Belgian Pro League",0,"Romelu Lukaku","A Bélgica tem talento ofensivo e uma geração recente de grande impacto."],
  egito:["Egyptian Premier League",0,"Hossam Hassan","O Egito une tradição africana, clubes fortes e paixão nacional por futebol."],
  ira:["Persian Gulf Pro League",0,"Ali Daei","O Irã tem uma seleção experiente, física e acostumada a disputar Copas."],
  "nova-zelandia":["New Zealand National League",0,"Chris Wood","A Nova Zelândia representa a Oceania com jogo intenso e direto."],
  espanha:["LaLiga",1,"David Villa","A Espanha é referência técnica, posse de bola e controle de jogo."],
  "cabo-verde":["Campeonato Nacional de Cabo Verde",0,"Ryan Mendes","Cabo Verde vive uma campanha histórica e muito simbólica para suas ilhas."],
  "arabia-saudita":["Saudi Pro League",0,"Majed Abdullah","A Arábia Saudita chega com liga em expansão e experiência em Copas."],
  uruguai:["Primera División Uruguaya",2,"Luis Suárez","O Uruguai tem tradição gigantesca, garra e cultura de mata-mata."],
  franca:["Ligue 1",2,"Olivier Giroud","A França combina formação de talentos, físico e repertório técnico."],
  senegal:["Ligue 1 Senegalesa",0,"Sadio Mané","Senegal é uma das grandes forças africanas contemporâneas."],
  iraque:["Iraq Stars League",0,"Hussein Saeed","O Iraque leva emoção, retorno histórico e orgulho regional."],
  noruega:["Eliteserien",0,"Jørgen Juve","A Noruega retorna com geração ofensiva e futebol nórdico em alta."],
  argentina:["Primera División Argentina",3,"Lionel Messi","A Argentina defende a tradição da Albiceleste e o título mundial recente."],
  argelia:["Ligue Professionnelle 1",0,"Islam Slimani","A Argélia tem técnica, força e tradição forte no norte da África."],
  austria:["Austrian Bundesliga",0,"Toni Polster","A Áustria joga com pressão, organização e intensidade europeia."],
  jordania:["Jordanian Pro League",0,"Hamza Al-Dardour","A Jordânia aparece como estreia histórica e símbolo de evolução asiática."],
  portugal:["Primeira Liga",0,"Cristiano Ronaldo","Portugal tem uma geração técnica e uma liga formadora de talentos."],
  "congo-dr":["Linafoot",0,"Dieumerci Mbokani","A RD Congo retorna com força física, música nas arquibancadas e identidade própria."],
  uzbequistao:["Uzbekistan Super League",0,"Eldor Shomurodov","O Uzbequistão estreia carregando a ascensão do futebol da Ásia Central."],
  colombia:["Categoría Primera A",0,"Radamel Falcao","A Colômbia une técnica, alegria e muito repertório ofensivo."],
  inglaterra:["Premier League",1,"Harry Kane","A Inglaterra carrega o berço moderno do futebol e enorme pressão por título."],
  croacia:["HNL",0,"Davor Šuker","A Croácia é pequena em população e gigante em resultados recentes."],
  gana:["Ghana Premier League",0,"Asamoah Gyan","Gana leva tradição africana, velocidade e memória de campanhas fortes."],
  panama:["Liga Panameña de Fútbol",0,"Blas Pérez","O Panamá busca consolidar sua segunda aparição em Copas."]
};
const CULTURE_PACK={
  default:{food:"Pratos tradicionais, mercados locais e sabores que mostram a mistura de povos.",tourism:"Capitais, paisagens naturais e lugares históricos que explicam a identidade do país.",history:"Momentos políticos, sociais e culturais que moldaram a forma como o país se apresenta ao mundo."},
  brasil:{food:"Feijoada, pão de queijo, acarajé, moqueca, churrasco e brigadeiro.",tourism:"Cristo Redentor, Amazônia, Lençóis Maranhenses, Pantanal e Cataratas do Iguaçu.",history:"Povos originários, colonização portuguesa, cultura afro-brasileira e diversidade regional."},
  bosnia:{food:"Ćevapi, burek, dolma e café bósnio servido com ritual próprio.",tourism:"Sarajevo, a Ponte de Mostar, montanhas olímpicas e vilas históricas.",history:"Um país marcado por encontros culturais entre Balcãs, Império Otomano e Europa Central."},
  franca:{food:"Croissant, queijos, vinhos, ratatouille e alta confeitaria.",tourism:"Torre Eiffel, Louvre, Versailles, Côte d’Azur e castelos do Loire.",history:"Revolução Francesa, arte moderna, iluminismo e influência cultural global."},
  espanha:{food:"Paella, tapas, tortilla, churros e jamón.",tourism:"Sagrada Família, Alhambra, Madrid, Sevilha e praias mediterrâneas.",history:"Reinos medievais, navegações, arte de Goya e Picasso e diversidade regional."},
  egito:{food:"Koshari, ful medames, molokhia e pães tradicionais.",tourism:"Pirâmides de Gizé, Luxor, Vale dos Reis, Rio Nilo e Cairo histórico.",history:"Civilização faraônica, escrita hieroglífica, templos monumentais e herança do Nilo."},
  inglaterra:{food:"Fish and chips, Sunday roast, pies e chá da tarde.",tourism:"Londres, Stonehenge, Oxford, museus e estádios históricos.",history:"Monarquia, Revolução Industrial, literatura e origem das regras modernas do futebol."}
};
COUNTRIES.forEach(country=>{
  const info=FOOTBALL_INFO[country.slug]||["Liga nacional",0,"Principal artilheiro histórico","Tradição futebolística em construção."];
  const pack=CULTURE_PACK[country.slug]||CULTURE_PACK.default;
  country.flag=`https://flagcdn.com/w160/${FLAG_CODES[country.slug]}.png`;
  country.flagLarge=`https://flagcdn.com/w640/${FLAG_CODES[country.slug]}.png`;
  country.league=info[0];
  country.worldCups=info[1];
  country.topScorer=info[2];
  country.footballNote=info[3];
  country.cultureCards=[
    {title:"Comidas típicas",text:pack.food},
    {title:"Turismo",text:pack.tourism},
    {title:"História marcante",text:pack.history}
  ];
});
const WELCOME_NATIVE={
  mexico:"BIENVENIDO A MÉXICO", "africa-do-sul":"WELCOME TO SOUTH AFRICA", "coreia-do-sul":"대한민국에 오신 것을 환영합니다", tchequia:"VÍTEJTE V ČESKU", canada:"WELCOME TO CANADA", bosnia:"DOBRO DOŠLI U BOSNU I HERCEGOVINU", qatar:"أهلاً وسهلاً في قطر", suica:"WILLKOMMEN IN DER SCHWEIZ", brasil:"SEJA BEM VINDO AO BRASIL", marrocos:"مرحباً بكم في المغرب", haiti:"BYENVENI AN AYITI", escocia:"WELCOME TO SCOTLAND", "estados-unidos":"WELCOME USA", paraguai:"BIENVENIDO A PARAGUAY", australia:"WELCOME TO AUSTRALIA", turquia:"TÜRKİYE'YE HOŞ GELDİNİZ", alemanha:"WILLKOMMEN IN DEUTSCHLAND", curacao:"BON BINI NA KÒRSOU", "costa-do-marfim":"BIENVENUE EN CÔTE D’IVOIRE", equador:"BIENVENIDO A ECUADOR", "paises-baixos":"WELKOM IN NEDERLAND", japao:"日本へようこそ", suecia:"VÄLKOMMEN TILL SVERIGE", tunisia:"أهلاً وسهلاً في تونس", belgica:"WELKOM IN BELGIË", egito:"أهلاً وسهلاً في مصر", ira:"به ایران خوش آمدید", "nova-zelandia":"WELCOME TO AOTEAROA NEW ZEALAND", espanha:"BIENVENIDO A ESPAÑA", "cabo-verde":"BEM-VINDO A CABO VERDE", "arabia-saudita":"أهلاً وسهلاً في السعودية", uruguai:"BIENVENIDO A URUGUAY", franca:"BIENVENUE EN FRANCE", senegal:"BIENVENUE AU SÉNÉGAL", iraque:"أهلاً وسهلاً في العراق", noruega:"VELKOMMEN TIL NORGE", argentina:"BIENVENIDO A ARGENTINA", argelia:"أهلاً وسهلاً في الجزائر", austria:"WILLKOMMEN IN ÖSTERREICH", jordania:"أهلاً وسهلاً في الأردن", portugal:"BEM-VINDO A PORTUGAL", "congo-dr":"BIENVENUE EN RD CONGO", uzbequistao:"OʻZBEKISTONGA XUSH KELIBSIZ", colombia:"BIENVENIDO A COLOMBIA", inglaterra:"WELCOME TO ENGLAND", croacia:"DOBRO DOŠLI U HRVATSKU", gana:"WELCOME TO GHANA", panama:"BIENVENIDO A PANAMÁ"
};
const PALETTES={
  brasil:["#009739","#ffdf00","#002776"], mexico:["#006847","#ffffff","#ce1126"], "estados-unidos":["#3c3b6e","#b22234","#ffffff"], argentina:["#75aadb","#ffffff","#f6b40e"], franca:["#0055a4","#ffffff","#ef4135"], alemanha:["#000000","#dd0000","#ffce00"], espanha:["#c60b1e","#ffc400","#aa151b"], inglaterra:["#ffffff","#cf142b","#00247d"], portugal:["#006600","#ff0000","#ffcc00"], uruguai:["#0038a8","#ffffff","#fcd116"], japao:["#ffffff","#bc002d","#111111"], marrocos:["#c1272d","#006233","#ffffff"], canada:["#d52b1e","#ffffff","#111111"], egito:["#ce1126","#ffffff","#000000"], bosnia:["#002f6c","#fcd116","#ffffff"]
};
COUNTRIES.forEach(country=>{
  const palette=PALETTES[country.slug]||[country.accent,"#ffc400","#081225"];
  country.palette=palette;
  country.welcomeNative=WELCOME_NATIVE[country.slug]||`WELCOME TO ${country.name.toUpperCase()}`;
  const query=encodeURIComponent(country.name.replace("IR Irã","Iran"));
  const local=(country.image||fallback).replace("paises/","");
  country.gallery=[
    country.flagLarge,
    local,
    `https://source.unsplash.com/1200x800/?${query},landmark`,
    `https://source.unsplash.com/1200x800/?${query},culture`,
    `https://source.unsplash.com/1200x800/?football,stadium,${query}`
  ];
});
