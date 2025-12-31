import React, { useEffect,useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  document.title =
      props.category.charAt(0).toUpperCase() +
      props.category.slice(1) +
      " - NewsMonkey";

  
  const fetchMoreData = async () => {
    
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
    &page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  }


  const updateNews = async() => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
    &page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url); 
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, []);


  const handlePrevClick = async () => {
   
    setPage(page - 1);
    updateNews();
  };

  const handleNextClick = async () => {
    // 
    setPage(page + 1);
    updateNews();
  };


    return (
      <>
        <h1 className="text-center" style={{ marginTop: "90px" }}>
          NewsMonkey - Top{" "}
          {props.category.charAt(0).toUpperCase() +
            props.category.slice(1)}{" "}
          Headlines
        </h1>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container my-3">
            <div className="row">
              {articles.map((element, index) => (
                <div
                  className="col-md-4"
                  key={`${element.url || "news"}-${index}`}
                >
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description ? element.description.slice(0, 100) : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
        <div className="container">
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-dark"
              onClick={handlePrevClick}
              disabled={page <= 1}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleNextClick}
              disabled={
                page >=
                Math.ceil(totalResults / props.pageSize)
              }
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  
}
 export default News;

News.defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };