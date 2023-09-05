// import React, { useState } from "react";

// // Function to copy content to clipboard
// const copyToClipboard = (text) => {
//   const textArea = document.createElement("textarea");
//   textArea.value = text;
//   document.body.appendChild(textArea);
//   textArea.select();
//   document.execCommand("copy");
//   document.body.removeChild(textArea);
// };

// function App() {
//   const [inputText, setInputText] = useState("");
//   const [wordLengthPart, setWordLengthPart] = useState(2000);
//   const [parts, setParts] = useState([]);
//   const [showParts, setShowParts] = useState(false);

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const handleWordLengthChange = (event) => {
//     setWordLengthPart(parseInt(event.target.value, 10));
//   };

//   const splitParagraph = () => {
//     const paragraphLength = inputText.split(" ");
//     const numParts = Math.ceil(paragraphLength.length / wordLengthPart);
//     const partsArray = [];

//     for (let i = 0; i < numParts; i++) {
//       const start = i * wordLengthPart;
//       const end = (i + 1) * wordLengthPart;
//       const chunkWords = paragraphLength.slice(start, end);

//       let content = "";

//       if (i === numParts - 1) {
//         content = `[START PART ${i + 1}/${numParts}]\n${chunkWords.join(
//           " "
//         )}\n[END PART ${
//           i + 1
//         }/${numParts}]\nALL PARTS SENT. Now you can continue processing the request.`;
//       } else {
//         content = `Do not answer yet. This is just another part of the text I want to send you. Just receive and acknowledge as "Part ${
//           i + 1
//         }/${numParts} received" and wait for the next part.`;
//         content += `\n[START PART ${i + 1}/${numParts}]\n${chunkWords.join(
//           " "
//         )}\n[END PART ${i + 1}/${numParts}]`;
//         content += `\nRemember not answering yet. Just acknowledge you received this part with the message "Part ${
//           i + 1
//         }/${numParts} received" and wait for the next part.`;
//       }

//       partsArray.push(content);
//     }

//     setParts(partsArray);
//     setShowParts(true);
//   };

//   return (
//     <div className="flex h-screen bg-purple-50">
//       <div className="w-1/2 px-10 pt-8 m-6 bg-white rounded-3xl">
//         <h1 className="mb-4 text-2xl font-bold text-purple-800 underline underline-offset-8">
//           PROMPT SPLITTER
//         </h1>
//         <textarea
//           className="block w-full p-3 bg-white border border-purple-300 shadow-sm rounded-xl h-3/4 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 sm:text-sm"
//           placeholder="Enter your extensive prompt..."
//           value={inputText}
//           onChange={handleInputChange}
//         ></textarea>
//         <p className="mt-2 text-sm text-purple-600">
//           Prompt Length: {inputText.length} characters
//         </p>
//         <p className="mt-2 text-sm text-black">
//           Open-source tool can safely process prompt up to around{" "}
//           <span className="text-base font-bold text-purple-700">
//             15,000 characters per request
//           </span>
//         </p>
//         <div className="flex justify-between">
//           <div className="mt-4">
//             <label className="text-purple-800">
//               Words Per-Part :
//               <input
//                 type="number"
//                 className="p-2 ml-4 border border-purple-300 rounded-md focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-2 sm:text-sm"
//                 value={wordLengthPart}
//                 onChange={handleWordLengthChange}
//               />
//             </label>
//           </div>
//           <button
//             className="px-4 py-2 mt-4 text-white bg-purple-600 rounded-md hover:bg-purple-700"
//             onClick={splitParagraph}
//           >
//             Split Prompt
//           </button>
//         </div>
//       </div>
//       <div className="w-1/2 m-3">
//         {showParts && (
//           <div className="mt-6">
//             <h2 className="mb-2 text-2xl font-semibold text-purple-800">
//               Generated Parts ({parts.length})
//             </h2>
//             {parts.map((part, index) => (
//               <div
//                 key={index}
//                 className="p-4 mt-4 bg-white rounded-lg shadow-lg"
//               >
//                 <p className="text-purple-800">{part}</p>
//                 <p className="mt-2 text-sm text-purple-600">
//                   Character Count: {part.length}
//                 </p>
//                 <button
//                   className="px-4 py-2 mt-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
//                   onClick={() => copyToClipboard(part)}
//                 >
//                   Copy{" "}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
//==========================
import React, { useState } from "react";

// Function to copy content to clipboard
const copyToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
};

function App() {
  const [inputText, setInputText] = useState("");
  const [wordLengthPart, setWordLengthPart] = useState(2000);
  const [parts, setParts] = useState([]);
  const [showParts, setShowParts] = useState(false);

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

  const splitParagraph = () => {
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
        content.text += `\n[START PART ${i + 1}/${numParts}]\n${chunkWords.join(
          " "
        )}\n[END PART ${i + 1}/${numParts}]`;
        content.text += `\nRemember not answering yet. Just acknowledge you received this part with the message "Part ${
          i + 1
        }/${numParts} received" and wait for the next part.`;
      }

      partsArray.push(content);
    }

    setParts(partsArray);
    setShowParts(true);
  };

  return (
    <div className="flex h-screen bg-purple-50">
      <div className="w-1/2 px-10 pt-8 m-6 bg-white rounded-3xl">
        <h1 className="mb-4 text-2xl font-bold text-purple-800 underline underline-offset-8">
          PROMPT SPLITTER
        </h1>
        <textarea
          className="block w-full p-3 bg-white border border-purple-300 shadow-sm rounded-xl h-3/4 placeholder-italic placeholder-text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 sm:text-sm"
          placeholder="Enter your extensive prompt..."
          value={inputText}
          onChange={handleInputChange}
        ></textarea>
        <p className="mt-2 text-sm text-purple-600">
          Prompt Length: {inputText.length} characters.
        </p>
        <p className="mt-2 text-sm text-black">
          Open-source tool can safely process prompt up to around{" "}
          <span className="text-base font-bold text-purple-700">
            15,000 characters per request.
          </span>
        </p>
        <div className="flex justify-between">
          <div className="mt-4">
            <label className="text-purple-800">
              Words Per-Part :
              <input
                type="number"
                className="p-2 ml-4 border border-purple-300 rounded-md focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-2 sm:text-sm"
                value={wordLengthPart}
                onChange={handleWordLengthChange}
              />
            </label>
          </div>
          <button
            className="px-4 py-2 mt-4 text-white bg-purple-600 rounded-md hover:bg-purple-700"
            onClick={splitParagraph}
          >
            Split Prompt
          </button>
        </div>
      </div>
      <div className="w-1/2 m-3">
        {showParts && (
          <div className="mt-6">
            <h2 className="mb-2 text-2xl font-semibold text-purple-800">
              Generated Parts ({parts.length})
            </h2>
            {parts.map((part, index) => (
              <div
                key={index}
                className="p-4 mt-4 bg-white rounded-lg shadow-lg "
              >
                <p
                  className="text-purple-800 cursor-pointer"
                  onClick={() => toggleChunk(index)}
                >
                  {part.hidden
                    ? `Show Part ${index + 1}`
                    : `Hide Part ${index + 1}`}
                </p>
                {!part.hidden && (
                  <div className="">
                    <p className="mt-2 text-purple-800 ">{part.text}</p>
                    <p className="mt-2 text-sm text-purple-600">
                      Character Count: {part.text.length}
                    </p>
                  </div>
                )}
                <button
                  className="px-4 py-2 mt-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                  onClick={() => copyToClipboard(part.text)}
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
