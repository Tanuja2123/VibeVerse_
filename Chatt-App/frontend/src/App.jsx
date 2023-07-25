import './index.css';
import React, { useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle.jsx';


const url = "https://chat-backend-p0z7.onrender.com"

const deletbttn = (chatId) => {
  fetch(`https://chat-backend-p0z7.onrender.com/chats/${chatId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Deleted Successfully")
      } else {
        console.log("Delete not completed")
      }
    })
};


const onpress = async () => {


  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  const response = await fetch('https://chat-backend-p0z7.onrender.com/chats', {
    method: "POST",
    body: JSON.stringify({
      title: title,
      description: description
    }),
    headers: {
      "Content-type": "application/json"
    }
  });

  if (response.status === 200) {
    console.log('chat created successfully!');
    setchats([...chats, { title, description }])
  } else {
    console.log('Error creating chat!');
  }
};

function usechats(){

  const [chats,setchats]= React.useState([])

  React.useEffect(()=> {
    fetch("https://chat-backend-p0z7.onrender.com/chats",{
      method:"GET"
    }).then((response)=>{
      response.json().then((data) =>{
        console.log("data is "+data)
        setchats(data)
      })})

      setInterval(()=>{
        fetch("https://chat-backend-p0z7.onrender.com/chats",{
          method:"GET"
        }).then((response)=>{
          response.json().then((data) =>{
            console.log("data is "+data)
            setchats(data)
          })})
      },1000)
    },[])

    return chats
}



function App() {

  const chats = usechats() 

  return (
      <>

      <div className=' flex flex-wrap  flex-col justify-around items-center bg-[#f3f2f2] dark:bg-[#222222] w-screen h-screen '>

      <nav className='bg-[#fff] dark:bg-[#2A2A2A]   w-screen text-[#000] dark:text-white flex border-solid border-2 border-[#ccc] dark:border-[#4746467c] rounded-xl'>
        <h1 className='font-bold text-3xl p-4'>Chatt 💬</h1>
        <DarkModeToggle />
      </nav>


          <div className='   gap-2 max-w-full overflow-hidden bg-[#f3f2f2] dark:bg-[#222222]  w-[90%] h-[70%] p-2  border-solid border-2 border-[#ccc] dark:border-[#4746467c] rounded-xl  max-h-[544] overflow-y-scroll'>
            {/* note items here */}
          

      {chats.map((chat) => {
        return (
          <div className='w-full h-[100px]  bg-[#fff] dark:bg-[#2A2A2A] dark:text-white border-solid border-2 border-[#ccc] dark:border-[#4746467c] overflow-wrap break-words overflow-y-scroll no-scrollbar whitespace-normal rounded-xl  m-1 p-2'>
            <div className='flex'>
              <h1 className='text-xl font-bold'>{chat.title}</h1>
              {/* <button onClick={() => {deletbttn(chat.id)}}className=' m-1 p-1  rounded-xl cursor-pointer hover:bg-sky-500 ml-auto'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="text-[#000] dark:text-white h-6 w-6 hover:text-slate-800 dark:hover:text-slate-300"><title>delete</title><path d="M18,19C18,20.66 16.66,22 15,22H8C6.34,22 5,20.66 5,19V7H4V4H8.5L9.5,3H13.5L14.5,4H19V7H18V19M6,7V19C6,20.1 6.9,21 8,21H15C16.1,21 17,20.1 17,19V7H6M18,6V5H14L13,4H10L9,5H5V6H18M8,9H9V19H8V9M14,9H15V19H14V9Z" fill="currentColor"/></svg>
              </button> */}
              </div>
            <h1 className='pl-1'>{chat.description}</h1>
            
            <br />
          </div>
        );
      })}
          </div>

<div className=' flex flex-nowrap flex-row justify-evenly items-center bg-[#f3f2f2] dark:bg-[#2a2a2a] text-[#000] dark:text-[#ffffff]  p-1  border-solid border-2 border-[#ccc] dark:border-[#4746467c] rounded-xl h-fit w-[95%] md:w-fit '>

<div className='grid sm:grid-cols-1 md:grid-cols-2 gap-1 w-full'>
  <input id="title" className=" bg-[#fff] dark:bg-[#2a2a2a] text-[#000] dark:text-[#FFFFFF] border-solid border-2 border-[#ccc] dark:border-[#4746467c] p-2 rounded-xl mr-1 w-full " type="text" placeholder='User-name'/>
  <input id="description" className=" bg-[#fff] dark:bg-[#2a2a2a] text-[#000] dark:text-[#FFFFFF] border-solid border-2 border-[#ccc] dark:border-[#4746467c] p-2 rounded-xl mr-1 w-full md:grid-cols-2" type="text" placeholder='Message'/>
</div>


                  <button onClick={onpress} className="flex items-center   pr-1 pl-1 rounded-xl ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="text-[#000] dark:text-white h-6 w-6 hover:text-slate-800 dark:hover:text-slate-300">
                      <title>send-message</title>
                      <path d="M3 20V4L22 12M5 17L16.85 12L5 7V10.5L11 12L5 13.5M5 17V7 13.5Z" fill="currentColor" />
                    </svg>
                  </button>

          </div>
      </div>
    </>
  )
} 

export default App
