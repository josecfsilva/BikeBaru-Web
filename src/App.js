import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/content/Home';
import About from './components/content/About';
import Partner from './components/management/Partner';
import Circuit from './components/management/Circuit';
import Contacts from './components/content/Contacts';

import Robots from './components/seo/Robots';
import Sitemap from './components/seo/Sitemap';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/partners' component={Partner} />
          <Route path='/circuits' component={Circuit} />
          <Route path='/contacts' component={Contacts} />

          <Route path='/robots.txt' component={Robots} />
          <Route path='/sitemap.xml' component={Sitemap} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
