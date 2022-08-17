import React from 'react';
import s from './Layout.module.css';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { Main } from '../main/Main';
import { Navbar } from '../navbar/Navbar';

const Layout = () => {
  return (
    <div className={s.layout}>
      <Header />
      <Main />
      <Navbar />
      <Footer />
    </div>
  );
};

export { Layout };
