import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel'; // Import Carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import Carousel styles

import './movie-list.scss';

import tmdbApi, { category } from '../../api/tmdbApi';
import MovieCard from '../movie-card/Movie-card';
import apiConfig from '../../api/apiConfig';


const MovieList = props => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        };
        getList();
    }, []);

    return (
        <div className="movie-list">
            <Carousel showArrows={true} showThumbs={false} infiniteLoop={true}>
                {items.map((item, i) => (
                    <div key={i}>
                        <MovieCard item={item} category={props.category} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default MovieList;
