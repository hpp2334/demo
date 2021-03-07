import Search, { loadSearchData } from './component/search';
import Home from './component/home';

export default [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/search",
    component: Search,
    loadData: loadSearchData,
  },
];
