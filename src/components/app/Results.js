import "../../css/Results.css";
import "../../css/BoxInfo.css";
import imgNotAvailable from "../../images/img-not-available.png";
import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import {UrlContext} from "../../context/UrlContext";
import _ from 'lodash';
import axios from 'axios';

function Results() {
  useEffect(() => {
    getData();
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  const [posts, setPosts] = useState([]);
  const [urlRequest] = useContext(UrlContext);

  const getData = async () => {
    try {
      const data = await axios.get(urlRequest);
      const posts = Array.from(data.data.items);
      setPosts(posts);
    } catch (err) {
      setPosts(!posts);
      console.error(err);
    }
  };

  const noResponse = () => (
    <div className="container-no-results">
      <h2>There are no match.</h2>

      <h2>Please try again.</h2>

      <h2>You can find search settings
            <Link to="/settings"> here</Link>.
      </h2>
    </div>
  )

  const response = () => (
    <div className="Results">
      {posts.map(item => (
        <div key={item.id} className="container-box-info">
          <div  className="box-info">
            <div className="container-thumbnail">
              <img src={_.get(item.volumeInfo.imageLinks, 'thumbnail', imgNotAvailable)} alt="" />
            </div>

            <div className="container-text-box-info">

              <div className="text-box-info">
                <Link to={`/${item.id}`}>
                  <h2>{_.truncate(_.toString(_.get(item.volumeInfo, 'title', '')), {
                    'length': 150,
                    'separator': ' '
                  })}</h2>
                </Link>

                <h3>{_.truncate(_.join(_.get(item.volumeInfo, 'authors', ''), ', '), {
                  'length': 50,
                  'separator': ' '
                })}
                </h3>

                <h3>{_.toString(_.get(item.volumeInfo, 'publishedDate', ' ')).slice(0, 4)}</h3>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (!posts) {
    return noResponse();
  } else {
    return response();
  }
}

export default Results;
