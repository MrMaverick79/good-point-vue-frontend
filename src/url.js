let BASE_URL;

if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000';
} else {
    BASE_URL = 'https://cryptic-lake-39023.herokuapp.com'
}

export default BASE_URL