import styled from 'styled-components';
const ServiceMessageStyled = styled.div`
  padding: 10px 20px;
  background: #E5E5EA;
  color: #707070;
  font-size: .8em;
  border-radius: 25px;
  width: auto;
  margin: 0 auto 15px auto;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  max-width: 90%;
  position: relative;
`;

const ServiceMessageTimeStyled = styled.div`
  display: block;
  font-size: .7em;
  text-align: center;
  margin-bottom: 3px;
`;
export default ServiceMessageStyled;
export { ServiceMessageTimeStyled };