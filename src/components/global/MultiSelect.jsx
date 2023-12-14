import { useRef, useState, useEffect } from 'react';
import Colors from '../../constants/Colors.ts'
import DOMPurify from 'dompurify';

const MultiSelect = ({ options, name, state, setState }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [inputText, setInputText] = useState('');
  const dropdownRef = useRef();
  const maxSelections = 5;
  const minSelections = 3;

  const generateRandomColors = () => {
    const shuffledColors = [...Colors];
    for (let i = shuffledColors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledColors[i], shuffledColors[j]] = [shuffledColors[j], shuffledColors[i]];
    }
    return shuffledColors;
  }

  const [badgeColors, setBadgeColors] = useState({});

  useEffect(() => {
    setBadgeColors(generateRandomColors());
  }, []);

  const handleSelection = (selectedName) => {
    if (state.includes(selectedName)) {
      setState(state.filter((item) => item !== selectedName));
      setFilteredItems((prevFilteredItems) => [
        ...prevFilteredItems,
        selectedName,
      ].sort((a, b) => a.localeCompare(b))
      );
    } else if (state.length < maxSelections) {
      setState([...state, selectedName]);
      setFilteredItems((prevFilteredItems) =>
        prevFilteredItems
          .filter((item) => item !== selectedName)
          .sort((a, b) => a.localeCompare(b))
      );
    }
    setInputText('');
  };

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setInputText(searchText);
    const filtered = options
      .filter((item) => !state.includes(item.name))
      .filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
      .map((item) => item.name)
      .sort((a, b) => a.localeCompare(b));
  
    setFilteredItems(filtered);
  };
  

  const handleBlur = () => {
    if (state.length === 0) {
      setInputText('');
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && filteredItems.length > 0) {
      handleSelection(filteredItems[0]);
    } else if (e.key === 'Backspace' && inputText === '' && state.length > 0) {
      const lastSelectedItem = state[state.length - 1];
      setState(state.filter((item) => item !== lastSelectedItem));
      setFilteredItems((prevFilteredItems) =>
        prevFilteredItems.concat(lastSelectedItem).sort((a, b) => a.localeCompare(b))
      );
    }
    setFilteredItems([]);
  };
  
  const sanitizeAndHighlight = (text) => {
    const sanitizedText = DOMPurify.sanitize(text);
    const lowerInput = inputText.toLowerCase();
    const lowerName = sanitizedText.toLowerCase();
    const startIndex = lowerName.indexOf(lowerInput);

    if (startIndex !== -1) {
      const matchedPart = sanitizedText.substring(startIndex, startIndex + inputText.length);
      return (
        <span>
          {sanitizedText.substring(0, startIndex)}
          <b className="rounded-sm bg-slate-200 text-darkBlue dark:text-white2 dark:font-normal dark:bg-darkGray ">{matchedPart}</b>
          {sanitizedText.substring(startIndex + inputText.length)}
        </span>
      );
    }
    return sanitizedText;
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFilteredItems([]);
    }
  };


  return (
    <div className={`ring-1 ring-lightGray bg-white dark:bg-transparent dark:ring-darkGray ${ state.length < maxSelections && filteredItems.length > 0 ? "rounded-t-md" : "rounded-md"}`} ref={dropdownRef}>
      <div>
        <div className="flex flex-wrap items-center">
          {state.map((name, id) => (
            <div
              className={`font-main h-6 text-xs flex items-center font-medium ${badgeColors[id]?.text} ${badgeColors[id]?.background}  rounded-md px-2 p-2 m-1`}
              key={id}
            >
              <span className="font-main text-xs">{name}</span>
              <button
                className="ml-1 text-darkBlue font-bold outline-none"
                onClick={() => handleSelection(name)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`h-5 w-5  ${badgeColors[id]?.text}`}>
                  <path strokeLinecap="round" className="stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round" d="M17 7L7 17 M7 7l10 10" />
                </svg>
              </button>
            </div>
          ))}
          {state.length < maxSelections && (
            <input
              type="text"
              onChange={handleInputChange}
              value={inputText}
              className={`placeholder:font-normal placeholder:text-sm ${state.length > 0 ? 'rounded-t-lg  text-sm w-52' : 'rounded-3xl p-2 w-full'} dark:placeholder:text-darkWhite dark:text-white2 text-darkBlue dark:bg-transparent bg-white  outline-none font-main pl-4 text-left inline-flex items-center justify-between`}
              placeholder={name}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          )}
        </div>
      </div>

      {state.length < maxSelections && filteredItems.length > 0 && (
        <div className={`bg-white dark:bg-transparent rounded-b-md relative z-10 ${state.length < maxSelections ? "top-0" : "-top-4"}`}>
          <div className="absolute max-h-40 overflow-hidden w-full rounded-b-md ring-1 ring-lightGray dark:ring-darkGray">
            <div className="overflow-y-scroll max-h-40">
              {filteredItems.map((name, id) => (
                <div
                  className="py-2 cursor-pointer transition-all duration-300 ease-in-out bg-white dark:bg-lightBlack"
                  key={id}
                  onClick={() => handleSelection(name)}
                >
                  <span className="font-main px-4 text-darkBlue dark:text-white2">{sanitizeAndHighlight(name)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;