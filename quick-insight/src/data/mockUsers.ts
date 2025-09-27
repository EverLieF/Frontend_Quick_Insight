import { NewsAuthor } from '@/types/news';

/**
 * Моковые данные авторов новостей
 */
export const mockAuthors: NewsAuthor[] = [
  {
    id: 'author-1',
    name: 'Анна Петрова',
    email: 'anna.petrova@quickinsight.ru',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Политический аналитик с 10-летним опытом работы в СМИ. Специализируется на международной политике и дипломатии.',
    socialLinks: {
      twitter: '@anna_petrova',
      linkedin: 'anna-petrova-politics',
      website: 'annapetrova.ru'
    }
  },
  {
    id: 'author-2',
    name: 'Дмитрий Волков',
    email: 'dmitry.volkov@quickinsight.ru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Научный журналист и популяризатор науки. Автор множества статей о современных технологиях и исследованиях.',
    socialLinks: {
      twitter: '@dmitry_science',
      linkedin: 'dmitry-volkov-science',
      website: 'scienceinsight.ru'
    }
  },
  {
    id: 'author-3',
    name: 'Елена Соколова',
    email: 'elena.sokolova@quickinsight.ru',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Историк и культуролог. Исследует влияние исторических событий на современное общество.',
    socialLinks: {
      twitter: '@elena_history',
      linkedin: 'elena-sokolova-history'
    }
  },
  {
    id: 'author-4',
    name: 'Михаил Козлов',
    email: 'mikhail.kozlov@quickinsight.ru',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Финансовый аналитик и экономист. Эксперт по рынкам и инвестициям с международным опытом.',
    socialLinks: {
      twitter: '@mikhail_finance',
      linkedin: 'mikhail-kozlov-finance',
      website: 'financeinsight.ru'
    }
  },
  {
    id: 'author-5',
    name: 'Ольга Морозова',
    email: 'olga.morozova@quickinsight.ru',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: 'Исследователь и аналитик данных. Специализируется на социологических исследованиях и трендах.',
    socialLinks: {
      twitter: '@olga_research',
      linkedin: 'olga-morozova-research'
    }
  },
  {
    id: 'author-6',
    name: 'Александр Новиков',
    email: 'alexander.novikov@quickinsight.ru',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Технологический журналист. Освещает последние достижения в области ИИ, блокчейна и квантовых технологий.',
    socialLinks: {
      twitter: '@alex_tech',
      linkedin: 'alexander-novikov-tech',
      website: 'techinsight.ru'
    }
  },
  {
    id: 'author-7',
    name: 'Татьяна Лебедева',
    email: 'tatyana.lebedeva@quickinsight.ru',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    bio: 'Международный корреспондент. Освещает события в Европе и США, специализируется на дипломатии.',
    socialLinks: {
      twitter: '@tatyana_world',
      linkedin: 'tatyana-lebedeva-international'
    }
  },
  {
    id: 'author-8',
    name: 'Сергей Федоров',
    email: 'sergey.fedorov@quickinsight.ru',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
    bio: 'Экономический обозреватель. Анализирует макроэкономические процессы и их влияние на бизнес.',
    socialLinks: {
      twitter: '@sergey_economy',
      linkedin: 'sergey-fedorov-economy'
    }
  },
  {
    id: 'author-9',
    name: 'Мария Кузнецова',
    email: 'maria.kuznetsova@quickinsight.ru',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    bio: 'Климатолог и эколог. Исследует изменения климата и их влияние на планету.',
    socialLinks: {
      twitter: '@maria_climate',
      linkedin: 'maria-kuznetsova-climate'
    }
  },
  {
    id: 'author-10',
    name: 'Владимир Смирнов',
    email: 'vladimir.smirnov@quickinsight.ru',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    bio: 'Военный аналитик и эксперт по безопасности. Специализируется на геополитических конфликтах.',
    socialLinks: {
      twitter: '@vladimir_security',
      linkedin: 'vladimir-smirnov-security'
    }
  }
];

/**
 * Получить автора по ID
 */
export const getAuthorById = (id: string): NewsAuthor | undefined => {
  return mockAuthors.find(author => author.id === id);
};

/**
 * Получить автора по email
 */
export const getAuthorByEmail = (email: string): NewsAuthor | undefined => {
  return mockAuthors.find(author => author.email === email);
};

/**
 * Получить всех авторов
 */
export const getAllAuthors = (): NewsAuthor[] => {
  return mockAuthors;
};

/**
 * Получить случайного автора
 */
export const getRandomAuthor = (): NewsAuthor => {
  const randomIndex = Math.floor(Math.random() * mockAuthors.length);
  return mockAuthors[randomIndex];
};
