import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Jokes = () => {
    const [jokes, setJokes] = useState([]);
    const [currentJoke, setCurrentJoke] = useState({});

    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(false);

    const getJokes = () => {
        setLoading(true);
        fetch("https://api.api-ninjas.com/v1/jokes", {
            method: "GET",
            headers: {
                "X-Api-Key": import.meta.env.VITE_NINJA_JOKES_API_KEY,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    setErr(true);
                }
                return response.json();
            })
            .then((data) => {
                setCurrentJoke(data[0]);
            })
            .catch((error) => {
                setErr(true);
                console.error("Error fetching joke:", error);
            })
            .finally(() => {
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
                <div className="jokeDiv">
                    <p>Wait, we are getting more funny jokes for you...</p>
                </div>
            ) : (
                !err && (
                    <>
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
                                        {
                                            joke: currentJoke.joke,
                                            id: uuidv4(),
                                        },
                                    ]);
                                }
                            }}
                        >
                            Like😂
                        </button>
                    </>
                )
            )}
            {err && (
                <div className="jokeDiv">
                    <p>Sorry, we are facing erorr! can't get joke for you...</p>
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
