import React, {useState} from 'react'
import "./Components.css";
import Button from '@material-ui/core/Button';  
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp  from '@material-ui/icons/ArrowDropUp';

function DisplayListButton({data}){
    const [showMore, setShowMore] = useState(false);
    return(
        <div className='showMore'>
            {
                <Button class = "showButton" variant="contained" disableElevation = "true" disableRipple = "true" endIcon={(!showMore&&<ArrowDropDown/>)||(showMore&&<ArrowDropUp/>)}
                    onClick={() => setShowMore(!showMore)}>  
                {data.length} MORE  
                </Button>
            }
            { showMore && (
                    <div className='searches'>
                        {data.map((value) => {
                            return(
                            <li>
                                {value}
                            </li>
                            );
                        })}
                    </div>)
            }
        </div>
    );
}
export default DisplayListButton