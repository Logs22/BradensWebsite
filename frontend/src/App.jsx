import { useState, useEffect } from 'react'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import './App.css'

// ── SANITY SETUP ────────────────────────────────────────────────────────
const client = createClient({
  projectId: '23vvbmgr',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-05-05',
})

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// ── GROQ QUERIES ────────────────────────────────────────────────────────
const HERO_QUERY = `*[_type == "hero"][0]{ heading, subheading, backgroundImage }`
const ABOUT_QUERY = `*[_type == "about"][0]{ title, bio, profileImage }`
const PORTFOLIO_QUERY = `*[_type == "portfolioImage"] | order(_createdAt desc) { _id, title, image, caption }`
const SERVICES_QUERY = `*[_type == "service"] | order(_createdAt asc) { _id, title, desc, features, price, image }`
const CONTACT_QUERY = `*[_type == "contact"][0]{ location, phone, email, instagram, responseTime, bookingNotice }`

// ── COMPONENT ───────────────────────────────────────────────────────────
function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [hero, setHero] = useState(null)
  const [about, setAbout] = useState(null)
  const [portfolio, setPortfolio] = useState([])
  const [filteredPortfolio, setFilteredPortfolio] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [services, setServices] = useState([])
  const [contact, setContact] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const [heroImageUrl, setHeroImageUrl] = useState(null)
  const [aboutImageUrl, setAboutImageUrl] = useState(null)

  useEffect(() => {
    const fetchSanityData = async () => {
      try {
        const [heroData, aboutData, portfolioData, servicesData, contactData] = await Promise.all([
          client.fetch(HERO_QUERY),
          client.fetch(ABOUT_QUERY),
          client.fetch(PORTFOLIO_QUERY),
          client.fetch(SERVICES_QUERY),
          client.fetch(CONTACT_QUERY),
        ]);

        if (heroData) {
          setHero(heroData);
          if (heroData.backgroundImage) setHeroImageUrl(urlFor(heroData.backgroundImage).url());
        }

        if (aboutData) {
          setAbout(aboutData);
          if (aboutData.profileImage) setAboutImageUrl(urlFor(aboutData.profileImage).width(800).height(1000).url());
        }

        if (portfolioData) {
          setPortfolio(portfolioData);
          setFilteredPortfolio(portfolioData);
        }

        if (servicesData) setServices(servicesData);
        if (contactData) setContact(contactData);

      } catch (error) {
        console.error("Error fetching from Sanity:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchSanityData();
  }, []);

  const showPage = (page) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
    window.scrollTo(0, 0)
  }

  const filterPortfolio = (category) => {
    setActiveFilter(category)
    if (category === 'all') {
      setFilteredPortfolio(portfolio)
    } else {
      setFilteredPortfolio(portfolio.filter(item => item.category === category))
    }
  }

  const featuredPortfolio = portfolio.filter(i => i.featured).slice(0, 4)
    .concat(portfolio.filter(i => !i.featured)).slice(0, 4)

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div style={{ color: '#92afab' }} className="text-xl font-light tracking-widest animate-pulse">
          LOADING...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* ── Navigation ───────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" onClick={() => showPage('home')} className="text-2xl font-light tracking-wider cursor-pointer">
            <span style={{ color: '#92afab' }}>BRADEN</span>
            <span className="ml-1 font-normal" style={{ color: '#92afab' }}>BLACKBURN</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['home', 'portfolio', 'about', 'services', 'contact'].map(page => (
              <a
                key={page}
                href="#"
                onClick={(e) => { e.preventDefault(); showPage(page) }}
                className="text-sm tracking-wide transition-all duration-300 relative group font-light cursor-pointer"
                style={{ color: currentPage === page ? '#92afab' : '#4b5563' }}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
                <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                  currentPage === page ? 'w-full' : 'w-0 group-hover:w-full'
                }`} style={{ backgroundColor: '#92afab' }}></span>
              </a>
            ))}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden" style={{ color: '#92afab' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── HOME PAGE ─────────────────────────────────────────────────── */}
      {currentPage === 'home' && (
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
              <h1 className="text-6xl md:text-8xl font-light tracking-wider mb-4">
                {hero?.heading || 'Capturing'}<br />
                <span className="font-normal italic">Moments</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 font-light tracking-wide">
                {hero?.subheading || 'Through the lens of Braden Blackburn'}
              </p>
              <button
                onClick={() => showPage('portfolio')}
                className="bg-white hover:bg-gray-100 rounded-full px-8 py-4 text-base tracking-wide transition-colors cursor-pointer"
                style={{ color: '#92afab' }}
              >
                View Portfolio →
              </button>
            </div>
          </section>

          {/* Featured Work */}
          <section className="py-24 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Featured Work</h2>
              <p className="text-gray-600 text-lg font-light">A glimpse into recent sessions</p>
              <div className="grid md:grid-cols-2 gap-6 mt-16">
                {featuredPortfolio.length > 0 ? (
                  featuredPortfolio.map((item) => (
                    <div key={item._id} className="group relative overflow-hidden aspect-[4/5] cursor-pointer">
                      <img src={urlFor(item.image).width(800).height(1000).url()} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  ))
                ) : ( [1, 2, 3, 4].map(i => <div key={i} className="aspect-[4/5] bg-gray-200 animate-pulse" />) )}
              </div>
              <button onClick={() => showPage('portfolio')} className="mt-12 rounded-full px-8 py-3 border border-gray-300 hover:text-white transition-all duration-300 cursor-pointer" style={{ ':hover': { backgroundColor: '#92afab', borderColor: '#92afab' } }}>Explore Full Portfolio</button>
            </div>
          </section>

          {/* About Preview */}
          <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              <img src={aboutImageUrl || 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=1000&fit=crop'} alt="Braden" className="w-full h-[600px] object-cover" />
              <div>
                <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">{about?.title || 'Meet Braden'}</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  {about?.bio ? String(about.bio).split('\n\n').map((p, i) => <p key={i}>{p}</p>) : <p>Professional photographer capturing authentic moments.</p>}
                </div>
                <button onClick={() => showPage('about')} className="mt-6 hover:underline cursor-pointer" style={{ color: '#92afab' }}>Learn More About Me →</button>
              </div>
            </div>
          </section>

          {/* Services Preview - Using Navy BG with Accent elements */}
          <section className="py-24 px-6 bg-slate-900 text-white text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Services</h2>
            <p className="text-gray-400 text-lg font-light mb-16">Tailored photography experiences</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((s) => (
                <div key={s._id} className="border border-slate-800 p-8 hover:border-slate-600 transition-colors">
                  <h3 className="text-2xl font-light mb-3 tracking-wide">{s.title}</h3>
                  <p className="text-gray-400 mb-6">{s.desc}</p>
                  <button onClick={() => showPage('services')} className="hover:underline cursor-pointer" style={{ color: '#92afab' }}>View Details →</button>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="py-24 px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">Let's Create Something Beautiful</h2>
            <button onClick={() => showPage('contact')} className="rounded-full px-12 py-4 text-white text-base tracking-wide cursor-pointer transition-opacity hover:opacity-90" style={{ backgroundColor: '#92afab' }}>Get In Touch</button>
          </section>
        </div>
      )}

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-slate-800 pb-12">
          <div>
            <h3 className="text-2xl font-light tracking-widest mb-4">
              <span style={{ color: '#92afab' }}>BRADEN</span> BLACKBURN
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Based in {contact?.location || 'Kentucky'}, available worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider mb-6 uppercase text-gray-300">Quick Links</h4>
            <ul className="space-y-3">
              {['home', 'portfolio', 'about', 'services', 'contact'].map(p => (
                <li key={p}><button onClick={() => showPage(p)} className="text-gray-400 hover:text-white text-sm capitalize">{p}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider mb-6 uppercase text-gray-300">Connect</h4>
            <div className="flex gap-4">
              {[ {icon: 'inst', link: contact?.instagram}, {icon: 'mail', link: `mailto:${contact?.email}`}, {icon: 'phone', link: `tel:${contact?.phone}`} ].map((social, i) => (
                <a key={i} href={social.link || '#'} className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white transition-all" style={{ ':hover': { color: '#92afab' } }}>
                  {/* Icons remain as previous SVG placeholders */}
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm">© {new Date().getFullYear()} Braden Blackburn Photography. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App