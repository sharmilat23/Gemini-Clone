import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResult(prev => prev + nextWord);
        }, 75 * index);
    };

    const onSent = async (prompt) => {
        setResult("");
        setLoading(true);
        setShowResult(true);
        let response;

        if (prompt !== undefined) {
            setInput(prompt);
            response = await main(prompt);
            setPrevPrompt(prev => [...prev, prompt]);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompt(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await main(input);
        }

        // Apply typing effect to raw response
        const words = response.split(" ");
        for (let i = 0; i < words.length; i++) {
            const nextWord = words[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,
        loading,
        result,
        input,
        setInput
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;


// import { createContext,useState,useEffect } from "react";
// import main from "../config/gemini";

// export const Context=createContext();

// const ContextProvider=(props)=>{
//     const[input,setInput]=useState("");
//     const[result,setResult]=useState("");
//     const[recentPrompt,setRecentPrompt]=useState("");
//     const[prevPrompt,setPrevPrompt]=useState([]);
//     const[showResult,setShowResult]=useState(false);
//     const[loading,setLoading]=useState(false);

    // const delayPara=(index, nextWord)=>{
    //         setTimeout(function(){
    //                 setResult(prev=>prev+nextWord);
    //         },75*index);
    // }

//     const onSent=async(prompt)=>{
//         setResult("");
//         setLoading(true);
//         setShowResult(true);
//         let response;
//         if(prompt!==undefined){
//                 setInput(prompt);
//                 response=await main(prompt);
//                 setPrevPrompt(prev=>[...prev,prompt]);
//                 setRecentPrompt(prompt);
//         }
//         else{
//             setPrevPrompt(prev=>[...prev,input]);
//             setRecentPrompt(input);
//             response=await main(input);
//         }
       
//         let responseArray=response.split("**");
//         let newResponse="";
//         for(let i=0;i<responseArray.length;i++){
//             if(i===0 || i%2!==1){
//                 newResponse+=responseArray[i];
//             }
//             else{
//                 newResponse+="<b>"+responseArray[i]+"</b>";
//             }
//         }
//         let newResponse2=newResponse.split("*").join("</br>");
//             let newResponseArray=newResponse2.split(" ");
//             for(let i=0;i<newResponseArray.length;i++){
//                 const nextWord=newResponseArray[i];
//                 delayPara(i,nextWord+" ");
//             }
//             setLoading(false);
//             setInput("");
//     }
//     // useEffect(()=>{
//     // onSent(input);
//     //     },[]);

//     const contextValue = {
//         prevPrompt,
//         setPrevPrompt,
//         onSent,
//         setRecentPrompt,
//         recentPrompt,
//         showResult,
//         setShowResult,  
//         loading,
//         result,
//         input,
//         setInput        
//     };


//     return(
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
//     )
// }

// export default ContextProvider
