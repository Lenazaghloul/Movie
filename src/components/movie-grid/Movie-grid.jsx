import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';

import './movie--grid.scss';

import MovieCard from '../movie-card/Movie-card';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/input';

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';

const MovieGrid = (props) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            try {
                let response = null;
                const params = { page };

                if (keyword === undefined) {
                    switch (props.category) {
                        case category.movie:
                            response = await tmdbApi.getMoviesList(movieType.popular, { params });
                            break;
                        default:
                            response = await tmdbApi.getTvList(tvType.popular, { params });
                    }
                } else {
                    const searchParams = { query: keyword, page };
                    response = await tmdbApi.search(props.category, { params: searchParams });
                }

                if (response && response.results) {
                    setItems((prevItems) => [...prevItems, ...response.results]);
                    setTotalPage(response.total_pages);
                } else {
                    throw new Error('No results found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getList();
    }, [props.category, keyword, page]);

    const loadMore = async () => {
        if (page < totalPage) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            <div className="movie-grid">
                {items.map((item) => (
                    <MovieCard category={props.category} item={item} key={item.id} />
                ))}
            </div>
            {page < totalPage && (
                <div className="movie-grid__loadmore">
                    <OutlineButton className="small" onClick={loadMore}>
                        Load more
                    </OutlineButton>
                </div>
            )}
        </>
    );
};

const MovieSearch = (props) => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword: '');

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            console.log('props.category:', props.category);
            navigate(`${props.category}/search/${keyword}`);
        }
    }, [keyword, props.category, navigate]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>
                Search
            </Button>
        </div>
    );
};

export default MovieGrid;
