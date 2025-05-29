import React, { useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context';
import { useContext } from 'react';

const Sidebar = () => {
    const[extended,setExtended]=useState(false);
    const { onSent, prevPrompt, setRecentPrompt, setInput, setShowResult } = useContext(Context);

    const loadPrompt=async(prompt)=>{
        setRecentPrompt(prompt);
       await onSent(prompt);
    }
  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <img  onClick={
            ()=>setExtended(prev=>!prev)
        } title="Menu" 
            className='menu' src={assets.menu_icon} alt=""></img>
        <div className="new-chat" onClick={() => {
                setInput("");
                setShowResult(false);
                setRecentPrompt("");
            }}>
            <img className='plus' src={assets.plus_icon} title="New chat" alt=""/>
           {extended? <p>New chat</p> : null}
        </div>
        {extended?
        <div className="recent">
            <p className="recent-title">
                Recent chats
            </p>
           {prevPrompt.map((item, index) => (
            <div key={index} onClick={()=>loadPrompt(item)} className="recent-entry">
                <img src={assets.message_icon} alt=""/>
                <p>{item.length > 15 ? item.substring(0, 15) + '...' : item}</p>
            </div>
            ))}
        </div>
            :null}
      </div>
      
      <div className="bottom">
        <div className="bottom-item recent-entry">
            <img src={assets.question_icon} title="Help" alt=""/>
            {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} title="History" alt=""/>
            {extended?<p>History</p>:null}
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} title="Settings" alt=""/>
            {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
   
  )
}

export default Sidebar
