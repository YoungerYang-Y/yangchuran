export interface BirthdayConfig {
  age: number
  route: string
  label: string
  date: string
  themeColor: string
  icon: string
  coverGradient: string
}

export const birthdaysData: BirthdayConfig[] = [
  {
    age: 1,
    route: '/birthday/one-year-old',
    label: '一岁',
    date: '2023-11-15',
    themeColor: '#e91e63',
    icon: '🎈',
    coverGradient: 'linear-gradient(135deg, #ffcdd2, #ef9a9a)',
  },
  {
    age: 2,
    route: '/birthday/two-year-old',
    label: '两岁',
    date: '2024-11-15',
    themeColor: '#2e7d32',
    icon: '🌳',
    coverGradient: 'linear-gradient(135deg, #c8e6c9, #81c784)',
  },
  {
    age: 3,
    route: '/birthday/three-year-old',
    label: '三岁',
    date: '2025-11-15',
    themeColor: '#1565c0',
    icon: '🐬',
    coverGradient: 'linear-gradient(135deg, #bbdefb, #64b5f6)',
  },
]
