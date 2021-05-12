import "../../css/Settings.css";
import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {KeywordContext} from "../../context/KeywordContext";
import {UrlContext} from "../../context/UrlContext";
import {apikey} from '../../apikey';

function Settings() {
    const [keyword, setKeyword] = useContext(KeywordContext);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [publisher, setPublisher] = useState('');
    const [subject, setSubject] = useState('');
    const [orderBy, setOrder] = useState('');
    const [ebookType, setEbook] = useState('');
    const [, setUrlRequest] = useContext(UrlContext);

    const upDateKeyword = e => {
        setKeyword(e.target.value);
        setUrlRequest(`https://www.googleapis.com/books/v1/volumes?q=${e.target.value}&key=${apikey}`);
    }

    const setAuthorFilter = (e) => {
        setAuthor(`+inauthor:${e.target.value}`);
    }

    const setTitleFilter = (e) => {
        setTitle(`+intitle:${e.target.value}`);
    }

    const setPublisherFilter = (e) => {
        setPublisher(`+inpublisher:${e.target.value}`);
    }

    const setSubjectFilter = (e) => {
        setSubject(`+insubject:${e.target.value}`);
    }

    const setOrderResult = (e) => {
        setOrder(`&orderBy=${e.target.value}`);
    }

    const setEbookType = (e) => {
        setEbook(`&filter=${e.target.value}`);
    }

    const upDateFilters = () => {
        setUrlRequest(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}${author}${title}${publisher}${subject}${orderBy}${ebookType}&key=${apikey}`
        );
    }

    return(
        <div className="Settings">
            <h3>Add some filters to get best results!</h3>

            <form name="settings">
                <h4>Insert info:</h4>

                <div className="input text">
                    <label htmlFor="keyword">Keyword:</label>
                    <input type="text" id="keyword" placeholder={keyword} onInput={upDateKeyword}/>
                </div>
                
                <div className="input text">
                    <label htmlFor="author">Author:</label>
                    <input type="text" id="author" onInput={setAuthorFilter}/>
                </div>
                
                <div className="input text">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" onInput={setTitleFilter}/>
                </div>
                
                <div className="input text">
                    <label htmlFor="publisher">Publisher:</label>
                    <input type="text" id="publisher" onInput={setPublisherFilter}/>
                </div>
                
                <div className="input text">
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" onInput={setSubjectFilter}/>
                </div>
                
                
                <h4>Ebook filters:</h4>

                <div className="input">
                    <input type="radio" id="free-ebook" name="ebook" value="free-ebooks" onInput={setEbookType}/>
                    <label className="radio-button" htmlFor="free-ebook">Free ebooks</label>
                </div>

                <div className="input">
                    <input type="radio" id="paid-ebook" name="ebook" value="paid-ebooks" onInput={setEbookType}/>    
                    <label className="radio-button" htmlFor="paid-ebook">Paid ebooks</label>
                </div>

                <div className="input">
                    <input type="radio" id="all-ebook" name="ebook" value="ebooks" onInput={setEbookType}/>
                    <label className="radio-button" htmlFor="all-ebook">All ebooks</label>
                </div>

                <h4>Order results by:</h4>

                <div className="input">
                    <input type="radio" id="relevance" name="order-results" value="relevance" onInput={setOrderResult}/>
                    <label className="radio-button" htmlFor="relevance">Relevance</label>
                </div>

                <div className="input">
                    <input type="radio" id="newest" name="order-results" value="newest" onInput={setOrderResult}/>
                    <label className="radio-button" htmlFor="newest">Newest</label>
                </div>

                <Link to='/results'>
                    <button type="submit" onClick={upDateFilters}>SUBMIT</button>
                </Link>
            </form>
        </div>
    )
}

export default Settings;