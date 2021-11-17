import { useEffect, useState } from "react"
import axios from "axios"
import type { NextPage, GetStaticProps } from "next"
import Datagrid from "../components/Datagrid/Datagrid"
// import Head from 'next/head'
// import Image from "next/image"
import UploadCSV from "../components/UploadCSV/UploadCSV"

import { AccountChange } from ".prisma/client"

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

const Home: NextPage = ({}) => {
  const [dataset, setDataset] = useState<AccountChange[]>([])
  useEffect(() => {
    axios
      .get<{ data: AccountChange[] }>("/api/getAccountChanges")
      .then(res => setDataset(res.data.data))
  }, [])

  return (
    <div>
      <UploadCSV />
      <Datagrid data={dataset} />
    </div>
  )
}

export default Home
