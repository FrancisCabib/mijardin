import Api from './Api'
import CatalogController from './CatalogController'
import Admin from './Admin'
import Settings from './Settings'
const Controllers = {
    Api: Object.assign(Api, Api),
CatalogController: Object.assign(CatalogController, CatalogController),
Admin: Object.assign(Admin, Admin),
Settings: Object.assign(Settings, Settings),
}

export default Controllers