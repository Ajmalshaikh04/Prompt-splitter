
// import { useState } from "react";
// import toast from "react-hot-toast";

// // Function to copy content to clipboard
// const copyToClipboard = (text) => {
//   const textArea = document.createElement("textarea");
//   textArea.value = text;
//   document.body.appendChild(textArea);
//   textArea.select();
//   document.execCommand("copy");
//   toast.success("Copied Successfully");
//   document.body.removeChild(textArea);
// };

// function App() {
//   const [inputText, setInputText] = useState("");
//   const [wordLengthPart, setWordLengthPart] = useState(2000);
//   const [parts, setParts] = useState([]);
//   const [showParts, setShowParts] = useState(false);
//   const [clickedIndex, setClickedIndex] = useState([]);
//   const [cliCommand1, setCliCommand1] = useState(`Get-ChildItem -Recurse -Exclude 'package-lock.json', 'output.txt','package.json','.env','.gitignore','README.md' | Where-Object { 
//      $_.FullName -notlike '*\\coverage\\*' -and 
//      $_.FullName -notlike '*\\node_modules\\*' -and 
//      $_.FullName -notlike '*\\seed\\*' -and
//      -not $_.PSIsContainer 
// } | ForEach-Object {
//      "======================================================================="
//      "{0}\`n\`n{1}\`n" -f $_.FullName, (Get-Content $_.FullName -Raw)
//  } | Out-File -FilePath 'output.txt' -Encoding utf8`);

//   const [cliCommand2, setCliCommand2] = useState(`
// function Get-Tree {
//     param (
//         [string]$Path = $null,
//         [int]$IndentLevel = 0
//     )

//     if (-not $Path) {
//         $Path = Read-Host "Enter the path (press Enter for the current directory):"
//         if (-not $Path) {
//             $Path = (Get-Location).Path
//         }
//     }

//     $indentation = "│   " * $IndentLevel
//     $currentDirectory = Get-Item $Path

//     # Exclude node_modules and build directories
//     $excludedDirectories = @("node_modules", "build","images","fonts","logo","favicon","illustrations","icons","background")
//     if ($currentDirectory.Name -notin $excludedDirectories) {
//         Write-Output "$indentation├── $($currentDirectory.Name)/ [Folder]"

//         $subDirectories = Get-ChildItem -Path $Path -Directory
//         $subFiles = Get-ChildItem -Path $Path -File

//         foreach ($subDirectory in $subDirectories) {
//             Get-Tree -Path $subDirectory.FullName -IndentLevel ($IndentLevel + 1)
//         }

//         foreach ($subFile in $subFiles) {
//             Write-Output "$indentation│   └── $($subFile.Name)"
//         }
//     }
// }

// # Run the script
// Get-Tree
//   `);

//   const handleElementClick = (index) => {
//     const updatedClickedButtons = [...clickedIndex];
//     updatedClickedButtons[index] = !updatedClickedButtons[index];
//     setClickedIndex(updatedClickedButtons);
//   };

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const handleWordLengthChange = (event) => {
//     setWordLengthPart(parseInt(event.target.value, 10));
//   };

//   const toggleChunk = (index) => {
//     const updatedParts = [...parts];
//     updatedParts[index].hidden = !updatedParts[index].hidden;
//     setParts(updatedParts);
//   };

//   const splitParagraph = () => {
//     try {
//       if (!inputText.trim()) {
//         toast.error("Please enter text to split.");
//         return;
//       }

//       const paragraphLength = inputText.split(" ");
//       const numParts = Math.ceil(paragraphLength.length / wordLengthPart);
//       const partsArray = [];

//       for (let i = 0; i < numParts; i++) {
//         const start = i * wordLengthPart;
//         const end = (i + 1) * wordLengthPart;
//         const chunkWords = paragraphLength.slice(start, end);

//         let content = {
//           text: "",
//           hidden: true,
//         };

//         if (i === numParts - 1) {
//           content.text = `[START PART ${i + 1}/${numParts}]\n${chunkWords.join(
//             " "
//           )}\n[END PART ${
//             i + 1
//           }/${numParts}]\nALL PARTS SENT. Now you can continue processing the request.`;
//         } else {
//           content.text = `Do not answer yet. This is just another part of the text I want to send you. Just receive and acknowledge as "Part ${
//             i + 1
//           }/${numParts} received" and wait for the next part.`;
//           content.text += `\n[START PART ${
//             i + 1
//           }/${numParts}]\n${chunkWords.join(" ")}\n[END PART ${
//             i + 1
//           }/${numParts}]`;
//           content.text += `\nRemember not answering yet. Just acknowledge you received this part with the message "Part ${
//             i + 1
//           }/${numParts} received" and wait for the next part.`;
//         }

//         partsArray.push(content);
//       }

//       setParts(partsArray);
//       setShowParts(true);
//       toast.success("Prompt split successfully!");
//     } catch (error) {
//       console.error("Error splitting prompt:", error);
//       toast.error("An error occurred while splitting the prompt.");
//     }
//   };

//   return (
//     <div className="flex flex-col w-full h-auto p-4 bg-purple-100 lg:p-6 lg:min-h-screen lg:flex-row fluid ">
//       <div className="flex flex-col justify-between w-full p-4 bg-white lg:p-6 lg:w-1/3 rounded-3xl">
//         <div className="h-full">
//           <h1 className="mb-4 text-2xl font-bold text-center text-purple-800 underline lg:text-left underline-offset-8">
//             PROMPT SPLITTER
//           </h1>
//           <textarea
//             className="block w-full p-2 bg-white border-2 border-purple-300 shadow-sm lg:h-3/4 h-96 rounded-xl placeholder:italic placeholder:text-slate-400 placeholder:text-lg focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 sm:text-sm"
//             placeholder="Enter your extensive prompt..."
//             value={inputText}
//             onChange={handleInputChange}
//           ></textarea>
//           <p className="mt-2 text-sm text-purple-600">
//             Prompt Length: {inputText.length} characters.
//           </p>
//           <p className="mt-4 text-sm text-black">
//             Open-source tool can safely process prompt up to around <br />
//             <span className="font-bold text-purple-600">
//               15,000 characters per request.
//             </span>
//           </p>
//         </div>
//         <div className="flex justify-between mb-2">
//           <div className="">
//             <label className="font-semibold text-purple-800">
//               Words Per-Part :
//               <input
//                 className="w-24 p-2 mt-1 ml-1 border border-purple-300 rounded-lg lg:ml-2 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-2 sm:text-sm"
//                 type="number"
//                 value={wordLengthPart}
//                 onChange={handleWordLengthChange}
//               />
//             </label>
//           </div>
//           <button
//             className="px-2 py-1 text-white bg-purple-600 rounded-md hover:bg-purple-500"
//             onClick={splitParagraph}
//           >
//             Split Prompt
//           </button>
//         </div>
//       </div>
//       <div className="w-full p-0 lg:p-4 lg:w-2/3 rounded-3xl">
//         {showParts && (
//           <div className="px-0 mt-4 lg:mt-0 lg:px-4">
//             <h2 className="mb-2 text-xl font-semibold text-purple-800 lg:text-2xl">
//               Generated Parts ({parts.length})
//             </h2>
//             {parts.map((part, index) => (
//               <div
//                 key={index}
//                 className="p-3 mt-2 bg-white rounded-lg shadow-lg lg:p-4 lg:mt-4 "
//               >
//                 <p
//                   onClick={() => toggleChunk(index)}
//                   className="text-purple-800 cursor-pointer"
//                 >
//                   {part.hidden
//                     ? `Show Part ${index + 1}`
//                     : `Hide Part ${index + 1}`}
//                 </p>
//                 {!part.hidden && (
//                   <div>
//                     <p className="mt-2 text-purple-800 ">{part.text}</p>
//                     <p className="mt-2 text-sm text-purple-600">
//                       Character Count: {part.text.length}
//                     </p>
//                   </div>
//                 )}
//                 <button
//                   onClick={() => {
//                     copyToClipboard(part.text);
//                     handleElementClick(index);
//                   }}
//                   className={`px-4 py-2 mt-2 text-white rounded-md hover:bg-purple-600 ${
//                     clickedIndex[index] ? "bg-gray-400" : "bg-purple-600"
//                   }`}
//                 >
//                   Copy
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="mt-4">
//           <h2 className="mb-2 text-xl font-semibold text-purple-800 lg:text-2xl">CLI Commands</h2>
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold text-purple-800">Get Content to File:</h3>
//             <pre className="p-2 bg-gray-100 rounded-lg overflow-auto">
//               <code>{cliCommand1}</code>
//             </pre>
//             <button 
//               onClick={() => copyToClipboard(cliCommand1)}
//               className="px-4 py-2 mt-2 text-white bg-purple-600 rounded-md hover:bg-purple-500"
//             >
//               Copy Command 1
//             </button>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-purple-800">Get File Tree:</h3>
//             <pre className="p-2 bg-gray-100 rounded-lg overflow-auto">
//               <code>{cliCommand2}</code>
//             </pre>
//             <button 
//               onClick={() => copyToClipboard(cliCommand2)}
//               className="px-4 py-2 mt-2 text-white bg-purple-600 rounded-md hover:bg-purple-500"
//             >
//               Copy Command 2
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
// =============================================================================
// import { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// // Function to copy content to clipboard
// const copyToClipboard = (text) => {
//   navigator.clipboard.writeText(text)
//     .then(() => toast.success("Copied Successfully"))
//     .catch(() => toast.error("Failed to copy"));
// };

// function App() {
//   const [inputText, setInputText] = useState("");
//   const [wordLengthPart, setWordLengthPart] = useState(2000);
//   const [parts, setParts] = useState([]);
//   const [showParts, setShowParts] = useState(false);
//   const [clickedIndex, setClickedIndex] = useState([]);
//   const [cliCommand1, setCliCommand1] = useState(`Get-ChildItem -Recurse -Exclude 'package-lock.json', 'output.txt','package.json','.env','.gitignore','README.md' | Where-Object { 
//      $_.FullName -notlike '*\\coverage\\*' -and 
//      $_.FullName -notlike '*\\node_modules\\*' -and 
//      $_.FullName -notlike '*\\seed\\*' -and
//      -not $_.PSIsContainer 
// } | ForEach-Object {
//      "======================================================================="
//      "{0}\`n\`n{1}\`n" -f $_.FullName, (Get-Content $_.FullName -Raw)
//  } | Out-File -FilePath 'output.txt' -Encoding utf8`);

//   const [cliCommand2, setCliCommand2] = useState(`
// function Get-Tree {
//     param (
//         [string]$Path = $null,
//         [int]$IndentLevel = 0
//     )

//     if (-not $Path) {
//         $Path = Read-Host "Enter the path (press Enter for the current directory):"
//         if (-not $Path) {
//             $Path = (Get-Location).Path
//         }
//     }

//     $indentation = "│   " * $IndentLevel
//     $currentDirectory = Get-Item $Path

//     # Exclude node_modules and build directories
//     $excludedDirectories = @("node_modules", "build","images","fonts","logo","favicon","illustrations","icons","background")
//     if ($currentDirectory.Name -notin $excludedDirectories) {
//         Write-Output "$indentation├── $($currentDirectory.Name)/ [Folder]"

//         $subDirectories = Get-ChildItem -Path $Path -Directory
//         $subFiles = Get-ChildItem -Path $Path -File

//         foreach ($subDirectory in $subDirectories) {
//             Get-Tree -Path $subDirectory.FullName -IndentLevel ($IndentLevel + 1)
//         }

//         foreach ($subFile in $subFiles) {
//             Write-Output "$indentation│   └── $($subFile.Name)"
//         }
//     }
// }

// # Run the script
// Get-Tree
//   `);

//   const handleElementClick = (index) => {
//     const updatedClickedButtons = [...clickedIndex];
//     updatedClickedButtons[index] = !updatedClickedButtons[index];
//     setClickedIndex(updatedClickedButtons);
//   };

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const handleWordLengthChange = (event) => {
//     setWordLengthPart(parseInt(event.target.value, 10));
//   };

//   const toggleChunk = (index) => {
//     const updatedParts = [...parts];
//     updatedParts[index].hidden = !updatedParts[index].hidden;
//     setParts(updatedParts);
//   };

//   const splitParagraph = () => {
//     try {
//       if (!inputText.trim()) {
//         toast.error("Please enter text to split.");
//         return;
//       }

//       const paragraphLength = inputText.split(" ");
//       const numParts = Math.ceil(paragraphLength.length / wordLengthPart);
//       const partsArray = [];

//       for (let i = 0; i < numParts; i++) {
//         const start = i * wordLengthPart;
//         const end = (i + 1) * wordLengthPart;
//         const chunkWords = paragraphLength.slice(start, end);

//         let content = {
//           text: "",
//           hidden: true,
//         };

//         if (i === numParts - 1) {
//           content.text = `[START PART ${i + 1}/${numParts}]\n${chunkWords.join(
//             " "
//           )}\n[END PART ${
//             i + 1
//           }/${numParts}]\nALL PARTS SENT. Now you can continue processing the request.`;
//         } else {
//           content.text = `Do not answer yet. This is just another part of the text I want to send you. Just receive and acknowledge as "Part ${
//             i + 1
//           }/${numParts} received" and wait for the next part.`;
//           content.text += `\n[START PART ${
//             i + 1
//           }/${numParts}]\n${chunkWords.join(" ")}\n[END PART ${
//             i + 1
//           }/${numParts}]`;
//           content.text += `\nRemember not answering yet. Just acknowledge you received this part with the message "Part ${
//             i + 1
//           }/${numParts} received" and wait for the next part.`;
//         }

//         partsArray.push(content);
//       }

//       setParts(partsArray);
//       setShowParts(true);
//       toast.success("Prompt split successfully!");
//     } catch (error) {
//       console.error("Error splitting prompt:", error);
//       toast.error("An error occurred while splitting the prompt.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
//       <Toaster
//         position="top-center"
//         toastOptions={{
//           style: {
//             borderRadius: '10px',
//             background: '#333',
//             color: '#fff',
//           },
//         }}
//       />
//       <div className="container mx-auto p-4 py-8">
//         <h1 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-8">
//           PROMPT SPLITTER
//         </h1>
        
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left Panel */}
//           <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-xl overflow-hidden backdrop-filter backdrop-blur-sm bg-opacity-80">
//             <div className="p-6 h-full flex flex-col">
//               <div className="flex-grow">
//                 <textarea
//                   className="w-full lg:h-3/4 h-96  p-4 text-gray-700 bg-gray-50 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out resize-none"
//                   placeholder="Enter your extensive prompt..."
//                   value={inputText}
//                   onChange={handleInputChange}
//                 ></textarea>
                
//                 <div className="flex items-center mt-3 text-sm text-purple-600">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   <span>Prompt Length: <span className="font-semibold">{inputText.length}</span> characters</span>
//                 </div>
                
//                 <div className="mt-4 p-4 bg-indigo-50 rounded-lg text-sm text-gray-700">
//                   <div className="flex items-start">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     <p>
//                       Open-source tool can safely process prompt up to around
//                       <span className="block font-bold text-purple-600 mt-1">15,000 characters per request.</span>
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
//                 <label className="flex flex-col sm:flex-row items-start sm:items-center font-medium text-gray-700">
//                   <span className="mb-1 sm:mb-0 sm:mr-3">Words Per-Part:</span>
//                   <input
//                     className="w-full sm:w-24 p-2 bg-gray-50 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out"
//                     type="number"
//                     value={wordLengthPart}
//                     onChange={handleWordLengthChange}
//                   />
//                 </label>
                
//                 <button
//                   className="w-full sm:w-auto py-2.5 px-6 text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 transform hover:scale-105"
//                   onClick={splitParagraph}
//                 >
//                   Split Prompt
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           {/* Right Panel */}
//           <div className="w-full lg:w-2/3">
//             {showParts && (
//               <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 backdrop-filter backdrop-blur-sm bg-opacity-80">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                   </svg>
//                   Generated Parts <span className="text-purple-600 ml-2">({parts.length})</span>
//                 </h2>
                
//                 <div className="space-y-4">
//                   {parts.map((part, index) => (
//                     <div
//                       key={index}
//                       className="bg-gray-50 rounded-xl overflow-hidden border border-purple-100 transition-all duration-200 hover:shadow-md"
//                     >
//                       <div 
//                         className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-gray-50 to-indigo-50"
//                         onClick={() => toggleChunk(index)}
//                       >
//                         <div className="flex items-center">
//                           <svg 
//                             xmlns="http://www.w3.org/2000/svg" 
//                             className={`h-5 w-5 text-purple-600 transition-transform duration-200 ${part.hidden ? '' : 'transform rotate-90'}`} 
//                             viewBox="0 0 20 20" 
//                             fill="currentColor"
//                           >
//                             <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                           </svg>
//                           <span className="ml-2 font-medium text-gray-700">
//                             Part {index + 1} of {parts.length}
//                           </span>
//                         </div>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             copyToClipboard(part.text);
//                             handleElementClick(index);
//                           }}
//                           className={`ml-4 px-4 py-1.5 rounded-lg text-sm font-medium transition duration-200 ${
//                             clickedIndex[index]
//                               ? 'bg-gray-200 text-gray-700'
//                               : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
//                           }`}
//                         >
//                           {clickedIndex[index] ? 'Copied' : 'Copy'}
//                         </button>
//                       </div>
                      
//                       {!part.hidden && (
//                         <div className="p-4 border-t border-purple-100">
//                           <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-100 p-3 rounded-lg text-gray-700 max-h-60 overflow-y-auto">
//                             {part.text}
//                           </pre>
//                           <p className="mt-3 text-xs text-gray-500 flex items-center">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
//                               <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
//                             </svg>
//                             Character Count: <span className="font-medium text-purple-600 ml-1">{part.text.length}</span>
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             <div className="bg-white rounded-2xl shadow-xl p-6 backdrop-filter backdrop-blur-sm bg-opacity-80">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 CLI Commands
//               </h2>
              
//               <div className="space-y-6">
//                 <div className="bg-gray-50 rounded-xl border border-purple-100 overflow-hidden">
//                   <div className="relative">
//                   <h3 className="p-4 font-medium text-gray-700 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-purple-100">
//                     Get Content to File
//                   </h3>
//                   <button 
//                       onClick={() => copyToClipboard(cliCommand1)}
//                       className="absolute top-2 right-2 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-200"
//                       title="Copy command"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
//                         <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
//                       </svg>
//                     </button>
//                   </div>
//                   <div className="relative">
//                     <pre className="p-4 text-sm font-mono text-gray-700 overflow-x-auto max-h-60">
//                       <code>{cliCommand1}</code>
//                     </pre>
                   
//                   </div>
//                 </div>
                
//                 <div className="bg-gray-50 rounded-xl border border-purple-100 overflow-hidden">
//                   <div className="relative">
//                   <h3 className="p-4 font-medium text-gray-700 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-purple-100">
//                     Get File Tree
//                   </h3>
//                   <button 
//                       onClick={() => copyToClipboard(cliCommand2)}
//                       className="absolute top-2 right-2 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-200"
//                       title="Copy command"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
//                         <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
//                       </svg>
//                     </button>
//                   </div>
//                   <div className="relative">
//                     <pre className="p-4 text-sm font-mono text-gray-700 overflow-x-auto max-h-60">
//                       <code>{cliCommand2}</code>
//                     </pre>
                    
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

//=============================================================UP WORKING CODE======================
import { useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";

// Function to copy content to clipboard
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => toast.success("Copied Successfully"))
    .catch(() => toast.error("Failed to copy"));
};

function App() {
  const [inputText, setInputText] = useState("");
  const [wordLengthPart, setWordLengthPart] = useState(2000);
  const [parts, setParts] = useState([]);
  const [showParts, setShowParts] = useState(false);
  const [clickedIndex, setClickedIndex] = useState([]);
  const [cliCommand1, setCliCommand1] = useState(`Get-ChildItem -Recurse -Exclude 'package-lock.json', 'output.txt','package.json','.env','.gitignore','README.md' | Where-Object { 
     $_.FullName -notlike '*\\coverage\\*' -and 
     $_.FullName -notlike '*\\node_modules\\*' -and 
     $_.FullName -notlike '*\\seed\\*' -and
     -not $_.PSIsContainer 
} | ForEach-Object {
     "======================================================================="
     "{0}\`n\`n{1}\`n" -f $_.FullName, (Get-Content $_.FullName -Raw)
 } | Out-File -FilePath 'output.txt' -Encoding utf8`);

  const [cliCommand2, setCliCommand2] = useState(`
function Get-Tree {
    param (
        [string]$Path = $null,
        [int]$IndentLevel = 0
    )

    if (-not $Path) {
        $Path = Read-Host "Enter the path (press Enter for the current directory):"
        if (-not $Path) {
            $Path = (Get-Location).Path
        }
    }

    $indentation = "│   " * $IndentLevel
    $currentDirectory = Get-Item $Path

    # Exclude node_modules and build directories
    $excludedDirectories = @("node_modules", "build","images","fonts","logo","favicon","illustrations","icons","background")
    if ($currentDirectory.Name -notin $excludedDirectories) {
        Write-Output "$indentation├── $($currentDirectory.Name)/ [Folder]"

        $subDirectories = Get-ChildItem -Path $Path -Directory
        $subFiles = Get-ChildItem -Path $Path -File

        foreach ($subDirectory in $subDirectories) {
            Get-Tree -Path $subDirectory.FullName -IndentLevel ($IndentLevel + 1)
        }

        foreach ($subFile in $subFiles) {
            Write-Output "$indentation│   └── $($subFile.Name)"
        }
    }
}

# Run the script
Get-Tree
  `);
  const [directoryTree, setDirectoryTree] = useState([]);
  const [treeText, setTreeText] = useState("");

  // Memoized handlers for better performance
  const handleElementClick = useCallback((index) => {
    setClickedIndex((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  }, []);

  const handleInputChange = useCallback((event) => {
    setInputText(event.target.value);
  }, []);

  const handleWordLengthChange = useCallback((event) => {
    setWordLengthPart(parseInt(event.target.value, 10) || 2000);
  }, []);

  const toggleChunk = useCallback((index) => {
    setParts((prev) => {
      const updated = [...prev];
      updated[index].hidden = !updated[index].hidden;
      return updated;
    });
  }, []);

  const splitParagraph = useCallback(() => {
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
  }, [inputText, wordLengthPart]);

  const loadDirectoryTree = useCallback(async () => {
    try {
      if (!("showDirectoryPicker" in window)) {
        throw new Error("File System Access API not supported in this browser");
      }

      const dirHandle = await window.showDirectoryPicker();
      const tree = await buildTree(dirHandle);
      setDirectoryTree([tree]);
      const treeText = renderTreeAsText(tree);
      setTreeText(treeText);
    } catch (error) {
      const message = error.name === "AbortError"
        ? "Directory selection was cancelled"
        : `Error accessing directory: ${error.message}`;
      toast.error(message);
    }
  }, []);

  const buildTree = async (dirHandle, depth = 0) => {
    const node = {
      name: dirHandle.name,
      isDirectory: true,
      children: [],
    };

    const excludedDirs = [
      ".git", "node_modules", "coverage", "tests", "__tests__",
      "ui", "seed", "build", "dist",
    ];
    const excludedFiles = [
      "package-lock.json", "output.txt", "package.json", ".env",
      ".gitignore", "README.md",
    ];
    const excludedExt = [
      ".png", ".svg", ".jpg", ".jpeg", ".test.js", ".spec.js",
      ".idx", ".pack", ".rev",
    ];

    if (depth > 0 && excludedDirs.includes(dirHandle.name.toLowerCase())) {
      return null;
    }

    for await (const entry of dirHandle.values()) {
      const entryName = entry.name.toLowerCase();

      if (entry.kind === "directory") {
        if (!excludedDirs.includes(entryName)) {
          const childTree = await buildTree(entry, depth + 1);
          if (childTree) node.children.push(childTree);
        }
      } else {
        if (
          !excludedFiles.includes(entryName) &&
          !excludedExt.some((ext) => entryName.endsWith(ext)) &&
          !entryName.includes(".test.") &&
          !entryName.includes(".spec.")
        ) {
          node.children.push({
            name: entry.name,
            isDirectory: false,
          });
        }
      }
    }

    if (depth === 0 || node.children.length > 0) {
      return node;
    }
    return null;
  };

  const renderTreeAsText = (node, depth = 0) => {
    let output = "";
    const indent = "│   ".repeat(depth); // Use '│   ' for vertical lines
    const isLast = !node.children || node.children.length === 0;
    const connector = isLast ? "└── " : "├── "; // Use '└──' for last item, '├──' for others

    // Use a bullet (●) instead of black square or no icon
    output += `${indent}${connector}● ${node.name}\n`;

    if (node.children) {
      node.children.forEach((child, index) => {
        const childIsLast = index === node.children.length - 1;
        output += renderTreeAsText(child, depth + (childIsLast ? 0 : 1));
      });
    }
    return output;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-8">
          PROMPT SPLITTER
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-xl overflow-hidden backdrop-filter backdrop-blur-sm bg-opacity-80">
            <div className="p-6 h-full flex flex-col">
              <div className="flex-grow">
                <textarea
                  className="w-full lg:h-3/4 h-96 p-4 text-gray-700 bg-gray-50 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out resize-none"
                  placeholder="Enter your extensive prompt..."
                  value={inputText}
                  onChange={handleInputChange}
                ></textarea>
                
                <div className="flex items-center mt-3 text-sm text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Prompt Length: <span className="font-semibold">{inputText.length}</span> characters</span>
                </div>
                
                <div className="mt-4 p-4 bg-indigo-50 rounded-lg text-sm text-gray-700">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p>
                      Open-source tool can safely process prompt up to around
                      <span className="block font-bold text-purple-600 mt-1">15,000 characters per request.</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                <label className="flex flex-col sm:flex-row items-start sm:items-center font-medium text-gray-700">
                  <span className="mb-1 sm:mb-0 sm:mr-3">Words Per-Part:</span>
                  <input
                    className="w-full sm:w-24 p-2 bg-gray-50 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out"
                    type="number"
                    value={wordLengthPart}
                    onChange={handleWordLengthChange}
                  />
                </label>
                
                <button
                  className="w-full sm:w-auto py-2.5 px-6 text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 transform hover:scale-105"
                  onClick={splitParagraph}
                >
                  Split Prompt
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Panel */}
          <div className="w-full lg:w-2/3">
            {showParts && (
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 backdrop-filter backdrop-blur-sm bg-opacity-80">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Generated Parts <span className="text-purple-600 ml-2">({parts.length})</span>
                </h2>
                
                <div className="space-y-4">
                  {parts.map((part, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl overflow-hidden border border-purple-100 transition-all duration-200 hover:shadow-md"
                    >
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-gray-50 to-indigo-50"
                        onClick={() => toggleChunk(index)}
                      >
                        <div className="flex items-center">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 text-purple-600 transition-transform duration-200 ${part.hidden ? '' : 'transform rotate-90'}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-2 font-medium text-gray-700">
                            Part {index + 1} of {parts.length}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(part.text);
                            handleElementClick(index);
                          }}
                          className={`ml-4 px-4 py-1.5 rounded-lg text-sm font-medium transition duration-200 ${
                            clickedIndex[index]
                              ? 'bg-gray-200 text-gray-700'
                              : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
                          }`}
                        >
                          {clickedIndex[index] ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      
                      {!part.hidden && (
                        <div className="p-4 border-t border-purple-100">
                          <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-100 p-3 rounded-lg text-gray-700 max-h-60 overflow-y-auto">
                            {part.text}
                          </pre>
                          <p className="mt-3 text-xs text-gray-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                            </svg>
                            Character Count: <span className="font-medium text-purple-600 ml-1">{part.text.length}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 backdrop-filter backdrop-blur-sm bg-opacity-80">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                CLI Commands
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl border border-purple-100 overflow-hidden">
                  <div className="relative">
                  <h3 className="p-4 font-medium text-gray-700 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-purple-100">
                    Get Content to File
                  </h3>
                  <button 
                      onClick={() => copyToClipboard(cliCommand1)}
                      className="absolute top-2 right-2 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-200"
                      title="Copy command"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                        <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                      </svg>
                    </button>
                  </div>
                  <div className="relative">
                    <pre className="p-4 text-sm font-mono text-gray-700 overflow-x-auto max-h-60">
                      <code>{cliCommand1}</code>
                    </pre>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl border border-purple-100 overflow-hidden">
                  <div className="relative">
                  <h3 className="p-4 font-medium text-gray-700 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-purple-100">
                    Get File Tree
                  </h3>
                  <button 
                      onClick={() => copyToClipboard(cliCommand2)}
                      className="absolute top-2 right-2 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-200"
                      title="Copy command"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                        <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                      </svg>
                    </button>
                  </div>
                  <div className="relative">
                    <pre className="p-4 text-sm font-mono text-gray-700 overflow-x-auto max-h-60">
                      <code>{cliCommand2}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Directory Tree Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 backdrop-filter backdrop-blur-sm bg-opacity-80">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-12 1v10a2 2 0 002 2h6a2 2 0 002-2V10" />
                </svg>
                Directory Tree
              </h2>
              <div className="flex gap-2 mb-4">
                <button
                  className="py-2 px-4 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-200"
                  onClick={loadDirectoryTree}
                >
                  Select Directory
                </button>
                {treeText && (
                  <button
                    className="py-2 px-4 text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-lg hover:from-green-700 hover:to-teal-700 transition duration-200"
                    onClick={() => copyToClipboard(treeText)}
                  >
                    Copy Tree
                  </button>
                )}
              </div>
              {directoryTree.length > 0 && (
                <pre className="max-h-96 overflow-y-auto bg-[#1e1e1e] p-4 rounded-lg border border-gray-700 font-mono text-sm text-white whitespace-pre-wrap">
                  {directoryTree.map((node, index) => renderTreeAsText(node)).join('')}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;