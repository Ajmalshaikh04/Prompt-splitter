import  { useState } from "react";
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
  const [cliCommand1, setCliCommand1] = useState(`
Get-ChildItem -Recurse -Exclude 'package-lock.json', 'output.txt','package.json','.env','.gitignore','README.md' | Where-Object { 
     $_.FullName -notlike '*\coverage\*' -and 
     $_.FullName -notlike '*\node_modules\*' -and 
     $_.FullName -notlike '*\seed\*' -and
     -not $_.PSIsContainer 
} | ForEach-Object {
     "======================================================================="
     "{0}\`\n\`n{1}\`\n" -f $_.FullName, (Get-Content $_.FullName -Raw)
 } | Out-File -FilePath 'output.txt' -Encoding utf8
  `);

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

  return (
    <div className="flex flex-col w-full h-auto p-4 bg-purple-100 lg:p-6 lg:min-h-screen lg:flex-row fluid ">
      <div className="flex flex-col justify-between w-full p-4 bg-white lg:p-6 lg:w-1/3 rounded-3xl">
        <div className="h-full">
          <h1 className="mb-4 text-2xl font-bold text-center text-purple-800 underline lg:text-left underline-offset-8">
            PROMPT SPLITTER
          </h1>
          <textarea
            className="block w-full p-2 bg-white border-2 border-purple-300 shadow-sm lg:h-3/4 h-96 rounded-xl placeholder:italic placeholder:text-slate-400 placeholder:text-lg focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 sm:text-sm"
            placeholder="Enter your extensive prompt..."
            value={inputText}
            onChange={handleInputChange}
          ></textarea>
          <p className="mt-2 text-sm text-purple-600">
            Prompt Length: {inputText.length} characters.
          </p>
          <p className="mt-4 text-sm text-black">
            Open-source tool can safely process prompt up to around <br />
            <span className="font-bold text-purple-600">
              15,000 characters per request.
            </span>
          </p>
        </div>
        <div className="flex justify-between mb-2">
          <div className="">
            <label className="font-semibold text-purple-800">
              Words Per-Part :
              <input
                className="w-24 p-2 mt-1 ml-1 border border-purple-300 rounded-lg lg:ml-2 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-2 sm:text-sm"
                type="number"
                value={wordLengthPart}
                onChange={handleWordLengthChange}
              />
            </label>
          </div>
          <button
            className="px-2 py-1 text-white bg-purple-600 rounded-md hover:bg-purple-500"
            onClick={splitParagraph}
          >
            Split Prompt
          </button>
        </div>
      </div>
      <div className="w-full p-0 lg:p-4 lg:w-2/3 rounded-3xl">
        {showParts && (
          <div className="px-0 mt-4 lg:mt-0 lg:px-4">
            <h2 className="mb-2 text-xl font-semibold text-purple-800 lg:text-2xl">
              Generated Parts ({parts.length})
            </h2>
            {parts.map((part, index) => (
              <div
                key={index}
                className="p-3 mt-2 bg-white rounded-lg shadow-lg lg:p-4 lg:mt-4 "
              >
                <p
                  onClick={() => toggleChunk(index)}
                  className="text-purple-800 cursor-pointer"
                >
                  {part.hidden
                    ? `Show Part ${index + 1}`
                    : `Hide Part ${index + 1}`}
                </p>
                {!part.hidden && (
                  <div>
                    <p className="mt-2 text-purple-800 ">{part.text}</p>
                    <p className="mt-2 text-sm text-purple-600">
                      Character Count: {part.text.length}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => {
                    copyToClipboard(part.text);
                    handleElementClick(index);
                  }}
                  className={`px-4 py-2 mt-2 text-white rounded-md hover:bg-purple-600 ${
                    clickedIndex[index] ? "bg-gray-400" : "bg-purple-600"
                  }`}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          <h2 className="mb-2 text-xl font-semibold text-purple-800 lg:text-2xl">CLI Commands</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-purple-800">Get Content to File:</h3>
            <pre className="p-2 bg-gray-100 rounded-lg overflow-auto">
              <code>{cliCommand1}</code>
            </pre>
            <button 
              onClick={() => copyToClipboard(cliCommand1)}
              className="px-4 py-2 mt-2 text-white bg-purple-600 rounded-md hover:bg-purple-500"
            >
              Copy Command 1
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-800">Get File Tree:</h3>
            <pre className="p-2 bg-gray-100 rounded-lg overflow-auto">
              <code>{cliCommand2}</code>
            </pre>
            <button 
              onClick={() => copyToClipboard(cliCommand2)}
              className="px-4 py-2 mt-2 text-white bg-purple-600 rounded-md hover:bg-purple-500"
            >
              Copy Command 2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;