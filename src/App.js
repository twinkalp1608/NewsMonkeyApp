import './App.css';

import React, { Component } from 'react';
import { useState } from 'react';
import Navbar from './component/Navbar';
import News from './component/News';
import LoadingBar from "react-top-loading-bar";
// import NewsItem from './component/NewsItem';
import {BrowserRouter , Route,Routes } from "react-router-dom";



const App =() => {
   const pageSize=6;
   const apiKey="8811bf7baf1c49c4af8e1970b4d4652f";
   const [progress, setProgress] = useState(0);
 
  
    return (
      <div>
        <BrowserRouter>
          <Navbar/>
          <LoadingBar
            color="#f11946"
            height={3}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route exact path="/" element={<News  setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general"/>}/>
            <Route exact path="/business" element={<News  setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business"/>}/>
            <Route exact path="/entertainment" element={<News  setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment"/>}/>
            <Route exact path="/general" element={<News  setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general"/>}/>
            <Route exact path="/health" element={<News  setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health"/>}/>
            <Route exact path="/science" element={<News  setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science"/>}/> 
            <Route exact path="/sports" element={<News  setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports"/>}/>
            <Route exact path="/technology" element={<News  setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology"/>}/>
          </Routes>
        </BrowserRouter>
        
        
      </div>
    )
  
}

export default App