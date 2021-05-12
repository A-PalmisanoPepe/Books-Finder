import "../../css/Home.css";
import glass from "../../images/glass.png";
import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {KeywordContext} from "../../context/KeywordContext";
import {UrlContext} from "../../context/UrlContext";
import {apikey} from '../../apikey';


function Home() {
    const [, setKeyword] = useContext(KeywordContext);
    const [text, setText] = useState(''); 
    const  [, setUrlRequest] = useContext(UrlContext);
    const upDateKeyword = e => {
        setText(e.target.value);
        setKeyword(e.target.value);
        setUrlRequest(`https://www.googleapis.com/books/v1/volumes?q=${e.target.value}&key=${apikey}`);
    }

    return( 
        <div className="Home">
            <h1>Books finder</h1>

            <div className= "searcher">
                <form name='searcher' >
                    <Link to='/results'>
                        <button type='submit'><img src={glass} alt=""></img></button>
                    </Link>
                    
                    <input type='text' className="placeholder" placeholder={`Search`} value={text} onInput={upDateKeyword} />
                </form>
                 
            </div>

            <Link to="/settings">
                <div className='options'><h3>SEARCH SETTINGS</h3></div>
            </Link>
        </div>
    )
}

export default Home;