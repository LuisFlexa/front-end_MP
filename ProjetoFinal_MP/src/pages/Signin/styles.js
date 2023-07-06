import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 50vh;
`;

export const Content = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: #2f2841;
  max-width: 350px;
  padding: 20px;
  border-radius: 20px;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #74fcfc;
`;

export const LabelSignup = styled.label`
  font-size: 16px;
  color: #74fcfc;
`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #74fcfc;
  }

  a: hover {
    text-decoration: none;
    color: #5848c2;
  }
`;
