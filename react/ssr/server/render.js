import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App, Main } from '../client/app';
import { readFile } from 'fs/promises';
import path from 'path';
import { ChunkExtractor, ChunkExtractorManager  } from '@loadable/server';

function createRouter(ctx) {
  const url = ctx.url;
  return function ServerRouter(props) {
    return (
      <StaticRouter location={url}>
        {props.children}
      </StaticRouter>
    )
  }
}

export async function render(ctx, store) {
  const Router = createRouter(ctx);

  // @Loadable SSR
  const statsFile = path.resolve(__dirname, '../dist/client/loadable-stats.json');
  const extractor = new ChunkExtractor({ statsFile });
  const content = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <App store={store} Router={Router} />
    </ChunkExtractorManager>
  );


  const styleTags = extractor.getStyleTags();
  const scriptTags = extractor.getScriptTags();

  const initStateStr = JSON.stringify(store.getState());

  let template = await readFile(path.join(__dirname, '../client/index.html'), 'utf-8');
  template = template
    .replace('<!-- __SERVER_PRELOAD_CONTENT__ -->', content)
    .replace('__$$PRELOAD_STATE$$__', initStateStr)
    .replace('<!-- STYLE_TAGS -->', styleTags)
    .replace('<!-- SCRIPT_TAGS -->', scriptTags)

  ctx.body = template;
}