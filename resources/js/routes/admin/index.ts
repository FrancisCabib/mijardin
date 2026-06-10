import services from './services'
import tags from './tags'
import categories from './categories'
import sections from './sections'
const admin = {
    services: Object.assign(services, services),
tags: Object.assign(tags, tags),
categories: Object.assign(categories, categories),
sections: Object.assign(sections, sections),
}

export default admin