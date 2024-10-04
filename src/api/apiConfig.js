const apiConfig ={
    baseUrl:'https://api.themoviedb.org/3/',
    apiKey: 'ac35580be554252f7d6877401caadb42',
    originalImage: (imgPath)=> `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image:  (imgPath)=> `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;