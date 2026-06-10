import ServiceController from './ServiceController'
import TagController from './TagController'
import CategoryController from './CategoryController'
import CatalogSectionController from './CatalogSectionController'
const Admin = {
    ServiceController: Object.assign(ServiceController, ServiceController),
TagController: Object.assign(TagController, TagController),
CategoryController: Object.assign(CategoryController, CategoryController),
CatalogSectionController: Object.assign(CatalogSectionController, CatalogSectionController),
}

export default Admin