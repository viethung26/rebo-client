import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil'
import App from './App';
import { StyleSheetManager } from 'styled-components'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import en from './configs/en.json'
import vi from './configs/vi.json'
import './sockets'
import moment from 'moment'
import 'moment/locale/vi'
moment.locale('vi')
// io.on('connect_timeout', () => {
//   console.info('9779 connect timeout')
// })
// io.emit('message', "hi", (res) => {
//   console.info('9779 res', res)
// })
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
      <RecoilRoot>
        <App/>
      </RecoilRoot>
    </StyleSheetManager>
  </I18nextProvider>,
  document.getElementById('root')
)