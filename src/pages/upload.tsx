import type { InferGetStaticPropsType } from 'next';

import UploadContainer from '../components/Upload/UploadContainer';

export const getStaticProps = async () => {
  return { props: {} };
};

const UploadPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <UploadContainer />;
};

export default UploadPage;
