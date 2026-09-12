import { useState, useEffect } from 'react'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'

// ── SANITY SETUP ────────────────────────────────────────────────────────
const client = createClient({
  projectId: '23vvbmgr',
  dataset: 'production',
  useCdn: false, // Set to false to ensure Braden sees published changes immediately
  apiVersion: '2024-05-05',
})

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

// ── GROQ QUERIES ────────────────────────────────────────────────────────
const HERO_QUERY = `*[_type == "hero"][0]{ heading, heroTitle, subheading, heroSubtitle, backgroundImage, heroImage }`
const ABOUT_QUERY = `*[_type == "about"][0]{ title, tagline, bio, profileImage }`
const PORTFOLIO_QUERY = `*[_type == "portfolioImage"] | order(_createdAt desc) { _id, title, image, caption, category, featured, _createdAt }`
const CLIENT_GALLERIES_QUERY = `*[_type == "clientGallery"] | order(date desc, _createdAt desc) {
  _id,
  title,
  date,
  coverImage,
  externalUrl,
  photos,
  featured,
  _createdAt
}`
const SERVICES_QUERY = `*[_type == "service"] | order(order asc, _createdAt asc) { _id, title, description, features, price, image }`
const CONTACT_QUERY = `*[_type == "contact"][0]{ location, phone, email, instagram, instagramUrl, responseTime, bookingNotice, web3FormsAccessKey }`

// ── HELPER: FORMAT DISPLAY DATE ─────────────────────────────────────────
function formatDisplayDate(dateString) {
  if (!dateString) return ''
  try {
    const [year, month, day] = dateString.split('-')
    if (year && month && day) {
      const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10))
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }
    return dateString
  } catch (e) {
    return dateString
  }
}

// ── HELPER: RENDER BIO (HANDLES SANITY RICH TEXT & PLAIN TEXT) ──────────
function renderBioText(bio) {
  if (!bio) {
    return (
      <>
        <p>Photography has always been more than just a profession for me; it's a way to freeze time and preserve the emotions, connections, and stories that make life meaningful.</p>
        <p>My journey into photography began when I picked up my first camera. Since then, I've had the privilege of working with amazing clients, capturing everything from weddings and engagements to family portraits and special events.</p>
        <p>What sets my work apart is my commitment to authenticity. I don't believe in overly posed or artificial shots. Instead, I focus on creating a comfortable environment where genuine emotions and connections can shine through.</p>
      </>
    )
  }

  // Handle Sanity block content array
  if (Array.isArray(bio)) {
    return bio.map((block, idx) => {
      if (block._type === 'block' && block.children) {
        return (
          <p key={block._key || idx}>
            {block.children.map((child, cIdx) => {
              let text = child.text
              if (child.marks && child.marks.includes('strong')) {
                return <strong key={cIdx}>{text}</strong>
              }
              if (child.marks && child.marks.includes('em')) {
                return <em key={cIdx}>{text}</em>
              }
              return <span key={cIdx}>{text}</span>
            })}
          </p>
        )
      }
      return null
    })
  }

  // Handle plain string
  if (typeof bio === 'string') {
    return bio.split('\n\n').map((para, idx) => <p key={idx}>{para}</p>)
  }

  return <p>{String(bio)}</p>
}

// ── MAIN APP COMPONENT ──────────────────────────────────────────────────
function App() {
  const location = useLocation()
  const [hero, setHero] = useState(null)
  const [about, setAbout] = useState(null)
  const [portfolio, setPortfolio] = useState([])
  const [filteredPortfolio, setFilteredPortfolio] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')

  const [clientGalleries, setClientGalleries] = useState([])
  const [activeModalGallery, setActiveModalGallery] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [portfolioLightboxIndex, setPortfolioLightboxIndex] = useState(null)

  const [services, setServices] = useState([])
  const [contact, setContact] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [heroImageUrl, setHeroImageUrl] = useState(null)
  const [aboutImageUrl, setAboutImageUrl] = useState(null)

  const [formStatus, setFormStatus] = useState({ state: 'idle', message: '' })

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Lock body scroll when modal or lightbox is open
  useEffect(() => {
    if (activeModalGallery || lightboxIndex !== null || portfolioLightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeModalGallery, lightboxIndex, portfolioLightboxIndex])

  // Keyboard navigation for client gallery lightbox
  useEffect(() => {
    if (lightboxIndex === null || !activeModalGallery?.photos?.length) return

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : activeModalGallery.photos.length - 1))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setLightboxIndex((prev) => (prev < activeModalGallery.photos.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setLightboxIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, activeModalGallery])

  // Keyboard navigation for portfolio lightbox
  useEffect(() => {
    if (portfolioLightboxIndex === null || !filteredPortfolio?.length) return

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setPortfolioLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredPortfolio.length - 1))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setPortfolioLightboxIndex((prev) => (prev < filteredPortfolio.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setPortfolioLightboxIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [portfolioLightboxIndex, filteredPortfolio])

  useEffect(() => {
    const fetchSanityData = async () => {
      try {
        const [heroData, aboutData, portfolioData, clientData, servicesData, contactData] = await Promise.all([
          client.fetch(HERO_QUERY),
          client.fetch(ABOUT_QUERY),
          client.fetch(PORTFOLIO_QUERY),
          client.fetch(CLIENT_GALLERIES_QUERY),
          client.fetch(SERVICES_QUERY),
          client.fetch(CONTACT_QUERY),
        ])

        if (heroData) {
          setHero(heroData)
          const bg = heroData.backgroundImage || heroData.heroImage
          if (bg) setHeroImageUrl(urlFor(bg).url())
        }

        if (aboutData) {
          setAbout(aboutData)
          if (aboutData.profileImage) setAboutImageUrl(urlFor(aboutData.profileImage).width(800).height(1000).url())
        }

        if (portfolioData) {
          const list = Array.isArray(portfolioData) ? portfolioData : []
          setPortfolio(list)
          setFilteredPortfolio(list)
        }

        if (clientData) {
          const list = Array.isArray(clientData) ? clientData : []
          setClientGalleries(list)
        }

        if (servicesData) setServices(servicesData)
        if (contactData) setContact(contactData)

      } catch (error) {
        console.error("Error fetching from Sanity:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSanityData()
  }, [])

  const filterPortfolio = (category) => {
    setActiveFilter(category)
    if (category === 'all') {
      setFilteredPortfolio(portfolio)
    } else {
      setFilteredPortfolio(
        portfolio.filter(item => item.category && item.category.toLowerCase() === category.toLowerCase())
      )
    }
  }

  // Display featured images, or fallback to the 4 most recent images
  const featuredOnly = portfolio.filter(i => i.featured)
  const displayFeatured = featuredOnly.length > 0 ? featuredOnly.slice(0, 4) : portfolio.slice(0, 4)

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ state: 'submitting', message: '' })
    const form = e.target
    const formData = new FormData(form)

    if (contact?.web3FormsAccessKey) {
      formData.append('access_key', contact.web3FormsAccessKey)
      formData.append('subject', `Photography Inquiry from ${formData.get('name') || 'Client'}`)
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        })
        const result = await res.json()
        if (result.success) {
          setFormStatus({
            state: 'success',
            message: "Thank you! Your message has been sent directly to Braden. He'll get back to you shortly.",
          })
          form.reset()
        } else {
          setFormStatus({
            state: 'error',
            message: result.message || 'Something went wrong. Please try emailing directly.',
          })
        }
      } catch (err) {
        setFormStatus({
          state: 'error',
          message: 'Failed to send message. Please reach out directly by email or phone.',
        })
      }
    } else {
      const name = formData.get('name') || ''
      const email = formData.get('email') || ''
      const phone = formData.get('phone') || ''
      const service = formData.get('service') || ''
      const message = formData.get('message') || ''
      const targetEmail = contact?.email || 'braden@photography.com'
      const mailtoUrl = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(`Photography Inquiry: ${service} (${name})`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`)}`
      window.location.href = mailtoUrl
      setFormStatus({
        state: 'success',
        message: 'Opening your email client to send this message directly to Braden.',
      })
      form.reset()
    }
  }

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="text-slate-900 text-xl font-light tracking-widest animate-pulse">
          LOADING...
        </div>
      </div>
    )
  }

  const isCurrentPage = (path) => {
    if (path === 'home') return location.pathname === '/'
    return location.pathname === `/${path}`
  }

  const navPages = ['home', 'portfolio', 'clients', 'about', 'services', 'contact']

  return (
    <div className="bg-white">
      {/* ── Navigation ───────────────────────────────────────────────── */}
      <nav className="absolute top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="text-2xl font-light tracking-wider cursor-pointer">
            <span className="text-slate-900">BRADEN</span>
            <span className="ml-1 font-normal text-slate-900">BLACKBURN</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navPages.map(page => (
              <Link
                key={page}
                to={page === 'home' ? '/' : `/${page}`}
                className={`text-sm tracking-wide transition-all duration-300 relative group font-light cursor-pointer ${
                  isCurrentPage(page) ? 'text-slate-900 font-normal' : 'text-gray-600 hover:text-slate-900'
                }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
                <span className={`absolute -bottom-1 left-0 h-px bg-[#CDEDF6] transition-all duration-300 ${
                  isCurrentPage(page) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-900">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
              {navPages.map(page => (
                <Link
                  key={page}
                  to={page === 'home' ? '/' : `/${page}`}
                  className="block text-gray-700 font-light cursor-pointer hover:text-slate-900"
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <Routes>
        {/* ── HOME PAGE ─────────────────────────────────────────────────── */}
        <Route path="/" element={
          <div>
            <section
              className="relative h-screen overflow-hidden flex items-center justify-center"
              style={{
                backgroundImage: heroImageUrl
                  ? `url(${heroImageUrl})`
                  : 'url(https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=2000&h=1200&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative text-center text-white px-6">
                {(hero?.heading || hero?.heroTitle) && (
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider mb-4">
                    {hero?.heading || hero?.heroTitle}
                  </h1>
                )}
                {(hero?.subheading || hero?.heroSubtitle) && (
                  <p className="text-lg md:text-xl text-gray-200 mb-8 font-light tracking-wide max-w-2xl mx-auto">
                    {hero?.subheading || hero?.heroSubtitle}
                  </p>
                )}
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/portfolio"
                    className="bg-[#CDEDF6] text-slate-900 hover:bg-white rounded-full px-8 py-4 text-base tracking-wide transition-colors cursor-pointer inline-block"
                  >
                    View Portfolio →
                  </Link>
                  <Link
                    to="/clients"
                    className="bg-white/10 hover:bg-white text-white hover:text-slate-900 backdrop-blur-sm border border-white/40 rounded-full px-8 py-4 text-base tracking-wide transition-colors cursor-pointer inline-block"
                  >
                    Client Galleries →
                  </Link>
                </div>
              </div>
            </section>

            {/* Featured Work */}
            <section className="py-24 px-6 bg-gray-50">
              <div className="max-w-7xl mx-auto text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Featured Work</h2>
                <div className="grid md:grid-cols-2 gap-6 mt-16">
                  {displayFeatured.length > 0 ? (
                    displayFeatured.map((item) => (
                      <div key={item._id} className="group relative overflow-hidden aspect-[4/5] cursor-pointer">
                        {item.image && (
                          <img
                            src={urlFor(item.image).width(800).height(1000).url()}
                            alt={item.title || 'Featured Work'}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        )}
                        {item.title && (
                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white text-left opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-lg font-light">{item.title}</p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    [1, 2, 3, 4].map(i => <div key={i} className="aspect-[4/5] bg-gray-200 animate-pulse rounded" />)
                  )}
                </div>
                <Link to="/portfolio" className="inline-block mt-12 bg-[#CDEDF6] text-slate-900 hover:bg-white rounded-full px-8 py-3 border border-gray-300 transition-all duration-300 cursor-pointer">Explore Full Portfolio</Link>
              </div>
            </section>

            {/* Client Galleries Teaser */}
            {clientGalleries.length > 0 && (
              <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Client Stories</h2>
                  <p className="text-gray-500 font-light mb-12">Discover recent client sessions and featured stories</p>
                  <div className="grid md:grid-cols-3 gap-10">
                    {clientGalleries.slice(0, 3).map(cg => (
                      <Link
                        key={cg._id}
                        to="/clients"
                        className="group flex flex-col text-center cursor-pointer"
                      >
                        <div className="relative aspect-[3/2] overflow-hidden bg-gray-100 mb-5 shadow-sm group-hover:shadow-md transition-shadow">
                          {cg.coverImage && (
                            <img
                              src={urlFor(cg.coverImage).width(800).height(533).url()}
                              alt={cg.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-white text-slate-900 px-6 py-2.5 text-xs tracking-widest uppercase font-medium rounded-full shadow">
                              View Shoot →
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg md:text-xl font-light tracking-[0.12em] uppercase text-slate-900 group-hover:text-gray-600 transition-colors">
                            {cg.title}
                          </h3>
                          {cg.date && (
                            <p className="text-xs text-gray-400 font-light tracking-widest uppercase">
                              {formatDisplayDate(cg.date)}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link to="/clients" className="inline-block mt-12 bg-[#CDEDF6] text-slate-900 hover:bg-white rounded-full px-8 py-3 border border-gray-300 transition-all duration-300 cursor-pointer">
                    Browse All Client Galleries →
                  </Link>
                </div>
              </section>
            )}

            {/* About Preview */}
            <section className="py-24 px-6 bg-gray-50">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <img
                  src={aboutImageUrl || 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=1000&fit=crop'}
                  alt="Braden"
                  className="w-full h-[600px] object-cover"
                />
                <div>
                  <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">{about?.title || 'Meet Braden'}</h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    {renderBioText(about?.bio)}
                  </div>
                  <Link to="/about" className="mt-6 text-slate-900 hover:underline cursor-pointer inline-block">Learn More About Me →</Link>
                </div>
              </div>
            </section>

            {/* Services Preview - Using Green BG */}
            <section className="py-24 px-6 text-white text-center" style={{ backgroundColor: '#042A2B' }}>
              <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Services</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-16">
                {services.map((s) => (
                  <div key={s._id} className="border border-white/20 p-8 hover:border-white/50 transition-colors bg-white/5 backdrop-blur-sm text-left">
                    <h3 className="text-2xl font-light mb-3 tracking-wide">{s.title}</h3>
                    {s.price && <div className="text-lg text-[#CDEDF6] font-light mb-4">{s.price}</div>}
                    <p className="text-white/80 mb-6 leading-relaxed">{s.description || s.desc}</p>
                    <Link to="/services" className="text-white hover:underline cursor-pointer font-light">View Details →</Link>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">Let's Create Something Beautiful</h2>
              <Link to="/contact" className="inline-block rounded-full px-12 py-4 text-slate-900 text-base tracking-wide cursor-pointer bg-[#CDEDF6] hover:bg-white transition-colors">Get In Touch</Link>
            </section>
          </div>
        } />

        {/* ── PORTFOLIO PAGE ────────────────────────────────────────────── */}
        <Route path="/portfolio" element={
          <div className="pt-24 pb-16 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-wide">Portfolio</h1>
                <p className="text-gray-600 text-lg font-light">A collection of my favorite moments</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {['all', 'weddings', 'portraits', 'events'].map(category => (
                  <button
                    key={category}
                    onClick={() => filterPortfolio(category)}
                    className={`px-6 py-2 rounded-full text-sm tracking-wide transition-colors cursor-pointer ${
                      activeFilter === category
                        ? 'bg-[#CDEDF6] text-slate-900'
                        : 'bg-gray-100 text-gray-700 hover:bg-[#CDEDF6] hover:text-slate-900'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {filteredPortfolio.length === 0 ? (
                <p className="text-center text-gray-500 py-20">No images in this category yet.</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {filteredPortfolio.map((item, idx) => (
                    <div
                      key={item._id}
                      onClick={() => setPortfolioLightboxIndex(idx)}
                      className="group cursor-pointer overflow-hidden rounded shadow-sm hover:shadow-md transition-shadow"
                    >
                      {item.image && (
                        <img
                          src={urlFor(item.image).width(1000).auto('format').fit('max').url()}
                          alt={item.title || 'Portfolio image'}
                          className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                      {item.title && (
                        <p className="text-sm text-gray-600 mt-2 text-center font-light">{item.title}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Portfolio Fullscreen Lightbox */}
            {portfolioLightboxIndex !== null && filteredPortfolio[portfolioLightboxIndex] && (
              <div
                style={{ zIndex: 9999 }}
                className="fixed inset-0 bg-black/95 flex items-center justify-center p-2 md:p-4 select-none cursor-pointer"
                onClick={() => setPortfolioLightboxIndex(null)}
              >
                <button
                  onClick={() => setPortfolioLightboxIndex(null)}
                  className="absolute top-4 right-4 z-30 bg-white/10 hover:bg-white/25 text-white w-11 h-11 flex items-center justify-center rounded-full backdrop-blur-md transition-all text-xl cursor-pointer"
                  title="Close (Esc)"
                >
                  ✕
                </button>

                {filteredPortfolio.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setPortfolioLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredPortfolio.length - 1))
                      }}
                      className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 text-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full backdrop-blur-md transition-all text-2xl md:text-3xl cursor-pointer"
                      title="Previous"
                    >
                      ‹
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setPortfolioLightboxIndex((prev) => (prev < filteredPortfolio.length - 1 ? prev + 1 : 0))
                      }}
                      className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 text-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full backdrop-blur-md transition-all text-2xl md:text-3xl cursor-pointer"
                      title="Next"
                    >
                      ›
                    </button>
                  </>
                )}

                <div
                  className="relative flex flex-col items-center justify-center max-w-full max-h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    key={portfolioLightboxIndex}
                    src={urlFor(filteredPortfolio[portfolioLightboxIndex].image).width(2400).auto('format').fit('max').url()}
                    alt=""
                    className="max-h-[94vh] max-w-[96vw] w-auto h-auto object-contain rounded-sm shadow-2xl"
                  />
                  {filteredPortfolio[portfolioLightboxIndex].title && (
                    <p className="text-white/80 text-sm font-light mt-2 tracking-wide text-center">
                      {filteredPortfolio[portfolioLightboxIndex].title}
                    </p>
                  )}
                </div>

                {filteredPortfolio.length > 1 && (
                  <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white/90 text-xs font-light tracking-widest uppercase"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {portfolioLightboxIndex + 1} / {filteredPortfolio.length}
                  </div>
                )}
              </div>
            )}
          </div>
        } />

        {/* ── CLIENTS PAGE (PIXIESET STYLE) ────────────────────────────── */}
        <Route path="/clients" element={
          <div className="pt-24 pb-16 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-wide">Client Galleries</h1>
                <p className="text-gray-600 text-lg font-light">Client stories, weddings, and featured collections</p>
              </div>

              {clientGalleries.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg font-light mb-4">No client galleries published yet.</p>
                  <p className="text-gray-400 text-sm font-light">Add your first client shoot in Sanity Studio under "Client Gallery"!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {clientGalleries.map((gallery) => (
                    <div
                      key={gallery._id}
                      onClick={() => {
                        if (gallery.photos && gallery.photos.length > 0) {
                          setActiveModalGallery(gallery)
                        } else if (gallery.externalUrl) {
                          window.open(gallery.externalUrl, '_blank', 'noopener,noreferrer')
                        } else {
                          setActiveModalGallery(gallery)
                        }
                      }}
                      className="group cursor-pointer flex flex-col text-center"
                    >
                      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100 mb-5 shadow-sm group-hover:shadow-md transition-shadow">
                        {gallery.coverImage && (
                          <img
                            src={urlFor(gallery.coverImage).width(900).height(600).url()}
                            alt={gallery.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-white/95 text-slate-900 px-6 py-2.5 text-xs tracking-widest uppercase font-medium rounded-full shadow">
                            View Gallery →
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl md:text-2xl font-light tracking-[0.14em] uppercase text-slate-900 group-hover:text-gray-600 transition-colors">
                          {gallery.title}
                        </h3>
                        {gallery.date && (
                          <p className="text-xs text-gray-400 font-light tracking-widest uppercase">
                            {formatDisplayDate(gallery.date)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── CLIENT GALLERY LIGHTBOX MODAL ───────────────────────── */}
            {activeModalGallery && (
              <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm overflow-y-auto p-4 md:p-10 flex flex-col items-center">
                <div className="w-full max-w-6xl relative">
                  <div className="flex flex-wrap items-center justify-between py-6 border-b border-white/20 mb-8 text-white gap-4">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-light">{activeModalGallery.title}</h2>
                      {activeModalGallery.date && (
                        <p className="text-sm text-gray-300 font-light mt-1">
                          {formatDisplayDate(activeModalGallery.date)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {activeModalGallery.externalUrl && (
                        <a
                          href={activeModalGallery.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#CDEDF6] text-slate-900 hover:bg-white px-5 py-2 rounded-full text-sm font-light transition-colors"
                        >
                          Open Pixieset Collection ↗
                        </a>
                      )}
                      <button
                        onClick={() => {
                          setActiveModalGallery(null)
                          setLightboxIndex(null)
                        }}
                        className="text-white hover:text-gray-300 text-3xl cursor-pointer p-2"
                        title="Close Gallery"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {activeModalGallery.photos && activeModalGallery.photos.length > 0 ? (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 pb-24">
                      {activeModalGallery.photos.map((photo, pIdx) => (
                        <div
                          key={photo._key || pIdx}
                          onClick={() => setLightboxIndex(pIdx)}
                          className="cursor-pointer break-inside-avoid overflow-hidden rounded group relative shadow hover:opacity-95 transition-all bg-black/20"
                        >
                          <img
                            src={urlFor(photo).width(1200).auto('format').fit('max').url()}
                            alt=""
                            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-300 py-24">
                      <p className="text-lg mb-6">No additional photos uploaded in this collection yet.</p>
                      {activeModalGallery.externalUrl && (
                        <a
                          href={activeModalGallery.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-[#CDEDF6] text-slate-900 hover:bg-white px-8 py-3 rounded-full text-base transition-colors"
                        >
                          View Full Gallery on Pixieset ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── CLIENT GALLERY FULLSCREEN LIGHTBOX (OPENS ON TOP) ────── */}
            {activeModalGallery?.photos && lightboxIndex !== null && activeModalGallery.photos[lightboxIndex] && (
              <div
                style={{ zIndex: 9999 }}
                className="fixed inset-0 bg-black/95 flex items-center justify-center p-2 md:p-4 select-none cursor-pointer"
                onClick={() => setLightboxIndex(null)}
              >
                {/* Close Button */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-4 right-4 z-30 bg-white/10 hover:bg-white/25 text-white w-11 h-11 flex items-center justify-center rounded-full backdrop-blur-md transition-all text-xl cursor-pointer"
                  title="Close (Esc)"
                  aria-label="Close fullscreen"
                >
                  ✕
                </button>

                {/* Left / Prev Arrow */}
                {activeModalGallery.photos.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : activeModalGallery.photos.length - 1))
                    }}
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 text-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full backdrop-blur-md transition-all text-2xl md:text-3xl cursor-pointer"
                    title="Previous photo (Left Arrow)"
                    aria-label="Previous photo"
                  >
                    ‹
                  </button>
                )}

                {/* Right / Next Arrow */}
                {activeModalGallery.photos.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxIndex((prev) => (prev < activeModalGallery.photos.length - 1 ? prev + 1 : 0))
                    }}
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 text-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full backdrop-blur-md transition-all text-2xl md:text-3xl cursor-pointer"
                    title="Next photo (Right Arrow)"
                    aria-label="Next photo"
                  >
                    ›
                  </button>
                )}

                {/* The Fullscreen Image - Natural Uploaded Aspect Ratio with Minimal Padding */}
                <div
                  className="relative flex items-center justify-center max-w-full max-h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    key={lightboxIndex}
                    src={urlFor(activeModalGallery.photos[lightboxIndex]).width(2400).auto('format').fit('max').url()}
                    alt=""
                    className="max-h-[96vh] max-w-[96vw] w-auto h-auto object-contain rounded-sm shadow-2xl transition-opacity duration-200"
                  />
                </div>

                {/* Photo Counter */}
                {activeModalGallery.photos.length > 1 && (
                  <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white/90 text-xs font-light tracking-widest uppercase"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {lightboxIndex + 1} / {activeModalGallery.photos.length}
                  </div>
                )}
              </div>
            )}
          </div>
        } />

        {/* ── ABOUT PAGE ────────────────────────────────────────────────── */}
        <Route path="/about" element={
          <div className="pt-24 pb-16 bg-white min-h-screen">
            <section className="max-w-7xl mx-auto px-6 mb-24">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Text Content (Left) */}
                <div className="order-2 lg:order-1">
                  <h1 className="text-5xl md:text-6xl font-light mb-8 tracking-wide">{about?.title || 'About Me'}</h1>
                  <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                    <p className="text-2xl font-light text-[#042A2B] mb-8">
                      {about?.tagline || "Hi, I'm Braden Blackburn — a photographer passionate about capturing the beauty in everyday moments."}
                    </p>
                    {renderBioText(about?.bio)}
                  </div>
                </div>

                {/* Portrait Image (Right) */}
                <div className="order-1 lg:order-2">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-xl">
                    <img
                      src={aboutImageUrl || 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1200&h=1600&fit=crop'}
                      alt="Braden Blackburn"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        } />

        {/* ── SERVICES PAGE ─────────────────────────────────────────────── */}
        <Route path="/services" element={
          <div className="pt-24 pb-16 bg-white min-h-screen">
            <section className="max-w-5xl mx-auto px-6 mb-20 text-center">
              <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide">Services & Investment</h1>
              <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                Quality photography is an investment in memories that last a lifetime. I offer flexible packages to suit your needs and budget.
              </p>
            </section>

            <section className="max-w-7xl mx-auto px-6 mb-20">
              <div className="space-y-20">
                {services.map((service, idx) => (
                  <div key={service._id} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className={idx % 2 !== 0 ? 'md:order-2' : ''}>
                      {service.image && (
                        <img
                          src={urlFor(service.image).width(800).height(600).url()}
                          alt={service.title}
                          className="w-full h-auto rounded shadow"
                        />
                      )}
                    </div>
                    <div className={idx % 2 !== 0 ? 'md:order-1' : ''}>
                      <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">{service.title}</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-3 mb-6">
                          {service.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-3 text-gray-600">✓ {feature}</li>
                          ))}
                        </ul>
                      )}
                      {service.price && (
                        <div className="text-2xl font-light text-[#042A2B] mb-6">{service.price}</div>
                      )}
                      <Link
                        to="/contact"
                        className="bg-[#CDEDF6] text-slate-900 hover:bg-white rounded-full px-8 py-3 text-slate-900 cursor-pointer inline-block transition-colors"
                      >
                        Book This Service
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        } />

        {/* ── CONTACT PAGE ──────────────────────────────────────────────── */}
        <Route path="/contact" element={
          <div className="pt-24 pb-16 bg-white min-h-screen">
            <section className="max-w-5xl mx-auto px-6 mb-20 text-center">
              <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide">Let's Connect</h1>
              <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                Ready to capture your story? Fill out the form below or reach out directly.
              </p>
            </section>

            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-5 gap-16">
                <div className="lg:col-span-3">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    {formStatus.state === 'success' && (
                      <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-sm">
                        {formStatus.message}
                      </div>
                    )}
                    {formStatus.state === 'error' && (
                      <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-md text-sm">
                        {formStatus.message}
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-gray-700 block text-sm">Full Name *</label>
                        <input name="name" required className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-gray-900" placeholder="Jane Smith" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-700 block text-sm">Email Address *</label>
                        <input name="email" type="email" required className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-gray-900" placeholder="jane@example.com" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-gray-700 block text-sm">Phone Number</label>
                        <input name="phone" type="tel" className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-gray-900" placeholder="(555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-700 block text-sm">Service Type *</label>
                        <select name="service" required className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-gray-900">
                          <option value="">Select a service</option>
                          <option value="Weddings">Wedding Photography</option>
                          <option value="Portraits">Portrait Session</option>
                          <option value="Events">Event Photography</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-700 block text-sm">Tell Me About Your Vision *</label>
                      <textarea name="message" required className="border border-gray-300 p-3 w-full rounded min-h-[150px] focus:outline-none focus:border-gray-900" placeholder="Share details about your event, location preferences, style inspiration..." />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus.state === 'submitting'}
                      className="w-full md:w-auto bg-[#CDEDF6] hover:bg-white rounded-full px-12 py-4 text-slate-900 text-base tracking-wide cursor-pointer disabled:opacity-60 transition-colors border border-transparent hover:border-slate-300"
                    >
                      {formStatus.state === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <h3 className="text-2xl font-light mb-6 tracking-wide">Get In Touch</h3>
                    <div className="space-y-4 text-gray-700">
                      <p>📍 {contact?.location || 'Fort Mitchell, Kentucky'}</p>
                      <p>📞 {contact?.phone || '(555) 123-4567'}</p>
                      <p>✉️ {contact?.email || 'braden@photography.com'}</p>
                      <p>
                        📷{' '}
                        <a
                          href={contact?.instagramUrl || 'https://www.instagram.com/blackburn_creative/'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {contact?.instagram || '@blackburn_creative'}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="p-8 rounded-lg text-white" style={{ backgroundColor: '#042A2B' }}>
                    <h3 className="text-xl font-light mb-4 tracking-wide">Response Time</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {contact?.responseTime || "I typically respond to all inquiries within 24 hours. If you haven't heard back, please check your spam folder or reach out directly via phone."}
                    </p>
                  </div>

                  <div className="border border-gray-200 p-8 rounded-lg">
                    <h3 className="text-xl font-light mb-4 tracking-wide">Booking Notice</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {contact?.bookingNotice || 'For weddings and large events, I recommend booking 6-12 months in advance. Portrait sessions can typically be scheduled within 2-4 weeks.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        } />
      </Routes>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="text-white py-16 px-6" style={{ backgroundColor: '#042A2B' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-white/20 pb-12 text-white">
          <div>
            <h3 className="text-2xl font-light tracking-widest mb-4">BRADEN <span className="font-normal">BLACKBURN</span></h3>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">Based in {contact?.location || 'Kentucky'}.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider mb-6 uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {navPages.map(p => (
                <li key={p}>
                  <Link
                    to={p === 'home' ? '/' : `/${p}`}
                    className="text-white/80 hover:text-white text-sm capitalize"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider mb-6 uppercase">Connect</h4>
            <div className="flex gap-6">
              <a 
                href={contact?.instagramUrl || "https://www.instagram.com/blackburn_creative/"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#CDEDF6] hover:text-white transition-all cursor-pointer text-2xl"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a 
                href={`mailto:${contact?.email || 'braden@photography.com'}`}
                className="text-[#CDEDF6] hover:text-white transition-all cursor-pointer text-2xl"
              >
                <i className="fa-regular fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        <p className="text-center text-white/60 text-sm">© {new Date().getFullYear()} Braden Blackburn Photography.</p>
      </footer>
    </div>
  )
}

export default App
