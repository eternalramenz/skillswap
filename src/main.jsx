import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from "@material-tailwind/react";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from "./redux/store/ReduxStore.ts"
import './style.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GlobalContextProvider } from './contexts/GlobalContext.jsx';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <GlobalContextProvider>
              <Routes>
                <Route path = "*" element ={<App/>} />
              </Routes>
            </GlobalContextProvider>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
