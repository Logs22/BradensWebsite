import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [hero, setHero] = useState(null)
  const [about, setAbout] = useState(null)
  const [portfolio, setPortfolio] = useState([])
  const [filteredPortfolio, setFilteredPortfolio] = useState([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Load hero content
    fetch('/content/hero.json')
      .then(res => res.json())
      .then(data => setHero(data))
      .catch(err => console.error('Error loading hero:', err))

    // Load about content
    fetch('/content/about.json')
      .then(res => res.json())
      .then(data => setAbout(data))
      .catch(err => console.error('Error loading about:', err))

    // Load portfolio items
    fetch('/content/portfolio.json')
      .then(res => res.json())
      .then(data => {
        const items = data.items || data
        setPortfolio(items)
        setFilteredPortfolio(items)
      })
      .catch(err => console.error('Error loading portfolio:', err))
  }, [])

  const showPage = (page) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
    window.scrollTo(0, 0)
  }

  const filterPortfolio = (category) => {
    if (category === 'all') {
      setFilteredPortfolio(portfolio)
    } else {
      setFilteredPortfolio(portfolio.filter(item => item.category === category))
    }
  }

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" onClick={() => showPage('home')} className="text-2xl font-light tracking-wider cursor-pointer">
            <span className="text-gray-900">BRADEN</span>
            <span className="ml-1 font-normal text-gray-900">BLACKBURN</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {['home', 'portfolio', 'about', 'services', 'contact'].map(page => (
              <a
                key={page}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  showPage(page)
                }}
                className="nav-link text-sm tracking-wide transition-all duration-300 relative group text-gray-700 font-light cursor-pointer"
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
                <span className="absolute -bottom-1 left-0 h-px bg-current transition-all duration-300 w-0 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-900"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
              {['home', 'portfolio', 'about', 'services', 'contact'].map(page => (
                <a
                  key={page}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    showPage(page)
                  }}
                  className="block text-gray-700 font-light cursor-pointer hover:text-gray-900"
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HOME PAGE */}
      {currentPage === 'home' && (
        <div>
          {/* Hero Section */}
          <section className="relative h-screen overflow-hidden flex items-center justify-center mt-16" style={{ backgroundImage: hero?.heroImage ? `url(${hero.heroImage})` : 'url(https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=2000&h=1200&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative text-center text-white">
              <h1 className="text-6xl md:text-8xl font-light tracking-wider mb-4">
                Capturing
                <br />
                <span className="font-normal italic">Moments</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 font-light tracking-wide">
                {hero?.heroSubtitle || 'Through the lens of Braden Blackburn'}
              </p>
              <button onClick={() => showPage('portfolio')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-4 text-base tracking-wide transition-colors cursor-pointer">
                View Portfolio →
              </button>
            </div>
          </section>

          {/* Featured Work Section */}
          <section className="py-24 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Featured Work</h2>
                <p className="text-gray-600 text-lg font-light">A glimpse into recent sessions</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {portfolio.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="group relative overflow-hidden aspect-[4/5] cursor-pointer">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <button onClick={() => showPage('portfolio')} className="rounded-full px-8 py-3 border border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 cursor-pointer">
                  Explore Full Portfolio
                </button>
              </div>
            </div>
          </section>

          {/* About Preview */}
          <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <img src={about?.aboutImage || 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=1000&fit=crop'} alt="Braden Blackburn" className="w-full h-[600px] object-cover" />
                </div>
                
                <div>
                  <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">Meet Braden</h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    {about?.aboutText ? about.aboutText.split('\n\n').map((para, idx) => (
                      <p key={idx}>{para}</p>
                    )) : (
                      <>
                        <p>With a passion for storytelling through imagery, I specialize in capturing authentic moments that you'll treasure forever.</p>
                        <p>Whether it's a wedding, portrait session, or special event, my goal is to create timeless photographs that reflect your unique story.</p>
                      </>
                    )}
                  </div>
                  <button onClick={() => showPage('about')} className="mt-6 text-gray-900 hover:underline cursor-pointer">
                    Learn More About Me →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Services Preview */}
          <section className="py-24 px-6 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Services</h2>
                <p className="text-gray-400 text-lg font-light">Tailored photography experiences for every occasion</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {['Weddings', 'Portraits', 'Events'].map((service, idx) => (
                  <div key={idx} className="border border-gray-800 p-8 hover:border-gray-600 transition-colors duration-300">
                    <h3 className="text-2xl font-light mb-3 tracking-wide">{service}</h3>
                    <p className="text-gray-400 mb-6">Complete photography coverage</p>
                    <button onClick={() => showPage('services')} className="text-white hover:underline cursor-pointer">View Details →</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">Let's Create Something Beautiful</h2>
              <p className="text-gray-600 text-lg mb-8 font-light">Ready to capture your story? Get in touch to discuss your photography needs.</p>
              <button onClick={() => showPage('contact')} className="bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-4 text-white text-base tracking-wide cursor-pointer">
                Get In Touch
              </button>
            </div>
          </section>
        </div>
      )}

      {/* PORTFOLIO PAGE */}
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
                    category === 'all'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {filteredPortfolio.map((item, idx) => (
                <div key={idx} className="group cursor-pointer overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-auto transition-transform duration-700 group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ABOUT PAGE */}
      {currentPage === 'about' && (
        <div className="pt-24 pb-16 bg-white">
          <section className="relative h-[60vh] overflow-hidden mb-24">
            <img src={about?.aboutImage || 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=2000&h=1200&fit=crop'} alt="Braden Blackburn" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-5xl md:text-7xl font-light text-white tracking-wide">About Me</h1>
            </div>
          </section>
          
          <section className="max-w-4xl mx-auto px-6 mb-24">
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p className="text-2xl font-light text-gray-900 mb-8">
                Hi, I'm Braden Blackburn — a photographer passionate about capturing the beauty in everyday moments.
              </p>
              
              {about?.aboutText ? about.aboutText.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              )) : (
                <>
                  <p>Photography has always been more than just a profession for me; it's a way to freeze time and preserve the emotions, connections, and stories that make life meaningful.</p>
                  <p>My journey into photography began when I picked up my first camera. Since then, I've had the privilege of working with amazing clients.</p>
                </>
              )}
            </div>
          </section>
        </div>
      )}

      {/* SERVICES PAGE */}
      {currentPage === 'services' && (
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-light mb-16 tracking-wide">Services</h1>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Weddings', desc: 'Complete coverage of your special day from preparation to celebration' },
                { title: 'Portraits', desc: 'Individual, couple, and family sessions tailored to your style' },
                { title: 'Events', desc: 'Corporate and private event photography capturing every moment' }
              ].map((service, idx) => (
                <div key={idx} className="border border-gray-200 p-8">
                  <h3 className="text-2xl font-light mb-3 tracking-wide">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTACT PAGE */}
      {currentPage === 'contact' && (
        <div className="pt-24 pb-16 min-h-screen flex items-center">
          <div className="max-w-2xl mx-auto px-6 w-full text-center">
            <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide">Get In Touch</h1>
            <p className="text-gray-600 text-lg mb-12 font-light">Ready to capture your story? Contact me for inquiries and bookings.</p>
            
            <div className="space-y-6">
              <p className="text-gray-700">
                Email: <a href="mailto:contact@bradenblackburn.com" className="text-gray-900 hover:underline">contact@bradenblackburn.com</a>
              </p>
              <p className="text-gray-700">
                Phone: <a href="tel:+1234567890" className="text-gray-900 hover:underline">(123) 456-7890</a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 font-light">© 2024 Braden Blackburn Photography. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2">Edited via <a href="/BradensWebsite/admin/" className="hover:text-white underline">Admin Panel</a></p>
        </div>
      </footer>
    </div>
  )
}

export default App
