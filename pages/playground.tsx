import type { InferGetStaticPropsType } from "next"

export const getStaticProps = async () => {
  return { props: {} }
}

const PlaygroundPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div>Playground</div>
}

export default PlaygroundPage
