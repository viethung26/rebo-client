import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StyleSheetManager } from 'styled-components'
import i18next from 'i18next'
import {I18nextProvider} from 'react-i18next'
import en from './configs/en.json'
import vi from './configs/vi.json'

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'vi',
  resources: {
    en, vi
  },
  defaultNS: '_',
  react: {
    transKeepBasicHtmlNodesFor: ['br', 'p'],
  },
  // debug: true
})

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <StyleSheetManager disableVendorPrefixes>
      <App />
    </StyleSheetManager>
  </I18nextProvider>,
  document.getElementById('root')
)