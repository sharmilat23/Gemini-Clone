import React, {useContext} from 'react'
import './Main.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {
const{onSent,recentPrompt,showResult,loading,result,setInput,input}=useContext(Context);

  return (
    <div className='main'>
      <div className="nav">
        <div className='nav-left'>
        <img className='gem-pic' src={assets.gemini_icon} alt="gem-image"></img>
        <p>Gemini</p>
        </div>
        <div className='nav-right'>
        <img className='img' src={assets.pic} title="Profile" alt=""/>
        </div>
      </div>
      <div className="main-container">
        {!showResult
        ? <>
         <div className="greet">
            <p><span>Hello Sharmi..</span></p>
            <p>How can I help you today?</p>
        </div>
        <div className="cards">
            <div className="card" onClick={()=>onSent("Suggest beautiful places to see on an upcoming road trip")}>
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt=""/>
            </div>
            <div className="card" onClick={()=>onSent("Breifly summarize this concept: urban planning")}>
                <p>Breifly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt=""/>
            </div>
            <div className="card" onClick={()=>onSent("Brainstorm team bonding activities for our work reveal")}>
                <p>Brainstorm team bonding activities for our work reveal</p>
                <img src={assets.message_icon} alt=""/>
            </div>
            <div className="card" onClick={()=>onSent("Improve the readability of the following code")}>
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt=""/>
            </div>
        </div>
        </>
        :
        <div className='resultclass'>
          <div className="result-title">
            <img src={assets.pic} alt=""></img>
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt=""></img>
            {loading
            ?<div className='loader'>
              <hr />
              <hr />
              <hr />
            </div>
          :<p dangerouslySetInnerHTML={{__html:result}}></p>}
            
          </div>
        </div>
        }
       
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' ></input>
            <div>
              <img src={assets.gallery_icon} title="Not available" alt=""/>
              <img src={assets.mic_icon} title="Not available" alt=""/>
              {input?<img src={assets.send_icon} onClick={()=>onSent()} alt=""/> : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double check its response. Your privacy and Gemini apps.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
