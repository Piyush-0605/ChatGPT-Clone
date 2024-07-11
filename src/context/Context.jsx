import { createContext, useState } from "react";
import run from "../config/gemini";


export const Context=createContext();

const ContextProvider=(props)=>{

    const [input,setInput]=useState('');
    const [recentprompt,setRecentprompt]=useState('');
    const [prevprompt,setPrevprompt]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState('');

    const delayPara=(index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat=()=>{
        setShowResult(false);
        setLoading(false);
        
    }

    const onSent=async(prompt)=>{
        setResultData("");
        setShowResult(true);
        setLoading(true);
        let response;
        if(prompt !== undefined){
            response =await run(prompt);
            setRecentprompt(prompt)
        }
        else{
            setPrevprompt(pre=>[...pre,input]);
            setRecentprompt(input);
            response=await run(input)
        }
        
        
            let responseArray=response.split("**");
            let newResponse="";
            for(let i=0;i<responseArray.length;i++)
            {
                if(i===0 || i%2 !== 1){
                    newResponse+=responseArray[i];
                }
                else{
                    newResponse+=responseArray[i];
                }
            }

            let newResponse2= newResponse.split("*").join("</br>");

            let newResponseArray=newResponse2.split(" ");
            for(let i=0; i<newResponseArray.length;i++){
                const nextWord=newResponseArray[i];
                delayPara(i,nextWord+" ")
            }

            // setResultData(newResponse);
            setLoading(false);
            setInput("");
        

        
    //     let newResponse2= newResponse.split("*").join("</br>");

    //    let newResponseArray=newResponse2.split(" ");
    //    for(let i=0; i<newResponseArray.length;i++){
    //         const nextWord=newResponseArray[i];
    //         delayPara(i,nextWord+" ")
    //    }


       
    }
    // onSent("what is react js");

    const ContextValue={
        input,
        setInput,
        recentprompt,
        setRecentprompt,
        prevprompt,
        setPrevprompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
        newChat
    }

    return(
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;