import { useEffect, useState } from "react"
import axios from "axios"
import type { NextPage, GetStaticProps } from "next"
// import Head from 'next/head'
// import Image from "next/image"
import { AccountChangeWithCategories } from "../types/types"

import UploadCSV from "../components/UploadCSV/UploadCSV"
// import Datagrid from "../components/Datagrid/Datagrid"
import Datatable from "../components/Datatable/Datatable"

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

const Home: NextPage = ({}) => {
  const [dataset, setDataset] = useState<AccountChangeWithCategories[]>([])
  useEffect(() => {
    axios
      .get<{ data: AccountChangeWithCategories[] }>("/api/getAccountChanges")
      .then(res => setDataset(res.data.data))
  }, [])

  return (
    <div>
      <UploadCSV />
      {/* <Datagrid data={dataset} /> */}
      <Datatable data={dataset} />
    </div>
  )
}

export default Home
