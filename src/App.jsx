import React, { useState } from "react";
import toast from "react-hot-toast";

// Function to copy content to clipboard
const copyToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  toast.success("Copied Successfully");
  document.body.removeChild(textArea);
};

function App() {
  const [inputText, setInputText] = useState("");
  const [wordLengthPart, setWordLengthPart] = useState(2000);
  const [parts, setParts] = useState([]);
  const [showParts, setShowParts] = useState(false);
  const [clickedIndex, setClickedIndex] = useState([]);

  const handleElementClick = (index) => {
    const updatedClickedButtons = [...clickedIndex];
    updatedClickedButtons[index] = !updatedClickedButtons[index];
    setClickedIndex(updatedClickedButtons);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleWordLengthChange = (event) => {
    setWordLengthPart(parseInt(event.target.value, 10));
  };

  const toggleChunk = (index) => {
    const updatedParts = [...parts];
    updatedParts[index].hidden = !updatedParts[index].hidden;
    setParts(updatedParts);
  };

  // const splitParagraph = () => {
  //   const paragraphLength = inputText.split(" ");
  //   const numParts = Math.ceil(paragraphLength.length / wordLengthPart);
  //   const partsArray = [];

  //   for (let i = 0; i < numParts; i++) {
  //     const start = i * wordLengthPart;
  //     const end = (i + 1) * wordLengthPart;
  //     const chunkWords = paragraphLength.slice(start, end);

  //     let content = {
  //       text: "",
  //       hidden: true,
  //     };

  //     if (i === numParts - 1) {
  //       content.text = `[START PART ${i + 1}/${numParts}]\n${chunkWords.join(
  //         " "
  //       )}\n[END PART ${
  //         i + 1
  //       }/${numParts}]\nALL PARTS SENT. Now you can continue processing the request.`;
  //     } else {
  //       content.text = `Do not answer yet. This is just another part of the text I want to send you. Just receive and acknowledge as "Part ${
  //         i + 1
  //       }/${numParts} received" and wait for the next part.`;
  //       content.text += `\n[START PART ${i + 1}/${numParts}]\n${chunkWords.join(
  //         " "
  //       )}\n[END PART ${i + 1}/${numParts}]`;
  //       content.text += `\nRemember not answering yet. Just acknowledge you received this part with the message "Part ${
  //         i + 1
  //       }/${numParts} received" and wait for the next part.`;
  //     }

  //     partsArray.push(content);
  //   }

  //   setParts(partsArray);
  //   setShowParts(true);
  // };

  //

  const splitParagraph = () => {
    try {
      if (!inputText.trim()) {
        toast.error("Please enter text to split.");
        return;
      }

      const paragraphLength = inputText.split(" ");
      const numParts = Math.ceil(paragraphLength.length / wordLengthPart);
      const partsArray = [];

      for (let i = 0; i < numParts; i++) {
        const start = i * wordLengthPart;
        const end = (i + 1) * wordLengthPart;
        const chunkWords = paragraphLength.slice(start, end);

        let content = {
          text: "",
          hidden: true,
        };

        if (i === numParts - 1) {
          content.text = `[START PART ${i + 1}/${numParts}]\n${chunkWords.join(
            " "
          )}\n[END PART ${
            i + 1
          }/${numParts}]\nALL PARTS SENT. Now you can continue processing the request.`;
        } else {
          content.text = `Do not answer yet. This is just another part of the text I want to send you. Just receive and acknowledge as "Part ${
            i + 1
          }/${numParts} received" and wait for the next part.`;
          content.text += `\n[START PART ${
            i + 1
          }/${numParts}]\n${chunkWords.join(" ")}\n[END PART ${
            i + 1
          }/${numParts}]`;
          content.text += `\nRemember not answering yet. Just acknowledge you received this part with the message "Part ${
            i + 1
          }/${numParts} received" and wait for the next part.`;
        }

        partsArray.push(content);
      }

      setParts(partsArray);
      setShowParts(true);
      toast.success("Prompt split successfully!");
    } catch (error) {
      console.error("Error splitting prompt:", error);
      toast.error("An error occurred while splitting the prompt.");
    }
  };

  // return (
  //   <div className="flex flex-col w-full h-screen lg:flex-row bg-purple-50">
  //     <div className="w-full px-4 pt-4 m-4 bg-white lg:m-6 lg:pt-8 lg:px-10 lg:w-1/2 rounded-3xl">
  //       <h1 className="mb-4 text-2xl font-bold text-purple-800 underline underline-offset-8">
  //         PROMPT SPLITTER
  //       </h1>
  //       <textarea
  //         className="block w-full p-3 bg-white border border-purple-300 shadow-sm lg:h-96 h-96 rounded-xl placeholder-italic placeholder-text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 sm:text-sm"
  //         placeholder="Enter your extensive prompt..."
  //         value={inputText}
  //         onChange={handleInputChange}
  //       ></textarea>
  //       <p className="mt-2 text-sm text-purple-600">
  //         Prompt Length: {inputText.length} characters.
  //       </p>
  //       <p className="mt-2 text-sm text-black">
  //         Open-source tool can safely process prompt up to around{" "}
  //         <span className="text-base font-bold text-purple-700">
  //           15,000 characters per request.
  //         </span>
  //       </p>
  //       <div className="flex justify-between">
  //         <div className="mt-4">
  //           <label className="text-purple-800">
  //             Words Per-Part :
  //             <input
  //               type="number"
  //               className="p-2 ml-4 border border-purple-300 rounded-md focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-2 sm:text-sm"
  //               value={wordLengthPart}
  //               onChange={handleWordLengthChange}
  //             />
  //           </label>
  //         </div>
  //         <button
  //           className="px-4 py-2 mt-4 text-white bg-purple-600 rounded-md hover:bg-purple-700"
  //           onClick={splitParagraph}
  //         >
  //           Split Prompt
  //         </button>
  //       </div>
  //     </div>
  //     <div className="w-full m-3 lg:w-1/2 ">
  //       {showParts && (
  //         <div className="mt-6">
  //           <h2 className="mb-2 text-2xl font-semibold text-purple-800">
  //             Generated Parts ({parts.length})
  //           </h2>
  //           {parts.map((part, index) => (
  //             <div
  //               key={index}
  //               className="p-4 mt-4 bg-white rounded-lg shadow-lg "
  //             >
  //               <p
  //                 className="text-purple-800 cursor-pointer"
  //                 onClick={() => toggleChunk(index)}
  //               >
  //                 {part.hidden
  //                   ? `Show Part ${index + 1}`
  //                   : `Hide Part ${index + 1}`}
  //               </p>
  //               {!part.hidden && (
  //                 <div className="">
  //                   <p className="mt-2 text-purple-800 ">{part.text}</p>
  //                   <p className="mt-2 text-sm text-purple-600">
  //                     Character Count: {part.text.length}
  //                   </p>
  //                 </div>
  //               )}
  //               <button
  //                 className="px-4 py-2 mt-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
  //                 onClick={() => copyToClipboard(part.text)}
  //               >
  //                 Copy
  //               </button>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col w-full h-full p-4 bg-purple-100 lg:p-6 lg:min-h-screen lg:flex-row fluid ">
      <div className="w-full p-4 bg-white lg:p-6 lg:w-1/3 rounded-3xl">
        <h1 className="mb-4 text-2xl font-bold text-center text-purple-800 underline lg:text-left underline-offset-8">
          PROMPT SPLITTER
        </h1>
        <textarea
          className="block w-full p-3 bg-white border border-purple-300 shadow-sm lg:h-full h-96 rounded-xl placeholder-italic placeholder-text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 sm:text-sm"
          placeholder="Enter your extensive prompt..."
          // className="w-full px-2"
          value={inputText}
          onChange={handleInputChange}
        ></textarea>
        <p>Prompt Length: {inputText.length} characters.</p>
        <p>
          Open-source tool can safely process prompt up to around{" "}
          <span>15,000 characters per request.</span>
        </p>
        <div>
          <div>
            <label>
              Words Per-Part:
              <input
                type="number"
                value={wordLengthPart}
                onChange={handleWordLengthChange}
              />
            </label>
          </div>
          <button onClick={splitParagraph}>Split Prompt</button>
        </div>
      </div>
      <div className="w-full p-4 bg-white lg:p-6 lg:w-2/3 rounded-3xl">
        {showParts && (
          <div>
            <h2>Generated Parts ({parts.length})</h2>
            {parts.map((part, index) => (
              <div key={index}>
                <p onClick={() => toggleChunk(index)}>
                  {part.hidden
                    ? `Show Part ${index + 1}`
                    : `Hide Part ${index + 1}`}
                </p>
                {!part.hidden && (
                  <div>
                    <p>{part.text}</p>
                    <p>Character Count: {part.text.length}</p>
                  </div>
                )}
                <button
                  onClick={() => {
                    copyToClipboard(part.text);
                    handleElementClick(index);
                  }}
                  className={`px-4 py-2 mt-2 text-white rounded-md hover:bg-purple-700 ${
                    clickedIndex[index] ? "bg-gray-400" : "bg-purple-600"
                  }`}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
