import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReactNode } from 'react';

interface CustomDialogProps {
  children: ReactNode;
  title: string;
  trigger: ReactNode;
  footer: ReactNode;
  cancel: ReactNode;
  description?: string;
}

const CustomDialog = ({
  children,
  title,
  trigger,
  footer,
  cancel,
  description,
}: CustomDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="px-4 py-4 bg-card ">
        <DialogHeader>
          <DialogTitle className="text-sm">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter className="flex justify-end border-t w-full gap-2 pt-2">
          <DialogClose>{cancel}</DialogClose>
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
