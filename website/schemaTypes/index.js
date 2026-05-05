// 1. Import all of your individual schema files
import main from './main'
import hero from './hero'
import about from './about'
import portfolio from './portfolio'
import portfolioImage from './portfolioImage'
import service from './service'
import eventType from './eventType'

// 2. Export them in the schemaTypes array for Sanity to use
export const schemaTypes = [
  main,
  hero,
  about,
  portfolio,
  portfolioImage,
  service,
  eventType,
]