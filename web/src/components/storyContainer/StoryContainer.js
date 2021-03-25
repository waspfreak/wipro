import React from 'react';


export default ({children})=>{
    return <div style={{
        display:'flex',
        alignItems:'left',
        justifyContent:'space-around',
        flexDirection:'column'
    }}>
        {
            children
        }
    </div>
}