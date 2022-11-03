import type { InferGetStaticPropsType } from 'next';

import AutomationRules from '../components/AutomationRules/AutomationRules';

export const getStaticProps = async () => {
  return { props: {} };
};

const AutomationRulesPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <AutomationRules />;
};

export default AutomationRulesPage;
