import { useRef, useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

const Dropdown = ({ options, name, state, setState, clear }) => {
  
  const [filteredItems, setFilteredItems] = useState([]);
  const [inputText, setInputText] = useState(state);
  const dropdownRef = useRef()
  


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

  const handleSelection = (selectedItem) => {
    setInputText(selectedItem.name);
    setFilteredItems([]);
    setState(selectedItem); 
    clear([])
  };

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setInputText(searchText);
    const filtered = options
      .filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
    setFilteredItems(filtered);
    setState("")
  };

  const handleBlur = () => {
    if (!options.some((item) => item.name.toLowerCase() === inputText.toLowerCase())) {
      setInputText('');
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && filteredItems.length > 0) {
      handleSelection(filteredItems[0]);
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
          <b className="rounded-sm bg-slate-200 text-darkBlue dark:bg-darkGray dark:text-white2 dark:font-medium">{matchedPart}</b>
          {sanitizedText.substring(startIndex + inputText.length)}
        </span>
      );
    }
    return sanitizedText;
  };

  return (
    <div className={`${filteredItems.length > 0 ? "rounded-t-md" : "rounded-md" }  ring-1 ring-lightGray dark:ring-darkGray w-full h-12 `} ref={dropdownRef}>
      <div className="px-2">
        <input
          type="text"
          onChange={handleInputChange}
          value={inputText}
          className={`${filteredItems.length > 0 ? "rounded-t-md" : "rounded-md" }   placeholder:font-normal placeholder:text-sm placeholder:text-gray dark:text-white2 w-full h-12 dark:bg-lightBlack text-md dark:placeholder:text-darkWhite  text-darkBlue bg-white outline-none font-main p-2 text-left inline-flex items-center justify-between"`}
          placeholder={name}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </div>

      {filteredItems.length > 0 && (
        <div className='bg-white rounded-b-lg relative shadow-3xl shadow-black z-10 -top-1 '>
          <div className="absolute max-h-40 overflow-hidden w-full rounded-b-lg ring-1 ring-lightGray dark:ring-darkGray">
            <div className="overflow-y-scroll max-h-40">
              {filteredItems.map((item, id) => (
                <div
                  className="py-2 cursor-pointer transition-all duration-300 ease-in-out bg-white dark:bg-lightBlack"
                  key={id}
                  onClick={() => handleSelection(item)}
                >
                  <span className="font-main px-4 dark:text-white2 text-md">
                    {sanitizeAndHighlight(item.name)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
