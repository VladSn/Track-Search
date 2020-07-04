import React, { useState, useContext } from "react";
import { TracksContext } from "../../context/TracksContext";
import { useHttp } from "../../hooks/http.hook";

export const Search = () => {
  const { updateData } = useContext(TracksContext);
  const [title, setTitle] = useState({
    trackTitle: "",
  });

  const changeHandler = (e) => {
    setTitle({ [e.target.name]: e.target.value });
  };

  const searchUrl = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${title.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`;
  const { request } = useHttp();

  const findTrack = (e) => {
    e.preventDefault();
    request(searchUrl).then((data) => updateData(data));
    setTitle({ ...title, trackTitle: "" });
  };

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music"> Search for a Song</i>
      </h1>
      <p className="lead text-center">Get the track for any song</p>
      <form onSubmit={findTrack}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Song title..."
            name="trackTitle"
            value={title.trackTitle}
            onChange={changeHandler}
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block mg-5" type="submit">
          Get Tracks
        </button>
      </form>
    </div>
  );
};
