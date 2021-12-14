import type { InferGetStaticPropsType } from "next"

import Upload from "../components/Upload/Upload"

export const getStaticProps = async () => {
  return { props: {} }
}

const UploadPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Upload />
}

export default UploadPage
