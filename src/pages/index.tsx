import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Main from '../components/Main';
import '../styles/general.scss';

const IndexPage: React.FC<PageProps> = () => {
  return <Main />;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
