import styled from "styled-components";

export const Container1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
`;

export const Title = styled.h2`
  color: white;
`;

export const Container = styled.div`
  
  h1 {
    text-align: center;
    margin: 4rem 0;
    color: white;
  }
`;

export const MovieList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    column-gap: 3rem;
    row-gap: 4rem;
`;

export const Movie = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 180px;
        border-radius: 1rem;
        margin-bottom: 2rem;
    }

    span {
        font-weight: bold;
        font-size: 120%;
        color: white;
        text-align: center;
    }

    a {
        transition: all 0.3s;
    }
    a: hover {
        transform: scale(1.1);
    }
`;
