import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Right from "./Right";
import SpotifyWebApi from "spotify-web-api-node";
import { useRecoilState } from "recoil";
import { playingTrackState } from "../atoms/playerAtom";
import { useSession } from "next-auth/react";
import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "48258a03142c48859bd8de0ac503aa3c",
});

const Dashboard = () => {
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);

  const { data: session } = useSession();
  const { accessToken } = session;

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />
      <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {showPlayer && (
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
