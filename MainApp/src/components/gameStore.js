import {React, useContext} from "react";
import skin1 from '../components/td_game/spritesheets/defender2logo.png'
import skin2 from '../components/td_game/spritesheets/defender3logo.png'
import skin3 from '../components/td_game/spritesheets/defender4logo.png'
import skin4 from '../components/td_game/spritesheets/defender5logo.png'
import './gameStore.css';
import UserContext from './context/userContext';

export const GameStore = (id) => {

  // Global Var
  const {value, setValue} = useContext(UserContext);
  
  // Buy Tower
  const getTower = (tower) => {
    // if (tower == 2 && value.credits < 150){return;}
    // if (tower == 3 && value.credits < 250){return;}
    // if (tower == 4 && value.credits < 300){return;}
    // if (tower == 5 && value.credits < 550){return;}
    let userNickname = value.username;
    console.log("Store user nickname: " + userNickname)

    if (tower < 2 && tower > 5) {return;}
    const constURL = `http://localhost:8000/users/${userNickname}/tower/${tower}`
    // const data = { user_nickname: userNickname, new_score: userScore };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify(data)
    };
    fetch(constURL, requestOptions).then(window.location.reload(false));
  }
  
  return (

    <div id="root">

      <div>
        <span class="welcome">Here you can purchase additional in-game content for the game!</span>
        {value.credits === undefined ? (<span class="welcome" color="orange">Loading...</span>) : (<span class="welcome">Your balance: {value.credits} credits</span>)}
      </div>

      <div className="wrapper">

        <div data-reactroot>
          <div className="container">
            <div className="card">


              <img src={skin1} width={200} height={200} alt="skin1"></img>
              <span className="caption" style={{ display: 'block' }}>"Prototype 2"</span>
              <span className="caption" style={{ display: 'block' }}>In-game price: 150 resources</span>
              <span className="caption" style={{ display: 'block' }}>Rate of fire: 15</span>
              <span className="caption" style={{ display: 'block' }}>Single shot Damage: 25</span>
              <span className="caption" style={{ display: 'block' }}>Price: 150 Credits</span>

              {value.tower2IsOpened ?
                (<button class="bought" >Owned</button>) :
                (<button class="buy" onClick={() => getTower(2)}>Purchase</button>)}
            </div>
            <div className="card">

              <img src={skin2} width={200} height={200} alt="skin2"></img>
              <span className="caption" style={{ display: 'block' }}>"Triple Shot"</span>
              <span className="caption" style={{ display: 'block' }}>In-game price: 200 resources</span>
              <span className="caption" style={{ display: 'block' }}>Rate of fire: 35</span>
              <span className="caption" style={{ display: 'block' }}>Single shot Damage: 8</span>
              <span className="caption" style={{ display: 'block' }}>Price: 250 Credits</span>


              {value.tower3IsOpened ?
                (<button class="bought" >Owned</button>) :
                (<button class="buy" onClick={() => getTower(3)}>Purchase</button>)}
            </div>
            <div className="card">

              <img src={skin3} width={200} height={200} alt="skin3"></img>
              <span className="caption" style={{ display: 'block' }}>"Machine Gunner"</span>
              <span className="caption" style={{ display: 'block' }}>In-game price: 250 resources</span>
              <span className="caption" style={{ display: 'block' }}>Rate of fire: 30</span>
              <span className="caption" style={{ display: 'block' }}>Single shot Damage: 8</span>
              <span className="caption" style={{ display: 'block' }}>Price: 300 Credits</span>

              {value.tower4IsOpened ?
                (<button class="bought" >Owned</button>) :
                (<button class="buy" onClick={() => getTower(4)}>Purchase</button>)}
            </div>
            <div className="card">

              <img src={skin4} width={200} height={200} alt="skin4"></img>
              <span className="caption" style={{ display: 'block' }}>"Oneshot minister"</span>
              <span className="caption" style={{ display: 'block' }}>In-game price: 300 resources</span>
              <span className="caption" style={{ display: 'block' }}>Rate of fire: 10</span>
              <span className="caption" style={{ display: 'block' }}>Single shot Damage: 100</span>
              <span className="caption" style={{ display: 'block' }}>Price: 550 Credits</span>

              {value.tower5IsOpened ?
                (<button class="bought" >Owned</button>) :
                (<button class="buy" onClick={() => getTower(5)}>Purchase</button>)}


            </div>
          </div>

        </div>

      </div>

      {/* <div className="wrapper1">

      </div> */}


    </div>

  );
}