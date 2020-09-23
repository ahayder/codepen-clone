import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import './App.css';
import Editor from './Editor';

function App() {

  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')


  useEffect(() => {

    setHtml(`
    <div id=container>
  Make 
  <div id=flip>
    <div><div>wOrK</div></div>
    <div><div>lifeStyle</div></div>
    <div><div>Everything</div></div>
  </div>
  AweSoMe!
</div>

<p>a css3 animation demo by <a href="https://codepen.io/yemon/pen/pWoROm">Nooray Yemon</a></p>
    `)

    setCss(`
    @import url('https://fonts.googleapis.com/css?family=Roboto:700');

    body {
      margin:0px;
      font-family:'Roboto';
      text-align:center;
    }
    
    #container {
      color:#999;
      text-transform: uppercase;
      font-size:36px;
      font-weight:bold;
      padding-top:200px;  
      position:fixed;
      width:100%;
      bottom:45%;
      display:block;
    }
    
    #flip {
      height:50px;
      overflow:hidden;
    }
    
    #flip > div > div {
      color:#fff;
      padding:4px 12px;
      height:45px;
      margin-bottom:45px;
      display:inline-block;
    }
    
    #flip div:first-child {
      animation: show 5s linear infinite;
    }
    
    #flip div div {
      background:#42c58a;
    }
    #flip div:first-child div {
      background:#4ec7f3;
    }
    #flip div:last-child div {
      background:#DC143C;
    }
    
    @keyframes show {
      0% {margin-top:-270px;}
      5% {margin-top:-180px;}
      33% {margin-top:-180px;}
      38% {margin-top:-90px;}
      66% {margin-top:-90px;}
      71% {margin-top:0px;}
      99.99% {margin-top:0px;}
      100% {margin-top:-270px;}
    }
    
    p {
      position:fixed;
      width:100%;
      bottom:30px;
      font-size:12px;
      color:#999;
      margin-top:200px;
    }
    `)

    setJs(`
    colors = new Array("fuchsia","orange","lime","teal","brown","hotpink","gray","white")

    colorIndex = 0
    
    function changeColor() {
     document.bgColor = colors[colorIndex]
     colorIndex = (colorIndex + 1) % colors.length
    }
    
    function startColorChange() {
     setInterval("changeColor()",3000)
    }
    
    window.onload = startColorChange
    `)

  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])


  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="xml"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="xml"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
