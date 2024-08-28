import { useState, useEffect } from 'react'
import "./index.css"

function QuoteBox() {

    const [quote, setQuote] = useState({})

    const [animationClass, setAnimationClass] = useState('')

    const apiUrl = "https://api.quotable.io/quotes/random"

    const fetchQuote = () => {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                const quoteData = data[0]
                setQuote({
                    text: quoteData.content,
                    author: quoteData.author ? quoteData.author : "Unknown",
                })
            })
            .catch(error => {
                console.error("Error", error)
            })
    }

    useEffect(() => {
        fetchQuote()
    }, [])

    useEffect(() => {
        setAnimationClass('appear')
        const timeoutId = setTimeout(() => {
            setAnimationClass('');
        }, 1900)
        return () => clearTimeout(timeoutId);
    }, [quote])

    return(
        <div id="quote-box" className={`main-container ${animationClass}`}>
            <div className="text-container">
                <p id="text" className="text">{quote.text}</p>
                <p id="author" className="author-text"><strong>{quote.author}</strong></p>
            </div>
            <div className="icons-and-button-container">
                <a id='tweet-quote' href="twitter.com/intent/tweet" target='_blank'><i className="bi bi-twitter"></i></a>
                <button id="new-quote" onClick={fetchQuote} className="btn btn-primary">New quote</button>
            </div>
        </div>
    )
}

export default QuoteBox