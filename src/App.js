import { useState, useRef } from 'react';
import './App.css';

function App() {
const [audioProgress, setAudioProgress] = useState(0)
const [currentMusicDetail, setCurrentMusicDetail] = useState({
  songName:'Perfect Starlight',
  songArtist:'Boys24',
  songSrc:'/Assets/Song/Perfect Starlight - Boys24.mp3',
  songAvatar:'/Assets/Images/cover1.webp',
})
const currentAudio = useRef()
const [musicTotalLength, setMusicTotalLength] = useState('00 : 00')
const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00')

const handleMusicProgressBar =(e) => {
  setAudioProgress(e.target.value)
  currentAudio.current.currentTime = e.target.value *( currentAudio.current.duration /100)
}

let avatarClass = ['objectFitCover','objectFitContain','none']
const [avatarClassIndex, setAvatarClassIndex] = useState(0)
const handleAvatar =()=>{
  if(avatarClassIndex >= avatarClass.length -1){
    setAvatarClassIndex(0)
  } else{
    setAvatarClassIndex(avatarClassIndex +1)
  }
}


const [isAudioPlay, setIsAudioPlay] = useState(false)
const handlePlay =() => {
  if(currentAudio.current.paused){
    currentAudio.current.play()
    setIsAudioPlay(true)
  } else{
    currentAudio.current.pause()
    setIsAudioPlay(false)
  }
}

const handleTimeUpdate =() =>{
  let minutes = Math.floor(currentAudio.current.duration / 60)
  let second = Math.floor(currentAudio.current.duration % 60)
  let musicTotalLength = `${minutes < 10 ? `0${minutes}`: minutes} : ${second < 10 ? `0${second}`: second}`
  setMusicTotalLength(musicTotalLength)

  let currentMinutes = Math.floor(currentAudio.current.currentTime / 60)
  let currentSecond = Math.floor(currentAudio.current.currentTime % 60)
  let CurrentTime = `${currentMinutes < 10 ? `0${currentMinutes}`: currentMinutes} : ${currentSecond < 10 ? `0${currentSecond}`: currentSecond}`
  setMusicCurrentTime(CurrentTime)
}


  return (
   <>
   <div className="container">
    <audio src={currentMusicDetail.songSrc} ref={currentAudio}></audio>
    <video src="/Assets/Video/video5.mp4" autoPlay muted loop className='backgroundVideo' onTimeUpdate={handleTimeUpdate}></video>
    <div className="blackScreen"></div>
    <div className="music-container text-center">
      <p className="music-player">Music Player</p>
      <p className="music-name">{currentMusicDetail.songName}</p>
      <p className="artis-name">{currentMusicDetail.songArtist}</p>
      <img src={currentMusicDetail.songAvatar} alt='song Avatar' id='songAvatar' onClick={handleAvatar} className={avatarClass[avatarClassIndex]}/>
      <div className="musicTimer">
        <p className="musicCurrentTime">{musicCurrentTime}</p>
        <p className="musicTotalTime">{musicTotalLength}</p>
      </div>
      <input type="range" name='musicProgressBar' className="musicProgressBar" value={audioProgress} onChange={handleMusicProgressBar} />
      <div className="musicControler">
        <i className="fa-solid fa-backward musicControler"></i>
        <i className={`fa-solid ${isAudioPlay ?'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handlePlay}></i>
        <i className="fa-solid fa-forward musicControler"></i>
      </div>
    </div>
   </div>
   </>
  );
}

export default App;
