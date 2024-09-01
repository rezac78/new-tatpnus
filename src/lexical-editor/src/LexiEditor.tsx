/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import * as React from 'react';

import {FlashMessageContext} from './context/FlashMessageContext';
import {SettingsContext, useSettings} from './context/SettingsContext';
import {SharedAutocompleteContext} from './context/SharedAutocompleteContext';
import {SharedHistoryContext} from './context/SharedHistoryContext';
import Editor from './Editor';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import {TableContext} from './plugins/TablePlugin';
import Settings from './Settings';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import './index.css';



function LexiEditor({editorState,getEditorState}:any) {
  const {
    settings: {isCollab, emptyEditor},
  } = useSettings();

  const initialConfig:any = {
    editorState: isCollab ? null : (emptyEditor),
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };


  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            <div className="editor-shell">
              <Editor editorState={editorState} getEditorState={getEditorState}/>
            </div>
            <Settings />
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}

export default function MyLexicalEditor({editorState,getEditorState}:any) {
  return (
    <SettingsContext>
      <FlashMessageContext>
        <LexiEditor editorState={editorState} getEditorState={getEditorState}/>
      </FlashMessageContext>
    </SettingsContext>
  );
}
