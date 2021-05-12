import "../../css/Result.css";
import imgNotAvailable from "../../images/img-not-available.png";
import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import {BookIdContext} from "../../context/BookIdContext";
import SaveReference from "../personalArea/SaveReference";
import _ from 'lodash';
import axios from 'axios';
import {apikey} from '../../apikey';

function Result(props) {
  const id = props.match.params.id;
  const [result, setResult] = useState({});
  const [img, setImg] = useState({});
  const [, setBookId] = useContext(BookIdContext);

  useEffect(() => {
    getData();
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  const getData = async () => {
    try {
      const data = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${apikey}`);
      const result = await data.data;
      const image = await result.volumeInfo.imageLinks;
      setResult(result);
      setBookId(id);
      setImg(_.get(image, 'thumbnail', imgNotAvailable));
    } catch (err) {
      console.error(err);
    }
  }

  const resultAvailable = () => (
    <div className="Result">
      <div className="container-book-info">
        <div className="book-cover">
          <img src={img} alt="" />
        </div>

        <div className="book-info">
          <h2>{_.get(result.volumeInfo, 'title', '')}</h2>

          <h3>{_.join(_.get(result.volumeInfo, 'authors', ''), ', ')}</h3>

          <h3>{_.get(result.volumeInfo, 'publishedDate', ' ').slice(0, 4)}</h3>

          <h3>{_.get(result.volumeInfo, 'publisher', '')}</h3>

          <h3>Pages: {_.get(result.volumeInfo, 'pageCount', '0')}</h3>

          <h3>Language: {_.get(result.volumeInfo, 'language', 'Data not available')}</h3>

          <h3>Available on <a href={_.get(result.volumeInfo, 'infoLink', '')} target="_blank" rel="noreferrer">Google play</a>. </h3>
        </div>
      </div>

      <div className="container-buttons-result">
        <SaveReference />

        <Link to='/results'><div className="options-result">BACK TO LIST</div></Link>
      </div>
    </div>
  )

  const resultNotAvailable = () => (
    <div className="container-no-results">
      <h2>Data not available.</h2>

      <h2>You can go back to the list
            <Link to="/result"> here</Link>.
      </h2>
    </div>
  )

  if (!result) {
    return resultNotAvailable();
  } else {
    return resultAvailable();
  }
}

export default Result;