import React, { useState } from "react";


function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [rating, setRating] = useState(3);
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=episodes`
      );
      const data = await response.json();
      setResults(data);
      setSelectedEpisode(null);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClear = () => {
    setResults(null);
    setQuery("");
    };
console.log(rating);
  return (
    <>
   
    <div>

      <form onSubmit={handleSubmit}>
        <div className="container-input">
          <input type="text" placeholder="Search" name="text" className="input" value={query} onChange={handleChange} />
          <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
            <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
          </svg>
          
        </div>
        
      </form>
      {results && !selectedEpisode && (
        <div>
          <h2>{results.name}</h2>
          <img src={results.image?.medium} alt={results.name} />
          <p dangerouslySetInnerHTML={{ __html: results.summary }}></p>
          <h3>Episodes:</h3>
          <div className="card-container">
          {results._embedded?.episodes.map((episode) => (
            <div
              className="card"
              key={episode.id}
              onClick={() => setSelectedEpisode(episode.id)}
            >
              <h4>{episode.name}</h4>
              <p>
                Season {episode.season}, Episode {episode.number}
              </p>
              
            </div>
            
          ))}
          </div>
        </div>
      )}
      
      {selectedEpisode && (
  <>
  <button className="backBtn"onClick={() => setSelectedEpisode(null)}>
  <svg width="20px" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
    <div className="text">
        <span>Go</span>
        <span>Back</span>
   
    </div>
    <div className="clone">
        <span>Go</span>
        <span>Back</span>
     
    </div>
  
</button>
<div className="container">
  <div className="Pic">  <img className="episode-image" src={results.image?.medium} alt={results.name} /></div>

  <div className="Description">
  <div className="episode-details">
     
     <h3 className="episode-title">{results._embedded.episodes.find(e => e.id === selectedEpisode).name}</h3>
     <h4 className="descriptionText">Description</h4>
     <p className="episode-summary" dangerouslySetInnerHTML={{__html: results._embedded.episodes.find(e => e.id === selectedEpisode).summary}}></p>
     <div className="episode-info">
       <p className="season-info">Season: {results._embedded.episodes.find(e => e.id === selectedEpisode).season}</p>
       <p className="season-info">Episode: {results._embedded.episodes.find(e => e.id === selectedEpisode).number}</p>
       <p className="season-info">Rating: {results._embedded.episodes.find(e => e.id === selectedEpisode).rating.average} / 10</p>
  
   
     </div>
     <p className="airdate-info">Release date: {results._embedded.episodes.find(e => e.id === selectedEpisode).airdate}</p>
   </div>
  </div>
</div>
 
  </>
)}
    </div>
    </>
  );
}

export default SearchBar;
