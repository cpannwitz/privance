import type { InferGetStaticPropsType } from 'next';

import TransactionDatagridContainer from '../components/TransactionDatagrid/TransactionDatagridContainer';

export const getStaticProps = async () => {
  return { props: {} };
};

const OverviewPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <TransactionDatagridContainer />;
};

export default OverviewPage;
