// import {useState} from "react";
import {Helmet} from 'react-helmet-async';

import {CONFIG} from 'src/config-global';
// import MyLexicalEditor from "src/lexical-editor/src/LexiEditor.tsx";
// import {UserListView} from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = {title: `تست table | Dashboard - ${CONFIG.site.name}`};

export default function Page() {
  // const [LexiEditorState, setLexiEditorState] = useState("");

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      
      {/* <UserListView title="داشبورد"/> */}
    </>
  );
}
