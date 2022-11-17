// import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import MainAppNavigator from './containers';
// import createStore from './redux/store';
import './scss/styles.scss';
// import 'react-tabs/style/react-tabs.css';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import './assets/i18n';
import createStore from './redux/store';
// import { updateVnLocale } from './utils';
import { QueryClient, QueryClientProvider } from 'react-query';

import { MuiThemeProvider } from '@material-ui/core';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ONE_HOUR } from './appConfig/constants';
import { theme } from './appConfig/muiTheme';
const { store, history } = createStore();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: ONE_HOUR,
    },
  },
});

// Amplify.configure(appConfig.AWS_CONFIG);

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConnectedRouter history={history}>
          <Router>
            <Route component={MainAppNavigator} />
          </Router>
        </ConnectedRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </MuiThemeProvider>
);

// ReactDOM.render(
//   <Provider store={store}>
//     <QueryClientProvider client={queryClient}>
//       <ConnectedRouter history={history}>
//         <Router>
//           <Route component={MainAppNavigator} />
//         </Router>
//       </ConnectedRouter>
//     </QueryClientProvider>
//   </Provider>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// workbox.register();
// updateVnLocale();
