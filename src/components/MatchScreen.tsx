import { useState } from "react"
import { Song } from "../types"
import PlayerScore from "./PlayerScore"
import { Button } from "react-bootstrap"
import { BsArrowRight, BsArrowLeft } from "react-icons/bs"
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi"

interface MatchScreenProps {
  players: string[]
  songs: Song[]
}

const FIREBASE_DOMAIN = "https://firebasestorage.googleapis.com/v0/b/guess-the-anime-a6470.appspot.com/o/"

export default function MatchScreen({ players, songs }: MatchScreenProps) {   
  const [ currentSong, setCurrentSong ] = useState<number>(0)

  function goToPreviousSong() {
    if (currentSong > 0)
      setCurrentSong(currentSong - 1)
  }

  function goToNextSong() {
    if (currentSong < songs.length - 1)
      setCurrentSong(currentSong + 1)
  }

  return (
    <>
      <div className="song-counter-container">
        <span>{currentSong + 1} / {songs.length}</span>
      </div>
      <div className="players-score-container">
        { players.map((name, id) => <PlayerScore key={id} name={name} />) }
      </div>
      <div className="song-controls-container">
        <div className="audio-player-container">
          <audio 
            controls={true}
            loop={true}
            src={FIREBASE_DOMAIN + songs[currentSong].path}
          />
        </div>
        <div className="song-navigation-container">
          <Button variant="outline-light" onClick={goToPreviousSong}><BsArrowLeft/></Button>
          <Button variant="outline-light">Reveal</Button>
          <Button variant="outline-light" onClick={goToNextSong}><BsArrowRight/></Button>
        </div>
      </div>
    </>
  )
}