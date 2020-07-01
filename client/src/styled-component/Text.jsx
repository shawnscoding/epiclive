import styled from "styled-components";

export const HeadOne = styled.h1`
  font-weight: 400;
  color: ${(props) => props.color};
  font-size: ${(props) => (props.sz ? `${props.sz}` : "2rem")};
`;

export const HeadTwo = styled.h2`
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  font-size: ${(props) => (props.sz ? `${props.sz}` : "1.6rem")};
  text-transform: ${(props) => props.uppercase};
`;

export const HeadThree = styled.h3`
  font-weight: bold;
  color: ${(props) => props.color};
  font-size: ${(props) => (props.sz ? `${props.sz}` : "1.3rem")};
`;

export const Text = styled.p`
  color: ${(props) => props.cr};
  font-size: ${(props) => (props.sz ? `${props.sz}` : "1.3rem")};
  margin-bottom: ${(props) => props.mb};
  font-weight: ${(props) => props.weight};
  text-transform: ${(props) => props.uppercase};
`;

export const Close = styled.p`
  font-size: 1.7rem;
  color: ${(props) => props.color};
  cursor: pointer;
  font-weight: bold;
`;

export const LinkText = styled.p`
  font-size: 1.3rem;
  margin-top: 4px;
`;
