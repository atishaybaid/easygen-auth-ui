/*

Create a grid component which list down all the expense in a table,having flexible columns

functionalites to consider
- sorting
- freezed column
- Freezed header or not
- Row Actions
- Virtualization
- pagination
- custom colors
- 

High Level Approach
 - Render table or custom div
 - flexibility will be more with table
 - 


 - create a app which would have
  - a side pannel,
  - a container ,that would have a resuable Component which can rearrange as per the feed
  

--------
Approach 
- left pannel 

can be rendered while running a loop over the config
how would mainContainer know which application is selected
 1)Use the context
 
 2)Set the clicked product in the redux
--- if the app is becoming large we would consider this
  
 3)URL parameter


 4)

/*


exercise 

1. **Build a real-time stock price dashboard where the data updates every few seconds**
    1.  Efficiently handle state updates, and component lifecycle methods, and ensure smooth performance with frequent data updates.
    2.  
    
    
Approach
 - Subscribe to the data source 
 - lets say it is firebase 
    - simulate the data
    - create a setInterval to simulate the data source
    - 

  - TrottleState Updates
  
  - max update should be max 1 per second

let timerRegistered = false
  throttleUpdate = ()=>{

    if(!timerRegistered){
    setTimeout(()=>{
      update()
       timerRegistered = false;
    },1000)

    timerRegistered = true;
    }



    throttle vs debounce
     debounce
      - fire the action once after cooling down of a perticular time

      throttle
       - call the action once in the given time frame
  
  }


*/
// @ts-nocheck

"use client";
import { useEffect, useState } from "react";

const simulateRealTimeData = (calback: Function) => {
  setInterval(() => {
    const niftyData = 20000 + Math.random() * 1000;
    calback({
      niftyPrice: niftyData,
    });
  }, 12.5);
};

const Home = () => {
  const [niftyData, setNiftyData] = useState({});

  useEffect(() => {
    simulateRealTimeData(setNiftyData);
  }, []);

  const getNiftyData = () => {
    console.log("nifty data is");
    console.log(niftyData);
    if (niftyData && niftyData.niftyPrice) {
      return niftyData.niftyPrice;
    }
  };

  return (
    <div>
      <h2>Current Nifty Price {getNiftyData()}</h2>
    </div>
  );
};

export default Home;
