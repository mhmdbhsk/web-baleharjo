'use client';

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Plate } from '@udecode/plate/react';
import { useCreateEditor } from '@/components/editor/use-create-editor';
import { SettingsDialog } from '@/components/editor/settings';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';

type PlateEditorProps = {
  content: string | null;
  setContent: (content: string) => void;
};

export function PlateEditor({ content, setContent }: PlateEditorProps) {
  const editor = useCreateEditor({
    content: content ?? '',
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editor={editor}
        onValueChange={() => {
          if (editor?.api?.html) {
            const markdown = editor.api.markdown.serialize();
            setContent(markdown);
            // setTimeout(() => {
            //   setContent(markdown);
            // }, 1000);
          }
        }}
      >
        <EditorContainer>
          <Editor variant="fullWidth" />
        </EditorContainer>

        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
