import type { InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useLayoutEffect } from "react"

export const getStaticProps = async () => {
  return { props: {} }
}

const IndexPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  useLayoutEffect(() => {
    router.replace("/overview")
  }, [router])
  return null
}

export default IndexPage
