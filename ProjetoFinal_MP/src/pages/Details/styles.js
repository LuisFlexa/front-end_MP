import styled from 'styled-components'

export const Container = styled.div`

padding: 4rem 4rem;

h1 {
    color: white;
    margin: 3rem 0;
}

.page-wrapper {
    position: absolute;
    left: 200px;
    overflow-x: hidden;
    width: 1500px;
    height: 100vh;
}

.movie {
    display: flex;
    align-items: center;
    justify-content: center;
}

img {
    width: 300px;
    border-radius: 1rem
}

.details {
    
    flex-direction: column;
    align-items: flex-start;
    margin-left: 4rem;
    max-widht: 50%;
}

button {
    background: #6654da;
    border: none;
    cursor: pointer;
    border-radius: 1rem;
    color: white;
    padding: 0.8rem 2rem;
    font-size: 100%;
    transition: all 0.3s;
}

button:hover {
    background: #5848c2;
}

span {
    color: white;
    line-height: 130%;
    margin-bottom: 1rem;
    font-size: 110%;
}

.release-date {
    opacity: 0.5;
}
`