import React, { Component } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Catalog from './components/Catalog';
import Preloader from './components/Preloader/Preloader';
import EditForm from './components/EditForm';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <Preloader />
                <Header />
                <Switch>
                    <Route path='/edit/:id' component={EditForm} />
                    <Route path='/edit' component={EditForm} />
                    <Route path='/' exact component={Catalog} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;