import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { ThemeOptionsContext } from 'docs/src/modules/components/ThemeContext';
import globalSelector from './globalSelector';

// Cache for the rtl version of the styles
const cacheRtl = createCache({
  key: 'rtl',
  prepend: true,
  stylisPlugins: [prefixer, rtlPlugin, globalSelector],
});

export default function StyledEngineProvider(props) {
  const { children, cacheLtr } = props;
  const { direction } = React.useContext(ThemeOptionsContext);

  const rtl = direction === 'rtl';
  const emotionCache = direction === 'rtl' ? cacheRtl : cacheLtr;

  return (
    <StyleSheetManager stylisPlugins={rtl ? [rtlPlugin] : []}>
      <CacheProvider value={emotionCache}>{children}</CacheProvider>
    </StyleSheetManager>
  );
}

StyledEngineProvider.propTypes = {
  cacheLtr: PropTypes.object.isRequired,
  children: PropTypes.node,
};
