import { Link } from 'react-router-dom';
import CategoryButton from '../../Components/CategoryButton';
import techIcon from '../../assets/img/technologia_ikona_.svg';
import kulturaIcon from '../../assets/img/kultura_ikona.svg';
import motoIcon from '../../assets/img/motoryzacja_ikona.svg';
import progIcon from '../../assets/img/programowanie_ikona.svg';
import historiaIcon from '../../assets/img/historia_ikona.svg';

const Home = () => {
    return (
        <div className='main-wrapper'>
            <div className='main-header-wrapper'>
                <div><h1>QUIZ</h1></div>
                <div className="main-header-wrapper_category background"><p>10 PYTAŃ / 5 KATEGORII</p></div>
                <div className="main-header-wrapper_category"><p>WYBIERZ KATEGORIĘ</p></div>
            </div>
            <div className='nav-wrapper'>
                <div  className="button-category"><Link to="/Technologia" style={{ textDecoration: 'none' }}><CategoryButton name={'TECHNOLOGIA'} img={techIcon} /></Link></div>
                <div  className="button-category"><Link to="/Kultura" style={{ textDecoration: 'none' }}><CategoryButton name={"KULTURA"} img={kulturaIcon} /></Link></div>
                <div  className="button-category"><Link to="/Motoryzacja" style={{ textDecoration: 'none' }}><CategoryButton name={"MOTORYZACJA"} img={motoIcon} /></Link></div>
                <div  className="button-category"><Link to="/Programowanie" style={{ textDecoration: 'none' }}><CategoryButton name={"PROGRAMOWANIE"} img={progIcon} /></Link></div>
                <div  className="button-category"><Link to="/Historia" style={{ textDecoration: 'none' }}><CategoryButton name={"HISTORIA"} img={historiaIcon} /></Link></div>
            </div>
        </div>
    );
}

export default Home;