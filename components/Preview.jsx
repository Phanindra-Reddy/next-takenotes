import React,{useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

//react-remarkable
import Markdown from "react-remarkable";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "github-markdown-css";

// react-markdown
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Box } from "@mui/system";


const highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (err) {
      console.error(err);
    }
  }

  try {
    return hljs.highlightAuto(str).value;
  } catch (err) {
    console.error(err);
  }

  return "";
};

function Preview() {

  const notes = useSelector((state) => state.notes);
  const activeNoteId = useSelector((state) => state.activeNoteId);

  const [source, setSource] = useState("")

  useEffect(() => {
    let active_note = notes?.find((note) => note?.id === activeNoteId);
    let noteText = active_note?.text;
    setSource(noteText);
  }, [activeNoteId]);



  return (
    <Box sx={{ p: 2, pb: 8 }}>
      <Markdown
        source={source}
        options={{ highlight, html: true, linkify: true }}
      />

      {/* <ReactMarkdown
        components={{
          code({ node, inline, className, children, ref, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <SyntaxHighlighter style={darcula} language={match[1]} {...props}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className}>{children}</code>
            );
          },
        }}
      >
        {initialText}
      </ReactMarkdown> */}
    </Box>
  );
}

export default Preview;
