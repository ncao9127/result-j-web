import ClassResultPage from "../components/Subjects/ClassResultPage";
import Head from 'next/head';
const classresult = () => {

    return (
        <>
            <Head>
                <title>
                    JNTUH RESULTS | SUBJECTS STATS
                </title>
                <meta
                    name="description"
                    content="Check out semester subjects stats with in a go."
                    key="desc"
                />
            </Head>
            <ClassResultPage />

        </>
    )
}

export default classresult;