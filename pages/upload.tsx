import type { InferGetStaticPropsType } from "next"

import UploadCSV from "../components/UploadCSV/UploadCSV"

export const getStaticProps = async () => {
  return { props: {} }
}

const UploadPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <UploadCSV />
}

export default UploadPage
