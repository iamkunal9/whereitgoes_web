import { Inter } from 'next/font/google'
import { useState,useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

const inter = Inter({ subsets: ['latin'] })
var ddd = null;
export default function Home() {
  const [data, setData] = useState(null)
  const [domain, setDomain] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  async function handleLogin(){
    try {
      const response = await fetch("/api/login", {
        method: "GET",
        headers: {
          'username': username,
          'password':password
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setIsLoggedIn(jsonData.success);
      setUsername("")
      setPassword("")
      setDomain("")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function fetchData() {
    if(!isLoading){

    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/hello?url=${domain}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      ddd = [domain]
      setData(jsonData.json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false)
  }
  }

  return (
    
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {isLoggedIn?<>
      <div className="grid items-center">
        <input
          id="cool-input"
          type="text"
          value={domain}
          className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          placeholder="Enter domain name..."
          onChange={x => setDomain(event.target.value)}
        />
        <button
          type="submit"
          onClick={fetchData}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit
        </button>
        {isLoading ? (
        <LoadingSpinner />
      ) :null}
        {data && data.length > 0 ? <ul>
          <div className='flex justify-between'>

              <p >{ddd}</p>
              <p className='pl-10'>301</p>
            </div>
          {data.map((item,idx) => (
            <div className='flex justify-between' key={idx}>

              <p key={item.id}>{item.link}</p>
              <p className='pl-10'>{item.status_code}</p>
            </div>
          ))}
        </ul> : null}
      </div>
      </>:<>
      <div>
      <input
          id="cool-input"
          type="text"
          value={username}
          className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          placeholder="Enter username..."
          onChange={x => setUsername(event.target.value)}
        />
        <input
          id="cool-input"
          type="password"
          value={password}
          className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          placeholder="Enter password..."
          onChange={x => setPassword(event.target.value)}
        />
        <button
          type="submit"
          onClick={handleLogin}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >Login</button>
        
        </div>
      
      </>}
    </main>
  )
}
