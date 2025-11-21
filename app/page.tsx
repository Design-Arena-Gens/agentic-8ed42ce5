'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

interface Trend {
  hashtag: string
  posts: string
  engagement: string
  category: string
}

interface Meme {
  trend: string
  text: string
  template: string
  timestamp: string
}

const memeTemplates = [
  'Distracted Boyfriend',
  'Drake Hotline Bling',
  'Two Buttons',
  'Expanding Brain',
  'Change My Mind',
  'Woman Yelling at Cat',
  'Is This a Pigeon?',
  'They\'re The Same Picture'
]

export default function Home() {
  const [trends, setTrends] = useState<Trend[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null)
  const [generatedMeme, setGeneratedMeme] = useState<Meme | null>(null)
  const [generating, setGenerating] = useState(false)

  const fetchTrends = async () => {
    setLoading(true)
    // Simulate API call to fetch Instagram trends
    await new Promise(resolve => setTimeout(resolve, 1500))

    const mockTrends: Trend[] = [
      { hashtag: '#AIRevolution2024', posts: '2.4M', engagement: '89%', category: 'Technology' },
      { hashtag: '#SustainableLiving', posts: '1.8M', engagement: '92%', category: 'Lifestyle' },
      { hashtag: '#GenZHumor', posts: '3.2M', engagement: '95%', category: 'Entertainment' },
      { hashtag: '#WorkFromAnywhere', posts: '1.5M', engagement: '87%', category: 'Career' },
      { hashtag: '#FitnessMotivation', posts: '4.1M', engagement: '91%', category: 'Health' },
      { hashtag: '#CryptoMemes', posts: '2.9M', engagement: '88%', category: 'Finance' }
    ]

    setTrends(mockTrends)
    setLoading(false)
  }

  const generateMeme = async (trend: string) => {
    setGenerating(true)
    setSelectedTrend(trend)

    // Simulate meme generation
    await new Promise(resolve => setTimeout(resolve, 2000))

    const template = memeTemplates[Math.floor(Math.random() * memeTemplates.length)]
    const memeTexts: Record<string, string[]> = {
      '#AIRevolution2024': [
        'Me: Asks AI to write code\nAI: Creates entire app\nMe: I am a programmer',
        'Companies: We need AI experts!\nAlso companies: 10 years AI experience required',
        'Before AI: 8 hours of work\nAfter AI: 8 hours of prompting AI'
      ],
      '#SustainableLiving': [
        'Me with my reusable straw\nSaving the planet one sip at a time',
        'Them: Why sustainable?\nMe: *gestures at literally everything*',
        'My sustainable habits vs My Amazon Prime addiction'
      ],
      '#GenZHumor': [
        'Millennial humor vs Gen Z humor\nGen Z: *unhinged chaos*',
        'Me explaining my memes to my parents\nThem: Is this comedy?',
        'Gen Z making everything into a core aesthetic'
      ],
      '#WorkFromAnywhere': [
        'Office work vs Work from home\n*Chef\'s kiss*',
        'My 5 minute commute: Bed to desk\nYour commute: 2 hours in traffic',
        'Video call: Professional top\nVideo call: Pajama bottom'
      ],
      '#FitnessMotivation': [
        'Me: Starts fitness journey\nAlso me: Orders pizza to celebrate',
        'Gym selfie vs Actually working out',
        'Day 1: Full energy\nDay 2: Why do I hurt everywhere'
      ],
      '#CryptoMemes': [
        'Crypto bros: Buy the dip!\nThe dip: *keeps dipping*',
        'Me checking my portfolio every 5 seconds',
        'Invested $100: This will make me rich!\nPortfolio: $3.47'
      ]
    }

    const texts = memeTexts[trend] || ['Generic meme text here']
    const randomText = texts[Math.floor(Math.random() * texts.length)]

    setGeneratedMeme({
      trend,
      text: randomText,
      template,
      timestamp: new Date().toISOString()
    })

    setGenerating(false)
  }

  useEffect(() => {
    fetchTrends()
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🔥 Viral Meme Generator</h1>
        <p className={styles.subtitle}>AI-powered meme creation from Instagram trends</p>
      </header>

      <main className={styles.main}>
        <section className={styles.trendsSection}>
          <div className={styles.sectionHeader}>
            <h2>📈 Trending on Instagram</h2>
            <button
              onClick={fetchTrends}
              className={styles.refreshButton}
              disabled={loading}
            >
              {loading ? '🔄 Loading...' : '🔄 Refresh Trends'}
            </button>
          </div>

          {loading ? (
            <div className={styles.loader}>
              <div className={styles.spinner}></div>
              <p>Scanning Instagram for viral trends...</p>
            </div>
          ) : (
            <div className={styles.trendsGrid}>
              {trends.map((trend, index) => (
                <div key={index} className={styles.trendCard}>
                  <div className={styles.trendHeader}>
                    <h3>{trend.hashtag}</h3>
                    <span className={styles.category}>{trend.category}</span>
                  </div>
                  <div className={styles.trendStats}>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Posts</span>
                      <span className={styles.statValue}>{trend.posts}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Engagement</span>
                      <span className={styles.statValue}>{trend.engagement}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => generateMeme(trend.hashtag)}
                    className={styles.generateButton}
                    disabled={generating}
                  >
                    {generating && selectedTrend === trend.hashtag
                      ? '⚡ Generating...'
                      : '🎨 Generate Meme'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {generatedMeme && (
          <section className={styles.memeSection}>
            <h2>🎭 Your Generated Meme</h2>
            <div className={styles.memeCard}>
              <div className={styles.memeHeader}>
                <span className={styles.memeTrend}>{generatedMeme.trend}</span>
                <span className={styles.memeTemplate}>Template: {generatedMeme.template}</span>
              </div>
              <div className={styles.memeContent}>
                <div className={styles.memeImage}>
                  <div className={styles.memeTextOverlay}>
                    {generatedMeme.text.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.memeActions}>
                <button className={styles.actionButton}>📥 Download</button>
                <button className={styles.actionButton}>📤 Share</button>
                <button
                  className={styles.actionButton}
                  onClick={() => generateMeme(generatedMeme.trend)}
                >
                  🔄 Regenerate
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Made with ❤️ by AI Agent | Trends update every hour</p>
      </footer>
    </div>
  )
}
