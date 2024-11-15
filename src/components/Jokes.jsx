import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Jokes = () => {
    const [jokes, setJokes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentJoke, setCurrentJoke] = useState({});

    const getJokes = async () => {
        setLoading(true);
        fetch("https://api.api-ninjas.com/v1/jokes", {
            method: "GET",
            headers: {
                "X-Api-Key": "HoGgaDM2OSwRfuFDZ3rl3g==nCIePvS5qGM19Gth",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCurrentJoke(data[0]);
                setLoading(false);
            });
    };

    useEffect(() => {
        getJokes();
        const storedJokes = JSON.parse(localStorage.getItem("jokes"));
        if (storedJokes && storedJokes.length > 0) {
            setJokes(storedJokes);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("jokes", JSON.stringify(jokes));
    }, [jokes]);

    return (
        <>
            <h1>🤡Daily Jokes</h1>
            {loading ? (
                <p>Wait, we are getting more funny jokes for you...</p>
            ) : (
                <div>
                    <div className="jokeDiv">
                        <p>{currentJoke.joke}</p>
                    </div>
                    <button onClick={getJokes}>New joke </button>
                    <button
                        onClick={() => {
                            if (
                                !jokes.find(
                                    (findJoke) =>
                                        findJoke.joke === currentJoke.joke
                                )
                            ) {
                                setJokes([
                                    ...jokes,
                                    { joke: currentJoke.joke, id: uuidv4() },
                                ]);
                            }
                        }}
                    >
                        Like😂
                    </button>
                </div>
            )}
            <h3>Liked Jokes: {jokes.length}</h3>
            <div>
                {jokes.length > 0 &&
                    jokes.map((joke) => (
                        <div key={joke.id} className=" jokeListDiv">
                            <p>{joke.joke}</p>
                            <button
                                className="deleteBtn"
                                onClick={() =>
                                    setJokes(
                                        jokes.filter(
                                            (removeJoke) =>
                                                removeJoke.id !== joke.id
                                        )
                                    )
                                }
                            >
                                Delete
                            </button>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Jokes;
