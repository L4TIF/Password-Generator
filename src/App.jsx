import { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  /* Password Generator */
  const [passlength, setpasslength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [sCharAllowed, setsCharAllowed] = useState(false);
  const [pass, setpass] = useState("");
  const [showCopiedMessage, setshowCopiedMessage] = useState(false);

  const passwordRef = useRef("null");
  const generatePassword = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) string += "0123456789";
    if (sCharAllowed) string += "!@#$%^&*(){}[]";

    for (let i = 0; i < passlength; i++) {
      const randomChar = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(randomChar);
    }
    setpass(pass);
  }, [passlength, numAllowed, sCharAllowed, setpass]);

  useEffect(() => {
    generatePassword();
  }, [passlength, numAllowed, sCharAllowed, generatePassword]);

  const copyToClickboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, passlength);

    window.navigator.clipboard.writeText(pass);
    setshowCopiedMessage(true);
    setTimeout(() => {
      setshowCopiedMessage(false);
    }, 2000);
  }, [pass, passlength]);

  return (
    <div className="bg-slate-800 lg:w-1/2 w-4/5 h-fit rounded-xl m-10 flex flex-col lg:block items-start  p-5 text-2xl mx-auto">
      <h1 className="text-white text-2xl text-center mb-5">
        Password Generator
      </h1>
      <div className="flex  rounded-lg  overflow-hidden mb-10 md:text-3xl">
        <input
          className="py-1 px-3 w-full"
          placeholder="Password"
          readOnly
          value={pass}
          type="text"
          ref={passwordRef}
        />
        <button
          onClick={copyToClickboard}
          className="copy bg-blue-700 text-white px-3  py-2 hover:bg-blue-500 flex items-center justify-center font-bold pb-4"
        >
          copy
        </button>
      </div>
      <input
        onChange={(e) => setpasslength(e.target.value)}
        type="range"
        name="passlength"
        id="passlength"
        defaultValue={8}
        min={6}
        max={20}
        className="mr-5 w-full lg:w-fit"
      />
      <label htmlFor="passlength" className="text-orange-400 mr-4">
        Length: {passlength}
      </label>

      <label className="text-orange-400 mr-4" htmlFor="numAllowed">
        <input
          onChange={() => setnumAllowed((allowed) => !allowed)}
          className=" mr-2"
          type="checkbox"
          name="numAllowed"
          id="numAllowed"
        />
        Numbers
      </label>

      <label className="text-orange-400 mr-4" htmlFor="sCharAllowed">
        <input
          onChange={() => setsCharAllowed((allowed) => !allowed)}
          className=" mr-2"
          type="checkbox"
          name="sCharAllowed"
          id="sCharAllowed"
        />
        Special Character
      </label>
      {showCopiedMessage && (
        <p
          className={`fixed bottom-5 left-0 right-0 text-center text-white text-wrap w-fit bg-green-500 px-4 py-2 mx-auto w-max rounded-md duration-1000 ease-in transition-opacity ${
            showCopiedMessage ? "opacity-100" : "opacity-0"
          }`}
        >
          Copied to Clipboard {pass}
        </p>
      )}
    </div>
  );
};

export default App;
