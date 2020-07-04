import React, { useState, useEffect, useCallback } from "react";
import Moment from "react-moment";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";

export const Lyrics = (props) => {
  const lyricksUrl = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${props?.match?.params?.id}&apikey=${process.env.REACT_APP_MM_KEY}`;
  const trackUrl = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${props?.match?.params?.id}&apikey=${process.env.REACT_APP_MM_KEY}`;
  const { request, loading } = useHttp();
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});

  const fetchData = useCallback(async () => {
    const fetchedData = await request(lyricksUrl, trackUrl);

    setLyrics(fetchedData[0].message.body.lyrics);
    setTrack(fetchedData[1].message.body.track);
  }, [lyricksUrl, trackUrl, request]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <Link to="/" className="btn btn-dark btn-sm mb-4">
        Go Back
      </Link>
      <div className="card">
        <h5 className="card-header">
          {track.track_name} by
          <span className="text-secondary"> {track.artist_name}</span>
        </h5>
        <div className="card-body">
          <p className="card-text">{lyrics.lyrics_body}</p>
        </div>
      </div>
      <ul className="list-group mt-3">
        <li className="list-group-item">
          <strong>Album ID</strong>: {track.album_id}
        </li>
        <li className="list-group-item">
          <strong>Track Rating</strong>: {track.track_rating}
        </li>
        <li className="list-group-item">
          <strong>Updated Time</strong>:{" "}
          <Moment format="MM/DD/YYYY">{track.updated_time}</Moment>
        </li>
      </ul>
    </React.Fragment>
  );
};
