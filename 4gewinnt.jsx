import React, { useState, useEffect } from 'react';
import './4gewinnt.css';

const Spieler = {
  KEINER: 0,
  EINS: 1,
  ZWEI: 2,
  WINNER: 0,
};


function VierGewinnt() {
  const [brett, setBrett] = useState(Array(6).fill().map(() => Array(7).fill(Spieler.KEINER)));
  const [aktuellerSpieler, setAktuellerSpieler] = useState(Spieler.EINS);


  useEffect(() => {
    const gewinner = checkForWinner(brett, aktuellerSpieler);
    if (gewinner) {
      alert(`Spieler ${aktuellerSpieler} hat das Spiel gewonnen!`);
      // Hier können Sie weitere Aktionen ausführen, z.B. das Spiel zurücksetzen.
    }
  }, [brett, aktuellerSpieler]);



  const platziereSpielstein = (spalte) => {
    const neueBrett = [...brett];
    for (let i = 5; i >= 0; i--) {
      if (neueBrett[i][spalte] === Spieler.KEINER) {
        neueBrett[i][spalte] = aktuellerSpieler;
        setBrett(neueBrett);
        setAktuellerSpieler(aktuellerSpieler === Spieler.EINS ? Spieler.ZWEI : Spieler.EINS);
        break;
      }
    }
  };

  const checkForWinner = (brett, aktuellerSpieler) => {
    // Überprüfen Sie jede Zelle auf dem Brett
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        // Überprüfen Sie die horizontale Linie
        if (j < 4 && brett[i][j] === aktuellerSpieler && brett[i][j+1] === aktuellerSpieler && brett[i][j+2] === aktuellerSpieler && brett[i][j+3] === aktuellerSpieler) {
          return true;
        }
        // Überprüfen Sie die vertikale Linie
        if (i < 3 && brett[i][j] === aktuellerSpieler && brett[i+1][j] === aktuellerSpieler && brett[i+2][j] === aktuellerSpieler && brett[i+3][j] === aktuellerSpieler) {
          return true;
        }
        // Überprüfen Sie die diagonale Linie nach oben
        if (i < 3 && j < 4 && brett[i][j] === aktuellerSpieler && brett[i+1][j+1] === aktuellerSpieler && brett[i+2][j+2] === aktuellerSpieler && brett[i+3][j+3] === aktuellerSpieler) {
          return true;
        }
        // Überprüfen Sie die diagonale Linie nach unten
        if (i > 2 && j < 4 && brett[i][j] === aktuellerSpieler && brett[i-1][j+1] === aktuellerSpieler && brett[i-2][j+2] === aktuellerSpieler && brett[i-3][j+3] === aktuellerSpieler) {
          return true;
        }
      }
    }
    // Wenn keine der Bedingungen erfüllt ist, gibt es keinen Gewinner
    return false;
  };
 
  const handleWinner = (props) => {
    const { checkForWinner, aktuellerSpieler } = props;
  
    if (checkForWinner === true) {
      alert(`Der Spieler ${aktuellerSpieler} hat das Spiel gewonnen!`);
    }
  }


  return (
    <div className="App">
  
      <h1 className='span'>KaliMeNope.de</h1>
      <h2 className='span'>4 Gewinnt</h2>
     
      {brett.map((reihe, i) => (
        <div key={i} className="reihe">
          {reihe.map((zelle, j) => (
            <div key={j} className={`zelle spieler-${zelle}`} onClick={() => platziereSpielstein(j)} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default VierGewinnt;
