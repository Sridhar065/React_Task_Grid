
import React, {lazy, Suspense} from 'react';  
import './App.css';
import { BrowserRouter as Switch, Route } from 'react-router-dom';   
const Tables = lazy(() => import('./ViewList'));


   
const Routes = () => ( 
        <Switch>  
          <Suspense fallback={<div>Loading pages...</div>}>  
            <Route path='/' component={Tables} />
          </Suspense>    
        </Switch>         
  );  

export default Routes;
