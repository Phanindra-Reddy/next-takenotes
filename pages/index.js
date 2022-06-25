import React,{useState, useEffect} from 'react';
import Head from "next/head";
import SplitPane from "react-split-pane";

import AppSidebar from "../components/AppSidebar";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import { useSelector } from "react-redux";




export default function Home() {
  const categories = useSelector(state => state.categories)
  const notes = useSelector(state => state.notes)
  const activeNoteId = useSelector(state=>state.activeNoteId)

  const [currentNoteId, setCurrentNoteId] = useState()

  useEffect(()=>{
    setCurrentNoteId(activeNoteId)
  },[activeNoteId])

  return (
    <>
      <Head>
        <title>Take Notes</title>
        <meta name="description" content="Created by Phanindra Reddy" />
        <link rel="icon" href="/takeNote1.jpg" />
      </Head>

      <>
        <SplitPane
          split="vertical"
          minSize={150}
          maxSize={500}
          defaultSize={240}
        >
          <AppSidebar />
          <SplitPane
            split="vertical"
            minSize={150}
            maxSize={500}
            defaultSize={300}
          >
            <NoteList />
            <NoteEditor />
          </SplitPane>
        </SplitPane>
      </>
    </>
  );
}
