import React, { useContext, useState } from 'react'
import './Sidebar.css';
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended,setExtended]=useState(true);
    const [prop,setProp]=useState(false);
    const [activity,setActivity]=useState(false);
    const [setting,setSetting]=useState(false);

    const {onSent,prevprompt,newChat,setRecentprompt }=useContext(Context)

    const loadPrompt= async (prompt)=>{
      setRecentprompt(prompt);
      await onSent(prompt);
    }

  return (
    <div className='sidebar'>
      <div className="top">
            <img onClick={()=>setExtended(pre=>!pre)} className='menu' src={assets.menu_icon} alt="" />
            <div onClick={()=>newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {extended?<p>New Chat</p>:null}
            </div>
            {extended 
            ?<div className="recent">
                <p className="recent-title">Recent</p>
                {
                  prevprompt.map((item,index)=>{
                    return(
                      <div onClick={()=>loadPrompt(item)}  className='recent-entry'> 
                          <img src={assets.message_icon} alt="" />
                          <p>{item.slice(0,18)}....</p>
                      </div>
                    )
                  })
                }
                
            </div>
            :null
            }
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry ">
            <img src={assets.question_icon} alt="" />
            {extended?<p onClick={()=>setProp(pre=>!pre)} >Help</p>:null}
        </div>
        <div className="bottom-item recent-entry ">
            <img src={assets.history_icon} alt="" />
            {extended?<p onClick={()=>setActivity(pre=>!pre)}>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry ">
            <img src={assets.setting_icon} alt="" />
            {extended?<p onClick={()=>setSetting(pre=>!pre)} >Setting</p>:null}
        </div>
      </div>

      {
        prop?
        <div className="helper">
            <button onClick={()=>setProp(pre=>!pre)} className='btn' >x</button>
            <h4>How can I help you ?</h4>
            <p>Please give you prompt and show relative result.</p>
            <p>you can seen your previous activity. </p>
            <p>your previos activity show in recent tap.</p>
        </div>
        :null
      }
      {
        activity?
        <div className='activity'>
           <button onClick={()=>setActivity(pre=>!pre)} className='btn' >x</button>
           <h4>Activity</h4>
           {
            prevprompt==[]?
             <p>your recent activity is 0. please search any type data.</p>
            :
            
              prevprompt.map((item,index)=>{
                if(prevprompt.length==0){
                  return(<p>your recent activity is 0. please search any type data.</p>)
                }
                else{
                  return(
                    <h4>Activity</h4> ,
                        <li className='active-li' >{item}</li>    
                  )
                }
                
              })        
           }          
        </div>
        :null
      }

      {setting?
      <div className='setting'>
        <p onClick={()=>setProp(pre=>!pre)} >Help</p>
        <p onClick={()=>setActivity(pre=>!pre)}>Activity</p>
        
      </div>
      :
        null
      }

    </div>
  )
}

export default Sidebar
