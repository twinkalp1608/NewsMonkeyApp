import React, {  } from "react";

const NewsItem = (props) => {
  
    let { title, description,imageUrl,newsUrl,author,date,source } = props;
    return (
      <div className="my-4">
        <div className="card">
          <span className=" rounded-pill badge bg-danger" style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>{source}</span>
          <img src={imageUrl ? imageUrl : "https://techcrunch.com/wp-content/uploads/2025/12/waymo-blackout.jpg?resize=1200,572"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-danger">By {author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noopener noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
