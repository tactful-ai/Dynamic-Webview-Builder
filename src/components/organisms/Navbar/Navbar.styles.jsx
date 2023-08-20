import styled from 'styled-components';

export const NavbarWrapper = styled.nav`
  background-color: #f0f0f0; /* Light grey background */
  width: 200px; /* Set the width of the vertical navbar */
  height: 100vh; /* Set the height to full viewport height */
  display: flex;
  flex-direction: column; /* Vertical arrangement */
  padding: 20px; /* Add some padding for spacing */
  
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 0;
    padding: 10px 0;
  }
`;
