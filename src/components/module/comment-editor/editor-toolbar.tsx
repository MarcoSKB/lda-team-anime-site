import { Editor } from '@tiptap/core'

import { BoldToolbar } from '@/components/tiptap/toolbars/bold'
import { ItalicToolbar } from '@/components/tiptap/toolbars/italic'
import { SpoilerToolbar } from '@/components/tiptap/toolbars/spoiler'
import { ToolbarProvider } from '@/components/tiptap/toolbars/toolbar-provider'
import { UnderlineToolbar } from '@/components/tiptap/toolbars/underline'
import { ScrollArea, ScrollBar } from '@/components/ui'
import { TooltipProvider } from '@/components/ui'

export const EditorToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className='bg-background sticky top-0 z-20 block w-full border-b'>
      <ToolbarProvider editor={editor}>
        <TooltipProvider>
          <ScrollArea className='h-fit py-0.5'>
            <div>
              <div className='flex items-center gap-1 px-2'>
                <BoldToolbar />
                <ItalicToolbar />
                <UnderlineToolbar />
                <SpoilerToolbar />
                <div className='flex-1' />
              </div>
            </div>
            <ScrollBar className='hidden' orientation='horizontal' />
          </ScrollArea>
        </TooltipProvider>
      </ToolbarProvider>
    </div>
  )
}
