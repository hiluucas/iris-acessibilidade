import { 
  Eye, Type, MousePointer, Hash, Layout, Image, 
  Keyboard, Brain, Video, Smartphone, AlertOctagon, 
  Maximize, RefreshCw, Hand, Lock 
} from 'lucide-react';

export const knowledgeBase = [
  // --- VISUAL ---
  {
    id: 'color-contrast',
    category: 'Visual',
    icon: Eye,
    title: 'Contraste e Legibilidade',
    impact: 'Crítico',
    why: 'O baixo contraste torna o conteúdo ilegível para pessoas com baixa visão, daltonismo ou para qualquer pessoa usando o celular sob a luz do sol. O texto não pode "se misturar" com o fundo.',
    fix: 'Garanta contraste mínimo de 4.5:1 para texto normal e 3:1 para texto grande/ícones. Use cores sólidas e verifique em escala de cinza.',
    wcag: '1.4.3 (AA)'
  },
  {
    id: 'text-resize',
    category: 'Visual',
    icon: Maximize,
    title: 'Redimensionamento de Texto',
    impact: 'Sério',
    why: 'Muitos usuários configuram o navegador para mostrar fontes 200% maiores. Se seu site quebra, sobrepõe textos ou esconde botões ao dar zoom, ele exclui essas pessoas.',
    fix: 'Use unidades relativas (rem, em, %) em vez de fixas (px) para tamanhos de fonte e containers. Teste o zoom do navegador.',
    wcag: '1.4.4 (AA)'
  },
  {
    id: 'visual-presentation',
    category: 'Visual',
    icon: Type,
    title: 'Uso de Cor como Único Meio',
    impact: 'Crítico',
    why: 'Se você usa apenas a cor vermelha para indicar erro, daltônicos não perceberão. A informação não pode depender exclusivamente da percepção cromática.',
    fix: 'Use ícones, sublinhados ou textos de apoio junto com a cor. Ex: Um gráfico de linhas deve ter texturas ou símbolos diferentes, não só cores.',
    wcag: '1.4.1 (A)'
  },

  // --- CONTEÚDO E SEMÂNTICA ---
  {
    id: 'image-alt',
    category: 'Conteúdo',
    icon: Image,
    title: 'Texto Alternativo (Alt)',
    impact: 'Crítico',
    why: 'Para um usuário cego, uma imagem sem descrição é um buraco negro no conteúdo. Além disso, se a imagem não carregar, o texto alternativo salva a experiência.',
    fix: 'Descreva a função e o conteúdo da imagem no atributo alt="". Se for decorativa (enfeite), use alt="" vazio.',
    wcag: '1.1.1 (A)'
  },
  {
    id: 'heading-order',
    category: 'Conteúdo',
    icon: Type,
    title: 'Hierarquia de Títulos',
    impact: 'Moderado',
    why: 'Títulos (H1-H6) criam o esqueleto da página. Pular de H1 para H4 confunde quem navega via teclado ou leitor de tela, que usa atalhos para "pular" entre seções.',
    fix: 'Mantenha a ordem lógica: H1 (Principal) > H2 (Seções) > H3 (Subseções). Nunca pule níveis apenas para estética visual.',
    wcag: '1.3.1 (A)'
  },
  {
    id: 'link-name',
    category: 'Conteúdo',
    icon: MousePointer,
    title: 'Links Descritivos',
    impact: 'Sério',
    why: 'Links como "Clique aqui" ou "Saiba mais" fora de contexto são inúteis para quem usa leitores de tela, que muitas vezes listam apenas os links da página para navegar.',
    fix: 'O texto do link deve descrever o destino. Ex: "Leia mais sobre Acessibilidade" em vez de apenas "Leia mais".',
    wcag: '2.4.4 (A)'
  },

  // --- NAVEGAÇÃO E INTERATIVIDADE ---
  {
    id: 'keyboard-nav',
    category: 'Navegação',
    icon: Keyboard,
    title: 'Acessibilidade via Teclado',
    impact: 'Crítico',
    why: 'Muitos usuários (motores, visuais ou power users) não usam mouse. Se o site não funciona apenas com TAB, ENTER e ESPAÇO, ele está quebrado para essas pessoas.',
    fix: 'Garanta que todos os botões, links e forms sejam alcançáveis via Tab e acionáveis via Enter/Espaço. Não crie "armadilhas" de foco.',
    wcag: '2.1.1 (A)'
  },
  {
    id: 'focus-visible',
    category: 'Navegação',
    icon: Eye,
    title: 'Foco Visível',
    impact: 'Crítico',
    why: 'Ao navegar com teclado, o usuário precisa saber onde está. Remover a borda de foco (outline: none) sem dar alternativa faz o usuário se perder completamente.',
    fix: 'Nunca remova o outline padrão do navegador a menos que substitua por outro estilo visual de foco claro e evidente.',
    wcag: '2.4.7 (AA)'
  },
  {
    id: 'button-name',
    category: 'Interatividade',
    icon: MousePointer,
    title: 'Nomes Acessíveis em Botões',
    impact: 'Crítico',
    why: 'Botões que são apenas ícones (ex: uma lupa, um X) são invisíveis para leitores de tela se não tiverem um nome programático.',
    fix: 'Use texto visível sempre que possível. Se for só ícone, use aria-label="Buscar" ou texto oculto com a classe sr-only.',
    wcag: '4.1.2 (A)'
  },
  {
    id: 'target-size',
    category: 'Interatividade',
    icon: Smartphone,
    title: 'Tamanho do Alvo (Toque)',
    impact: 'Sério',
    why: 'Botões pequenos frustram quem tem dedos largos ou tremores nas mãos (Parkinson, por exemplo). Clicar no lugar errado é uma falha grave de UX.',
    fix: 'Garanta uma área clicável de pelo menos 24x24 pixels CSS (WCAG 2.2). O ideal recomendado é 44x44px.',
    wcag: '2.5.8 (AA)'
  },
  {
    id: 'dragging-movements',
    category: 'Interatividade',
    icon: Hand,
    title: 'Alternativa para Arrastar',
    impact: 'Moderado',
    why: 'Movimentos de "arrastar e soltar" (Drag & Drop) exigem destreza motora fina e mouse preciso. Isso é impossível para quem usa rastreador ocular ou teclado.',
    fix: 'Forneça uma alternativa de clique simples para mover itens (ex: botões "Mover para cima/baixo").',
    wcag: '2.5.7 (AA)'
  },

  // --- TÉCNICO E FORMULÁRIOS ---
  {
    id: 'html-has-lang',
    category: 'Técnico',
    icon: Hash,
    title: 'Idioma da Página',
    impact: 'Sério',
    why: 'Define o "sotaque" do leitor de tela. Um site em PT-BR sem essa tag será lido com sotaque inglês, tornando o conteúdo ininteligível.',
    fix: 'Sempre declare o idioma na tag raiz: <html lang="pt-BR">.',
    wcag: '3.1.1 (A)'
  },
  {
    id: 'label',
    category: 'Formulários',
    icon: Layout,
    title: 'Etiquetas (Labels) em Campos',
    impact: 'Crítico',
    why: 'Um campo de input sem etiqueta é um mistério para cegos. Eles ouvem "campo de edição" mas não sabem se é para Nome, Email ou Senha.',
    fix: 'Use a tag <label> vinculada ao input via id/for, ou aria-label se o design não permitir texto visível.',
    wcag: '3.3.2 (A)'
  },
  {
    id: 'error-identification',
    category: 'Formulários',
    icon: AlertOctagon,
    title: 'Identificação de Erros',
    impact: 'Sério',
    why: 'Apenas pintar a borda de vermelho não explica o erro. Usuários cognitivos ou cegos precisam saber ONDE errou e O QUE fazer.',
    fix: 'Descreva o erro em texto ("O email é obrigatório") e conecte a mensagem ao campo usando aria-describedby.',
    wcag: '3.3.1 (A)'
  },
  {
    id: 'accessible-auth',
    category: 'Técnico',
    icon: Lock,
    title: 'Autenticação Acessível',
    impact: 'Sério',
    why: 'Testes cognitivos (como quebra-cabeças, memorizar senhas complexas ou transcrever códigos) bloqueiam pessoas com dislexia ou problemas de memória.',
    fix: 'Não bloqueie o "Colar" (Paste) nos campos de senha. Permita gerenciadores de senha e métodos alternativos de login (link mágico, biometria).',
    wcag: '3.3.8 (AA)'
  },

  // --- MULTIMÍDIA E COGNITIVO ---
  {
    id: 'captions',
    category: 'Multimídia',
    icon: Video,
    title: 'Legendas (Closed Captions)',
    impact: 'Crítico',
    why: 'Surdos ou pessoas em ambientes barulhentos (ou silenciosos, como bibliotecas) não consomem vídeos sem legenda. A legenda deve incluir diálogos e sons importantes.',
    fix: 'Forneça legendas sincronizadas para todo conteúdo de vídeo pré-gravado.',
    wcag: '1.2.2 (A)'
  },
  {
    id: 'motion-reduction',
    category: 'Cognitivo',
    icon: Brain,
    title: 'Redução de Movimento',
    impact: 'Moderado',
    why: 'Animações rápidas, parallax e auto-play podem causar náusea, tontura e convulsões em pessoas com distúrbios vestibulares.',
    fix: 'Respeite a media query "prefers-reduced-motion". Evite flashes que ocorram mais de 3 vezes por segundo.',
    wcag: '2.2.2 (A)'
  },
  {
    id: 'consistent-nav',
    category: 'Cognitivo',
    icon: RefreshCw,
    title: 'Navegação Consistente',
    impact: 'Moderado',
    why: 'Mudar a ordem do menu ou a localização da busca em cada página confunde usuários com limitações cognitivas que dependem de padrões para aprender a usar o site.',
    fix: 'Mantenha menus, busca e rodapé na mesma ordem relativa em todas as páginas do site.',
    wcag: '3.2.3 (AA)'
  }
];