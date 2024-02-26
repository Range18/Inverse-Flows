import { AchievementEntity } from '#src/core/achievements/entities/achievement.entity';

export type AchievementWithChecker = Pick<
  AchievementEntity,
  'name' | 'description' | 'totalProgress' | 'cover' | 'points'
>;
export const achievementsArray: AchievementWithChecker[] = [
  {
    name: 'Король идей',
    description: 'Займите 1 место в рейтинге заявок',
    cover: 'king.png',
    totalProgress: 1,
    points: 150,
  },
  {
    name: 'Первопроходец',
    description: 'Получите первое одобрение идеи',
    cover: `first.png`,
    totalProgress: 1,
    points: 50,
  },
  {
    name: 'Лайкер',
    description: 'Поставь 10 лайков на другие заявки',
    cover: 'like.png',
    totalProgress: 10,
    points: 25,
  },
  {
    name: 'Генератор идей',
    description: 'Получите одобрение 5 заявок',
    cover: 'ideas.png',
    totalProgress: 5,
    points: 100,
  },
  {
    name: 'Мощь',
    description: 'Продержитесь в топ-3 неделю',
    cover: 'smart-people.png',
    totalProgress: 7,
    points: 25,
  },
];
