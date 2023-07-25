import api from '../../utils/api'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Home.module.css'

function Home() {
  const [adoptedPets, setAdoptedPets] = useState([])
  const [availablePets, setAvailablePets] = useState([])

  useEffect(() => {
    api.get('/pets').then((response) => {
      const allPets = response.data.pets
      setAdoptedPets(allPets.filter((pet) => !pet.available))
      setAvailablePets(allPets.filter((pet) => pet.available))
    })
  }, [])

  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>

      <div className={styles.pet_section}>
        <h2>Pets Adotados</h2>
        <div className={styles.pet_container}>
          {adoptedPets.length > 0 ? (
            adoptedPets.map((pet) => (
              <div className={styles.pet_card} key={pet._id}>
                <div
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                  }}
                  className={styles.pet_card_image}
                ></div>
                <h3>{pet.name}</h3>
                <p>
                  <span className="bold">Peso:</span> {pet.weight}kg
                </p>
                <p className={styles.adopted_text}>Adotado!</p>
              </div>
            ))
          ) : (
            <p>Não há pets adotados no momento!</p>
          )}
        </div>
      </div>

      <div className={styles.pet_section}>
        <h2>Pets em Adoção</h2>
        <div className={styles.pet_container}>
          {availablePets.length > 0 ? (
            availablePets.map((pet) => (
              <div className={styles.pet_card} key={pet._id}>
                <div
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                  }}
                  className={styles.pet_card_image}
                ></div>
                <h3>{pet.name}</h3>
                <p>
                  <span className="bold">Peso:</span> {pet.weight}kg
                </p>
                <Link to={`/pet/${pet._id}`}>Mais detalhes</Link>
              </div>
            ))
          ) : (
            <p>Não há pets disponíveis para adoção no momento!</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Home
