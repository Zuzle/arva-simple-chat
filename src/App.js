import 'babel-polyfill';
import firebase                     from 'firebase';

import {FirebaseDataSource}         from 'arva-js/data/datasources/FirebaseDataSource.js';
import 'arva-js/utils/hotfixes/IESupport.js';
import {provide}                    from 'arva-js/utils/di/Decorators.js';
import {Injection}                  from 'arva-js/utils/Injection.js';
import {DataSource}                 from 'arva-js/data/DataSource.js';
import {App as ArvaApp}             from 'arva-js/core/App.js';
import {Router}                     from 'arva-js/core/Router.js';
import {ArvaRouter}                 from 'arva-js/routers/ArvaRouter.js';

/* Importing CSS in jspm bundled builds injects them into the DOM automagically */
import './famous.css';
import './fonts.css';
import './chat.css';

/* Here we import all controllers we want to use in the app */
import {ChatController}             from './controllers/ChatController.js';

export class App extends ArvaApp {

    /* References to Dependency Injection created App and Controller instances, so they are not garbage collected. */
    static references = {};

    /* The controllers that will be used in the app. */
    static controllers = [ChatController];


    /* Define which DataSource to use */
    static defaultDataSource() {
        /* Firebase initialization */
        firebase.initializeApp({
            apiKey: 'AIzaSyD9hZckVZeB2zxsAaHGug5TR_QeFd6cG_E',
            authDomain: 'arva-simple-chat.firebaseapp.com',
            databaseURL: 'https://arva-simple-chat.firebaseio.com',
            storageBucket: 'arva-simple-chat.appspot.com'
        });
        return new FirebaseDataSource('/', {});
    }

    static router() {
        let router = new ArvaRouter();
        router.setDefault('Chat', 'Index');
        return router;
    }

    /**
     *  Called before the App is constructed and before the basic components (Router, Famous Context, Controllers,
     *  DataSource) have loaded.
     */
    static initialize(){
        /* Change initial route, view animation or something needed before we start */
        provide(DataSource)(App.defaultDataSource);
        provide(Router)(App.router);

        this.start();
    }

    /**
     * Called after the Router, Famous Context, and Controllers have been instantiated,
     * but before any Controller method is executed by the Router.
     */
    static loaded(){
        /* Instantiate things you need before the router is executed here. For example:
         *
         * this.references.menu = Injection.get(Menu); */
    }

    /**
     * Called by super class after all components (routing, controllers, views, etc.) have been loaded and the
     * app is up and running.
     */
    static done(){
    }
}

document.addEventListener('deviceready', App.initialize.bind(App));