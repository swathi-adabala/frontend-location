import React, {useState} from 'react'
import "./Components.css"
import DisplayListButton from './DisplayListButton';
 
function SearchBox({placeholder}) {
    
    const [wordEntered, setWordEntered] = useState("");
    const [locationsList, setLocationList] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const [showData, setShowData] = useState(false);

    const handleChange = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        if (searchWord === "") {
          setSuggestions([]);
          setShowSuggestions(false);
        } else {
          loadSuggestions(searchWord);
          setShowSuggestions(true);
          setShowData(false);
        }
    };

    const loadSuggestions = (searchWord) => {
        
        fetch("http://localhost:8080/location/searchResults?search=" + encodeURIComponent(searchWord))
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((json) => setSuggestions(json))
    }

    const saveLocation = (data) => {
        const requestOptions = { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(data)
        };
        fetch('http://localhost:8080/location/searchResults', requestOptions) 
        .then(response => {
           //resp = response.json();
           console.log(response);
        }) 
    }

    const handleSuggestionClick = (suggetion) => {
        setWordEntered(suggetion);
        setShowSuggestions(false);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setShowSuggestions(false);
            setShowData(true);
            if(wordEntered != ""){
                setLocationList([...locationsList, wordEntered]);
                saveLocation({"word": wordEntered});
                setWordEntered("");
            }
        }
      };
    
    return (
        <div >
            <div className='autocomplete'>
                <input 
                    type = "text" 
                    placeholder= {placeholder}
                    value={wordEntered}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            
                {showSuggestions && suggestions.length != 0 && (
                    <div className="suggestions">
                    {suggestions.slice(0, 20).map((value) => {
                        return(
                        <li onClick={() => handleSuggestionClick(value)} key={value} >
                            {value}
                        </li>
                        );
                    })}
                    </div>
                )}
            </div>
            <div>
                {showData && (
                    <div className='display'>
                    {
                        locationsList.slice(0,2).map((loc) => {
                            return(
                                <label>{loc}</label>
                            );
                        })
                    
                    } 
                    { locationsList.length > 2 && (<DisplayListButton data={locationsList.slice(2)}/>)}
                    </div>)
                }
            </div>
        </div>
    )
}
export default SearchBox;
