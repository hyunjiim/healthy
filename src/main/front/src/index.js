import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Header from "./layout/header";
import Footer from "./layout/footer";
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Header />
        <App />
        <Footer />
    </BrowserRouter>
);

// reportWebVitals 함수를 선언하여 사용해야 함
function startReportingWebVitals(onPerfEntry) {
    reportWebVitals(onPerfEntry);
}

// Web Vitals 보고를 시작합니다.
startReportingWebVitals();
