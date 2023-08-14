import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';


const firstSoundsGroup = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    key: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const secondSoundsGroup = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    key: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const soundName = {
  heaterKit: 'Heater Kit',
  smoothPianoKit: 'Smooth Piano Kit'
}

const soundGroup = {
  heaterKit: firstSoundsGroup,
  smoothPianoKit: secondSoundsGroup
}

const KeyboardKey = ({ play, sound: {id, key, url, keyCode} }) => {
  const handleKeyDown = (event) => {
    if (event.keyCode === keyCode) {
      play(key, id)
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    
  }, [])
  
  return (
    <button id={keyCode} className='drum-pad' onClick={() => play(key, id)}>
      {url && (
      <audio className='clip' id={key} src={url}></audio>
      )}
      {key}
    </button>
  )
}

const Keyboard = ({power, play, sounds }) => {
  return (
    <div className='keyboard'>
      {power 
        ? sounds.map((sound) => <KeyboardKey play={play} sound={sound} />)
        : sounds.map((sound) => <KeyboardKey play={play} sound={{...sound, url: "#"}} />)
      }
    </div>
  );
};

const DrumControl = ({stop, name, power, changeSoundsGroup, volume, handleVolumeChange }) => {
  return (
    <div className='controle'>
      <button onClick={stop}>Turn the Power: {power ? 'OFF' : 'ON'}</button>
      <h2>Volume: %{Math.round(volume * 100)}</h2>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
      />
      <h2 id="display">{name}</h2>
      <button onClick={changeSoundsGroup}>Change The Sound Group</button>
    </div>

  )
  
}

function App() {
  const [power, setPower] = useState(true)
  const [volume, setVolume] = useState(1)
  const [soundsName, setSoundsName] = useState("")
  const [soundType, setSoundType] = useState("heaterKit")
  const [sounds, setSounds] = useState(soundGroup[soundType])
  
  const stop = () => {
    setPower(!power)
  }

  const play = (key, sound) => {
    setSoundsName(sound)
    const audio = document.getElementById(key)
    if(audio) {
      console.log('Playing:', key)
      audio.currentTime = 0;
      audio.play()
    } else {
      console.log('Not Found', key)
    }
   
  }

  const setKeyVolume = () => {
    const audios = sounds.map((sound) => document.getElementById(sound.key))
    audios.forEach(audio => {
      if (audio) {
        audio.volume = volume
      }
    })
  }


  const changeSoundsGroup = () => {
    setSoundsName("")
    if (soundType === "heaterKit") {
      setSoundType("smoothPianoKit")
      setSounds(soundGroup.smoothPianoKit)
     
      
    } else {
      setSoundType("heaterKit")
      setSounds(soundGroup.heaterKit)
    }

  }

  const handleVolumeChange = (event) => {
    setVolume(event.target.value)

  }

  return (
    <div id="drum-machine">
      {setKeyVolume()}
      <div className='wrapper'>
        <Keyboard power={power} play={play} sounds={sounds} />
        <DrumControl 
        stop={stop}
        power={power}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
        name={soundsName || soundName[soundType]} 
        changeSoundsGroup={changeSoundsGroup} />
      </div>
     
    </div>
  );
}

export default App;
