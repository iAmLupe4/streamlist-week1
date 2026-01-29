import React, { useEffect, useState } from "react"; 
import "./Page.css"; 

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
console.log("TMDB KEY?", process.env.REACT_APP_TMDB_API_KEY);

const IMG_BASE = "https://image.tmdb.org/t/p/w342"; 

export default function Movies() { 

  const [query, setQuery] = useState(""); 
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  // Optional: show trending movies on first load 
  useEffect(() => { 
    const fetchTrending = async () => { 
      try { 
        setLoading(true); 
        setError(""); 

        const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`; 
        const res = await fetch(url); 

        if (!res.ok) throw new Error("TMDB request failed."); 
        const data = await res.json(); 

        setResults(data.results || []); 
      } catch (e) { 
        setError(e.message || "Something went wrong."); 
      } finally { 
        setLoading(false); 
      } 
    }; 

    if (API_KEY) fetchTrending(); 
  }, []); 

  const handleSearch = async (e) => { 
    e.preventDefault(); 

    if (!query.trim()) { 
      setError("Please enter a movie title to search."); 
      return; 
    } 

    try { 
      setLoading(true); 
      setError(""); 

      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent( 
        query.trim() 
      )}&include_adult=false`; 

      const res = await fetch(url); 
      if (!res.ok) throw new Error("TMDB search failed."); 

      const data = await res.json(); 
      setResults(data.results || []); 
    } catch (e) { 
      setError(e.message || "Something went wrong."); 
    } finally { 
      setLoading(false); 
    } 
  }; 

  return ( 
    <div className="pageWrap"> 
      <h1 className="pageTitle">Movies</h1> 
      <p className="pageSub"> 
        Search TMDB and display results under this route. 
      </p> 
 
      <form className="card" onSubmit={handleSearch}> 
        <label className="label" htmlFor="movieQuery"> 
          Search Movies (TMDB) 
        </label> 

        <div className="row"> 
          <input 
            id="movieQuery" 
            className="input" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Try: Avatar, The Batman, Stranger Things..." 
          /> 
          <button className="btn" type="submit" disabled={loading}> 
            {loading ? "Searching..." : "Search"} 
          </button> 
        </div> 

        {error && <p className="error">{error}</p>} 
      </form> 
 
      <div className="resultsHeader"> 
        <h2 className="sectionTitle">Results</h2> 
        <p className="muted">{results.length} item(s)</p> 
      </div> 

      {loading && <p className="muted">Loading results…</p>} 

      {!loading && results.length === 0 && ( 
        <div className="card"> 
          <p className="muted">No results yet. Try searching a movie title.</p> 
        </div> 
      )} 

      <div className="grid"> 
        {results.map((m) => ( 
          <div key={m.id} className="movieCard"> 
            <div className="posterWrap"> 
              {m.poster_path ? ( 
                <img 
                  className="poster" 
                  src={`${IMG_BASE}${m.poster_path}`} 
                  alt={m.title} 
                /> 
              ) : ( 
                <div className="posterFallback">No Poster</div> 
              )} 
            </div> 

            <div className="movieInfo"> 
              <h3 className="movieTitle">{m.title}</h3> 
              <p className="mutedSmall"> 
                {m.release_date ? `Release: ${m.release_date}` : "Release: N/A"} 
                {" • "} 
                Rating: {m.vote_average ?? "N/A"} 
              </p> 
              <p className="overview"> 
                {m.overview ? m.overview : "No overview available."} 
              </p> 
            </div> 
          </div> 
        ))} 
      </div> 
    </div> 
  ); 
} 