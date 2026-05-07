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
const PORTFOLIO_QUERY = `*[_type == "portfolioImage"] | order(_createdAt desc) { _id, title, image, caption, category, featured }`
const SERVICES_QUERY = `*[_type == "service"] | order(_createdAt asc) { _id, title, description, features, price, image }`
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
        <div className="text-slate-900 text-xl font-light tracking-widest animate-pulse">
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
            <span className="text-slate-900">BRADEN</span>
            <span className="ml-1 font-normal text-slate-900">BLACKBURN</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['home', 'portfolio', 'about', 'services', 'contact'].map(page => (
              <a
                key={page}
                href="#"
                onClick={(e) => { e.preventDefault(); showPage(page) }}
                className={`text-sm tracking-wide transition-all duration-300 relative group font-light cursor-pointer ${
                  currentPage === page ? 'text-slate-900' : 'text-gray-600 hover:text-slate-900'
                }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
                <span className={`absolute -bottom-1 left-0 h-px bg-[#CDEDF6] transition-all duration-300 ${
                  currentPage === page ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
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
              {['home', 'portfolio', 'about', 'services', 'contact'].map(page => (
                <a
                  key={page}
                  href="#"
                  onClick={(e) => { e.preventDefault(); showPage(page) }}
                  className="block text-gray-700 font-light cursor-pointer hover:text-slate-900"
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </a>
              ))}
            </div>
          </div>
        )}
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
                className="bg-[#CDEDF6] text-slate-900 hover:bg-white rounded-full px-8 py-4 text-base tracking-wide transition-colors cursor-pointer"
              >
                View Portfolio →
              </button>
            </div>
          </section>

          {/* Featured Work */}
          <section className="py-24 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Featured Work</h2>
              <div className="grid md:grid-cols-2 gap-6 mt-16">
                {featuredPortfolio.length > 0 ? (
                  featuredPortfolio.map((item) => (
                    <div key={item._id} className="group relative overflow-hidden aspect-[4/5] cursor-pointer">
                      <img src={urlFor(item.image).width(800).height(1000).url()} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  ))
                ) : ( [1, 2, 3, 4].map(i => <div key={i} className="aspect-[4/5] bg-gray-200 animate-pulse" />) )}
              </div>
              <button onClick={() => showPage('portfolio')} className="bg-[#CDEDF6] text-slate-900 hover:bg-white rounded-full px-8 py-3 border border-gray-300 transition-all duration-300 cursor-pointer">Explore Full Portfolio</button>
            </div>
          </section>

          {/* About Preview */}
          <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              <img src={aboutImageUrl || 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=1000&fit=crop'} alt="Braden" className="w-full h-[600px] object-cover" />
              <div>
                <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">{about?.title || 'Meet Braden'}</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  {about?.bio ? String(about.bio).split('\n\n').map((p, i) => <p key={i}>{p}</p>) : <p>Professional photographer.</p>}
                </div>
                <button onClick={() => showPage('about')} className="mt-6 text-slate-900 hover:underline cursor-pointer">Learn More About Me →</button>
              </div>
            </div>
          </section>

          {/* Services Preview - Using Green BG */}
          <section className="py-24 px-6 text-white text-center" style={{ backgroundColor: '#042A2B' }}>
            <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Services</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-16">
              {services.map((s) => (
                <div key={s._id} className="border border-white/20 p-8 hover:border-white/50 transition-colors bg-white/5 backdrop-blur-sm">
                  <h3 className="text-2xl font-light mb-3 tracking-wide">{s.title}</h3>
                  <p className="text-white/80 mb-6">{s.desc}</p>
                  <button onClick={() => showPage('services')} className="text-white hover:underline cursor-pointer">View Details →</button>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="py-24 px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">Let's Create Something Beautiful</h2>
            <button onClick={() => showPage('contact')} className="rounded-full px-12 py-4 text-slate-900 text-base tracking-wide cursor-pointer bg-[#CDEDF6] hover:bg-white transition-colors">Get In Touch</button>
          </section>
        </div>
      )}

      {/* ── PORTFOLIO PAGE ────────────────────────────────────────────── */}
      {currentPage === 'portfolio' && (
        <div className="pt-24 pb-16 bg-white">
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

            {loading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-square bg-gray-200 animate-pulse" />
                ))}
              </div>
            ) : filteredPortfolio.length === 0 ? (
              <p className="text-center text-gray-500 py-20">No images in this category yet.</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {filteredPortfolio.map((item) => (
                  <div key={item._id} className="group cursor-pointer overflow-hidden">
                    <img
                      src={urlFor(item.image).width(800).url()}
                      alt={item.title || 'Portfolio image'}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {item.title && (
                      <p className="text-sm text-gray-500 mt-2 text-center">{item.title}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── ABOUT PAGE ────────────────────────────────────────────────── */}
      {currentPage === 'about' && (
        <div className="pt-24 pb-16 bg-white">
          <section className="max-w-7xl mx-auto px-6 mb-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Text Content (Left) */}
              <div className="order-2 lg:order-1">
                <h1 className="text-5xl md:text-6xl font-light mb-8 tracking-wide">About Me</h1>
                <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                  <p className="text-2xl font-light text-[#042A2B] mb-8">
                    {about?.title || "Hi, I'm Braden Blackburn — a photographer passionate about capturing the beauty in everyday moments."}
                  </p>
                  {about?.bio
                    ? String(about.bio).split('\n\n').map((para, idx) => <p key={idx}>{para}</p>)
                    : (
                      <>
                        <p>Photography has always been more than just a profession for me; it's a way to freeze time and preserve the emotions, connections, and stories that make life meaningful.</p>
                        <p>My journey into photography began when I picked up my first camera. Since then, I've had the privilege of working with amazing clients, capturing everything from weddings and engagements to family portraits and special events.</p>
                        <p>What sets my work apart is my commitment to authenticity. I don't believe in overly posed or artificial shots. Instead, I focus on creating a comfortable environment where genuine emotions and connections can shine through.</p>
                      </>
                    )}
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
      )}

      {/* ── SERVICES PAGE ─────────────────────────────────────────────── */}
      {currentPage === 'services' && (
        <div className="pt-24 pb-16 bg-white">
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
                        className="w-full h-auto"
                      />
                    )}
                  </div>
                  <div className={idx % 2 !== 0 ? 'md:order-1' : ''}>
                    <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">{service.title}</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3 mb-6">
                      {service.features?.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-gray-600">✓ {feature}</li>
                      ))}
                    </ul>
                    <div className="text-2xl font-light text-[#042A2B] mb-6">{service.price}</div>
                    <button
                      onClick={() => showPage('contact')}
                      className="bg-[#CDEDF6] text-slate-900 hover:bg-white rounded-full px-8 py-3 text-slate-900 cursor-pointer"
                    >
                      Book This Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ── CONTACT PAGE ──────────────────────────────────────────────── */}
      {currentPage === 'contact' && (
        <div className="pt-24 pb-16 bg-white">
          <section className="max-w-5xl mx-auto px-6 mb-20 text-center">
            <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide">Let's Connect</h1>
            <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto leading-relaxed">
              {contact?.responseTime
                ? 'Ready to capture your story? Reach out and I\'ll get back to you shortly.'
                : 'Ready to capture your story? Fill out the form below or reach out directly.'}
            </p>
          </section>

          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-16">
              <div className="lg:col-span-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert("Thank you! I'll be in touch within 24 hours.")
                    e.target.reset()
                  }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-gray-700 block text-sm">Full Name *</label>
                      <input required className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-gray-900" placeholder="Jane Smith" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-gray-700 block text-sm">Email Address *</label>
                      <input type="email" required className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-gray-900" placeholder="jane@example.com" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-gray-700 block text-sm">Phone Number</label>
                      <input type="tel" className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-gray-900" placeholder="(555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-gray-700 block text-sm">Service Type *</label>
                      <select required className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-gray-900">
                        <option value="">Select a service</option>
                        <option value="wedding">Wedding Photography</option>
                        <option value="portrait">Portrait Session</option>
                        <option value="event">Event Photography</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-700 block text-sm">Tell Me About Your Vision *</label>
                    <textarea required className="border border-gray-300 p-3 w-full rounded min-h-[150px] focus:outline-none focus:border-gray-900" placeholder="Share details about your event, location preferences, style inspiration..." />
                  </div>
                  <button type="submit" className="w-full md:w-auto bg-[#CDEDF6] hover:bg-white rounded-full px-12 py-4 text-slate-900 text-base tracking-wide cursor-pointer">
                    Send Message
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
                    <p>📷 {contact?.instagram || '@bradenblackburn'}</p>
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
      )}

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
              {['home', 'portfolio', 'about', 'services', 'contact'].map(p => (
                <li key={p}><button onClick={() => showPage(p)} className="text-white/80 hover:text-white text-sm capitalize">{p}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider mb-6 uppercase">Connect</h4>
            <div className="flex gap-4">
              {/* Connect Icons - Simplified for brevity */}
              <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all cursor-pointer">IG</button>
              <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all cursor-pointer">EM</button>
            </div>
          </div>
        </div>
        <p className="text-center text-white/60 text-sm">© {new Date().getFullYear()} Braden Blackburn Photography.</p>
      </footer>
    </div>
  )
}

export default App