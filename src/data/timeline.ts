export interface TimelineItem {
  id: number
  date: string
  description: string
  image: string
  milestone?: boolean
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    date: '2022年11月15日',
    description: '出生第 1 天 🎉',
    image: '/images/0001.jpg',
    milestone: true,
  },
  {
    id: 2,
    date: '2022年12月15日',
    description: '满月啦 🌙',
    image: '/images/0002.jpg',
  },
  {
    id: 3,
    date: '2023年1月15日',
    description: '出生第 60 天',
    image: '/images/bg.jpg',
  },
  {
    id: 4,
    date: '2023年11月15日',
    description: '一周岁生日 🎂',
    image: '/images/0001.jpg',
    milestone: true,
  },
  {
    id: 5,
    date: '2024年11月15日',
    description: '两周岁生日 🎂',
    image: '/images/0002.jpg',
    milestone: true,
  },
]
