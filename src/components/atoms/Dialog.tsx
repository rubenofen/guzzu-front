import { Dialog as HeadlessUIDialog } from '@headlessui/react'
import { ReactNode } from 'react'

export const Dialog = ({
  isOpen,
  setIsOpen,
  children,
  title,
  description,
  className
}: {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  children?: ReactNode
  title?: string
  description?: string
  className?: string
}) => {
  return (
    <HeadlessUIDialog className="relative z-50" open={isOpen} onClose={() => setIsOpen(false)}>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <HeadlessUIDialog.Backdrop className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <HeadlessUIDialog.Panel
          className={`mx-auto max-w-3xl max-h-full overflow-auto rounded bg-white p-10 shadow-md ${className}`}
        >
          <HeadlessUIDialog.Title className="text-2xl" as="span">
            {title}
          </HeadlessUIDialog.Title>
          <HeadlessUIDialog.Description>{description}</HeadlessUIDialog.Description>
          {children}
        </HeadlessUIDialog.Panel>
      </div>
    </HeadlessUIDialog>
  )
}
