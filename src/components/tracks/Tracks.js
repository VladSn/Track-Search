import React, { useContext } from "react";
import { TracksContext } from "../../context/TracksContext";
import Loader from "../layout/Loader";
import { Track } from "./Track";

export const Tracks = () => {
  const { tracks, header } = useContext(TracksContext);

  if (!tracks.length || tracks === undefined) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <h3 className="text-center mb-4">{header}</h3>
      <div className="row">
        {tracks.map((item) => {
          return <Track key={item?.track?.track_id} track={item?.track} />;
        })}
      </div>
    </React.Fragment>
  );
};
