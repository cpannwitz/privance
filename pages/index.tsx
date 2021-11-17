import type { NextPage, GetStaticProps } from "next"
// import Head from 'next/head'
// import Image from "next/image"
import UploadCSV from "../components/UploadCSV/UploadCSV"

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

const Home: NextPage = () => {
  return (
    <div>
      <UploadCSV />
    </div>
  )
}

export default Home
