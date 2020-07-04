import { useState, useCallback, useEffect } from "react";
import { useHttp } from "./http.hook";

export function useTracks() {
  const fetchUrl = setSountryUrl("us");
  const { request } = useHttp();
  const [tracks, setTracks] = useState([]);
  const [header, setHeader] = useState("Top 10 Tracks");

  const updateData = useCallback((data) => {
    if (data?.track_list.length) {
      console.log(data);

      setTracks(...tracks, data.track_list);
      setHeader("Search Results");
    }
  }, []);

  const fetchTracks = useCallback(async () => {
    try {
      const fetched = await request(fetchUrl);
      setTracks(fetched.track_list);
    } catch (error) {}
  }, [fetchUrl, request]);

  useEffect(() => {
    fetchTracks();
  }, [updateData, fetchTracks]);

  return { tracks, header, updateData };
}

function setSountryUrl(country) {
  return `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=${country}&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`;
}
