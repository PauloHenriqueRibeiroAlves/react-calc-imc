import { useState } from "react";
import  Style  from "./App.module.css";
import powerdImage from "./assests/powered.png";
import leftArrowImage from "./assests/leftarrow.png";
import { levels, calculatImc, Level } from "./helpers/Imc"
import { GridItem } from "./components/GridItem";

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const hundleCalculateButton = () => {
    if(heightField && weightField) {
      setToShow(calculatImc(heightField, weightField));
    }else{
      alert("Digite todos os campos.")
    };
  };

  const hundleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return(
    <div className={Style.main}>
      <header>
        <div className={Style.headerContainer}>
          <img src={powerdImage} alt="logo" width={300}/>
        </div>
      </header>
      <div className={Style.container}>
        <div className={Style.leftSide}>
          <h1>Calcule seu IMC</h1>
          <p>IMC é a sigla para Índice de massa corpória parâmetro adequado pela Organização 
            Mundial da Saude para calcular o peso ideal de cada pessoa.
          </p>
          <input
            type="number"
            placeholder="Digite sua altura. Ex 1.5 (em metros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder="Digite seu peso. Ex 75.3 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <button onClick={hundleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={Style.rightSide}>
          {!toShow &&
            <div className={Style.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {toShow &&
            <div className={Style.rightBig}>
              <div className={Style.rightArrow} onClick={hundleBackButton}>
                <img src={leftArrowImage} alt="" width={20}/>
              </div>
              <GridItem item={toShow} />
            </div>          
          }
        </div>
      </div>
    </div>
  );

}

export default App;
