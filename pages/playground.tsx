import type { InferGetStaticPropsType } from "next"

export const getStaticProps = async () => {
  return { props: {} }
}

const PlaygroundPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div>asd</div>
}

export default PlaygroundPage
