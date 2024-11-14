import React, {useState} from "react";
import Card from "./Card";
import Blog from "./Blog";

function Display(props){
  const [selectedMovie, setSelectedMovie] = useState(0);
    var cards = props.data.map(
      (movies)=>(
        <Card 
          episode={movies.episode}
          title={movies.title}
          year={movies.year}
          poster={movies.poster}
        />
      ) 
    );

    return(
        <div>
            {cards}
            <Blog info={props.data[selectedMovie]}/>
        </div>
    );
}

export default Display;