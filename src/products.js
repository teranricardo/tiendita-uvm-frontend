// Realizado por Leandro Valera

const products = [
  {
    category: 'Ropa Personalizada',
    description: 'Encuentra prendas únicas y personalizables, ideales para eventos y uso diario.',
    items: [
      { id: 1, name: 'Franelas Dama', image: '../images/franelas_dama.png', price: '$10.00', description: 'Franelas cómodas y frescas, ideales para el uso diario.' },
      { id: 2, name: 'Franelas Caballero', image: '/images/franelas_caballero.png', price: '$10.00', description: 'Franelas de alta calidad para caballeros en varios colores.' },
      { id: 3, name: 'Suéter Dama', image: '/images/sueter_dama.png', price: '$15.00', description: 'Suéteres ideales para mantenerse cálido y con estilo.' },
      { id: 4, name: 'Suéter Caballero', image: '/images/sueter_caballero.png', price: '$15.00', description: 'Suéteres casuales para cualquier ocasión.' },
      { id: 5, name: 'Gorras Personalizadas', image: '/images/gorras.png', price: '$8.00', description: 'Gorras personalizadas con variedad de colores y estilos.' },
    ],
  },
  {
    category: 'Accesorios Personalizados',
    description: 'Dale un toque especial a tus accesorios con productos únicos y personalizables.',
    items: [
      { id: 6, name: 'Lazos', image: '/images/lazos.png', price: '$4.00', description: 'Lazos de distintos colores para complementar cualquier estilo.' },
      { id: 7, name: 'Head Band', image: '/images/head_band.png', price: '$3.00', description: 'Head bands personalizables, ideales para cualquier ocasión.' },
      { id: 8, name: 'Pulseras', image: '/images/pulseras.png', price: '$3.00', description: 'Pulseras de bisutería, ideales como detalles o regalos.' },
      { id: 9, name: 'Mini Lanyards', image: '/images/mini_lanyards.png', price: '$2.00', description: 'Mini lanyards personalizables, ideales para llaves y eventos.' },
      { id: 10, name: 'Tazas Personalizadas', image: '/images/tazas.png', price: '$5.00', description: 'Tazas personalizadas, perfectas para regalos o uso diario.' },
    ],
  },
  {
    category: 'Papelería Creativa',
    description: 'Organiza tus días con productos creativos que inspiran.',
    items: [
      { id: 11, name: 'Agendas', image: '/images/agendas.png', price: '$7.00', description: 'Agendas creativas para organizar tu día a día con estilo.' },
      { id: 12, name: 'Mini Block', image: '/images/mini_block.png', price: '$2.00', description: 'Mini blocks personalizables para notas y recordatorios.' },
      { id: 13, name: 'Calendarios', image: '/images/calendarios.png', price: '$6.00', description: 'Calendarios de escritorio con diseño exclusivo.' },
      { id: 14, name: 'Cartuchera', image: '/images/cartuchera.png', price: '$4.00', description: 'Cartucheras para útiles escolares, disponibles en varios diseños.' },
    ],
  },
  {
    category: 'Regalos Personalizados',
    description: 'Explora nuestra colección de regalos únicos y personalizables.',
    items: [
      { id: 15, name: 'Llaveros', image: '/images/llaveros.png', price: '$5.00', description: 'Llaveros personalizados con distintos diseños y colores.' },
      { id: 16, name: 'Porta Cosméticos', image: '/images/porta_cosmeticos.png', price: '$6.00', description: 'Porta cosméticos ideales para organizar tu maquillaje.' },
      { id: 17, name: 'Bolígrafos Personalizados', image: '/images/boligrafos.png', price: '$2.00', description: 'Bolígrafos personalizados, perfectos para cualquier evento.' },
      { id: 18, name: 'Marca Libros', image: '/images/marca_libro.png', price: '$3.00', description: 'Marca libros personalizables, ideales para lectores.' },
      { id: 19, name: 'Bolsas Ecológicas', image: '/images/bolsa_ecologica.png', price: '$6.00', description: 'Bolsas ecológicas, reutilizables y de diseño atractivo.' },
    ],
  },
  {
    category: 'Decoración y Organización de Eventos',
    description: 'Servicios completos para la planificación y decoración de eventos.',
    items: [
      { id: 20, name: 'Decoración de Bodas', image: '/images/decoracion_bodas.png', price: 'Consultar', description: 'Servicio completo de decoración para bodas.' },
      { id: 21, name: 'Cumpleaños Temáticos', image: '/images/cumpleaños_tematicos.png', price: 'Consultar', description: 'Planificación de cumpleaños con decoraciones personalizadas.' },
      { id: 22, name: 'Eventos Corporativos', image: '/images/eventos_corporativos.png', price: 'Consultar', description: 'Decoración para eventos corporativos y reuniones de empresa.' },
      { id: 23, name: 'Arreglos Florales', image: '/images/arreglos_florales.png', price: 'Consultar', description: 'Arreglos florales personalizados para cualquier evento especial.' },
    ],
  },
];

export default products;