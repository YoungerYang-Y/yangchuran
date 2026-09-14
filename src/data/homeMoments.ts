import image2022 from '../assets/images/home/2022.jpg'
import image2023 from '../assets/images/home/2023.jpg'
import image2024 from '../assets/images/home/2024.jpg'
import image2025 from '../assets/images/home/2025.jpg'
import image2026 from '../assets/images/home/2026.jpg'

export interface HomeMoment {
  year: number
  title: string
  story: string
  image: string
  alt: string
  tone: 'apricot' | 'sky' | 'peach'
}

export const homeMoments: HomeMoment[] = [
  {
    year: 2022,
    title: '第一次笑',
    story: '刚出生不久的果果，在某个安静的瞬间第一次笑了起来。小小的嘴角一弯，像是悄悄把全家的心都照亮了。',
    image: image2022,
    alt: '果果的 2022 年年度照片',
    tone: 'apricot',
  },
  {
    year: 2023,
    title: '第一次去海边',
    story: '第一次去汕尾看海，浪花很近，沙滩却有点陌生。果果站在边上认真观察，怎么也不敢让小脚丫踩进细细的沙里。',
    image: image2023,
    alt: '果果的 2023 年年度照片',
    tone: 'sky',
  },
  {
    year: 2024,
    title: '柴犬也来当模特',
    story: '这次拍照本来只有果果一个主角，一只柴犬却一路跑进镜头，认真地在旁边当起了模特。于是这张照片，多了一份没有排练过的热闹。',
    image: image2024,
    alt: '果果的 2024 年年度照片',
    tone: 'peach',
  },
  {
    year: 2025,
    title: '元宵节的小手工',
    story: '刚上幼儿园不久，果果做了第一份元宵节手工。小手忙着贴、忙着画，也把对新学校的新鲜感，一点点装进了节日里。',
    image: image2025,
    alt: '果果的 2025 年年度照片',
    tone: 'sky',
  },
  {
    year: 2026,
    title: '活泼好动的小女孩',
    story: '到了 2026 年，果果已经是个活泼好动的小女孩了。她跑着、跳着、笑着，总有用不完的好奇心，也总能把身边的人带进她热闹的小世界。',
    image: image2026,
    alt: '果果的 2026 年年度照片',
    tone: 'peach',
  },
]
