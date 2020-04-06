import React, { Component } from 'react';

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from  "@components/Layout"

import Image from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import { IoMdArrowRoundBack } from 'react-icons/io';
import styled from "@emotion/styled";


const NotFoundWrapper = styled.div`
  position: relative;
  color: ${p => p.theme.colors.primary};
  margin: 0 auto;
  padding: 120px 0 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media (min-width: 990px) {
    width: 900px;
  }
  @media (min-width: 1200px) {
    width: 1050px;
  }
  @media (min-width: 1400px) {
    width: 1170px;
  }
  @media (max-width: 990px) {
    padding: 80px 45px 0 45px;
  }
  @media (max-width: 575px) {
    padding: 60px 25px 0 25px;
  }
`;

const NotFoundContent = styled.div`
  flex: 0 0 35%;
  max-width: 35%;
  color: ${p => p.theme.colors.primary};
  padding-right: 100px;
  @media (max-width: 1400px) {
    flex: 0 0 45%;
    max-width: 45%;
  }
  @media (max-width: 990px) {
    flex: 0 0 55%;
    max-width: 55%;
    padding-right: 50px;
  }
  @media (max-width: 575px) {
    flex: 0 0 100%;
    max-width: 100%;
    padding-right: 0;
    order: 1;
  }
  h1 {
    color: #ff6b6b;
    margin-bottom: 12px;
    @media (min-width: 1400px) {
      font-size: 25px;
    }
    @media (min-width: 1200px) {
      font-size: 24px;
    }
    @media (max-width: 990px) {
      font-size: 24px;
    }
    @media (max-width: 575px) {
      font-size: 22px;
    }
  }
`;

const NotFoundImage = styled.div`
  flex: 0 0 65%;
  max-width: 65%;
  padding-left: 10px;
  @media (max-width: 1400px) {
    flex: 0 0 55%;
    max-width: 55%;
  }
  @media (max-width: 990px) {
    flex: 0 0 45%;
    max-width: 45%;
  }
  @media (max-width: 575px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 50px;
  }
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff6b6b;
  color: #fff;
  font-size: 16px;
  margin-right: 15px;
  transition: 0.15s ease-in-out;
`;

const Goback = styled.div`
  margin-top: 60px;
  color: '#ff6b6b';
  @media (max-width: 990px) {
    margin-top: 40px;
  }
  @media (max-width: 575px) {
    margin-top: 30px;
  }
  a {
    color: ${p => p.theme.colors.primary};
    display: inline-flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    color: '#ff6b6b';
    transition: 0.15s ease-in-out;
    &:hover {
      color: '#f71616';
      ${Icon} {
        background-color: '#f71616';
      }
    }
  }
`;

class NotFoundPage extends Component {
  render() {
    const img = this.props.data.img.childImageSharp.fluid;
    return (
      <Layout>
        <SEO />
        <Section narrow>
          <NotFoundWrapper>
            <NotFoundContent>
              <h1>This Page Was Lost</h1>
              <p>
                The Page You are looking for isn’t available. Try to find again or use the Go Back button
                below.
              </p>
              <Goback>
                <Link to='/'>
                  <Icon>
                    <IoMdArrowRoundBack />
                  </Icon>
                  Go Back
                </Link>
              </Goback>
            </NotFoundContent>
            <NotFoundImage>
              <Image fluid={img} alt='not found error' />
            </NotFoundImage>
          </NotFoundWrapper>
        </Section>
      </Layout>
    );
  }
}

export default NotFoundPage;

export const imageQuery = graphql`
  query imageQuery {
    img: file(absolutePath: { regex: "/404.png/" }) {
      childImageSharp {
        fluid(maxWidth: 750, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;