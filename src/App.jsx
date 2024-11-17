import { useCallback, useEffect, useRef, useState } from 'react'
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [length, setLength] = useState(6);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState('');

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (isNum) {
      str += '0123456789';
      // toast.success('Numbers Included')
    }
    if (isChar) {
      str += '!@#$%^&*()_[]{}+-';
      // toast.success('Special Characters Included')
    }

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);

  }, [length, isNum, isChar, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNum, isChar, passwordGenerator]);

  const handleClick = () => {
    passwordGenerator();
  };

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    toast.success("Password copied.");
  }, [password]);

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="max-w-max mx-auto shadow-md rounded-lg px-4 py-3 my-24 text-orange-500 bg-gray-800">
        <h1 className='text-pink-400 text-center font-mono font-bold text-xl cursor-default'>Keyva</h1>
        <h1 className='text-white text-center my-3 font-mono font-semibold cursor-default mb-4'>Your Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-6">

          <input type="text"
            value={password}
            className="outline-none w-full py-1 px-3 cursor-auto text-pink-700 font-semibold"
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            className='outline-none bg-blue-900 text-white px-3 py-1 shrink-0 hover:bg-blue-600'
            onClick={copyPassword}
          >Copy</button>
        </div>
    </div>

        <div className='flex items-center justify-center'>
          <div className="text-sm gap-x-2 items-center justify-center">

            <div className="flex items-center gap-x-1 mb-4">
              <label className='outline-none bg-blue-900 text-white px-4 shrink-0 rounded-xl py-1'>
                Length: {length}</label>
              <input type="range"
                min={6}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={(e) => setLength(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-x-1 mb-4">
            <label className='outline-none bg-blue-900 text-white px-3 py-0.5 rounded-xl'>
            Numbers </label>
              <input
                type="checkbox"
                defaultChecked={isNum}
                id='numberInput'
                onChange={() => {
                  setIsNum((prev) => !prev);
                }}
              />
              
            </div>

            <div className="flex items-center gap-x-1 mb-4">
            <label className='outline-none bg-blue-900 text-white px-3 py-0.5 shrink-0 rounded-xl'>
            Special Characters</label>
              <input
                type="checkbox"
                defaultChecked={isChar}
                id='charInput'
                onChange={() => {
                  setIsChar((prev) => !prev);
                }}
              />
              
            </div>

            <div className="flex items-center gap-x-1">
              <button
                type="button"
                id="newone"
                onClick={handleClick}
                className="outline-none bg-blue-900 text-white px-3 py-0.5 rounded-xl hover:bg-blue-600"
              >
                Get a New One
              </button>

            </div>

          </div>
        </div>
      
      <Toaster position="top-center" reverseOrder={false} />

      <footer className=" bg-gray-900 text-center text-white py-3 mt-auto font-mono">
        <p className="text mb-3">
          © 2024 Keyva | All rights reserved.
        </p>
        <p className='mb-3'>Developed with 💙</p>
        <a
          href="https://www.linkedin.com/in/suvankarbiswasju/"
          className="underline text-orange-500"
        >
        </a>
        <div className="flex justify-center gap-x-4 mt-2 flex-wrap">
          {/* GitHub */}
          <a
            href="https://github.com/suvankar-biswas6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-500"
          >
            <FaGithub className="text-xl" />
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/suvankarbiswasju/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-500"
          >
            <FaLinkedin className="text-xl" />
          </a>
          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61551898989276"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-500"
          >
            <FaFacebook className="text-xl" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
