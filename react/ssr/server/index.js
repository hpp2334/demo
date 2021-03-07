import path from 'path';
import Koa from 'koa';
import Router from '@koa/router';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import serve from 'koa-static';
import { render } from './render';
import { createServerStore } from '../client/store/createStore';
import { API_SERVER } from './config';
import { matchRoutes } from 'react-router-config';
import routes from '../client/routes';
import fetch from 'node-fetch';

globalThis.fetch = fetch;

const app = new Koa();
const router = new Router();
const SEARCH_LIST = ['react', 'react-rouer', 'react-redux', 'react-formik', 'vue', 'vue-vuex', 'vue-router', 'angular'];

router.get('/api/search', async (ctx, next) => {
  const { query } = ctx.query || {};
  if (typeof query === 'string') {
    ctx.body = SEARCH_LIST.filter(ITEM => ITEM.includes(query));
    return await next();
  }
  ctx.body = null;
});

app.use(serve(path.join(__dirname, '../dist/client')));
app.use(async (ctx, next) => {
  if (ctx.request.path.startsWith('/api/')) {
    return await next();
  }
  const store = createServerStore();
  const matchedRoutes = matchRoutes(routes, ctx.request.path);
  const renderCtx = createRenderContext(ctx);
  await Promise.all(matchedRoutes
    .filter(({ route }) => 'loadData' in route)
    .map(async ({ route }) => {
      await route.loadData(store.dispatch, renderCtx);
    }
  ));

  await render(ctx, store);
  await next();
});
app.use(router.routes());

app.listen(new URL(API_SERVER).port, () => {
  console.log('Addr:', API_SERVER);
});


function createRenderContext(ctx) {
  const search = new URLSearchParams(ctx.request.search);
  return {
    query: search.get('query'),
  };
}