import { NewsArticle, NewsTag } from '@/types/news';
import { mockAuthors } from './mockUsers';
import { mockCategories } from './mockCategories';

/**
 * Моковые теги для новостей
 */
const mockTags: NewsTag[] = [
  { id: 'tag-1', name: 'Россия', slug: 'russia', color: '#FF6B6B' },
  { id: 'tag-2', name: 'США', slug: 'usa', color: '#4ECDC4' },
  { id: 'tag-3', name: 'Европа', slug: 'europe', color: '#45B7D1' },
  { id: 'tag-4', name: 'Китай', slug: 'china', color: '#96CEB4' },
  { id: 'tag-5', name: 'Технологии', slug: 'technology', color: '#FFEAA7' },
  { id: 'tag-6', name: 'Экономика', slug: 'economy', color: '#DDA0DD' },
  { id: 'tag-7', name: 'Климат', slug: 'climate', color: '#98FB98' },
  { id: 'tag-8', name: 'Здоровье', slug: 'health', color: '#F0E68C' },
  { id: 'tag-9', name: 'Образование', slug: 'education', color: '#FFB6C1' },
  { id: 'tag-10', name: 'Культура', slug: 'culture', color: '#87CEEB' },
  { id: 'tag-11', name: 'Спорт', slug: 'sports', color: '#F4A460' },
  { id: 'tag-12', name: 'Наука', slug: 'science', color: '#20B2AA' },
  { id: 'tag-13', name: 'ИИ', slug: 'ai', color: '#9370DB' },
  { id: 'tag-14', name: 'Космос', slug: 'space', color: '#4169E1' },
  { id: 'tag-15', name: 'Энергетика', slug: 'energy', color: '#FFD700' }
];

/**
 * Моковые данные новостных статей
 */
export const mockNews: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Новые санкции ЕС против России: что изменится для экономики',
    content: 'Европейский союз ввел новый пакет санкций против России, который включает ограничения на экспорт технологий и финансовые операции. Эксперты прогнозируют влияние на ключевые секторы экономики...',
    excerpt: 'ЕС вводит новый пакет санкций против России, который затронет технологический и финансовый секторы. Эксперты анализируют возможные последствия для экономики.',
    author: mockAuthors[0], // Анна Петрова
    category: mockCategories[1], // Политика
    tags: [mockTags[0], mockTags[2], mockTags[5]], // Россия, Европа, Экономика
    publishedAt: new Date('2024-01-15T10:30:00Z'),
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=250&fit=crop',
    isRead: false,
    isBookmarked: true,
    views: 15420,
    likes: 234,
    comments: 45,
    slug: 'new-eu-sanctions-russia-economy',
    seoTitle: 'Новые санкции ЕС против России: влияние на экономику',
    seoDescription: 'Анализ нового пакета санкций ЕС против России и их влияние на экономические секторы',
    status: 'published',
    updatedAt: new Date('2024-01-15T10:30:00Z'),
    createdAt: new Date('2024-01-15T09:00:00Z')
  },
  {
    id: 'news-2',
    title: 'Прорыв в квантовых вычислениях: новый алгоритм ускорит расчеты в 1000 раз',
    content: 'Исследователи из MIT разработали революционный алгоритм для квантовых компьютеров, который может кардинально изменить скорость обработки данных. Новый подход использует принципы квантовой запутанности...',
    excerpt: 'Ученые MIT создали алгоритм, который ускоряет квантовые вычисления в 1000 раз. Это может революционизировать криптографию и научные расчеты.',
    author: mockAuthors[1], // Дмитрий Волков
    category: mockCategories[2], // Наука
    tags: [mockTags[4], mockTags[12], mockTags[13]], // Технологии, Наука, ИИ
    publishedAt: new Date('2024-01-14T14:20:00Z'),
    readTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
    isRead: true,
    isBookmarked: false,
    views: 8930,
    likes: 156,
    comments: 23,
    slug: 'quantum-computing-breakthrough-mit-algorithm',
    seoTitle: 'Прорыв в квантовых вычислениях: алгоритм MIT',
    seoDescription: 'Новый алгоритм для квантовых компьютеров ускоряет вычисления в 1000 раз',
    status: 'published',
    updatedAt: new Date('2024-01-14T14:20:00Z'),
    createdAt: new Date('2024-01-14T12:00:00Z')
  },
  {
    id: 'news-3',
    title: 'Историческое открытие: найдена древняя библиотека в Египте',
    content: 'Археологи обнаружили в Египте древнюю библиотеку с тысячами папирусов, датируемых 3 веком до нашей эры. Среди находок - неизвестные ранее тексты по математике и астрономии...',
    excerpt: 'В Египте найдена древняя библиотека с уникальными папирусами. Открытие может переписать историю древней науки и математики.',
    author: mockAuthors[2], // Елена Соколова
    category: mockCategories[3], // История
    tags: [mockTags[10], mockTags[12]], // Культура, Наука
    publishedAt: new Date('2024-01-13T16:45:00Z'),
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=250&fit=crop',
    isRead: false,
    isBookmarked: true,
    views: 12300,
    likes: 189,
    comments: 34,
    slug: 'ancient-library-discovered-egypt-papyrus',
    seoTitle: 'Древняя библиотека найдена в Египте',
    seoDescription: 'Археологи обнаружили древнюю библиотеку с уникальными папирусами в Египте',
    status: 'published',
    updatedAt: new Date('2024-01-13T16:45:00Z'),
    createdAt: new Date('2024-01-13T15:00:00Z')
  },
  {
    id: 'news-4',
    title: 'ФРС повышает ставку: как это повлияет на мировые рынки',
    content: 'Федеральная резервная система США объявила о повышении базовой процентной ставки на 0.25%. Решение может повлиять на валютные курсы и инвестиционные потоки по всему миру...',
    excerpt: 'ФРС повысила ставку на 0.25%. Эксперты анализируют влияние на мировые финансовые рынки и валютные курсы.',
    author: mockAuthors[3], // Михаил Козлов
    category: mockCategories[5], // Финансы
    tags: [mockTags[1], mockTags[5]], // США, Экономика
    publishedAt: new Date('2024-01-12T11:15:00Z'),
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
    isRead: true,
    isBookmarked: false,
    views: 18750,
    likes: 267,
    comments: 78,
    slug: 'fed-rate-hike-global-markets-impact',
    seoTitle: 'Повышение ставки ФРС: влияние на рынки',
    seoDescription: 'Анализ влияния повышения ставки ФРС на мировые финансовые рынки',
    status: 'published',
    updatedAt: new Date('2024-01-12T11:15:00Z'),
    createdAt: new Date('2024-01-12T09:30:00Z')
  },
  {
    id: 'news-5',
    title: 'Исследование: социальные сети влияют на психическое здоровье подростков',
    content: 'Новое исследование Гарвардского университета показывает, что время, проведенное в социальных сетях, напрямую коррелирует с уровнем тревожности и депрессии у подростков...',
    excerpt: 'Гарвардское исследование выявило связь между использованием соцсетей и психическим здоровьем подростков. Результаты могут изменить подход к цифровой гигиене.',
    author: mockAuthors[4], // Ольга Морозова
    category: mockCategories[4], // Исследования
    tags: [mockTags[4], mockTags[8]], // Технологии, Здоровье
    publishedAt: new Date('2024-01-11T13:30:00Z'),
    readTime: 8,
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop',
    isRead: false,
    isBookmarked: true,
    views: 9650,
    likes: 145,
    comments: 56,
    slug: 'social-media-teen-mental-health-harvard-study',
    seoTitle: 'Соцсети и психическое здоровье подростков',
    seoDescription: 'Исследование Гарварда о влиянии социальных сетей на психику подростков',
    status: 'published',
    updatedAt: new Date('2024-01-11T13:30:00Z'),
    createdAt: new Date('2024-01-11T11:00:00Z')
  },
  {
    id: 'news-6',
    title: 'ИИ ChatGPT-5: революция в обработке естественного языка',
    content: 'OpenAI анонсировала новую версию ChatGPT-5 с улучшенными возможностями понимания контекста и генерации текста. Система может обрабатывать до 1 миллиона токенов одновременно...',
    excerpt: 'OpenAI представила ChatGPT-5 с кардинально улучшенными возможностями. Новая модель может обрабатывать в 10 раз больше контекста.',
    author: mockAuthors[5], // Александр Новиков
    category: mockCategories[2], // Наука
    tags: [mockTags[4], mockTags[13]], // Технологии, ИИ
    publishedAt: new Date('2024-01-10T09:00:00Z'),
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    isRead: true,
    isBookmarked: false,
    views: 22100,
    likes: 389,
    comments: 92,
    slug: 'chatgpt-5-openai-natural-language-revolution',
    seoTitle: 'ChatGPT-5: новая эра ИИ',
    seoDescription: 'OpenAI анонсировала ChatGPT-5 с революционными возможностями',
    status: 'published',
    updatedAt: new Date('2024-01-10T09:00:00Z'),
    createdAt: new Date('2024-01-10T07:00:00Z')
  },
  {
    id: 'news-7',
    title: 'Климатический саммит в Дубае: новые обязательства по сокращению выбросов',
    content: 'На климатическом саммите в Дубае 50 стран подписали соглашение о сокращении выбросов парниковых газов на 50% к 2030 году. Документ включает конкретные меры по переходу на возобновляемую энергию...',
    excerpt: '50 стран подписали соглашение о сокращении выбросов на 50% к 2030 году. Саммит в Дубае может стать поворотным моментом в борьбе с изменением климата.',
    author: mockAuthors[8], // Мария Кузнецова
    category: mockCategories[4], // Исследования
    tags: [mockTags[7], mockTags[15]], // Климат, Энергетика
    publishedAt: new Date('2024-01-09T15:20:00Z'),
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de6e4a5a2c4e?w=400&h=250&fit=crop',
    isRead: false,
    isBookmarked: false,
    views: 13400,
    likes: 198,
    comments: 41,
    slug: 'dubai-climate-summit-emissions-reduction-agreement',
    seoTitle: 'Климатический саммит в Дубае: новые цели',
    seoDescription: '50 стран подписали соглашение о сокращении выбросов на 50% к 2030 году',
    status: 'published',
    updatedAt: new Date('2024-01-09T15:20:00Z'),
    createdAt: new Date('2024-01-09T13:00:00Z')
  },
  {
    id: 'news-8',
    title: 'Китай запустил новую космическую станцию: конкуренция с МКС',
    content: 'Китай успешно запустил модуль новой космической станции "Тяньгун-3", которая может стать альтернативой Международной космической станции. Станция рассчитана на 6 астронавтов...',
    excerpt: 'Китай запустил модуль станции "Тяньгун-3", которая может конкурировать с МКС. Новая станция рассчитана на 6 астронавтов и современные исследования.',
    author: mockAuthors[1], // Дмитрий Волков
    category: mockCategories[2], // Наука
    tags: [mockTags[3], mockTags[14]], // Китай, Космос
    publishedAt: new Date('2024-01-08T12:45:00Z'),
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop',
    isRead: true,
    isBookmarked: true,
    views: 16700,
    likes: 223,
    comments: 67,
    slug: 'china-tiangong-3-space-station-launch',
    seoTitle: 'Китай запустил космическую станцию Тяньгун-3',
    seoDescription: 'Новая китайская космическая станция может конкурировать с МКС',
    status: 'published',
    updatedAt: new Date('2024-01-08T12:45:00Z'),
    createdAt: new Date('2024-01-08T10:00:00Z')
  },
  {
    id: 'news-9',
    title: 'Россия и Китай подписали соглашение о сотрудничестве в Арктике',
    content: 'Россия и Китай подписали историческое соглашение о совместном освоении арктических ресурсов. Документ включает проекты по добыче нефти, газа и развитию Северного морского пути...',
    excerpt: 'Россия и Китай подписали соглашение о совместном освоении Арктики. Сотрудничество включает добычу ресурсов и развитие Северного морского пути.',
    author: mockAuthors[0], // Анна Петрова
    category: mockCategories[1], // Политика
    tags: [mockTags[0], mockTags[3], mockTags[15]], // Россия, Китай, Энергетика
    publishedAt: new Date('2024-01-07T14:10:00Z'),
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=250&fit=crop',
    isRead: false,
    isBookmarked: false,
    views: 18900,
    likes: 156,
    comments: 89,
    slug: 'russia-china-arctic-cooperation-agreement',
    seoTitle: 'Россия и Китай: соглашение по Арктике',
    seoDescription: 'Соглашение о совместном освоении арктических ресурсов',
    status: 'published',
    updatedAt: new Date('2024-01-07T14:10:00Z'),
    createdAt: new Date('2024-01-07T12:00:00Z')
  },
  {
    id: 'news-10',
    title: 'Исследование: криптовалюты могут заменить традиционные банки',
    content: 'Новое исследование MIT показывает, что децентрализованные финансовые системы на основе блокчейна могут заменить традиционные банки в течение 10 лет. Ключевые преимущества - низкие комиссии и доступность...',
    excerpt: 'Исследование MIT предсказывает замену традиционных банков криптовалютными системами. Децентрализованные финансы могут стать основой новой экономики.',
    author: mockAuthors[7], // Сергей Федоров
    category: mockCategories[5], // Финансы
    tags: [mockTags[4], mockTags[5]], // Технологии, Экономика
    publishedAt: new Date('2024-01-06T16:30:00Z'),
    readTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
    isRead: true,
    isBookmarked: true,
    views: 11200,
    likes: 178,
    comments: 124,
    slug: 'cryptocurrency-replace-banks-mit-study',
    seoTitle: 'Криптовалюты заменят банки: исследование MIT',
    seoDescription: 'Исследование MIT о будущем децентрализованных финансов',
    status: 'published',
    updatedAt: new Date('2024-01-06T16:30:00Z'),
    createdAt: new Date('2024-01-06T14:00:00Z')
  },
  {
    id: 'news-11',
    title: 'Новый вирус гриппа: ВОЗ объявляет пандемию',
    content: 'Всемирная организация здравоохранения объявила пандемию нового штамма гриппа H5N8. Вирус показал высокую заразность и устойчивость к существующим вакцинам. Начата разработка новых препаратов...',
    excerpt: 'ВОЗ объявила пандемию нового штамма гриппа H5N8. Вирус устойчив к вакцинам, начата разработка новых препаратов для лечения.',
    author: mockAuthors[4], // Ольга Морозова
    category: mockCategories[4], // Исследования
    tags: [mockTags[8]], // Здоровье
    publishedAt: new Date('2024-01-05T08:15:00Z'),
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop',
    isRead: false,
    isBookmarked: false,
    views: 25600,
    likes: 312,
    comments: 156,
    slug: 'who-declares-h5n8-flu-pandemic',
    seoTitle: 'ВОЗ объявляет пандемию гриппа H5N8',
    seoDescription: 'Новый штамм гриппа H5N8 объявлен пандемией ВОЗ',
    status: 'published',
    updatedAt: new Date('2024-01-05T08:15:00Z'),
    createdAt: new Date('2024-01-05T06:00:00Z')
  },
  {
    id: 'news-12',
    title: 'Европа инвестирует 100 млрд евро в зеленую энергетику',
    content: 'Европейский союз объявил о крупнейшей в истории инвестиционной программе в возобновляемую энергетику. 100 млрд евро будут направлены на развитие солнечных и ветровых электростанций...',
    excerpt: 'ЕС инвестирует 100 млрд евро в зеленую энергетику. Программа направлена на развитие солнечных и ветровых электростанций по всей Европе.',
    author: mockAuthors[8], // Мария Кузнецова
    category: mockCategories[5], // Финансы
    tags: [mockTags[2], mockTags[7], mockTags[15]], // Европа, Климат, Энергетика
    publishedAt: new Date('2024-01-04T11:40:00Z'),
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop',
    isRead: true,
    isBookmarked: false,
    views: 14300,
    likes: 201,
    comments: 73,
    slug: 'eu-100-billion-green-energy-investment',
    seoTitle: 'ЕС инвестирует 100 млрд в зеленую энергетику',
    seoDescription: 'Крупнейшая инвестиционная программа ЕС в возобновляемую энергетику',
    status: 'published',
    updatedAt: new Date('2024-01-04T11:40:00Z'),
    createdAt: new Date('2024-01-04T09:00:00Z')
  },
  {
    id: 'news-13',
    title: 'ИИ обнаружил новую экзопланету в обитаемой зоне',
    content: 'Искусственный интеллект NASA обнаружил новую экзопланету размером с Землю в обитаемой зоне звезды. Планета находится на расстоянии 100 световых лет и может иметь жидкую воду...',
    excerpt: 'ИИ NASA нашел новую экзопланету в обитаемой зоне. Планета размером с Землю может иметь условия для жизни.',
    author: mockAuthors[1], // Дмитрий Волков
    category: mockCategories[2], // Наука
    tags: [mockTags[13], mockTags[14]], // ИИ, Космос
    publishedAt: new Date('2024-01-03T13:25:00Z'),
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop',
    isRead: false,
    isBookmarked: true,
    views: 17800,
    likes: 245,
    comments: 58,
    slug: 'ai-discovers-habitable-exoplanet-nasa',
    seoTitle: 'ИИ нашел обитаемую экзопланету',
    seoDescription: 'NASA использует ИИ для поиска экзопланет в обитаемых зонах',
    status: 'published',
    updatedAt: new Date('2024-01-03T13:25:00Z'),
    createdAt: new Date('2024-01-03T11:00:00Z')
  },
  {
    id: 'news-14',
    title: 'Историческая находка: обнаружен древний город майя',
    content: 'Археологи обнаружили в джунглях Гватемалы древний город майя, который был скрыт под растительностью более 1000 лет. Город включает пирамиды, храмы и систему дорог...',
    excerpt: 'В джунглях Гватемалы найден древний город майя. Открытие может переписать историю цивилизации майя и их архитектурных достижений.',
    author: mockAuthors[2], // Елена Соколова
    category: mockCategories[3], // История
    tags: [mockTags[10]], // Культура
    publishedAt: new Date('2024-01-02T15:50:00Z'),
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400&h=250&fit=crop',
    isRead: true,
    isBookmarked: false,
    views: 12900,
    likes: 167,
    comments: 42,
    slug: 'ancient-maya-city-discovered-guatemala',
    seoTitle: 'Древний город майя найден в Гватемале',
    seoDescription: 'Археологи обнаружили скрытый город майя в джунглях Гватемалы',
    status: 'published',
    updatedAt: new Date('2024-01-02T15:50:00Z'),
    createdAt: new Date('2024-01-02T13:00:00Z')
  },
  {
    id: 'news-15',
    title: 'Биткоин достиг нового исторического максимума',
    content: 'Криптовалюта биткоин достигла нового исторического максимума в $75,000, обновив предыдущий рекорд. Рост связан с институциональными инвестициями и принятием в качестве платежного средства...',
    excerpt: 'Биткоин достиг нового максимума в $75,000. Рост связан с институциональными инвестициями и расширением сферы применения криптовалют.',
    author: mockAuthors[7], // Сергей Федоров
    category: mockCategories[5], // Финансы
    tags: [mockTags[4], mockTags[5]], // Технологии, Экономика
    publishedAt: new Date('2024-01-01T10:00:00Z'),
    readTime: 3,
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=250&fit=crop',
    isRead: false,
    isBookmarked: true,
    views: 31200,
    likes: 456,
    comments: 189,
    slug: 'bitcoin-new-historical-high-75000',
    seoTitle: 'Биткоин достиг максимума $75,000',
    seoDescription: 'Новый исторический максимум биткоина на фоне институциональных инвестиций',
    status: 'published',
    updatedAt: new Date('2024-01-01T10:00:00Z'),
    createdAt: new Date('2024-01-01T08:00:00Z')
  },
  {
    id: 'news-16',
    title: 'Новая вакцина от рака показала 95% эффективность',
    content: 'Клинические испытания новой персонализированной вакцины от рака показали эффективность 95% в лечении различных типов опухолей. Вакцина создается индивидуально для каждого пациента...',
    excerpt: 'Персонализированная вакцина от рака показала 95% эффективность. Новый подход может революционизировать лечение онкологических заболеваний.',
    author: mockAuthors[4], // Ольга Морозова
    category: mockCategories[2], // Наука
    tags: [mockTags[8], mockTags[12]], // Здоровье, Наука
    publishedAt: new Date('2023-12-31T14:30:00Z'),
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
    isRead: true,
    isBookmarked: false,
    views: 19800,
    likes: 289,
    comments: 95,
    slug: 'personalized-cancer-vaccine-95-effectiveness',
    seoTitle: 'Вакцина от рака: 95% эффективность',
    seoDescription: 'Персонализированная вакцина от рака показала высокую эффективность',
    status: 'published',
    updatedAt: new Date('2023-12-31T14:30:00Z'),
    createdAt: new Date('2023-12-31T12:00:00Z')
  },
  {
    id: 'news-17',
    title: 'Исследование: работа из дома повышает продуктивность на 40%',
    content: 'Новое исследование Стэнфордского университета показало, что удаленная работа повышает продуктивность сотрудников на 40%. Ключевые факторы - меньше отвлечений и гибкий график...',
    excerpt: 'Стэнфордское исследование: удаленная работа повышает продуктивность на 40%. Гибкий график и меньше отвлечений - ключевые преимущества.',
    author: mockAuthors[4], // Ольга Морозова
    category: mockCategories[4], // Исследования
    tags: [mockTags[4], mockTags[5]], // Технологии, Экономика
    publishedAt: new Date('2023-12-30T09:45:00Z'),
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop',
    isRead: false,
    isBookmarked: false,
    views: 11200,
    likes: 134,
    comments: 67,
    slug: 'remote-work-40-percent-productivity-stanford',
    seoTitle: 'Удаленная работа повышает продуктивность на 40%',
    seoDescription: 'Исследование Стэнфорда о преимуществах удаленной работы',
    status: 'published',
    updatedAt: new Date('2023-12-30T09:45:00Z'),
    createdAt: new Date('2023-12-30T07:00:00Z')
  },
  {
    id: 'news-18',
    title: 'Китай запустил первый коммерческий квантовый компьютер',
    content: 'Китайская компания Origin Quantum запустила первый в мире коммерческий квантовый компьютер. Система доступна через облачный сервис и может решать сложные задачи оптимизации...',
    excerpt: 'Китай запустил первый коммерческий квантовый компьютер. Система доступна через облако и может решать задачи оптимизации для бизнеса.',
    author: mockAuthors[5], // Александр Новиков
    category: mockCategories[2], // Наука
    tags: [mockTags[3], mockTags[4], mockTags[12]], // Китай, Технологии, Наука
    publishedAt: new Date('2023-12-29T16:20:00Z'),
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
    isRead: true,
    isBookmarked: true,
    views: 15600,
    likes: 198,
    comments: 54,
    slug: 'china-first-commercial-quantum-computer',
    seoTitle: 'Китай запустил коммерческий квантовый компьютер',
    seoDescription: 'Первый в мире коммерческий квантовый компьютер от Origin Quantum',
    status: 'published',
    updatedAt: new Date('2023-12-29T16:20:00Z'),
    createdAt: new Date('2023-12-29T14:00:00Z')
  },
  {
    id: 'news-19',
    title: 'Европа вводит налог на выбросы углерода для авиакомпаний',
    content: 'Европейский союз вводит новый налог на выбросы углерода для всех авиакомпаний, выполняющих рейсы в ЕС. Налог направлен на сокращение выбросов и стимулирование экологичных технологий...',
    excerpt: 'ЕС вводит налог на выбросы углерода для авиакомпаний. Мера направлена на сокращение выбросов и развитие экологичных технологий в авиации.',
    author: mockAuthors[8], // Мария Кузнецова
    category: mockCategories[1], // Политика
    tags: [mockTags[2], mockTags[7]], // Европа, Климат
    publishedAt: new Date('2023-12-28T12:15:00Z'),
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=250&fit=crop',
    isRead: false,
    isBookmarked: false,
    views: 13400,
    likes: 156,
    comments: 78,
    slug: 'eu-carbon-tax-aviation-emissions',
    seoTitle: 'ЕС вводит налог на выбросы для авиакомпаний',
    seoDescription: 'Новый налог на выбросы углерода для авиакомпаний в ЕС',
    status: 'published',
    updatedAt: new Date('2023-12-28T12:15:00Z'),
    createdAt: new Date('2023-12-28T10:00:00Z')
  },
  {
    id: 'news-20',
    title: 'Исследование: искусственный интеллект может предсказывать землетрясения',
    content: 'Ученые из Калифорнийского технологического института разработали ИИ-систему, которая может предсказывать землетрясения за несколько часов до их начала. Точность предсказаний составляет 85%...',
    excerpt: 'ИИ может предсказывать землетрясения за несколько часов. Система Caltech показала точность 85% в предсказании сейсмической активности.',
    author: mockAuthors[1], // Дмитрий Волков
    category: mockCategories[2], // Наука
    tags: [mockTags[1], mockTags[12], mockTags[13]], // США, Наука, ИИ
    publishedAt: new Date('2023-12-27T11:30:00Z'),
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
    isRead: true,
    isBookmarked: true,
    views: 16700,
    likes: 223,
    comments: 89,
    slug: 'ai-predict-earthquakes-caltech-85-accuracy',
    seoTitle: 'ИИ предсказывает землетрясения с точностью 85%',
    seoDescription: 'Система Caltech использует ИИ для предсказания землетрясений',
    status: 'published',
    updatedAt: new Date('2023-12-27T11:30:00Z'),
    createdAt: new Date('2023-12-27T09:00:00Z')
  }
];

/**
 * Получить новость по ID
 */
export const getNewsById = (id: string): NewsArticle | undefined => {
  return mockNews.find(article => article.id === id);
};

/**
 * Получить новость по slug
 */
export const getNewsBySlug = (slug: string): NewsArticle | undefined => {
  return mockNews.find(article => article.slug === slug);
};

/**
 * Получить все новости
 */
export const getAllNews = (): NewsArticle[] => {
  return mockNews;
};

/**
 * Получить новости по категории
 */
export const getNewsByCategory = (categoryId: string): NewsArticle[] => {
  if (categoryId === 'all') {
    return mockNews;
  }
  return mockNews.filter(article => article.category.id === categoryId);
};

/**
 * Получить новости по автору
 */
export const getNewsByAuthor = (authorId: string): NewsArticle[] => {
  return mockNews.filter(article => article.author.id === authorId);
};

/**
 * Получить прочитанные новости
 */
export const getReadNews = (): NewsArticle[] => {
  return mockNews.filter(article => article.isRead);
};

/**
 * Получить новости в избранном
 */
export const getBookmarkedNews = (): NewsArticle[] => {
  return mockNews.filter(article => article.isBookmarked);
};

/**
 * Получить непрочитанные новости
 */
export const getUnreadNews = (): NewsArticle[] => {
  return mockNews.filter(article => !article.isRead);
};

/**
 * Получить последние новости
 */
export const getLatestNews = (limit: number = 10): NewsArticle[] => {
  return mockNews
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
};

/**
 * Получить популярные новости
 */
export const getPopularNews = (limit: number = 10): NewsArticle[] => {
  return mockNews
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);
};

/**
 * Поиск новостей по тексту
 */
export const searchNews = (query: string): NewsArticle[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockNews.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.excerpt.toLowerCase().includes(lowercaseQuery) ||
    article.content.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Получить теги
 */
export const getAllTags = (): NewsTag[] => {
  return mockTags;
};

/**
 * Получить тег по ID
 */
export const getTagById = (id: string): NewsTag | undefined => {
  return mockTags.find(tag => tag.id === id);
};
