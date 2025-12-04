import { Eye, Type, MousePointer, Hash, Layout, Image, Keyboard } from 'lucide-react';

export const knowledgeBase = [
  {
    id: 'color-contrast',
    category: 'Visual',
    icon: Eye,
    title: 'Contraste de Cores',
    impact: 'Crítico',
    why: 'Pessoas com baixa visão, daltonismo ou quem usa o celular sob luz solar forte não conseguem ler se não houver distinção clara entre texto e fundo.',
    fix: 'Garanta uma taxa de contraste de pelo menos 4.5:1 para textos normais. Use ferramentas como o Contrast Checker durante o design.',
    wcag: '1.4.3'
  },
  {
    id: 'image-alt',
    category: 'Conteúdo',
    icon: Image,
    title: 'Texto Alternativo em Imagens',
    impact: 'Crítico',
    why: 'Imagens sem descrição são invisíveis para cegos. O leitor de tela apenas dirá "imagem" ou o nome do arquivo, o que não agrega valor.',
    fix: 'Use o atributo alt="" descrevendo a função ou o conteúdo da imagem. Se for decorativa, deixe alt="" vazio.',
    wcag: '1.1.1'
  },
  {
    id: 'html-has-lang',
    category: 'Técnico',
    icon: Hash,
    title: 'Idioma da Página',
    impact: 'Sério',
    why: 'Define o sotaque do sintetizador de voz. Sem isso, um texto em português pode ser lido com pronúncia inglesa, tornando-se ininteligível.',
    fix: 'Sempre declare o idioma na tag raiz: <html lang="pt-BR">.',
    wcag: '3.1.1'
  },
  {
    id: 'link-name',
    category: 'Semântica',
    icon: MousePointer,
    title: 'Links Descritivos',
    impact: 'Sério',
    why: 'Links como "Clique aqui" ou "Saiba mais" fora de contexto são inúteis para quem navega pulando de link em link.',
    fix: 'O texto do link deve descrever o destino. Ex: "Saiba mais sobre nossos planos".',
    wcag: '2.4.4'
  },
  {
    id: 'button-name',
    category: 'Interatividade',
    icon: MousePointer,
    title: 'Nomes de Botões',
    impact: 'Crítico',
    why: 'Botões que são apenas ícones (sem texto) precisam de um rótulo invisível, senão o usuário não sabe o que o botão faz.',
    fix: 'Use texto visível ou aria-label="Ação" se o botão for apenas um ícone.',
    wcag: '4.1.2'
  },
  {
    id: 'heading-order',
    category: 'Semântica',
    icon: Type,
    title: 'Hierarquia de Títulos',
    impact: 'Moderado',
    why: 'Pular de H2 para H4 confunde a estrutura mental que o usuário cria sobre o conteúdo da página.',
    fix: 'Siga a ordem lógica: H1 (título principal) -> H2 (seções) -> H3 (subseções). Não pule níveis.',
    wcag: '1.3.1'
  },
  {
    id: 'label',
    category: 'Formulários',
    icon: Layout,
    title: 'Etiquetas de Formulário',
    impact: 'Crítico',
    why: 'Campos sem etiqueta deixam o usuário cego sem saber que dado inserir (Nome? Email?).',
    fix: 'Use a tag <label> ou aria-label em todos os inputs.',
    wcag: '3.3.2'
  },
  {
    id: 'keyboard-nav',
    category: 'Navegação',
    icon: Keyboard,
    title: 'Navegação por Teclado',
    impact: 'Crítico',
    why: 'Muitos usuários não usam mouse (por deficiência motora). Se o site não funciona só com TAB e ENTER, ele é inacessível.',
    fix: 'Garanta que todos os elementos interativos tenham foco visível e sejam alcançáveis via teclado.',
    wcag: '2.1.1'
  }
];